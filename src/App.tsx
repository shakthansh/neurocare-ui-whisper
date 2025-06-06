
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MBTITest from "./pages/MBTITest";
import MBTIResult from "./pages/MBTIResult";
import CompatibilityTest from "./pages/CompatibilityTest";
import CompatibilityResult from "./pages/CompatibilityResult";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mbti-test" element={<MBTITest />} />
          <Route path="/mbti-result" element={<MBTIResult />} />
          <Route path="/compatibility-test" element={<CompatibilityTest />} />
          <Route path="/compatibility-result" element={<CompatibilityResult />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
