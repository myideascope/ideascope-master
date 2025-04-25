import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Images } from 'lucide-react';

const ResultsDemo: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">What You'll Get</h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl font-heading">
            Comprehensive Results
          </p>
          <p className="mt-4 max-w-2xl text-xl text-neutral-500 mx-auto">
            Our platform delivers actionable insights and professional deliverables.
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Viability Score */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Business Viability Score</h3>
              <div className="flex justify-center">
                <div className="relative h-36 w-36">
                  {/* Circular progress indicator */}
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="75, 100" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-neutral-800">75%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-neutral-500 text-center">Your business idea shows strong potential across key evaluation metrics.</p>
              </div>
              <div className="mt-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-700">Market Opportunity</span>
                    <span className="text-sm font-medium text-secondary-500">85%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-700">Competitive Edge</span>
                    <span className="text-sm font-medium text-secondary-500">70%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-700">Financial Potential</span>
                    <span className="text-sm font-medium text-secondary-500">65%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Plan */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Comprehensive Business Plan</h3>
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  className="object-cover rounded-lg" 
                  src="https://images.unsplash.com/photo-1664575198308-3959904fa430?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Business plan document" 
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-neutral-600">Your customized business plan includes:</p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-600 list-disc list-inside">
                  <li>Executive Summary</li>
                  <li>Market Analysis</li>
                  <li>Competitive Analysis</li>
                  <li>Product/Service Details</li>
                  <li>Marketing & Sales Strategy</li>
                  <li>Financial Projections</li>
                  <li>Funding Requirements</li>
                  <li>Growth Strategy</li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full" variant="default">
                  <Download className="mr-2 h-4 w-4" /> Download Sample
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pitch Deck */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Investor Pitch Deck</h3>
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  className="object-cover rounded-lg" 
                  src="https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" 
                  alt="Pitch deck presentation" 
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-neutral-600">Your investor-ready pitch deck includes:</p>
                <ul className="mt-2 space-y-1 text-sm text-neutral-600 list-disc list-inside">
                  <li>Problem & Solution</li>
                  <li>Market Opportunity</li>
                  <li>Product Demo</li>
                  <li>Business Model</li>
                  <li>Go-to-Market Strategy</li>
                  <li>Competitive Analysis</li>
                  <li>Financial Highlights</li>
                  <li>Team & Advisors</li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full" variant="default">
                  <Images className="mr-2 h-4 w-4" /> View Sample
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResultsDemo;
