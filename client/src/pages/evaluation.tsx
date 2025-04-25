import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';

import BusinessBasicsForm from '@/components/evaluation/business-basics-form';
import MarketAnalysisForm from '@/components/evaluation/market-analysis-form';
import ProductDetailsForm from '@/components/evaluation/product-details-form';
import FinancialProjectionsForm from '@/components/evaluation/financial-projections-form';
import QuestionForm, { Question } from '@/components/evaluation/question-form';
import EvaluationSteps, { Step } from '@/components/evaluation/evaluation-steps';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const steps: Step[] = [
  { id: 'basics', name: 'Basics', path: '/evaluation/basics' },
  { id: 'market', name: 'Market', path: '/evaluation/market' },
  { id: 'product', name: 'Product', path: '/evaluation/product' },
  { id: 'financial', name: 'Finance', path: '/evaluation/financial' },
  { id: 'results', name: 'Results', path: '/evaluation/results' },
];

// Questions for results generation
const evaluationQuestions: Question[] = [
  {
    questionId: 'market_potential',
    question: 'Rate the market growth potential on a scale of 1-5',
    description: '1 = Very low, 5 = Very high'
  },
  {
    questionId: 'competition_intensity',
    question: 'Rate the intensity of competition on a scale of 1-5',
    description: '1 = Minimal competition, 5 = Extremely competitive'
  },
  {
    questionId: 'product_differentiation',
    question: 'Rate how differentiated your product/service is on a scale of 1-5',
    description: '1 = Not differentiated, 5 = Highly unique'
  },
  {
    questionId: 'scalability_potential',
    question: 'Rate your business model scalability on a scale of 1-5',
    description: '1 = Difficult to scale, 5 = Easily scalable'
  },
  {
    questionId: 'team_experience',
    question: 'Rate your team\'s relevant industry experience on a scale of 1-5',
    description: '1 = Limited experience, 5 = Extensive experience'
  }
];

