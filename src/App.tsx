import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Astrology from "./pages/Astrology";
import Danalu from "./pages/Danalu";
import PindDaan from "./pages/PindDaan";
import Profile from "./pages/Profile";
import Invite from "./pages/Invite";
import ServiceDetail from "./pages/ServiceDetail";
import Priests from "./pages/Priests";
import BookService from "./pages/BookService";
import BookDanalu from "./pages/BookDanalu";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-center" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/astrology" element={<Astrology />} />
            <Route path="/danalu" element={<Danalu />} />
            <Route path="/pind-daan" element={<PindDaan />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/danalu/:slug" element={<BookDanalu />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/priests" element={<Priests />} />
            <Route path="/book/:slug" element={<BookService />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <PWAInstallPrompt />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
