import OpenAI from "openai";
import type { 
  Project, 
  MarketAnalysis, 
  ProductDetails, 
  FinancialProjections 
} from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface BusinessRecommendations {
  overallScore: number;
  marketScore: number;
  productScore: number;
  financialScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  nextSteps: string[];
  riskFactors: string[];
  opportunities: string[];
}

export class AIService {
  async generateBusinessRecommendations(
    project: Project,
    marketAnalysis?: MarketAnalysis | null,
    productDetails?: ProductDetails | null,
    financialProjections?: FinancialProjections | null
  ): Promise<BusinessRecommendations> {
    const prompt = this.buildAnalysisPrompt(project, marketAnalysis, productDetails, financialProjections);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert business consultant and venture capitalist with 20+ years of experience in startup evaluation and business plan development. 
            
            Analyze the provided business information and provide a comprehensive evaluation. Your analysis should be:
            - Objective and data-driven
            - Actionable and specific
            - Realistic about market conditions
            - Focused on growth potential and scalability
            
            Respond with valid JSON in this exact format:
            {
              "overallScore": number (1-100),
              "marketScore": number (1-100),
              "productScore": number (1-100),
              "financialScore": number (1-100),
              "strengths": [array of 3-5 specific strengths],
              "weaknesses": [array of 3-5 specific weaknesses],
              "recommendations": [array of 5-7 actionable recommendations],
              "nextSteps": [array of 3-5 immediate next steps],
              "riskFactors": [array of 3-5 key risks to monitor],
              "opportunities": [array of 3-5 market opportunities to pursue]
            }`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 2000
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      // Validate and ensure all required fields are present
      return {
        overallScore: Math.max(1, Math.min(100, result.overallScore || 50)),
        marketScore: Math.max(1, Math.min(100, result.marketScore || 50)),
        productScore: Math.max(1, Math.min(100, result.productScore || 50)),
        financialScore: Math.max(1, Math.min(100, result.financialScore || 50)),
        strengths: Array.isArray(result.strengths) ? result.strengths : [],
        weaknesses: Array.isArray(result.weaknesses) ? result.weaknesses : [],
        recommendations: Array.isArray(result.recommendations) ? result.recommendations : [],
        nextSteps: Array.isArray(result.nextSteps) ? result.nextSteps : [],
        riskFactors: Array.isArray(result.riskFactors) ? result.riskFactors : [],
        opportunities: Array.isArray(result.opportunities) ? result.opportunities : []
      };
    } catch (error) {
      console.error('Error generating business recommendations:', error);
      throw new Error('Failed to generate AI recommendations. Please try again.');
    }
  }

  private buildAnalysisPrompt(
    project: Project,
    marketAnalysis?: MarketAnalysis | null,
    productDetails?: ProductDetails | null,
    financialProjections?: FinancialProjections | null
  ): string {
    let prompt = `Business Analysis Request:

COMPANY OVERVIEW:
- Business Name: ${project.name}
- Description: ${project.description}
- Industry: ${project.industry}
- Development Stage: ${project.stage}
- Target Markets: ${project.targetMarkets?.join(', ') || 'Not specified'}
- Team Size: ${project.teamSize}
`;

    if (marketAnalysis) {
      prompt += `
MARKET ANALYSIS:
- Target Customers: ${marketAnalysis.targetCustomers}
- Market Size: ${marketAnalysis.marketSize}
- Growth Rate: ${marketAnalysis.growthRate}
- Competitive Advantage: ${marketAnalysis.competitiveAdvantage}
- Competitors: ${typeof marketAnalysis.competitors === 'object' ? JSON.stringify(marketAnalysis.competitors) : marketAnalysis.competitors}
`;
    }

    if (productDetails) {
      prompt += `
PRODUCT DETAILS:
- Product Description: ${productDetails.productDescription}
- Unique Value Proposition: ${productDetails.uniqueValue}
- Development Stage: ${productDetails.developmentStage}
- Intellectual Property: ${productDetails.intellectualProperty}
- Scalability: ${productDetails.scalability}
`;
    }

    if (financialProjections) {
      prompt += `
FINANCIAL PROJECTIONS:
- Business Model: ${financialProjections.businessModel}
- Revenue Streams: ${Array.isArray(financialProjections.revenueStreams) ? financialProjections.revenueStreams.join(', ') : financialProjections.revenueStreams}
- Initial Investment Required: ${financialProjections.initialInvestment}
- Break-even Point: ${financialProjections.breakEvenPoint}
- Operating Costs: ${typeof financialProjections.operatingCosts === 'object' ? JSON.stringify(financialProjections.operatingCosts) : financialProjections.operatingCosts}
- Revenue Projections: ${typeof financialProjections.projectedRevenue === 'object' ? JSON.stringify(financialProjections.projectedRevenue) : financialProjections.projectedRevenue}
`;
    }

    prompt += `
Please provide a comprehensive business analysis and recommendations based on this information. Consider current market trends, industry standards, and best practices for startups in this space.`;

    return prompt;
  }

  async enhanceBusinessPlan(
    project: Project,
    marketAnalysis?: MarketAnalysis | null,
    productDetails?: ProductDetails | null,
    financialProjections?: FinancialProjections | null
  ): Promise<string> {
    const prompt = `Please enhance and improve the following business plan with specific, actionable insights:

${this.buildAnalysisPrompt(project, marketAnalysis, productDetails, financialProjections)}

Provide an enhanced business plan section that includes:
1. Refined value proposition
2. Improved market positioning strategy
3. Enhanced competitive analysis
4. Optimized go-to-market strategy
5. Risk mitigation strategies
6. Growth and scaling recommendations

Format the response as a professional business plan section with clear headings and bullet points.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert business plan writer and strategic consultant. Provide detailed, professional business plan enhancements."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 3000
      });

      return response.choices[0].message.content || '';
    } catch (error) {
      console.error('Error enhancing business plan:', error);
      throw new Error('Failed to enhance business plan. Please try again.');
    }
  }
}

export const aiService = new AIService();