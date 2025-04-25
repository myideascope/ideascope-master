import React, { useState } from 'react';
import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useReactToPrint } from 'react-to-print';
import { generatePitchDeckHtml } from '@/lib/document-generator';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  AlertTriangle, 
  Download, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

const slides = [
  { title: "Cover", description: "Company name, tagline, and visual identity" },
  { title: "Problem", description: "The problem your target customers face" },
  { title: "Solution", description: "How your product/service solves this problem" },
  { title: "Market Opportunity", description: "Target market size and growth potential" },
  { title: "Product Demo", description: "Visual demonstration of your product/service" },
  { title: "Business Model", description: "How your company generates revenue" },
  { title: "Go-to-Market Strategy", description: "Plan to acquire and retain customers" },
  { title: "Competitive Analysis", description: "How you compare to alternatives" },
  { title: "Financial Highlights", description: "Projections and key metrics" },
  { title: "Team", description: "Key team members and their experience" },
  { title: "Investment Ask", description: "Funding needs and use of funds" },
  { title: "Contact", description: "How to reach your team" }
];

const PitchDeck: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const deckRef = React.useRef<HTMLDivElement>(null);
  
  // Fetch data for pitch deck
  const { data: pitchDeckData, isLoading } = useQuery({
    queryKey: [`/api/generate/pitch-deck/${projectId}`],
    enabled: !!projectId,
  });

  const handlePrint = useReactToPrint({
    content: () => deckRef.current,
    documentTitle: pitchDeckData?.project?.name 
      ? `${pitchDeckData.project.name}_Pitch_Deck` 
      : 'Pitch_Deck',
    onBeforeGetContent: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-[400px] w-full mb-6" />
        <div className="flex justify-between">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    );
  }

  if (!pitchDeckData || !pitchDeckData.project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="mb-4">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Pitch Deck Not Available</h1>
        <p className="text-neutral-600 mb-6">
          The pitch deck for this project could not be found or has not been completed yet.
        </p>
        <Link href="/evaluation">
          <Button>Return to Evaluation</Button>
        </Link>
      </div>
    );
  }

  const { project, marketAnalysis, productDetails, financialProjections } = pitchDeckData;
  
  // Create a reference to the pitch deck HTML for printing
  const pitchDeckHtml = generatePitchDeckHtml(pitchDeckData);

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 bg-black z-50' : 'max-w-4xl mx-auto px-4 py-8'}`}>
      {!isFullscreen && (
        <div className="flex justify-between items-center mb-6">
          <Link href={`/results/${projectId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
            </Button>
          </Link>
          
          <Button onClick={handlePrint} disabled={isPrinting}>
            <Download className="mr-2 h-4 w-4" />
            {isPrinting ? 'Preparing...' : 'Download PDF'}
          </Button>
        </div>
      )}

      {!isFullscreen && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Investor Pitch Deck</h1>
          <h2 className="text-2xl font-medium text-neutral-700">{project.name}</h2>
        </div>
      )}

      <Card className={`${isFullscreen ? 'h-full rounded-none shadow-none' : ''}`}>
        <CardContent className={`${isFullscreen ? 'h-full p-0' : 'p-6'}`}>
          <div 
            className={`
              relative aspect-video bg-neutral-100 rounded-lg border border-neutral-200 overflow-hidden
              ${isFullscreen ? 'h-full max-h-full aspect-auto' : ''}
            `}
          >
            {/* Current Slide */}
            <div className="h-full flex flex-col items-center justify-center p-10 text-center">
              {currentSlide === 0 ? (
                // Cover slide
                <>
                  <h2 className="text-4xl font-bold text-primary mb-4">{project.name}</h2>
                  <p className="text-xl font-medium text-neutral-600 mb-8">
                    {productDetails?.uniqueValue || "Transforming " + project.industry}
                  </p>
                  <p className="text-neutral-500 mt-auto">
                    Presented by {project.teamSize}
                  </p>
                </>
              ) : currentSlide === 1 ? (
                // Problem slide
                <>
                  <h2 className="text-3xl font-bold mb-6">The Problem</h2>
                  <div className="text-xl text-neutral-700">
                    {project.description.split('.')[0] + '.'}
                  </div>
                </>
              ) : currentSlide === 2 ? (
                // Solution slide
                <>
                  <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
                  <div className="text-xl text-neutral-700">
                    {productDetails?.productDescription || project.description}
                  </div>
                </>
              ) : currentSlide === 3 ? (
                // Market slide
                <>
                  <h2 className="text-3xl font-bold mb-6">Market Opportunity</h2>
                  <div className="max-w-lg text-left">
                    <p className="mb-4">
                      <span className="font-medium">Target Market:</span> {marketAnalysis?.targetCustomers || 'Key customer segments in ' + project.industry}
                    </p>
                    <p className="mb-4">
                      <span className="font-medium">Market Size:</span> {marketAnalysis?.marketSize || 'Growing market with significant potential'}
                    </p>
                    <p>
                      <span className="font-medium">Growth Rate:</span> {marketAnalysis?.growthRate || 'Steady growth projected'}
                    </p>
                  </div>
                </>
              ) : currentSlide === 5 ? (
                // Business Model slide
                <>
                  <h2 className="text-3xl font-bold mb-6">Business Model</h2>
                  <div className="max-w-lg text-left">
                    <p className="mb-4">
                      <span className="font-medium">Model:</span> {financialProjections?.businessModel || 'Innovative revenue approach'}
                    </p>
                    <p>
                      <span className="font-medium">Revenue Streams:</span> {financialProjections?.revenueStreams?.join(', ') || 'Multiple revenue channels'}
                    </p>
                  </div>
                </>
              ) : currentSlide === 7 ? (
                // Competitive Analysis slide
                <>
                  <h2 className="text-3xl font-bold mb-6">Competitive Advantage</h2>
                  <div className="max-w-lg">
                    <p className="text-xl">
                      {marketAnalysis?.competitiveAdvantage || 'Our unique approach provides significant advantages over competitors.'}
                    </p>
                  </div>
                </>
              ) : currentSlide === 8 ? (
                // Financial Projections slide
                <>
                  <h2 className="text-3xl font-bold mb-6">Financial Projections</h2>
                  <div className="w-full max-w-md">
                    <div className="flex justify-between mb-4">
                      {['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'].map((year, i) => (
                        <div key={i} className="text-center">
                          <div className="font-medium">{year}</div>
                          <div className="text-sm text-primary">
                            ${new Intl.NumberFormat().format(
                              financialProjections?.projectedRevenue?.[i] || (100000 * (i + 1))
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-between">
                      <div>
                        <p className="font-medium">Initial Investment:</p>
                        <p>{financialProjections?.initialInvestment || '$250,000 - $500,000'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Break-even:</p>
                        <p>{financialProjections?.breakEvenPoint || '18-24 months'}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : currentSlide === 9 ? (
                // Team slide
                <>
                  <h2 className="text-3xl font-bold mb-6">Our Team</h2>
                  <div className="text-xl">
                    <p className="mb-4">
                      <span className="font-medium">Team Size:</span> {project.teamSize}
                    </p>
                    <p>
                      Our talented team brings together expertise in {project.industry} and a passion for innovation.
                    </p>
                  </div>
                </>
              ) : currentSlide === 10 ? (
                // Investment Ask slide
                <>
                  <h2 className="text-3xl font-bold mb-6">Investment Opportunity</h2>
                  <div className="max-w-lg">
                    <p className="mb-4">
                      <span className="font-medium">Seeking:</span> {financialProjections?.initialInvestment || 'Investment to fuel growth'}
                    </p>
                    <p>
                      <span className="font-medium">Use of Funds:</span> Product development, market expansion, and operational growth
                    </p>
                  </div>
                </>
              ) : (
                // Contact slide
                <>
                  <h2 className="text-3xl font-bold mb-6">Thank You</h2>
                  <p className="text-xl mb-8">{project.name}</p>
                  <p className="text-neutral-600">
                    Contact us to learn more about this opportunity
                  </p>
                </>
              )}
            </div>
            
            {/* Slide Controls */}
            <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-center bg-black/5">
              <Button variant="ghost" size="sm" onClick={prevSlide}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <div className="text-sm">
                Slide {currentSlide + 1} of {slides.length} - {slides[currentSlide].title}
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
                  <Maximize2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={nextSlide}>
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
          
          {!isFullscreen && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Slide Content</h3>
              <div className="grid grid-cols-3 gap-4">
                {slides.map((slide, index) => (
                  <div 
                    key={index}
                    className={`
                      p-3 rounded border cursor-pointer
                      ${currentSlide === index 
                        ? 'border-primary bg-primary/5' 
                        : 'border-neutral-200 hover:border-primary/30'}
                    `}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <h4 className="font-medium">{slide.title}</h4>
                    <p className="text-xs text-neutral-500 mt-1">{slide.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {!isFullscreen && (
        <div className="flex justify-between items-center mt-8">
          <Link href={`/results/${projectId}`}>
            <Button variant="outline">Back to Results</Button>
          </Link>
          <Button onClick={handlePrint} disabled={isPrinting}>
            <Download className="mr-2 h-4 w-4" />
            {isPrinting ? 'Preparing...' : 'Download PDF'}
          </Button>
        </div>
      )}

      {/* Hidden div for printing the pitch deck */}
      <div className="hidden">
        <div ref={deckRef} dangerouslySetInnerHTML={{ __html: pitchDeckHtml }} />
      </div>
    </div>
  );
};

export default PitchDeck;
