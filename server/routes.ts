import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import {
  insertProjectSchema,
  insertMarketAnalysisSchema,
  insertProductDetailsSchema,
  insertFinancialProjectionsSchema,
  insertEvaluationResultsSchema
} from "@shared/schema";
import { generateBusinessPlan, generatePitchDeckHtml } from "../client/src/lib/document-generator";
import { aiService } from "./ai-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handling middleware
  const handleZodError = (err: unknown, res: Response) => {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return res.status(400).json({ message: validationError.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  };

  /**
   * Project Routes
   */
  // Create a new project
  app.post('/api/projects', async (req: Request, res: Response) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      return res.status(201).json(project);
    } catch (err) {
      return handleZodError(err, res);
    }
  });

  // Get all projects for a user
  app.get('/api/projects', async (req: Request, res: Response) => {
    const userId = parseInt(req.query.userId as string);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Valid userId is required' });
    }
    const projects = await storage.getProjectsByUserId(userId);
    return res.json(projects);
  });

  // Get a specific project
  app.get('/api/projects/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Valid project ID is required' });
    }
    
    const project = await storage.getProject(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    return res.json(project);
  });

  // Update a project
  app.patch('/api/projects/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Valid project ID is required' });
    }
    
    try {
      const projectUpdate = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, projectUpdate);
      return res.json(project);
    } catch (err) {
      return handleZodError(err, res);
    }
  });

  // Delete a project
  app.delete('/api/projects/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Valid project ID is required' });
    }
    
    const success = await storage.deleteProject(id);
    if (!success) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    return res.status(204).end();
  });

  /**
   * Market Analysis Routes
   */
  // Create market analysis
  app.post('/api/market-analysis', async (req: Request, res: Response) => {
    try {
      const marketAnalysisData = insertMarketAnalysisSchema.parse(req.body);
      const marketAnalysis = await storage.createMarketAnalysis(marketAnalysisData);
      return res.status(201).json(marketAnalysis);
    } catch (err) {
      return handleZodError(err, res);
    }
  });

  // Get market analysis for a project
  app.get('/api/market-analysis/project/:projectId', async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId);
    if (isNaN(projectId)) {
      return res.status(400).json({ message: 'Valid projectId is required' });
    }
    
    const marketAnalysis = await storage.getMarketAnalysis(projectId);
    if (!marketAnalysis) {
      return res.status(404).json({ message: 'Market analysis not found for this project' });
    }
    
    return res.json(marketAnalysis);
  });

  /**
   * Product Details Routes
   */
  // Create product details
  app.post('/api/product-details', async (req: Request, res: Response) => {
    try {
      const productDetailsData = insertProductDetailsSchema.parse(req.body);
      const productDetails = await storage.createProductDetails(productDetailsData);
      return res.status(201).json(productDetails);
    } catch (err) {
      return handleZodError(err, res);
    }
  });

  // Get product details for a project
  app.get('/api/product-details/project/:projectId', async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId);
    if (isNaN(projectId)) {
      return res.status(400).json({ message: 'Valid projectId is required' });
    }
    
    const productDetails = await storage.getProductDetails(projectId);
    if (!productDetails) {
      return res.status(404).json({ message: 'Product details not found for this project' });
    }
    
    return res.json(productDetails);
  });

  /**
   * Financial Projections Routes
   */
  // Create financial projections
  app.post('/api/financial-projections', async (req: Request, res: Response) => {
    try {
      const financialProjectionsData = insertFinancialProjectionsSchema.parse(req.body);
      const financialProjections = await storage.createFinancialProjections(financialProjectionsData);
      return res.status(201).json(financialProjections);
    } catch (err) {
      return handleZodError(err, res);
    }
  });

  // Get financial projections for a project
  app.get('/api/financial-projections/project/:projectId', async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId);
    if (isNaN(projectId)) {
      return res.status(400).json({ message: 'Valid projectId is required' });
    }
    
    const financialProjections = await storage.getFinancialProjections(projectId);
    if (!financialProjections) {
      return res.status(404).json({ message: 'Financial projections not found for this project' });
    }
    
    return res.json(financialProjections);
  });

  /**
   * Evaluation Results Routes
   */
  // Create evaluation results
  app.post('/api/evaluation-results', async (req: Request, res: Response) => {
    try {
      const evaluationResultsData = insertEvaluationResultsSchema.parse(req.body);
      
      // Calculate overall score (average of other scores)
      if (!evaluationResultsData.overallScore) {
        const { marketScore, productScore, financialScore } = evaluationResultsData;
        evaluationResultsData.overallScore = Math.round((marketScore + productScore + financialScore) / 3);
      }
      
      const evaluationResults = await storage.createEvaluationResults(evaluationResultsData);
      return res.status(201).json(evaluationResults);
    } catch (err) {
      return handleZodError(err, res);
    }
  });

  // Get evaluation results for a project
  app.get('/api/evaluation-results/project/:projectId', async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId);
    if (isNaN(projectId)) {
      return res.status(400).json({ message: 'Valid projectId is required' });
    }
    
    const evaluationResults = await storage.getEvaluationResults(projectId);
    if (!evaluationResults) {
      return res.status(404).json({ message: 'Evaluation results not found for this project' });
    }
    
    return res.json(evaluationResults);
  });

  // Generate business plan
  app.get('/api/generate/business-plan/:projectId', async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId);
    if (isNaN(projectId)) {
      return res.status(400).json({ message: 'Valid projectId is required' });
    }
    
    try {
      // Get all necessary data for the business plan
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      const marketAnalysis = await storage.getMarketAnalysis(projectId);
      const productDetails = await storage.getProductDetails(projectId);
      const financialProjections = await storage.getFinancialProjections(projectId);
      
      // Return all data needed for business plan
      return res.json({
        project,
        marketAnalysis: marketAnalysis || null,
        productDetails: productDetails || null,
        financialProjections: financialProjections || null
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to generate business plan' });
    }
  });

  // Generate pitch deck
  app.get('/api/generate/pitch-deck/:projectId', async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId);
    if (isNaN(projectId)) {
      return res.status(400).json({ message: 'Valid projectId is required' });
    }
    
    try {
      // Get all necessary data for the pitch deck
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      const marketAnalysis = await storage.getMarketAnalysis(projectId);
      const productDetails = await storage.getProductDetails(projectId);
      const financialProjections = await storage.getFinancialProjections(projectId);
      const evaluationResults = await storage.getEvaluationResults(projectId);
      
      // Return all data needed for pitch deck
      return res.json({
        project,
        marketAnalysis: marketAnalysis || null,
        productDetails: productDetails || null,
        financialProjections: financialProjections || null,
        evaluationResults: evaluationResults || null
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to generate pitch deck' });
    }
  });

  // AI-powered business recommendations
  app.post('/api/ai/recommendations/:projectId', async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId);
    if (isNaN(projectId)) {
      return res.status(400).json({ message: 'Valid projectId is required' });
    }
    
    try {
      // Get all project data
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      const marketAnalysis = await storage.getMarketAnalysis(projectId);
      const productDetails = await storage.getProductDetails(projectId);
      const financialProjections = await storage.getFinancialProjections(projectId);
      
      // Generate AI recommendations
      const recommendations = await aiService.generateBusinessRecommendations(
        project,
        marketAnalysis,
        productDetails,
        financialProjections
      );
      
      return res.json(recommendations);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ 
        message: err instanceof Error ? err.message : 'Failed to generate AI recommendations' 
      });
    }
  });

  // AI-enhanced business plan
  app.post('/api/ai/enhance-plan/:projectId', async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.projectId);
    if (isNaN(projectId)) {
      return res.status(400).json({ message: 'Valid projectId is required' });
    }
    
    try {
      // Get all project data
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      const marketAnalysis = await storage.getMarketAnalysis(projectId);
      const productDetails = await storage.getProductDetails(projectId);
      const financialProjections = await storage.getFinancialProjections(projectId);
      
      // Generate enhanced business plan
      const enhancedPlan = await aiService.enhanceBusinessPlan(
        project,
        marketAnalysis,
        productDetails,
        financialProjections
      );
      
      return res.json({ enhancedPlan });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ 
        message: err instanceof Error ? err.message : 'Failed to enhance business plan' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
