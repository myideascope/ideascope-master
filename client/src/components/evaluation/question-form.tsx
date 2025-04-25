import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Schema for individual questions
const questionSchema = z.object({
  questionId: z.string(),
  question: z.string(),
  answer: z.union([z.string(), z.number()]).optional(),
  description: z.string().optional(),
});

// Schema for the question form
const formSchema = z.object({
  answers: z.array(z.object({
    questionId: z.string(),
    answer: z.union([z.string(), z.number()]),
  })),
});

export type Question = z.infer<typeof questionSchema>;
export type QuestionFormValues = z.infer<typeof formSchema>;

interface QuestionFormProps {
  questions: Question[];
  onSubmit: (data: QuestionFormValues) => void;
  isLoading?: boolean;
  submitButtonText?: string;
  defaultValues?: Partial<QuestionFormValues>;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ 
  questions, 
  onSubmit, 
  isLoading = false,
  submitButtonText = 'Submit',
  defaultValues = {}
}) => {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answers: questions.map(question => ({
        questionId: question.questionId,
        answer: '',
      })),
      ...defaultValues
    }
  });

  const handleSubmit = (data: QuestionFormValues) => {
    onSubmit(data);
  };

  // Function to render different types of questions
  const renderQuestion = (question: Question, index: number) => {
    const questionId = `answers.${index}.answer`;
    
    // Multiple choice question (1-5 scale)
    if (question.question.includes("scale") || question.question.includes("rate")) {
      return (
        <FormField
          key={question.questionId}
          control={form.control}
          name={questionId}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{question.question}</FormLabel>
              {question.description && (
                <FormDescription>{question.description}</FormDescription>
              )}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                  className="flex space-x-1"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex flex-col items-center">
                      <RadioGroupItem value={value.toString()} id={`${question.questionId}-${value}`} />
                      <Label htmlFor={`${question.questionId}-${value}`} className="text-xs mt-1">
                        {value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    
    // Open-ended question
    return (
      <FormField
        key={question.questionId}
        control={form.control}
        name={questionId}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{question.question}</FormLabel>
            {question.description && (
              <FormDescription>{question.description}</FormDescription>
            )}
            <FormControl>
              <Textarea
                placeholder="Your answer"
                {...field}
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {questions.map((question, index) => renderQuestion(question, index))}
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
