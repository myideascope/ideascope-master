import React from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

export type Step = {
  id: string;
  name: string;
  path: string;
};

interface EvaluationStepsProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
}

const EvaluationSteps: React.FC<EvaluationStepsProps> = ({ 
  steps, 
  currentStep, 
  completedSteps 
}) => {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = completedSteps.includes(step.id);
        
        return (
          <div key={step.id} className="flex flex-col items-center">
            <Link href={isCompleted ? step.path : '#'}>
              <div 
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-medium",
                  isActive && "border-primary bg-primary text-white",
                  isCompleted && !isActive && "border-secondary-500 bg-secondary-500 text-white",
                  !isActive && !isCompleted && "border-neutral-300 text-neutral-500"
                )}
              >
                {index + 1}
              </div>
            </Link>
            <div 
              className={cn(
                "text-xs mt-2",
                isActive && "text-neutral-700 font-medium",
                !isActive && "text-neutral-500"
              )}
            >
              {step.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EvaluationSteps;
