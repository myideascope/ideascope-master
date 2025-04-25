import React from 'react';
import { FileTextIcon, LineChartIcon, Images, ClipboardCheckIcon } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <ClipboardCheckIcon className="h-5 w-5" />,
      title: 'Project Evaluation',
      description: 'Answer key questions about your business idea to determine its viability and potential for success.'
    },
    {
      icon: <LineChartIcon className="h-5 w-5" />,
      title: 'Financial Projections',
      description: 'Generate realistic financial forecasts with interactive charts based on industry standards.'
    },
    {
      icon: <FileTextIcon className="h-5 w-5" />,
      title: 'Business Plan Generator',
      description: 'Create a comprehensive, downloadable business plan that covers all critical aspects of your startup.'
    },
    {
      icon: <Images className="h-5 w-5" />,
      title: 'Pitch Deck Creator',
      description: 'Design professional investor presentation slides that highlight your startup\'s potential.'
    }
  ];

  return (
    <section id="features" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl font-heading">
            Everything you need to launch
          </p>
          <p className="mt-4 max-w-2xl text-xl text-neutral-500 lg:mx-auto">
            Our comprehensive toolkit helps validate your idea, build your business plan, and create investor-ready materials.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    {feature.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-neutral-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
