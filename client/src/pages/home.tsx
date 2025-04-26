import React from 'react';
import Hero from '@/components/home/hero';
import Features from '@/components/home/features';
import ProcessSteps from '@/components/home/process-steps';
import Testimonials from '@/components/home/testimonials';
import ResultsDemo from '@/components/home/results-demo';
import Pricing from '@/components/home/pricing';
import CTA from '@/components/home/cta';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <ProcessSteps />
      <ResultsDemo />
      <Testimonials />
      <Pricing />
      <CTA />
    </div>
  );
};

export default Home;
