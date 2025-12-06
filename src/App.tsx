import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TempleProvider } from "@/context/TempleContext";
import { AncestralProvider } from "@/context/AncestralContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import TempleDetails from "./pages/TempleDetails";
import NotFound from "./pages/NotFound";

// Ancestral Temple Flow
import AncestralIntro from "./pages/ancestral/AncestralIntro";
import AncestralForm from "./pages/ancestral/AncestralForm";
import AncestralSearching from "./pages/ancestral/AncestralSearching";
import AncestralResults from "./pages/ancestral/AncestralResults";
import AddAncestralTemple from "./pages/ancestral/AddAncestralTemple";
import AncestralConfirmation from "./pages/ancestral/AncestralConfirmation";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TempleProvider>
          <AncestralProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/temple/:id" element={<TempleDetails />} />
                
                {/* Ancestral Temple Flow */}
                <Route path="/ancestral" element={<AncestralIntro />} />
                <Route path="/ancestral/form" element={<AncestralForm />} />
                <Route path="/ancestral/searching" element={<AncestralSearching />} />
                <Route path="/ancestral/results" element={<AncestralResults />} />
                <Route path="/ancestral/add-temple" element={<AddAncestralTemple />} />
                <Route path="/ancestral/confirmation" element={<AncestralConfirmation />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AncestralProvider>
        </TempleProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
