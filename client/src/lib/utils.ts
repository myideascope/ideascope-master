import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateScore(values: number[]): number {
  if (values.length === 0) return 0;
  
  const sum = values.reduce((acc, value) => acc + value, 0);
  return Math.round(sum / values.length);
}

export const industries = [
  'Software/Technology',
  'E-commerce',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Food & Beverage',
  'Media & Entertainment',
  'Transportation',
  'Real Estate',
  'Energy',
  'Agriculture',
  'Telecommunications',
  'Construction',
  'Consulting',
  'Other'
];

export const businessStages = [
  'Idea/Concept',
  'Prototype/MVP',
  'Pre-launch',
  'Launched',
  'Growth',
  'Expansion',
  'Mature'
];

export const teamSizes = [
  'Solo founder',
  '2-3 team members',
  '4-10 team members',
  '11+ team members'
];

export const marketSizes = [
  'Less than $10M',
  '$10M - $50M',
  '$50M - $100M',
  '$100M - $500M',
  '$500M - $1B',
  'Over $1B'
];

export const growthRates = [
  'Declining',
  'Flat (0-1%)',
  'Slow (1-5%)',
  'Moderate (5-10%)',
  'Fast (10-20%)',
  'Very Fast (20-50%)',
  'Explosive (50%+)'
];

export const businessModels = [
  'SaaS (Software as a Service)',
  'Subscription',
  'E-commerce',
  'Marketplace',
  'Freemium',
  'Advertising',
  'Transaction Fee',
  'Licensing',
  'Franchise',
  'Hardware',
  'Consulting/Professional Services',
  'Manufacturing',
  'Retail',
  'Other'
];

export function getYearLabels(years = 5): string[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: years }, (_, i) => `${currentYear + i}`);
}
