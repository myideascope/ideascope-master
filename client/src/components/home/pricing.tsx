import React from 'react';
import { Link } from 'wouter';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl font-heading">
            Choose the Right Plan for You
          </p>
          <p className="mt-4 max-w-2xl text-xl text-neutral-500 mx-auto">
            From idea validation to investor-ready materials, we've got you covered
          </p>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="tiers" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="tiers">Service Tiers</TabsTrigger>
                <TabsTrigger value="alacarte">À La Carte</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="tiers">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Free Tier */}
                <Card className="border-2 border-neutral-200 transition-all duration-200 hover:shadow-md">
                  <CardHeader className="pb-4">
                    <div className="bg-emerald-100 text-emerald-700 font-medium rounded-full px-3 py-1 text-sm inline-block mb-2">
                      Free
                    </div>
                    <CardTitle className="text-2xl">The Spark</CardTitle>
                    <CardDescription className="text-neutral-500">
                      Perfect for testing your startup idea
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-neutral-500">/forever</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>AI-powered Idea Viability Checker (basic)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Market size estimate (public data)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Competitor snapshot (limited)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Monetization strategy suggestions</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Basic business plan outline</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Access to idea validation guides</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Access to founder community forum</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Downloadable "10 Steps" PDF guide</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/evaluation">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* Subscription Cards */}
                <Card className="border-2 border-primary/30 transition-all duration-200 hover:shadow-md">
                  <CardHeader className="pb-4">
                    <div className="bg-primary-100 text-primary font-medium rounded-full px-3 py-1 text-sm inline-block mb-2">
                      Popular
                    </div>
                    <CardTitle className="text-2xl">Growth</CardTitle>
                    <CardDescription className="text-neutral-500">
                      For founders serious about launching
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$99</span>
                      <span className="text-neutral-500">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Everything in Free tier</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>AI-Generated Pitch Deck</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Full Market Research Report</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Customer Persona Development</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Ongoing Market Trend Monitoring</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Monthly Deck Refreshes</span>
                      </li>
                      <li className="flex items-center">
                        <X className="h-5 w-5 text-neutral-300 mr-2" />
                        <span className="text-neutral-400">Personalized Support</span>
                      </li>
                      <li className="flex items-center">
                        <X className="h-5 w-5 text-neutral-300 mr-2" />
                        <span className="text-neutral-400">Weekly Social Media Posts</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/evaluation">
                      <Button className="w-full">Choose Growth</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                <Card className="border-2 border-neutral-200 transition-all duration-200 hover:shadow-md">
                  <CardHeader className="pb-4">
                    <div className="bg-blue-100 text-blue-700 font-medium rounded-full px-3 py-1 text-sm inline-block mb-2">
                      Premium
                    </div>
                    <CardTitle className="text-2xl">Pro Launch</CardTitle>
                    <CardDescription className="text-neutral-500">
                      For startups ready to accelerate
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$199</span>
                      <span className="text-neutral-500">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Everything in Growth tier</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Custom Website (Landing Page)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Investor Pitch Review & Rework</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Personalized Support</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Weekly Social Media Posts</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Monthly Website Updates</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Outreach Sequences for Investors</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>Priority Access to New Features</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/evaluation">
                      <Button className="w-full">Choose Pro Launch</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="alacarte">
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-neutral-900">À La Carte Services</h3>
                  <p className="mt-1 max-w-2xl text-sm text-neutral-500">Pay only for what you need</p>
                </div>
                <div className="border-t border-neutral-200">
                  <dl>
                    <div className="bg-neutral-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-neutral-600">Full Market Research Report</dt>
                      <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-1">$149</dd>
                      <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-1">
                        <Link href="/evaluation">
                          <Button variant="outline" size="sm">Purchase</Button>
                        </Link>
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-neutral-600">AI-Generated Slide Deck (Pitch-Ready)</dt>
                      <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-1">$99</dd>
                      <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-1">
                        <Link href="/evaluation">
                          <Button variant="outline" size="sm">Purchase</Button>
                        </Link>
                      </dd>
                    </div>
                    <div className="bg-neutral-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-neutral-600">Custom Website (Landing Page + Copy)</dt>
                      <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-1">$249</dd>
                      <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-1">
                        <Link href="/evaluation">
                          <Button variant="outline" size="sm">Purchase</Button>
                        </Link>
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-neutral-600">Customer Persona Development</dt>
                      <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-1">$79</dd>
                      <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-1">
                        <Link href="/evaluation">
                          <Button variant="outline" size="sm">Purchase</Button>
                        </Link>
                      </dd>
                    </div>
                    <div className="bg-neutral-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-neutral-600">Investor Pitch Review & Rework</dt>
                      <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-1">$129</dd>
                      <dd className="mt-1 text-sm text-neutral-900 sm:mt-0 sm:col-span-1">
                        <Link href="/evaluation">
                          <Button variant="outline" size="sm">Purchase</Button>
                        </Link>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-neutral-600 mb-4">
                  Need a complete solution? Check out our subscription plans for the best value.
                </p>
                <TabsTrigger value="tiers" className="inline-flex items-center justify-center rounded-md border border-primary bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-primary/10">
                  View Subscription Plans
                </TabsTrigger>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-12 bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-neutral-900">Starter Plan Also Available</h3>
            <p className="text-neutral-600">For those just beginning their startup journey</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg bg-neutral-50">
            <div>
              <h4 className="font-semibold text-lg">Starter Plan</h4>
              <p className="text-neutral-600 mb-2">Essential tools for early-stage founders</p>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Updates and monitoring</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Access to premium templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Basic market insights</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-center">
              <div className="text-center mb-2">
                <span className="text-2xl font-bold">$49</span>
                <span className="text-neutral-500">/month</span>
              </div>
              <Link href="/evaluation">
                <Button variant="outline">Choose Starter</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;