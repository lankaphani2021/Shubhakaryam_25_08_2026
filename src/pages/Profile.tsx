import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, MapPin, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { toast } from "sonner";
import db from "@/lib/shared/kliv-database.js";

const Profile = () => {
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    place: "",
  });

  const handleGoBack = () => {
    // Try to go back in history, fallback to bookings if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/bookings");
    }
  };

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: (user as any).phone || "",
        place: (user as any).place || "",
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Update user metadata in database
      await db.update("users", { _row_id: `eq.${user.userUuid}` }, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        place: profile.place,
      });

      toast.success("Profile updated successfully!");
      refresh();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="text-muted-foreground">Please sign in to view your profile.</p>
          <Button className="mt-4" onClick={() => navigate("/signin")}>
            Sign In
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl text-foreground">Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your account details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-maroon text-white">
            <User className="h-10 w-10" />
          </div>
        </div>

        <div className="space-y-6">
          {/* Name Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Personal Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="mr-2 h-4 w-4 inline" />
                  Email
                </Label>
                <Input
                  id="email"
                  value={profile.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="mr-2 h-4 w-4 inline" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="place">
                  <MapPin className="mr-2 h-4 w-4 inline" />
                  City/Place
                </Label>
                <Input
                  id="place"
                  value={profile.place}
                  onChange={(e) => handleChange("place", e.target.value)}
                  placeholder="Hyderabad"
                />
              </div>
            </div>
          </div>

          {/* Privacy & Data Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Privacy & Data
            </h3>
            <div className="rounded-lg border border-border bg-secondary/20 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Your Data Rights</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    You have the right to request access, modification, or deletion of your personal data.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = 'mailto:lankaphani2021@gmail.com?subject=Data Deletion Request - Shubkaryam&body=Dear Shubkaryam Admin,%0A%0AI would like to request deletion of my personal data from your Shubkaryam platform.%0A%0AUser Details:%0A- Email: ' + encodeURIComponent(profile.email) + '%0A- Phone: ' + encodeURIComponent(profile.phone) + '%0A%0APlease delete all my personal information including:%0A- Booking history%0A- Account details%0A- Profile information%0A- Any other associated data%0A%0AThank you for processing this request.%0A%0ARegards'}
                  className="flex-1"
                >
                  Request Data Deletion
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://pooja-booking-platform-3653.kliv.site/privacy.html', '_blank')}
                  className="flex-1"
                >
                  View Privacy Policy
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/bookings")}
              className="flex-1"
            >
              My Bookings
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
