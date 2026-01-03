import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TempleProvider } from "@/context/TempleContext";
import { AncestralProvider } from "@/context/AncestralContext";
import { AuthProvider } from "@/context/AuthContext";
import { DonationProvider } from "@/context/DonationContext";
import { BookingProvider } from "@/context/BookingContext";
import { PoojaProvider } from "@/context/PoojaContext";
import { RecurringDonationProvider } from "@/context/RecurringDonationContext";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";

// Devotee Pages
import Index from "./pages/devotee/Index";
import Temples from "./pages/devotee/Temples";
import TempleDetails from "./pages/devotee/TempleDetails";
import HowTo from "./pages/devotee/HowTo";
import NotFound from "./pages/devotee/NotFound";
import Dashboard from "./pages/devotee/Dashboard";

// Devotee - Ancestral Temple Flow
import AncestralIntro from "./pages/devotee/ancestral/AncestralIntro";
import AncestralForm from "./pages/devotee/ancestral/AncestralForm";
import AncestralSearching from "./pages/devotee/ancestral/AncestralSearching";
import AncestralResults from "./pages/devotee/ancestral/AncestralResults";
import AddAncestralTemple from "./pages/devotee/ancestral/AddAncestralTemple";
import AncestralConfirmation from "./pages/devotee/ancestral/AncestralConfirmation";

// Devotee - Auth Pages
import Login from "./pages/devotee/auth/Login";
import Register from "./pages/devotee/auth/Register";
import ForgotPassword from "./pages/devotee/auth/ForgotPassword";

// Devotee - Donation Flow
import DonatePage from "./pages/devotee/donation/DonatePage";
import DonationReceipt from "./pages/devotee/donation/DonationReceipt";
import RecurringDonatePage from "./pages/devotee/donation/RecurringDonatePage";
import RecurringDonationConfirmation from "./pages/devotee/donation/RecurringDonationConfirmation";

// Devotee - Booking Flow
import BookSlotPage from "./pages/devotee/booking/BookSlotPage";
import BookingConfirmation from "./pages/devotee/booking/BookingConfirmation";

// Devotee - Pooja Flow
import RequestPoojaPage from "./pages/devotee/pooja/RequestPoojaPage";
import PoojaConfirmation from "./pages/devotee/pooja/PoojaConfirmation";

// Admin Pages
import AdminIndex from "@/pages/admin/Index";
import AdminLogin from "@/pages/admin/auth/Login";
import AdminRegister from "@/pages/admin/auth/Register";
import AdminDashboard from "@/pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <TempleProvider>
            <AncestralProvider>
              <DonationProvider>
                <RecurringDonationProvider>
                  <BookingProvider>
                    <PoojaProvider>
                      <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <ScrollToTop />
                      <Routes>
                        {/* ==================== */}
                        {/* DEVOTEE ROUTES */}
                        {/* ==================== */}
                        
                        {/* Main Pages */}
                        <Route path="/" element={<Index />} />
                        <Route path="/temples" element={<Temples />} />
                        <Route path="/temple/:id" element={<TempleDetails />} />
                        <Route path="/following" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/how-to" element={<HowTo />} />
                        
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
                        <Route path="/my-account" element={<Dashboard />} />
                        
                        {/* Donation Flow */}
                        <Route path="/donate/:id" element={<DonatePage />} />
                        <Route path="/donation/receipt/:id" element={<DonationReceipt />} />
                        <Route path="/recurring-donate/:id" element={<RecurringDonatePage />} />
                        <Route path="/recurring-donation/confirmation/:id" element={<RecurringDonationConfirmation />} />
                        
                        {/* Booking Flow */}
                        <Route path="/book/:id" element={<BookSlotPage />} />
                        <Route path="/booking/confirmation/:id" element={<BookingConfirmation />} />
                        
                        {/* Pooja Flow */}
                        <Route path="/pooja/:id" element={<RequestPoojaPage />} />
                        <Route path="/pooja/confirmation/:id" element={<PoojaConfirmation />} />

                        {/* ==================== */}
                        {/* ADMIN ROUTES */}
                        {/* ==================== */}
                        <Route path="/admin" element={<AdminIndex />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/register" element={<AdminRegister />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        
                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                    </PoojaProvider>
                  </BookingProvider>
                </RecurringDonationProvider>
              </DonationProvider>
            </AncestralProvider>
          </TempleProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
