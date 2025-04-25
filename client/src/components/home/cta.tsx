import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const CTA: React.FC = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl font-heading">
            Ready to validate your startup idea?
          </h2>
          <p className="mt-4 text-xl text-primary-100">
            Get a comprehensive assessment, detailed business plan, and investor-ready pitch deck.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link href="/evaluation">
                <Button variant="secondary" size="lg">
                  Start Free Evaluation
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link href="#">
                <Button variant="outline" size="lg" className="bg-primary-600 hover:bg-primary-700 text-white border-primary-400 hover:border-primary-300">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
