import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import PrivacyPolicy from "./pages/website/PrivacyPolicy.tsx";
import NotFound from "./pages/NotFound.tsx";

import Landing from "./pages/Landing.tsx";
import ProsConsCalculator from "./pages/ProsConsCalculator.tsx";
import { GTMTracker } from "./components/GTMTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GTMTracker />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/waitlist" element={<Index />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/tools/pros-cons-calculator" element={<ProsConsCalculator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
