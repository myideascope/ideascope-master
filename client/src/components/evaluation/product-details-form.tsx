import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

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

const formSchema = z.object({
  productDescription: z.string().min(10, 'Please provide a detailed product description'),
  uniqueValue: z.string().min(10, 'Please describe your unique value proposition'),
  developmentStage: z.string().min(1, 'Please select a development stage'),
  intellectualProperty: z.string().min(1, 'Please provide intellectual property information'),
  scalability: z.string().min(10, 'Please describe how your product can scale'),
});

export type ProductDetailsFormValues = z.infer<typeof formSchema>;

interface ProductDetailsFormProps {
  projectId: number;
  onSuccess: (data: any) => void;
  defaultValues?: Partial<ProductDetailsFormValues>;
}

const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({ 
  projectId,
  onSuccess, 
  defaultValues = {} 
}) => {
  const { toast } = useToast();
  
  const form = useForm<ProductDetailsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productDescription: '',
      uniqueValue: '',
      developmentStage: '',
      intellectualProperty: '',
      scalability: '',
      ...defaultValues
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ProductDetailsFormValues) => {
      const response = await apiRequest('POST', '/api/product-details', {
        ...data,
        projectId
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Product details saved",
        description: "Your product information has been saved successfully.",
      });
      onSuccess(data);
    },
    onError: (error) => {
      toast({
        title: "Failed to save",
        description: error.message || "There was a problem saving your product details.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProductDetailsFormValues) => {
    mutation.mutate(data);
  };

  const developmentStages = [
    'Concept/Idea',
    'Prototype',
    'Minimum Viable Product (MVP)',
    'Beta',
    'Production Ready',
    'Launched/Released',
    'Growth/Scaling'
  ];

  const intellectualPropertyOptions = [
    'No IP protection yet',
    'Patent pending',
    'Patent granted',
    'Trademark registered',
    'Copyright protected',
    'Trade secret',
    'Licensing agreement'
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product/Service Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your product or service in detail" 
                  rows={4} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="uniqueValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unique Value Proposition</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What makes your product/service unique and valuable to customers?" 
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
          name="developmentStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Development Stage</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select development stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {developmentStages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
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
          name="intellectualProperty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intellectual Property</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select IP status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {intellectualPropertyOptions.map((option) => (
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

        <FormField
          control={form.control}
          name="scalability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scalability</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="How can your product/service scale to reach more customers or markets?" 
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
            {mutation.isPending ? 'Saving...' : 'Continue to Financial Projections'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductDetailsForm;
