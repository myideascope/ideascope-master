import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getYearLabels, formatCurrency } from './utils';

// Types for document generation
type Project = {
  name: string;
  description: string;
  industry: string;
  stage: string;
  targetMarkets: string[];
  teamSize: string;
};

type MarketAnalysis = {
  targetCustomers: string;
  marketSize: string;
  growthRate: string;
  competitors: any;
  competitiveAdvantage: string;
};

type ProductDetails = {
  productDescription: string;
  uniqueValue: string;
  developmentStage: string;
  intellectualProperty: string;
  scalability: string;
};

type FinancialProjections = {
  businessModel: string;
  revenueStreams: string[];
  initialInvestment: string;
  operatingCosts: any;
  breakEvenPoint: string;
  projectedRevenue: any;
};

type EvaluationResults = {
  marketScore: number;
  productScore: number;
  financialScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
};

type BusinessPlanData = {
  project: Project;
  marketAnalysis?: MarketAnalysis | null;
  productDetails?: ProductDetails | null;
  financialProjections?: FinancialProjections | null;
  evaluationResults?: EvaluationResults | null;
};

// Generate Business Plan PDF
export function generateBusinessPlan(data: BusinessPlanData): string {
  const doc = new jsPDF();
  
  // Title page
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('BUSINESS PLAN', 105, 50, { align: 'center' });
  
  doc.setFontSize(18);
  doc.text(data.project.name, 105, 70, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Prepared: ${new Date().toLocaleDateString()}`, 105, 90, { align: 'center' });
  
  // Executive Summary
  doc.addPage();
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', 14, 20);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Business Overview:', 14, 30);
  const descriptionLines = doc.splitTextToSize(data.project.description, 180);
  doc.text(descriptionLines, 14, 40);
  
  doc.text(`Industry: ${data.project.industry}`, 14, 60);
  doc.text(`Current Stage: ${data.project.stage}`, 14, 70);
  doc.text(`Target Markets: ${data.project.targetMarkets.join(', ')}`, 14, 80);
  doc.text(`Team Size: ${data.project.teamSize}`, 14, 90);
  
  if (data.evaluationResults) {
    doc.text(`Business Viability Score: ${data.evaluationResults.overallScore}%`, 14, 100);
  }
  
  // Market Analysis
  doc.addPage();
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Market Analysis', 14, 20);
  
  if (data.marketAnalysis) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    doc.setFont('helvetica', 'bold');
    doc.text('Target Customers:', 14, 30);
    doc.setFont('helvetica', 'normal');
    const customerLines = doc.splitTextToSize(data.marketAnalysis.targetCustomers, 180);
    doc.text(customerLines, 14, 40);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Market Size:', 14, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(data.marketAnalysis.marketSize, 14, 70);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Market Growth Rate:', 14, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(data.marketAnalysis.growthRate, 14, 90);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Competitive Advantage:', 14, 100);
    doc.setFont('helvetica', 'normal');
    const advantageLines = doc.splitTextToSize(data.marketAnalysis.competitiveAdvantage, 180);
    doc.text(advantageLines, 14, 110);
    
    // Competitors table
    if (data.marketAnalysis.competitors && Array.isArray(data.marketAnalysis.competitors)) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Competitive Analysis', 14, 20);
      
      const tableData = data.marketAnalysis.competitors.map((competitor: any) => [
        competitor.name,
        competitor.strengths,
        competitor.weaknesses
      ]);
      
      autoTable(doc, {
        startY: 30,
        head: [['Competitor', 'Strengths', 'Weaknesses']],
        body: tableData,
      });
    }
  } else {
    doc.setFontSize(11);
    doc.text('Market analysis data not provided.', 14, 30);
  }
  
  // Product Details
  doc.addPage();
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Product/Service Details', 14, 20);
  
  if (data.productDetails) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    doc.setFont('helvetica', 'bold');
    doc.text('Product Description:', 14, 30);
    doc.setFont('helvetica', 'normal');
    const productLines = doc.splitTextToSize(data.productDetails.productDescription, 180);
    doc.text(productLines, 14, 40);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Unique Value Proposition:', 14, 60);
    doc.setFont('helvetica', 'normal');
    const valueLines = doc.splitTextToSize(data.productDetails.uniqueValue, 180);
    doc.text(valueLines, 14, 70);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Development Stage:', 14, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(data.productDetails.developmentStage, 14, 100);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Intellectual Property:', 14, 110);
    doc.setFont('helvetica', 'normal');
    doc.text(data.productDetails.intellectualProperty, 14, 120);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Scalability:', 14, 130);
    doc.setFont('helvetica', 'normal');
    doc.text(data.productDetails.scalability, 14, 140);
  } else {
    doc.setFontSize(11);
    doc.text('Product details not provided.', 14, 30);
  }
  
  // Financial Projections
  doc.addPage();
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Financial Projections', 14, 20);
  
  if (data.financialProjections) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    doc.setFont('helvetica', 'bold');
    doc.text('Business Model:', 14, 30);
    doc.setFont('helvetica', 'normal');
    doc.text(data.financialProjections.businessModel, 14, 40);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Revenue Streams:', 14, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(data.financialProjections.revenueStreams.join(', '), 14, 60);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Initial Investment Required:', 14, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(data.financialProjections.initialInvestment, 14, 80);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Break-even Point:', 14, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(data.financialProjections.breakEvenPoint, 14, 100);
    
    // Revenue projections table
    if (data.financialProjections.projectedRevenue) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('5-Year Revenue Projections', 14, 20);
      
      const yearLabels = getYearLabels();
      const tableData = [yearLabels.map((_, i) => data.financialProjections!.projectedRevenue[i] || 0)];
      
      autoTable(doc, {
        startY: 30,
        head: [['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']],
        body: tableData,
      });
    }
  } else {
    doc.setFontSize(11);
    doc.text('Financial projections not provided.', 14, 30);
  }
  
  // Recommendations
  if (data.evaluationResults && data.evaluationResults.recommendations.length > 0) {
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommendations', 14, 20);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    let yPos = 30;
    data.evaluationResults.recommendations.forEach((recommendation, index) => {
      const recLines = doc.splitTextToSize(`${index + 1}. ${recommendation}`, 180);
      doc.text(recLines, 14, yPos);
      yPos += 10 + (recLines.length - 1) * 5;
    });
  }
  
  // Return data URL for the PDF
  return doc.output('dataurlstring');
}

// Generate Pitch Deck HTML structure
export function generatePitchDeckHtml(data: BusinessPlanData): string {
  const {
    project,
    marketAnalysis,
    productDetails,
    financialProjections,
    evaluationResults
  } = data;
  
  return `
    <div class="pitch-deck">
      <!-- Cover Slide -->
      <section class="slide cover-slide">
        <div class="slide-content">
          <h1>${project.name}</h1>
          <p class="tagline">${productDetails?.uniqueValue || 'Innovative Solution'}</p>
        </div>
      </section>
      
      <!-- Problem Slide -->
      <section class="slide problem-slide">
        <div class="slide-content">
          <h2>The Problem</h2>
          <div class="problem-description">
            ${project.description.split('.')[0] + '.'}
          </div>
        </div>
      </section>
      
      <!-- Solution Slide -->
      <section class="slide solution-slide">
        <div class="slide-content">
          <h2>Our Solution</h2>
          <div class="solution-description">
            ${productDetails?.productDescription || project.description}
          </div>
        </div>
      </section>
      
      <!-- Market Opportunity Slide -->
      <section class="slide market-slide">
        <div class="slide-content">
          <h2>Market Opportunity</h2>
          <div class="market-details">
            <p><strong>Target Market:</strong> ${marketAnalysis?.targetCustomers || 'Not specified'}</p>
            <p><strong>Market Size:</strong> ${marketAnalysis?.marketSize || 'Not specified'}</p>
            <p><strong>Growth Rate:</strong> ${marketAnalysis?.growthRate || 'Not specified'}</p>
          </div>
        </div>
      </section>
      
      <!-- Business Model Slide -->
      <section class="slide business-model-slide">
        <div class="slide-content">
          <h2>Business Model</h2>
          <div class="business-model-details">
            <p><strong>Model:</strong> ${financialProjections?.businessModel || 'Not specified'}</p>
            <p><strong>Revenue Streams:</strong> ${financialProjections?.revenueStreams?.join(', ') || 'Not specified'}</p>
          </div>
        </div>
      </section>
      
      <!-- Competitive Advantage Slide -->
      <section class="slide competitive-slide">
        <div class="slide-content">
          <h2>Competitive Advantage</h2>
          <div class="competitive-details">
            <p>${marketAnalysis?.competitiveAdvantage || 'Our unique approach provides significant advantages over competitors.'}</p>
          </div>
        </div>
      </section>
      
      <!-- Financial Projections Slide -->
      <section class="slide financials-slide">
        <div class="slide-content">
          <h2>Financial Projections</h2>
          <div class="financial-chart">
            <div id="revenue-chart" class="chart-placeholder">
              Revenue chart will be rendered here
            </div>
          </div>
          <div class="financial-highlights">
            <p><strong>Initial Investment:</strong> ${financialProjections?.initialInvestment || 'Not specified'}</p>
            <p><strong>Break-even:</strong> ${financialProjections?.breakEvenPoint || 'Not specified'}</p>
          </div>
        </div>
      </section>
      
      <!-- Team Slide -->
      <section class="slide team-slide">
        <div class="slide-content">
          <h2>Our Team</h2>
          <div class="team-details">
            <p><strong>Team Size:</strong> ${project.teamSize}</p>
            <p>Our talented team brings together expertise in ${project.industry} and a passion for innovation.</p>
          </div>
        </div>
      </section>
      
      <!-- Ask Slide -->
      <section class="slide ask-slide">
        <div class="slide-content">
          <h2>Investment Opportunity</h2>
          <div class="ask-details">
            <p><strong>Seeking:</strong> ${financialProjections?.initialInvestment || 'Investment amount not specified'}</p>
            <p><strong>Use of Funds:</strong> Product development, market expansion, and operational growth</p>
          </div>
        </div>
      </section>
      
      <!-- Contact Slide -->
      <section class="slide contact-slide">
        <div class="slide-content">
          <h2>Thank You</h2>
          <p class="contact-info">Contact us to learn more about this opportunity</p>
        </div>
      </section>
    </div>
  `;
}
