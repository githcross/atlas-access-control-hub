
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import AppSidebar from "@/components/layout/Sidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UsersPage from "./pages/UsersPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full flex-col">
            <Header />
            <div className="flex-1 flex w-full">
              <AppSidebar />
              <main className="flex-1 overflow-auto">
                <SidebarTrigger className="fixed top-3 right-4 z-50 md:hidden" />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:id" element={<ServiceDetailPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
