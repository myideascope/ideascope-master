import React from 'react';

const ProcessSteps: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Evaluate Your Idea',
      description: 'Answer our strategic questionnaire to assess market fit, competition, and growth potential.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      altText: 'Team brainstorming startup ideas'
    },
    {
      number: 2,
      title: 'Analyze Financials',
      description: 'Generate detailed financial projections including revenue forecasts, costs, and break-even analysis.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      altText: 'Financial chart analysis'
    },
    {
      number: 3,
      title: 'Create Business Plan',
      description: 'Generate a comprehensive business plan with executive summary, market analysis, and operational strategy.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      altText: 'Business plan documents'
    },
    {
      number: 4,
      title: 'Build Pitch Deck',
      description: 'Design a professional investor presentation with compelling slides that highlight your startup\'s potential.',
      image: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      altText: 'Pitch deck presentation'
    }
  ];

  return (
    <section id="process" className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Our Process</h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl font-heading">
            Four steps to launch success
          </p>
          <p className="mt-4 max-w-2xl text-xl text-neutral-500 mx-auto">
            A streamlined approach to transform your idea into a fundable business.
          </p>
        </div>

        <div className="mt-12">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="mt-10 lg:mt-0">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-xl font-bold">
                    {step.number}
                  </div>
                  <div className="pl-16">
                    <h3 className="text-lg leading-6 font-medium text-neutral-900">{step.title}</h3>
                    <p className="mt-2 text-base text-neutral-600">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 rounded-lg overflow-hidden shadow-sm">
                  <img 
                    className="w-full h-48 object-cover" 
                    src={step.image} 
                    alt={step.altText} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
