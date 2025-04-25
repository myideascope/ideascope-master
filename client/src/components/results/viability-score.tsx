import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ViabilityScoreProps {
  overallScore: number;
  marketScore: number;
  productScore: number;
  financialScore: number;
}

const ViabilityScore: React.FC<ViabilityScoreProps> = ({
  overallScore,
  marketScore,
  productScore,
  financialScore
}) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreText = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const getProgressColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Business Viability Score</h3>
        <div className="flex justify-center">
          <div className="relative h-36 w-36">
            {/* Circular progress indicator */}
            <svg className="h-full w-full" viewBox="0 0 36 36">
              <path 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" 
                stroke="#e6e6e6" 
                strokeWidth="3" 
              />
              <path 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" 
                stroke={overallScore >= 80 ? "#10b981" : overallScore >= 60 ? "#f59e0b" : "#ef4444"} 
                strokeWidth="3" 
                strokeDasharray={`${overallScore}, 100`} 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-neutral-800">{overallScore}%</span>
              <span className={`text-sm font-medium ${getScoreColor(overallScore)}`}>
                {getScoreText(overallScore)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-neutral-500 text-center mb-6">
            {overallScore >= 70 
              ? "Your business idea shows strong potential across key evaluation metrics."
              : overallScore >= 50
              ? "Your business idea has promising aspects but some areas need improvement."
              : "Your business idea needs significant development in multiple areas."
            }
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-700">Market Opportunity</span>
                <span className={`text-sm font-medium ${getScoreColor(marketScore)}`}>{marketScore}%</span>
              </div>
              <Progress value={marketScore} className="h-2" indicatorClassName={getProgressColor(marketScore)} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-700">Product Viability</span>
                <span className={`text-sm font-medium ${getScoreColor(productScore)}`}>{productScore}%</span>
              </div>
              <Progress value={productScore} className="h-2" indicatorClassName={getProgressColor(productScore)} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-700">Financial Potential</span>
                <span className={`text-sm font-medium ${getScoreColor(financialScore)}`}>{financialScore}%</span>
              </div>
              <Progress value={financialScore} className="h-2" indicatorClassName={getProgressColor(financialScore)} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViabilityScore;
