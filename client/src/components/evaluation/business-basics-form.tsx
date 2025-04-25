import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { industries, businessStages, teamSizes } from '@/lib/utils';

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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, 'Business name is required'),
  description: z.string().min(10, 'Please provide a detailed description'),
  industry: z.string().min(1, 'Please select an industry'),
  stage: z.string().min(1, 'Please select a business stage'),
  targetMarkets: z.array(z.string()).min(1, 'Select at least one target market'),
  teamSize: z.string().min(1, 'Please select a team size'),
});

export type BusinessBasicsFormValues = z.infer<typeof formSchema>;

interface BusinessBasicsFormProps {
  onSuccess: (data: any) => void;
  defaultValues?: Partial<BusinessBasicsFormValues>;
}

const BusinessBasicsForm: React.FC<BusinessBasicsFormProps> = ({ 
  onSuccess, 
  defaultValues = {} 
}) => {
  const { toast } = useToast();
  
  const form = useForm<BusinessBasicsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      industry: '',
      stage: '',
      targetMarkets: [],
      teamSize: '',
      ...defaultValues
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: BusinessBasicsFormValues) => {
      const response = await apiRequest('POST', '/api/projects', {
        ...data,
        userId: 1 // Hardcoded for demo, would normally come from authentication
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Business basics saved",
        description: "Your business information has been saved successfully.",
      });
      onSuccess(data);
    },
    onError: (error) => {
      toast({
        title: "Failed to save",
        description: error.message || "There was a problem saving your information.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BusinessBasicsFormValues) => {
    mutation.mutate(data);
  };

  const marketOptions = [
    { id: 'b2c', label: 'B2C (Business to Consumer)' },
    { id: 'b2b', label: 'B2B (Business to Business)' },
    { id: 'b2g', label: 'B2G (Business to Government)' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Your business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Briefly describe your business idea" 
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
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
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
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Stage</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select current stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessStages.map((stage) => (
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
          name="targetMarkets"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Target Markets</FormLabel>
              </div>
              <div className="space-y-2">
                {marketOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name="targetMarkets"
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
          name="teamSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Size</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teamSizes.map((size) => (
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

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Saving...' : 'Continue to Market Analysis'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessBasicsForm;
