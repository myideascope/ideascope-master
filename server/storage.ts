import {
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  marketAnalysis, type MarketAnalysis, type InsertMarketAnalysis,
  productDetails, type ProductDetails, type InsertProductDetails,
  financialProjections, type FinancialProjections, type InsertFinancialProjections,
  evaluationResults, type EvaluationResults, type InsertEvaluationResults
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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

// Database storage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.userId, userId));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set(projectUpdate)
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getMarketAnalysis(projectId: number): Promise<MarketAnalysis | undefined> {
    const [analysis] = await db.select().from(marketAnalysis).where(eq(marketAnalysis.projectId, projectId));
    return analysis || undefined;
  }

  async createMarketAnalysis(insertMarketAnalysis: InsertMarketAnalysis): Promise<MarketAnalysis> {
    const [analysis] = await db
      .insert(marketAnalysis)
      .values(insertMarketAnalysis)
      .returning();
    return analysis;
  }

  async updateMarketAnalysis(id: number, marketAnalysisUpdate: Partial<InsertMarketAnalysis>): Promise<MarketAnalysis> {
    const [analysis] = await db
      .update(marketAnalysis)
      .set(marketAnalysisUpdate)
      .where(eq(marketAnalysis.id, id))
      .returning();
    return analysis;
  }

  async getProductDetails(projectId: number): Promise<ProductDetails | undefined> {
    const [details] = await db.select().from(productDetails).where(eq(productDetails.projectId, projectId));
    return details || undefined;
  }

  async createProductDetails(insertProductDetails: InsertProductDetails): Promise<ProductDetails> {
    const [details] = await db
      .insert(productDetails)
      .values(insertProductDetails)
      .returning();
    return details;
  }

  async updateProductDetails(id: number, productDetailsUpdate: Partial<InsertProductDetails>): Promise<ProductDetails> {
    const [details] = await db
      .update(productDetails)
      .set(productDetailsUpdate)
      .where(eq(productDetails.id, id))
      .returning();
    return details;
  }

  async getFinancialProjections(projectId: number): Promise<FinancialProjections | undefined> {
    const [projections] = await db.select().from(financialProjections).where(eq(financialProjections.projectId, projectId));
    return projections || undefined;
  }

  async createFinancialProjections(insertFinancialProjections: InsertFinancialProjections): Promise<FinancialProjections> {
    const [projections] = await db
      .insert(financialProjections)
      .values(insertFinancialProjections)
      .returning();
    return projections;
  }

  async updateFinancialProjections(id: number, financialProjectionsUpdate: Partial<InsertFinancialProjections>): Promise<FinancialProjections> {
    const [projections] = await db
      .update(financialProjections)
      .set(financialProjectionsUpdate)
      .where(eq(financialProjections.id, id))
      .returning();
    return projections;
  }

  async getEvaluationResults(projectId: number): Promise<EvaluationResults | undefined> {
    const [results] = await db.select().from(evaluationResults).where(eq(evaluationResults.projectId, projectId));
    return results || undefined;
  }

  async createEvaluationResults(insertEvaluationResults: InsertEvaluationResults): Promise<EvaluationResults> {
    const [results] = await db
      .insert(evaluationResults)
      .values(insertEvaluationResults)
      .returning();
    return results;
  }

  async updateEvaluationResults(id: number, evaluationResultsUpdate: Partial<InsertEvaluationResults>): Promise<EvaluationResults> {
    const [results] = await db
      .update(evaluationResults)
      .set(evaluationResultsUpdate)
      .where(eq(evaluationResults.id, id))
      .returning();
    return results;
  }
}

export const storage = new DatabaseStorage();