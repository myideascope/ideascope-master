import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { marketSizes, growthRates } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const competitorSchema = z.object({
  name: z.string().min(1, 'Competitor name is required'),
  strengths: z.string().min(1, 'Please list at least one strength'),
  weaknesses: z.string().min(1, 'Please list at least one weakness'),
});

const formSchema = z.object({
  targetCustomers: z.string().min(10, 'Please describe your target customers in detail'),
  marketSize: z.string().min(1, 'Please select a market size'),
  growthRate: z.string().min(1, 'Please select a growth rate'),
  competitors: z.array(competitorSchema).min(1, 'Add at least one competitor'),
  competitiveAdvantage: z.string().min(10, 'Please describe your competitive advantage'),
});

export type MarketAnalysisFormValues = z.infer<typeof formSchema>;

interface MarketAnalysisFormProps {
  projectId: number;
  onSuccess: (data: any) => void;
  defaultValues?: Partial<MarketAnalysisFormValues>;
}

const MarketAnalysisForm: React.FC<MarketAnalysisFormProps> = ({ 
  projectId,
  onSuccess, 
  defaultValues = {} 
}) => {
  const { toast } = useToast();
  
  const form = useForm<MarketAnalysisFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetCustomers: '',
      marketSize: '',
      growthRate: '',
      competitors: [{ name: '', strengths: '', weaknesses: '' }],
      competitiveAdvantage: '',
      ...defaultValues
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: MarketAnalysisFormValues) => {
      const response = await apiRequest('POST', '/api/market-analysis', {
        ...data,
        projectId
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Market analysis saved",
        description: "Your market analysis has been saved successfully.",
      });
      onSuccess(data);
    },
    onError: (error) => {
      toast({
        title: "Failed to save",
        description: error.message || "There was a problem saving your market analysis.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: MarketAnalysisFormValues) => {
    mutation.mutate(data);
  };

  const addCompetitor = () => {
    const currentCompetitors = form.getValues('competitors') || [];
    form.setValue('competitors', [
      ...currentCompetitors,
      { name: '', strengths: '', weaknesses: '' }
    ]);
  };

  const removeCompetitor = (index: number) => {
    const currentCompetitors = form.getValues('competitors');
    if (currentCompetitors.length > 1) {
      form.setValue(
        'competitors',
        currentCompetitors.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="targetCustomers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Customers</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your ideal customer segments" 
                  rows={3} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Market Size</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select market size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {marketSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="growthRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Market Growth Rate</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select growth rate" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {growthRates.map((rate) => (
                    <SelectItem key={rate} value={rate}>
                      {rate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className="text-base font-medium mb-2">Competitors</h3>
          {form.getValues('competitors').map((_, index) => (
            <div key={index} className="p-4 border border-neutral-200 rounded-md mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Competitor {index + 1}</h4>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCompetitor(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name={`competitors.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Competitor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`competitors.${index}.strengths`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Strengths</FormLabel>
                      <FormControl>
                        <Input placeholder="Key strengths" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`competitors.${index}.weaknesses`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weaknesses</FormLabel>
                      <FormControl>
                        <Input placeholder="Key weaknesses" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={addCompetitor}
            className="mb-4"
          >
            Add Competitor
          </Button>
        </div>

        <FormField
          control={form.control}
          name="competitiveAdvantage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Competitive Advantage</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what makes your business unique and gives you an edge over competitors" 
                  rows={3} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Saving...' : 'Continue to Product Details'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MarketAnalysisForm;
