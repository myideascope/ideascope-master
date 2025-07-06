import React from 'react';
import { TrendingUp, AlertTriangle, Target, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BusinessRecommendations {
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

interface AIRecommendationsProps {
  recommendations: BusinessRecommendations;
  isLoading?: boolean;
}

export default function AIRecommendations({ recommendations, isLoading }: AIRecommendationsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            AI Business Analysis
          </CardTitle>
          <CardDescription>
            Generating intelligent recommendations for your business...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse h-4 bg-neutral-200 rounded"></div>
            <div className="animate-pulse h-4 bg-neutral-200 rounded"></div>
            <div className="animate-pulse h-4 bg-neutral-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            AI Business Analysis
          </CardTitle>
          <CardDescription>
            Comprehensive evaluation powered by artificial intelligence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(recommendations.overallScore)}`}>
                {recommendations.overallScore}
              </div>
              <div className="text-sm text-neutral-600">Overall Score</div>
              <Progress value={recommendations.overallScore} className="mt-2" />
            </div>
            <div className="text-center">
              <div className={`text-2xl font-semibold ${getScoreColor(recommendations.marketScore)}`}>
                {recommendations.marketScore}
              </div>
              <div className="text-sm text-neutral-600">Market</div>
              <Progress value={recommendations.marketScore} className="mt-2" />
            </div>
            <div className="text-center">
              <div className={`text-2xl font-semibold ${getScoreColor(recommendations.productScore)}`}>
                {recommendations.productScore}
              </div>
              <div className="text-sm text-neutral-600">Product</div>
              <Progress value={recommendations.productScore} className="mt-2" />
            </div>
            <div className="text-center">
              <div className={`text-2xl font-semibold ${getScoreColor(recommendations.financialScore)}`}>
                {recommendations.financialScore}
              </div>
              <div className="text-sm text-neutral-600">Financial</div>
              <Progress value={recommendations.financialScore} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
          <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Strategic recommendations to improve your business plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
              
              {recommendations.nextSteps.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Immediate Next Steps
                  </h4>
                  <div className="space-y-2">
                    {recommendations.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strengths">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Key Strengths
              </CardTitle>
              <CardDescription>
                Areas where your business shows strong potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{strength}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weaknesses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircle className="h-5 w-5 mr-2 text-red-600" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>
                Challenges that need attention to strengthen your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 border border-red-200">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{weakness}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Market Opportunities
              </CardTitle>
              <CardDescription>
                Potential growth areas and market opportunities to explore
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.opportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{opportunity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                Risk Factors
              </CardTitle>
              <CardDescription>
                Potential risks and challenges to monitor and mitigate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{risk}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}