const Evaluation: React.FC = () => {
  const params = useParams<{ step?: string }>();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  const currentStep = params.step || 'basics';
  const [projectId, setProjectId] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Check for saved progress in localStorage
  useEffect(() => {
    const savedProjectId = localStorage.getItem('currentProjectId');
    const savedCompletedSteps = localStorage.getItem('completedSteps');
    
    if (savedProjectId) {
      setProjectId(parseInt(savedProjectId, 10));
    }
    
    if (savedCompletedSteps) {
      setCompletedSteps(JSON.parse(savedCompletedSteps));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (projectId) {
      localStorage.setItem('currentProjectId', projectId.toString());
    }
    
    localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
  }, [projectId, completedSteps]);

  // Fetch project data if we have a project ID
  const { data: projectData, isLoading: isLoadingProject } = useQuery({
    queryKey: ['/api/projects', projectId],
    enabled: !!projectId,
  });

  // Mutations for evaluation results
  const evaluationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/evaluation-results', {
        ...data,
        projectId
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Evaluation complete",
        description: "Your business evaluation has been completed successfully.",
      });
      setCompletedSteps(prev => [...prev, 'results']);
      // Navigate to results page
      setLocation(`/results/${projectId}`);
    },
    onError: (error) => {
      toast({
        title: "Evaluation failed",
        description: error.message || "There was a problem completing your evaluation.",
        variant: "destructive",
      });
    },
  });

  // Handle form submissions
  const handleBasicsComplete = (data: any) => {
    setProjectId(data.id);
    setCompletedSteps(prev => [...prev, 'basics']);
    setLocation('/evaluation/market');
  };

  const handleMarketComplete = () => {
    setCompletedSteps(prev => [...prev, 'market']);
    setLocation('/evaluation/product');
  };

  const handleProductComplete = () => {
    setCompletedSteps(prev => [...prev, 'product']);
    setLocation('/evaluation/financial');
  };

  const handleFinancialComplete = () => {
    setCompletedSteps(prev => [...prev, 'financial']);
    setLocation('/evaluation/results');
  };

  // Final evaluation based on questionnaire
  const handleEvaluationComplete = (data: any) => {
    // Convert answers to scores (1-5 scale to 0-100 scale)
    const marketScore = Math.round(
      ((parseInt(data.answers.find((a: any) => a.questionId === 'market_potential').answer) * 20) +
      (100 - parseInt(data.answers.find((a: any) => a.questionId === 'competition_intensity').answer) * 20)) / 2
    );
    
    const productScore = Math.round(
      ((parseInt(data.answers.find((a: any) => a.questionId === 'product_differentiation').answer) * 20) +
      (parseInt(data.answers.find((a: any) => a.questionId === 'scalability_potential').answer) * 20)) / 2
    );
    
    const financialScore = Math.round(
      parseInt(data.answers.find((a: any) => a.questionId === 'team_experience').answer) * 20
    );
    
    const overallScore = Math.round((marketScore + productScore + financialScore) / 3);
    
    // Determine strengths and weaknesses
    const strengths = [];
    const weaknesses = [];

    if (marketScore >= 70) strengths.push('Strong market opportunity');
    else weaknesses.push('Market potential needs further validation');

    if (productScore >= 70) strengths.push('Compelling product differentiation');
    else weaknesses.push('Product uniqueness could be improved');

    if (financialScore >= 70) strengths.push('Experienced team with industry knowledge');
    else weaknesses.push('Team may need additional expertise or advisors');

    // Generate recommendations
    const recommendations = [];
    
    if (marketScore < 70) {
      recommendations.push('Conduct additional market research to validate demand and identify niche opportunities');
    }
    
    if (productScore < 70) {
      recommendations.push('Focus on enhancing your unique value proposition to differentiate from competitors');
    }
    
    if (financialScore < 70) {
      recommendations.push('Consider bringing on advisors or team members with more industry experience');
    }
    
    // Add general recommendations
    recommendations.push('Develop a detailed go-to-market strategy focusing on early adopters');
    recommendations.push('Start with a minimal viable product to test market assumptions before full launch');

    // Submit evaluation results
    evaluationMutation.mutate({
      projectId,
      marketScore,
      productScore,
      financialScore,
      overallScore,
      strengths,
      weaknesses,
      recommendations
    });
  };

  // Render appropriate form based on current step
  const renderCurrentStep = () => {
    if (isLoadingProject && currentStep !== 'basics') {
      return (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      );
    }

    switch (currentStep) {
      case 'basics':
        return (
          <>
            <CardHeader>
              <CardTitle>Step 1: Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <BusinessBasicsForm 
                onSuccess={handleBasicsComplete}
                defaultValues={projectData}
              />
            </CardContent>
          </>
        );
      case 'market':
        if (!projectId) {
          setLocation('/evaluation/basics');
          return null;
        }
        return (
          <>
            <CardHeader>
              <CardTitle>Step 2: Market Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketAnalysisForm 
                projectId={projectId} 
                onSuccess={handleMarketComplete}
              />
            </CardContent>
          </>
        );
      case 'product':
        if (!projectId) {
          setLocation('/evaluation/basics');
          return null;
        }
        return (
          <>
            <CardHeader>
              <CardTitle>Step 3: Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductDetailsForm 
                projectId={projectId} 
                onSuccess={handleProductComplete}
              />
            </CardContent>
          </>
        );
      case 'financial':
        if (!projectId) {
          setLocation('/evaluation/basics');
          return null;
        }
        return (
          <>
            <CardHeader>
              <CardTitle>Step 4: Financial Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <FinancialProjectionsForm 
                projectId={projectId} 
                onSuccess={handleFinancialComplete}
              />
            </CardContent>
          </>
        );
      case 'results':
        if (!projectId) {
          setLocation('/evaluation/basics');
          return null;
        }
        return (
          <>
            <CardHeader>
              <CardTitle>Step 5: Final Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 mb-6">
                Answer these final questions to help us evaluate your business viability.
              </p>
              <QuestionForm 
                questions={evaluationQuestions}
                onSubmit={handleEvaluationComplete}
                isLoading={evaluationMutation.isPending}
                submitButtonText="Complete Evaluation"
              />
            </CardContent>
          </>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Business Evaluation</h1>
      
      <EvaluationSteps 
        steps={steps} 
        currentStep={currentStep} 
        completedSteps={completedSteps}
      />
      
      <Card className="mt-8">
        {renderCurrentStep()}
      </Card>
    </div>
  );
};

export default Evaluation;
