import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User accounts
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Business evaluation project
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  industry: text("industry").notNull(),
  stage: text("stage").notNull(),
  targetMarkets: text("target_markets").array().notNull(),
  teamSize: text("team_size").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  userId: true,
  name: true,
  description: true,
  industry: true,
  stage: true,
  targetMarkets: true,
  teamSize: true,
});

// Market analysis details
export const marketAnalysis = pgTable("market_analysis", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  targetCustomers: text("target_customers").notNull(),
  marketSize: text("market_size").notNull(),
  growthRate: text("growth_rate").notNull(),
  competitors: json("competitors").notNull(),
  competitiveAdvantage: text("competitive_advantage").notNull(),
});

export const insertMarketAnalysisSchema = createInsertSchema(marketAnalysis).pick({
  projectId: true,
  targetCustomers: true,
  marketSize: true,
  growthRate: true,
  competitors: true,
  competitiveAdvantage: true,
});

// Product details
export const productDetails = pgTable("product_details", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  productDescription: text("product_description").notNull(),
  uniqueValue: text("unique_value").notNull(),
  developmentStage: text("development_stage").notNull(),
  intellectualProperty: text("intellectual_property").notNull(),
  scalability: text("scalability").notNull(),
});

export const insertProductDetailsSchema = createInsertSchema(productDetails).pick({
  projectId: true,
  productDescription: true,
  uniqueValue: true,
  developmentStage: true,
  intellectualProperty: true,
  scalability: true,
});

// Financial projections
export const financialProjections = pgTable("financial_projections", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  businessModel: text("business_model").notNull(),
  revenueStreams: text("revenue_streams").array().notNull(),
  initialInvestment: text("initial_investment").notNull(),
  operatingCosts: json("operating_costs").notNull(),
  breakEvenPoint: text("break_even_point").notNull(),
  projectedRevenue: json("projected_revenue").notNull(),
});

export const insertFinancialProjectionsSchema = createInsertSchema(financialProjections).pick({
  projectId: true,
  businessModel: true,
  revenueStreams: true,
  initialInvestment: true,
  operatingCosts: true,
  breakEvenPoint: true,
  projectedRevenue: true,
});

// Evaluation results
export const evaluationResults = pgTable("evaluation_results", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  marketScore: integer("market_score").notNull(),
  productScore: integer("product_score").notNull(),
  financialScore: integer("financial_score").notNull(),
  overallScore: integer("overall_score").notNull(),
  strengths: text("strengths").array().notNull(),
  weaknesses: text("weaknesses").array().notNull(),
  recommendations: text("recommendations").array().notNull(),
});

export const insertEvaluationResultsSchema = createInsertSchema(evaluationResults).pick({
  projectId: true,
  marketScore: true,
  productScore: true,
  financialScore: true,
  overallScore: true,
  strengths: true,
  weaknesses: true,
  recommendations: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertMarketAnalysis = z.infer<typeof insertMarketAnalysisSchema>;
export type MarketAnalysis = typeof marketAnalysis.$inferSelect;

export type InsertProductDetails = z.infer<typeof insertProductDetailsSchema>;
export type ProductDetails = typeof productDetails.$inferSelect;

export type InsertFinancialProjections = z.infer<typeof insertFinancialProjectionsSchema>;
export type FinancialProjections = typeof financialProjections.$inferSelect;

export type InsertEvaluationResults = z.infer<typeof insertEvaluationResultsSchema>;
export type EvaluationResults = typeof evaluationResults.$inferSelect;
