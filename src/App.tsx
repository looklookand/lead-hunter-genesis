
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import AppLayout from "@/components/layout/AppLayout";

// Pages
import Dashboard from "@/pages/Dashboard";
import Search from "@/pages/Search";
import Import from "@/pages/Import";
import Results from "@/pages/Results";
import Settings from "@/pages/Settings";
import ApiMethod from "@/pages/methods/ApiMethod";
import AiMethod from "@/pages/methods/AiMethod";
import McpMethod from "@/pages/methods/McpMethod";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/search" element={<AppLayout><Search /></AppLayout>} />
          <Route path="/import" element={<AppLayout><Import /></AppLayout>} />
          <Route path="/results" element={<AppLayout><Results /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          
          {/* 方法配置页面 */}
          <Route path="/methods/api" element={<AppLayout><ApiMethod /></AppLayout>} />
          <Route path="/methods/ai" element={<AppLayout><AiMethod /></AppLayout>} />
          <Route path="/methods/mcp" element={<AppLayout><McpMethod /></AppLayout>} />
          
          {/* 404页面 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
