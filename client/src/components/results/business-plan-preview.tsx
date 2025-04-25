import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Check } from 'lucide-react';
import { generateBusinessPlan } from '@/lib/document-generator';

interface BusinessPlanPreviewProps {
  projectData: any;
}

const BusinessPlanPreview: React.FC<BusinessPlanPreviewProps> = ({ projectData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const businessPlanSections = [
    'Executive Summary',
    'Market Analysis',
    'Competitive Analysis',
    'Product/Service Details',
    'Marketing & Sales Strategy',
    'Financial Projections',
    'Funding Requirements',
    'Growth Strategy'
  ];

  const handleDownload = () => {
    setIsGenerating(true);

    try {
      // Generate business plan
      const pdfDataUri = generateBusinessPlan(projectData);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = pdfDataUri;
      link.download = `${projectData.project.name.replace(/\s+/g, '_')}_Business_Plan.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloaded(true);
    } catch (error) {
      console.error('Error generating business plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Comprehensive Business Plan
        </CardTitle>
        <CardDescription>
          A professional document outlining your business strategy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-4 aspect-h-3 mb-4">
          <img 
            className="object-cover rounded-lg" 
            src="https://images.unsplash.com/photo-1664575198308-3959904fa430?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="Business plan document" 
          />
        </div>
        <div>
          <p className="text-sm text-neutral-600">Your customized business plan includes:</p>
          <ul className="mt-2 space-y-1 text-sm text-neutral-600 list-disc list-inside">
            {businessPlanSections.map((section, index) => (
              <li key={index}>{section}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleDownload}
          disabled={isGenerating}
        >
          {isGenerating ? (
            'Generating...'
          ) : isDownloaded ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Plan Downloaded
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" /> Download Business Plan
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BusinessPlanPreview;
