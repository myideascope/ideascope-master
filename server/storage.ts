import {
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  marketAnalysis, type MarketAnalysis, type InsertMarketAnalysis,
  productDetails, type ProductDetails, type InsertProductDetails,
  financialProjections, type FinancialProjections, type InsertFinancialProjections,
  evaluationResults, type EvaluationResults, type InsertEvaluationResults
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByUserId(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<boolean>;
  
  // Market analysis operations
  getMarketAnalysis(projectId: number): Promise<MarketAnalysis | undefined>;
  createMarketAnalysis(marketAnalysis: InsertMarketAnalysis): Promise<MarketAnalysis>;
  updateMarketAnalysis(id: number, marketAnalysis: Partial<InsertMarketAnalysis>): Promise<MarketAnalysis>;
  
  // Product details operations
  getProductDetails(projectId: number): Promise<ProductDetails | undefined>;
  createProductDetails(productDetails: InsertProductDetails): Promise<ProductDetails>;
  updateProductDetails(id: number, productDetails: Partial<InsertProductDetails>): Promise<ProductDetails>;
  
  // Financial projections operations
  getFinancialProjections(projectId: number): Promise<FinancialProjections | undefined>;
  createFinancialProjections(financialProjections: InsertFinancialProjections): Promise<FinancialProjections>;
  updateFinancialProjections(id: number, financialProjections: Partial<InsertFinancialProjections>): Promise<FinancialProjections>;
  
  // Evaluation results operations
  getEvaluationResults(projectId: number): Promise<EvaluationResults | undefined>;
  createEvaluationResults(evaluationResults: InsertEvaluationResults): Promise<EvaluationResults>;
  updateEvaluationResults(id: number, evaluationResults: Partial<InsertEvaluationResults>): Promise<EvaluationResults>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private marketAnalysis: Map<number, MarketAnalysis>;
  private productDetails: Map<number, ProductDetails>;
  private financialProjections: Map<number, FinancialProjections>;
  private evaluationResults: Map<number, EvaluationResults>;
  
  private currentUserId: number;
  private currentProjectId: number;
  private currentMarketAnalysisId: number;
  private currentProductDetailsId: number;
  private currentFinancialProjectionsId: number;
  private currentEvaluationResultsId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.marketAnalysis = new Map();
    this.productDetails = new Map();
    this.financialProjections = new Map();
    this.evaluationResults = new Map();
    
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentMarketAnalysisId = 1;
    this.currentProductDetailsId = 1;
    this.currentFinancialProjectionsId = 1;
    this.currentEvaluationResultsId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.userId === userId);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const createdAt = new Date();
    const project: Project = { ...insertProject, id, createdAt };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      throw new Error(`Project with id ${id} not found`);
    }
    
    const updatedProject: Project = { ...existingProject, ...projectUpdate };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Market analysis methods
  async getMarketAnalysis(projectId: number): Promise<MarketAnalysis | undefined> {
    return Array.from(this.marketAnalysis.values())
      .find(analysis => analysis.projectId === projectId);
  }

  async createMarketAnalysis(insertMarketAnalysis: InsertMarketAnalysis): Promise<MarketAnalysis> {
    const id = this.currentMarketAnalysisId++;
    const marketAnalysis: MarketAnalysis = { ...insertMarketAnalysis, id };
    this.marketAnalysis.set(id, marketAnalysis);
    return marketAnalysis;
  }

  async updateMarketAnalysis(id: number, marketAnalysisUpdate: Partial<InsertMarketAnalysis>): Promise<MarketAnalysis> {
    const existingMarketAnalysis = this.marketAnalysis.get(id);
    if (!existingMarketAnalysis) {
      throw new Error(`Market analysis with id ${id} not found`);
    }
    
    const updatedMarketAnalysis: MarketAnalysis = { ...existingMarketAnalysis, ...marketAnalysisUpdate };
    this.marketAnalysis.set(id, updatedMarketAnalysis);
    return updatedMarketAnalysis;
  }

  // Product details methods
  async getProductDetails(projectId: number): Promise<ProductDetails | undefined> {
    return Array.from(this.productDetails.values())
      .find(details => details.projectId === projectId);
  }

  async createProductDetails(insertProductDetails: InsertProductDetails): Promise<ProductDetails> {
    const id = this.currentProductDetailsId++;
    const productDetails: ProductDetails = { ...insertProductDetails, id };
    this.productDetails.set(id, productDetails);
    return productDetails;
  }

  async updateProductDetails(id: number, productDetailsUpdate: Partial<InsertProductDetails>): Promise<ProductDetails> {
    const existingProductDetails = this.productDetails.get(id);
    if (!existingProductDetails) {
      throw new Error(`Product details with id ${id} not found`);
    }
    
    const updatedProductDetails: ProductDetails = { ...existingProductDetails, ...productDetailsUpdate };
    this.productDetails.set(id, updatedProductDetails);
    return updatedProductDetails;
  }

  // Financial projections methods
  async getFinancialProjections(projectId: number): Promise<FinancialProjections | undefined> {
    return Array.from(this.financialProjections.values())
      .find(projections => projections.projectId === projectId);
  }

  async createFinancialProjections(insertFinancialProjections: InsertFinancialProjections): Promise<FinancialProjections> {
    const id = this.currentFinancialProjectionsId++;
    const financialProjections: FinancialProjections = { ...insertFinancialProjections, id };
    this.financialProjections.set(id, financialProjections);
    return financialProjections;
  }

  async updateFinancialProjections(id: number, financialProjectionsUpdate: Partial<InsertFinancialProjections>): Promise<FinancialProjections> {
    const existingFinancialProjections = this.financialProjections.get(id);
    if (!existingFinancialProjections) {
      throw new Error(`Financial projections with id ${id} not found`);
    }
    
    const updatedFinancialProjections: FinancialProjections = { ...existingFinancialProjections, ...financialProjectionsUpdate };
    this.financialProjections.set(id, updatedFinancialProjections);
    return updatedFinancialProjections;
  }

  // Evaluation results methods
  async getEvaluationResults(projectId: number): Promise<EvaluationResults | undefined> {
    return Array.from(this.evaluationResults.values())
      .find(results => results.projectId === projectId);
  }

  async createEvaluationResults(insertEvaluationResults: InsertEvaluationResults): Promise<EvaluationResults> {
    const id = this.currentEvaluationResultsId++;
    const evaluationResults: EvaluationResults = { ...insertEvaluationResults, id };
    this.evaluationResults.set(id, evaluationResults);
    return evaluationResults;
  }

  async updateEvaluationResults(id: number, evaluationResultsUpdate: Partial<InsertEvaluationResults>): Promise<EvaluationResults> {
    const existingEvaluationResults = this.evaluationResults.get(id);
    if (!existingEvaluationResults) {
      throw new Error(`Evaluation results with id ${id} not found`);
    }
    
    const updatedEvaluationResults: EvaluationResults = { ...existingEvaluationResults, ...evaluationResultsUpdate };
    this.evaluationResults.set(id, updatedEvaluationResults);
    return updatedEvaluationResults;
  }
}

export const storage = new MemStorage();
