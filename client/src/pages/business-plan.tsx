import React, { useState } from 'react';
import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { generateBusinessPlan } from '@/lib/document-generator';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Download, ArrowLeft } from 'lucide-react';

const BusinessPlan: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Fetch data for business plan
  const { data: businessPlanData, isLoading } = useQuery({
    queryKey: [`/api/generate/business-plan/${projectId}`],
    enabled: !!projectId,
  });

  const handleGeneratePDF = () => {
    if (!businessPlanData) return;
    
    setIsGenerating(true);
    try {
      // Generate business plan PDF
      const pdfDataUri = generateBusinessPlan(businessPlanData);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = pdfDataUri;
      link.download = `${businessPlanData.project.name.replace(/\s+/g, '_')}_Business_Plan.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating business plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-40 w-full mb-6" />
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (!businessPlanData || !businessPlanData.project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="mb-4">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Business Plan Not Available</h1>
        <p className="text-neutral-600 mb-6">
          The business plan for this project could not be found or has not been completed yet.
        </p>
        <Link href="/evaluation">
          <Button>Return to Evaluation</Button>
        </Link>
      </div>
    );
  }

  const { project, marketAnalysis, productDetails, financialProjections } = businessPlanData;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link href={`/results/${projectId}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
          </Button>
        </Link>
        
        <Button onClick={handleGeneratePDF} disabled={isGenerating}>
          <Download className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </Button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Business Plan</h1>
        <h2 className="text-2xl font-medium text-neutral-700">{project.name}</h2>
        <p className="text-neutral-500 mt-2">Created: {new Date().toLocaleDateString()}</p>
      </div>

      <Tabs defaultValue="executive-summary">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="executive-summary">Executive Summary</TabsTrigger>
          <TabsTrigger value="market-analysis">Market</TabsTrigger>
          <TabsTrigger value="product">Product</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="executive-summary">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Executive Summary</h3>
              
              <div>
                <h4 className="text-lg font-medium">Business Overview</h4>
                <p className="text-neutral-700 mt-2">{project.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-base font-medium">Industry</h4>
                  <p className="text-neutral-700">{project.industry}</p>
                </div>
                
                <div>
                  <h4 className="text-base font-medium">Current Stage</h4>
                  <p className="text-neutral-700">{project.stage}</p>
                </div>
                
                <div>
                  <h4 className="text-base font-medium">Target Markets</h4>
                  <p className="text-neutral-700">{project.targetMarkets.map(market => 
                    market === 'b2b' ? 'Business to Business' : 
                    market === 'b2c' ? 'Business to Consumer' : 
                    market === 'b2g' ? 'Business to Government' : market
                  ).join(', ')}</p>
                </div>
                
                <div>
                  <h4 className="text-base font-medium">Team Size</h4>
                  <p className="text-neutral-700">{project.teamSize}</p>
                </div>
              </div>
              
              {productDetails && (
                <div className="mt-4">
                  <h4 className="text-lg font-medium">Value Proposition</h4>
                  <p className="text-neutral-700 mt-2">{productDetails.uniqueValue}</p>
                </div>
              )}
              
              {financialProjections && (
                <div className="mt-4">
                  <h4 className="text-lg font-medium">Financial Highlights</h4>
                  <p className="text-neutral-700 mt-2">
                    Initial investment required: {financialProjections.initialInvestment}<br />
                    Expected break-even point: {financialProjections.breakEvenPoint}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="market-analysis">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Market Analysis</h3>
              
              {marketAnalysis ? (
                <>
                  <div>
                    <h4 className="text-lg font-medium">Target Customers</h4>
                    <p className="text-neutral-700 mt-2">{marketAnalysis.targetCustomers}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-base font-medium">Market Size</h4>
                      <p className="text-neutral-700">{marketAnalysis.marketSize}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium">Growth Rate</h4>
                      <p className="text-neutral-700">{marketAnalysis.growthRate}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-medium">Competitive Advantage</h4>
                    <p className="text-neutral-700 mt-2">{marketAnalysis.competitiveAdvantage}</p>
                  </div>
                  
                  {marketAnalysis.competitors && marketAnalysis.competitors.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-medium mb-3">Competitor Analysis</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-medium text-neutral-500">Competitor</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-neutral-500">Strengths</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-neutral-500">Weaknesses</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200">
                            {marketAnalysis.competitors.map((competitor: any, index: number) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50' : ''}>
                                <td className="px-4 py-3 text-sm text-neutral-700">{competitor.name}</td>
                                <td className="px-4 py-3 text-sm text-neutral-700">{competitor.strengths}</td>
                                <td className="px-4 py-3 text-sm text-neutral-700">{competitor.weaknesses}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-neutral-500">Market analysis data not available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="product">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Product/Service Details</h3>
              
              {productDetails ? (
                <>
                  <div>
                    <h4 className="text-lg font-medium">Product Description</h4>
                    <p className="text-neutral-700 mt-2">{productDetails.productDescription}</p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-medium">Unique Value Proposition</h4>
                    <p className="text-neutral-700 mt-2">{productDetails.uniqueValue}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-base font-medium">Development Stage</h4>
                      <p className="text-neutral-700">{productDetails.developmentStage}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium">Intellectual Property</h4>
                      <p className="text-neutral-700">{productDetails.intellectualProperty}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-medium">Scalability</h4>
                    <p className="text-neutral-700 mt-2">{productDetails.scalability}</p>
                  </div>
                </>
              ) : (
                <p className="text-neutral-500">Product details not available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financials">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Financial Projections</h3>
              
              {financialProjections ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-base font-medium">Business Model</h4>
                      <p className="text-neutral-700">{financialProjections.businessModel}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium">Initial Investment</h4>
                      <p className="text-neutral-700">{financialProjections.initialInvestment}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium">Break-even Point</h4>
                      <p className="text-neutral-700">{financialProjections.breakEvenPoint}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium">Revenue Streams</h4>
                      <p className="text-neutral-700">
                        {financialProjections.revenueStreams.map((stream: string) => 
                          stream.charAt(0).toUpperCase() + stream.slice(1).replace(/_/g, ' ')
                        ).join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  {financialProjections.operatingCosts && (
                    <div className="mt-6">
                      <h4 className="text-lg font-medium mb-3">Operating Cost Allocation</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {Object.entries(financialProjections.operatingCosts).map(([category, percentage]) => (
                          <div key={category} className="bg-neutral-50 p-3 rounded-md text-center">
                            <div className="text-neutral-500 text-xs mb-1 capitalize">{category}</div>
                            <div className="font-medium">{percentage}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {financialProjections.projectedRevenue && (
                    <div className="mt-6">
                      <h4 className="text-lg font-medium mb-3">5-Year Revenue Projections</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200">
                          <thead>
                            <tr>
                              {getYearLabels().map((year, index) => (
                                <th key={index} className="px-4 py-2 text-center text-sm font-medium text-neutral-500">
                                  Year {index + 1} ({year})
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {financialProjections.projectedRevenue.map((amount: number, index: number) => (
                                <td key={index} className="px-4 py-3 text-center text-sm font-medium">
                                  ${new Intl.NumberFormat().format(amount)}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-neutral-500">Financial projections not available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategy">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Growth Strategy</h3>
              
              <div>
                <h4 className="text-lg font-medium">Go-to-Market Strategy</h4>
                <p className="text-neutral-700 mt-2">
                  Based on the analysis of your target market and competitive landscape, we recommend a phased approach to market entry:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-700">
                  <li>Initial focus on {project.targetMarkets.includes('b2b') ? 'early adopter businesses within your industry' : 'early adopter customer segments'}</li>
                  <li>Leverage {productDetails?.uniqueValue?.substring(0, 50)}... as your primary differentiation point</li>
                  <li>Start with a minimum viable product to validate key assumptions</li>
                  <li>Establish partnerships with complementary service providers</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="text-lg font-medium">Scaling Strategy</h4>
                <p className="text-neutral-700 mt-2">
                  After achieving initial traction, your business can scale through:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-700">
                  <li>Geographic expansion to new markets</li>
                  <li>Product line extension to serve additional customer needs</li>
                  <li>Strategic partnerships to accelerate growth</li>
                  <li>Targeted marketing campaigns to increase market share</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="text-lg font-medium">Key Milestones</h4>
                <div className="relative mt-4">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-200"></div>
                  
                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">1</div>
                    <h5 className="text-base font-medium">MVP Launch</h5>
                    <p className="text-sm text-neutral-600 mt-1">
                      Development and launch of minimum viable product to first customers
                    </p>
                  </div>
                  
                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">2</div>
                    <h5 className="text-base font-medium">Initial Customer Acquisition</h5>
                    <p className="text-sm text-neutral-600 mt-1">
                      Onboarding first 100 customers and gathering feedback
                    </p>
                  </div>
                  
                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">3</div>
                    <h5 className="text-base font-medium">Product Enhancement</h5>
                    <p className="text-sm text-neutral-600 mt-1">
                      Refining product based on customer feedback and market demand
                    </p>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">4</div>
                    <h5 className="text-base font-medium">Market Expansion</h5>
                    <p className="text-sm text-neutral-600 mt-1">
                      Expanding to additional market segments and geographies
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between items-center mt-8">
        <Link href={`/results/${projectId}`}>
          <Button variant="outline">Back to Results</Button>
        </Link>
        <Button onClick={handleGeneratePDF} disabled={isGenerating}>
          <Download className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </Button>
      </div>
    </div>
  );
};

export default BusinessPlan;

// Helper function to get year labels
const getYearLabels = (): string[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => `${currentYear + i}`);
};
