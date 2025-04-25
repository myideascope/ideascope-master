import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Images, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { generatePitchDeckHtml } from '@/lib/document-generator';

interface PitchDeckPreviewProps {
  projectData: any;
}

const PitchDeckPreview: React.FC<PitchDeckPreviewProps> = ({ projectData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const printRef = useRef<HTMLDivElement>(null);

  const pitchDeckSections = [
    'Problem & Solution',
    'Market Opportunity',
    'Product Demo',
    'Business Model',
    'Go-to-Market Strategy',
    'Competitive Analysis',
    'Financial Highlights',
    'Team & Advisors'
  ];

  const slideCount = 10; // Total number of slides

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate generation (this would normally be an API call)
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      setShowPreview(true);
    }, 1500);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${projectData.project.name}_Pitch_Deck`,
    onAfterPrint: () => {
      setShowPreview(false);
    },
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  // Create the pitch deck content
  const deckHtml = generatePitchDeckHtml(projectData);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Images className="h-5 w-5" />
            Investor Pitch Deck
          </CardTitle>
          <CardDescription>
            A professionally designed presentation for investors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-w-4 aspect-h-3 mb-4">
            <img 
              className="object-cover rounded-lg" 
              src="https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" 
              alt="Pitch deck presentation" 
            />
          </div>
          <div>
            <p className="text-sm text-neutral-600">Your investor-ready pitch deck includes:</p>
            <ul className="mt-2 space-y-1 text-sm text-neutral-600 list-disc list-inside">
              {pitchDeckSections.map((section, index) => (
                <li key={index}>{section}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={isGenerated ? handlePrint : handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              'Generating...'
            ) : isGenerated ? (
              <>
                <Download className="mr-2 h-4 w-4" /> Download Pitch Deck
              </>
            ) : (
              <>
                <Images className="mr-2 h-4 w-4" /> Generate Pitch Deck
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Hidden div for printing the pitch deck */}
      <div className="hidden">
        <div ref={printRef} dangerouslySetInnerHTML={{ __html: deckHtml }} />
      </div>

      {/* Slide Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full relative">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-medium">Pitch Deck Preview</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                &times;
              </Button>
            </div>
            
            <div className="p-8">
              <div className="aspect-w-16 aspect-h-9 bg-neutral-100 rounded-lg flex items-center justify-center">
                <div className="text-center p-10">
                  <h2 className="text-2xl font-bold mb-4">
                    {currentSlide === 0 
                      ? projectData.project.name 
                      : pitchDeckSections[Math.min(currentSlide - 1, pitchDeckSections.length - 1)]}
                  </h2>
                  <p className="text-neutral-600">
                    {currentSlide === 0 
                      ? "Transforming the way " + projectData.project.industry + " works"
                      : "Slide content for " + pitchDeckSections[Math.min(currentSlide - 1, pitchDeckSections.length - 1)]}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" size="sm" onClick={prevSlide}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-neutral-500">
                  Slide {currentSlide + 1} of {slideCount}
                </span>
                <Button variant="outline" size="sm" onClick={nextSlide}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end">
              <Button onClick={handlePrint}>
                <Download className="mr-2 h-4 w-4" /> Download Deck
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PitchDeckPreview;
