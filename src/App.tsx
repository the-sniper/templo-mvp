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
import ComingSoon from "./pages/devotee/ComingSoon";
import Dashboard from "./pages/devotee/Dashboard";
import FamilyDashboard from "./pages/devotee/FamilyDashboard";

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
import AdminDonations from "@/pages/admin/Donations";
import AdminBookings from "@/pages/admin/Bookings";
import AdminAnnouncements from "@/pages/admin/Announcements";
import AdminProfile from "@/pages/admin/Profile";
import AdminDevotees from "@/pages/admin/Devotees";
import AdminGallery from "@/pages/admin/Gallery";
import AdminInventory from "@/pages/admin/Inventory";
import AdminStaff from "@/pages/admin/Staff";
import AdminSettings from "@/pages/admin/Settings";
import AdminMetrics from "@/pages/admin/Metrics";

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
                        <Route path="/family-dashboard" element={<FamilyDashboard />} />
                        <Route path="/how-to" element={<HowTo />} />
                        
                        {/* Ancestral Temple Flow - MVP Primary */}
                        <Route path="/ancestral" element={<AncestralIntro />} />
                        <Route path="/ancestral/start" element={<AncestralForm />} />
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
                        
                        {/* MVP Donation Flow - Enabled */}
                        <Route path="/donate/:id" element={<DonatePage />} />
                        <Route path="/donation/receipt/:id" element={<DonationReceipt />} />
                        
                        {/* Phase II Features - Coming Soon */}
                        <Route path="/recurring-donate/:id" element={<ComingSoon />} />
                        <Route path="/recurring-donation/confirmation/:id" element={<ComingSoon />} />
                        <Route path="/book/:id" element={<ComingSoon />} />
                        <Route path="/booking/confirmation/:id" element={<ComingSoon />} />
                        <Route path="/pooja/:id" element={<ComingSoon />} />
                        <Route path="/pooja/confirmation/:id" element={<ComingSoon />} />

                        {/* ==================== */}
                        {/* ADMIN ROUTES */}
                        {/* ==================== */}
                        <Route path="/admin" element={<AdminIndex />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/register" element={<AdminRegister />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/donations" element={<AdminDonations />} />
                        <Route path="/admin/bookings" element={<AdminBookings />} />
                        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
                        <Route path="/admin/profile" element={<AdminProfile />} />
                        <Route path="/admin/devotees" element={<AdminDevotees />} />
                        <Route path="/admin/gallery" element={<AdminGallery />} />
                        <Route path="/admin/inventory" element={<AdminInventory />} />
                        <Route path="/admin/staff" element={<AdminStaff />} />
                        <Route path="/admin/settings" element={<AdminSettings />} />
                        <Route path="/admin/metrics" element={<AdminMetrics />} />
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
