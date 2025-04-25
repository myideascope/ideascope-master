import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import Home from "@/pages/home";
import Evaluation from "@/pages/evaluation";
import Results from "@/pages/results";
import BusinessPlan from "@/pages/business-plan";
import PitchDeck from "@/pages/pitch-deck";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/evaluation" component={Evaluation} />
      <Route path="/evaluation/:step" component={Evaluation} />
      <Route path="/results/:projectId" component={Results} />
      <Route path="/business-plan/:projectId" component={BusinessPlan} />
      <Route path="/pitch-deck/:projectId" component={PitchDeck} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
