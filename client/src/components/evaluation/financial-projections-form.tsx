import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { businessModels, getYearLabels } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  businessModel: z.string().min(1, 'Please select a business model'),
  revenueStreams: z.array(z.string()).min(1, 'Select at least one revenue stream'),
  initialInvestment: z.string().min(1, 'Please enter an initial investment amount'),
  operatingCosts: z.record(z.number()),
  breakEvenPoint: z.string().min(1, 'Please select a break-even point'),
  projectedRevenue: z.array(z.number()),
});

export type FinancialProjectionsFormValues = z.infer<typeof formSchema>;

interface FinancialProjectionsFormProps {
  projectId: number;
  onSuccess: (data: any) => void;
  defaultValues?: Partial<FinancialProjectionsFormValues>;
}

const FinancialProjectionsForm: React.FC<FinancialProjectionsFormProps> = ({ 
  projectId,
  onSuccess, 
  defaultValues = {} 
}) => {
  const { toast } = useToast();
  const yearLabels = getYearLabels();
  
  const [revenueYear1, setRevenueYear1] = useState(50000);
  const [growthRate, setGrowthRate] = useState(20);
  
  const initialProjectedRevenue = yearLabels.map((_, index) => {
    return Math.round(revenueYear1 * Math.pow(1 + (growthRate / 100), index));
  });
  
  const form = useForm<FinancialProjectionsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessModel: '',
      revenueStreams: [],
      initialInvestment: '',
      operatingCosts: {
        development: 30,
        marketing: 20,
        operations: 30,
        administration: 20,
      },
      breakEvenPoint: '',
      projectedRevenue: initialProjectedRevenue,
      ...defaultValues
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: FinancialProjectionsFormValues) => {
      const response = await apiRequest('POST', '/api/financial-projections', {
        ...data,
        projectId
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Financial projections saved",
        description: "Your financial data has been saved successfully.",
      });
      onSuccess(data);
    },
    onError: (error) => {
      toast({
        title: "Failed to save",
        description: error.message || "There was a problem saving your financial projections.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FinancialProjectionsFormValues) => {
    // Set projected revenue based on growth calculations
    data.projectedRevenue = yearLabels.map((_, index) => {
      return Math.round(revenueYear1 * Math.pow(1 + (growthRate / 100), index));
    });
    
    mutation.mutate(data);
  };

  // Update revenue projections when year 1 revenue or growth rate changes
  React.useEffect(() => {
    const projectedRevenue = yearLabels.map((_, index) => {
      return Math.round(revenueYear1 * Math.pow(1 + (growthRate / 100), index));
    });
    
    form.setValue('projectedRevenue', projectedRevenue);
  }, [revenueYear1, growthRate, form, yearLabels]);

  const revenueStreamOptions = [
    { id: 'product_sales', label: 'Product Sales' },
    { id: 'subscription', label: 'Subscription Fees' },
    { id: 'licensing', label: 'Licensing Fees' },
    { id: 'advertising', label: 'Advertising' },
    { id: 'transaction_fees', label: 'Transaction Fees' },
    { id: 'consulting', label: 'Consulting/Services' },
    { id: 'affiliate', label: 'Affiliate Revenue' },
  ];

  const breakEvenOptions = [
    '3 months', '6 months', '9 months', '1 year', '18 months', 
    '2 years', '3 years', '4 years', '5+ years',
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="businessModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Model</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a business model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
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
          name="revenueStreams"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Revenue Streams</FormLabel>
                <FormDescription>
                  Select all the ways your business will generate revenue
                </FormDescription>
              </div>
              <div className="space-y-2">
                {revenueStreamOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name="revenueStreams"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, option.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== option.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="initialInvestment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Investment Required</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment amount" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {['Less than $10,000', '$10,000 - $50,000', '$50,000 - $100,000', '$100,000 - $500,000', '$500,000 - $1M', '$1M - $5M', 'More than $5M'].map((amount) => (
                    <SelectItem key={amount} value={amount}>
                      {amount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Operating Cost Allocation</FormLabel>
          <FormDescription>
            Adjust how your budget will be allocated (total: 100%)
          </FormDescription>
          
          <Card>
            <CardContent className="pt-6">
              {['development', 'marketing', 'operations', 'administration'].map((category) => (
                <div key={category} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium capitalize">{category}</span>
                    <span className="text-sm">
                      {form.watch(`operatingCosts.${category}`) || 0}%
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name={`operatingCosts.${category}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Slider
                            value={[field.value || 0]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(value) => {
                              field.onChange(value[0]);
                              
                              // Adjust other categories to make total 100%
                              const currentTotal = Object.entries(form.getValues('operatingCosts') || {})
                                .reduce((sum, [key, value]) => key !== category ? sum + (value || 0) : sum, 0);
                              
                              const newTotal = currentTotal + value[0];
                              
                              if (newTotal > 100) {
                                const otherCategories = Object.keys(form.getValues('operatingCosts') || {})
                                  .filter(key => key !== category);
                                
                                const exceedBy = newTotal - 100;
                                const reduceEachBy = exceedBy / otherCategories.length;
                                
                                otherCategories.forEach(key => {
                                  const currentValue = form.getValues(`operatingCosts.${key}`) || 0;
                                  const newValue = Math.max(0, currentValue - reduceEachBy);
                                  form.setValue(`operatingCosts.${key}`, newValue);
                                });
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <FormLabel>Revenue Projections</FormLabel>
          <FormDescription>
            Adjust your projected revenue for Year 1 and annual growth rate
          </FormDescription>
          
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Year 1 Revenue</span>
                  <span className="text-sm">{formatCurrency(revenueYear1)}</span>
                </div>
                <Slider
                  value={[revenueYear1]}
                  min={0}
                  max={1000000}
                  step={10000}
                  onValueChange={(value) => setRevenueYear1(value[0])}
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Annual Growth Rate</span>
                  <span className="text-sm">{growthRate}%</span>
                </div>
                <Slider
                  value={[growthRate]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setGrowthRate(value[0])}
                />
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">5-Year Revenue Projection</h4>
                <div className="grid grid-cols-5 gap-2">
                  {yearLabels.map((year, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-xs text-muted-foreground">Year {index + 1}</div>
                      <div className="font-medium text-sm mt-1">
                        {formatCurrency(form.watch('projectedRevenue')[index] || 0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <FormField
          control={form.control}
          name="breakEvenPoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Break-even Point</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select break-even timeline" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {breakEvenOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Saving...' : 'Complete Evaluation'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FinancialProjectionsForm;
