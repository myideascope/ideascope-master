import React from 'react';
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';

import ViabilityScore from '@/components/results/viability-score';
import FinancialCharts from '@/components/results/financial-charts';
import BusinessPlanPreview from '@/components/results/business-plan-preview';
import PitchDeckPreview from '@/components/results/pitch-deck-preview';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const Results: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const parsedProjectId = parseInt(projectId);

  // Fetch project data
  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: [`/api/projects/${projectId}`],
    enabled: !!projectId && !isNaN(parsedProjectId),
  });

  // Fetch evaluation results
  const { data: evaluationResults, isLoading: isLoadingResults } = useQuery({
    queryKey: [`/api/evaluation-results/project/${projectId}`],
    enabled: !!projectId && !isNaN(parsedProjectId),
  });

  // Fetch financial projections
  const { data: financialData, isLoading: isLoadingFinancials } = useQuery({
    queryKey: [`/api/financial-projections/project/${projectId}`],
    enabled: !!projectId && !isNaN(parsedProjectId),
  });

  // Fetch data for business plan
  const { data: businessPlanData, isLoading: isLoadingBusinessPlan } = useQuery({
    queryKey: [`/api/generate/business-plan/${projectId}`],
    enabled: !!projectId && !isNaN(parsedProjectId),
  });

  // Fetch data for pitch deck
  const { data: pitchDeckData, isLoading: isLoadingPitchDeck } = useQuery({
    queryKey: [`/api/generate/pitch-deck/${projectId}`],
    enabled: !!projectId && !isNaN(parsedProjectId),
  });

  const isLoading = isLoadingProject || isLoadingResults || isLoadingFinancials ||
                   isLoadingBusinessPlan || isLoadingPitchDeck;
                   
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if (!project || !evaluationResults) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="mb-4">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Results Not Available</h1>
        <p className="text-neutral-600 mb-6">
          The evaluation results for this project could not be found or have not been completed yet.
        </p>
        <Link href="/evaluation">
          <Button>Return to Evaluation</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{project.name} Evaluation Results</h1>
        <p className="text-neutral-600">
          Here's our assessment of your business idea and the materials to help you move forward.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ViabilityScore
          overallScore={evaluationResults.overallScore}
          marketScore={evaluationResults.marketScore}
          productScore={evaluationResults.productScore}
          financialScore={evaluationResults.financialScore}
        />

        {financialData && (
          <FinancialCharts
            projectedRevenue={financialData.projectedRevenue}
            operatingCosts={financialData.operatingCosts}
          />
        )}
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Analysis & Recommendations</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Strengths
            </h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              {evaluationResults.strengths.map((strength: string, index: number) => (
                <li key={`strength-${index}`}>{strength}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              Areas for Improvement
            </h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              {evaluationResults.weaknesses.map((weakness: string, index: number) => (
                <li key={`weakness-${index}`}>{weakness}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Recommendations</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              {evaluationResults.recommendations.map((recommendation: string, index: number) => (
                <li key={`recommendation-${index}`}>{recommendation}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Business Materials</h2>
      <Tabs defaultValue="documents" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessPlanData && (
              <BusinessPlanPreview projectData={businessPlanData} />
            )}
            
            {pitchDeckData && (
              <PitchDeckPreview projectData={pitchDeckData} />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="next-steps">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Next Steps for Your Startup</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium mb-2">1. Refine Your Business Plan</h4>
                  <p className="text-neutral-600">
                    Use the generated business plan as a foundation. Refine it with additional research and get feedback from industry experts or potential customers.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">2. Build Your MVP</h4>
                  <p className="text-neutral-600">
                    Develop a Minimum Viable Product to validate your core assumptions about your product and market fit.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">3. Secure Initial Funding</h4>
                  <p className="text-neutral-600">
                    Use your pitch deck to approach angel investors, venture capitalists, or explore crowdfunding options.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">4. Assemble Your Team</h4>
                  <p className="text-neutral-600">
                    Fill gaps in your team with talents that complement your skills, focusing on areas identified in the evaluation.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">5. Launch and Iterate</h4>
                  <p className="text-neutral-600">
                    Get your product to market, gather customer feedback, and continue to refine your offering based on real-world use.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="text-center">
        <Link href="/">
          <Button variant="outline" className="mr-4">Back to Home</Button>
        </Link>
        <Link href={`/evaluation/basics`}>
          <Button>Start a New Evaluation</Button>
        </Link>
      </div>
    </div>
  );
};

export default Results;
