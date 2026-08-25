import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Copy, Check, Gift, Users, Share2, Loader2 } from "lucide-react";
import db from "@/lib/shared/kliv-database.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import functions from "@/lib/shared/kliv-functions.js";

const InviteFriends = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [inviting, setInviting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  // Generate or get existing referral code
  useEffect(() => {
    const generateReferralCode = () => {
      const existing = localStorage.getItem(`referral_code_${user?.email}`);
      if (existing) {
        setReferralCode(existing);
        return;
      }
      
      // Generate a simple referral code based on user email and random string
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      const code = `REF-${random}`;
      localStorage.setItem(`referral_code_${user?.email}`, code);
      setReferralCode(code);
    };

    if (user?.email) {
      generateReferralCode();
    }
  }, [user]);

  const { data: referrals = [] } = useQuery({
    queryKey: ["my_referrals"],
    queryFn: () => db.query("referrals", { referrer_email: `eq.${user?.email}`, order: "_created_at.desc" }),
    enabled: !!user?.email,
  });

  const inviteLink = `https://pooja-booking-platform-3653.kliv.site/?ref=${referralCode}`;
  const shareMessage = `🪀 Book verified Vedic priests for any ceremony! Use my referral code ${referralCode} for ₹100 off on Shubkaryam: ${inviteLink}`;

  const handleInvite = async () => {
    if (!email || !name) {
      toast.error("Please enter your friend's email and name");
      return;
    }

    if (!user?.email) {
      toast.error("You must be logged in to send invitations");
      return;
    }

    setInviting(true);
    try {
      // Call the invite edge function
      await functions.invoke("invite_friend", {
        inviter_email: user.email,
        inviter_name: `${user.firstName} ${user.lastName}`.trim(),
        friend_email: email,
        friend_name: name,
        referral_code: referralCode,
        custom_message: message,
      });

      // Store referral in database
      await db.insert("referrals", {
        referral_code: referralCode,
        referrer_email: user.email,
        referee_email: email,
        referee_name: name,
        status: "sent",
      });

      toast.success(`Invitation sent to ${name}!`);
      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send invitation. Please try again.");
      console.error("Invite error:", error);
    } finally {
      setInviting(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy. Please try again.");
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shubkaryam - Book Vedic Priests Online",
          text: shareMessage,
          url: inviteLink,
        });
      } catch (error) {
        toast.error("Failed to share. Please try again.");
      }
    } else {
      // Fallback to clipboard
      copyToClipboard();
    }
  };

  const pendingCount = referrals.filter((r: any) => r.status === "sent" && !r.signed_up).length;
  const completedCount = referrals.filter((r: any) => r.signed_up).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Users className="mx-auto h-8 w-8 text-saffron" />
          <p className="mt-2 text-2xl font-display font-bold text-foreground">{referrals.length}</p>
          <p className="text-xs text-muted-foreground">Total Invites</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <span className="text-xs font-medium">PD</span>
          </div>
          <p className="mt-2 text-2xl font-display font-bold text-foreground">{pendingCount}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Check className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-display font-bold text-foreground">{completedCount}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>

      {/* Referral Code Card */}
      <div className="rounded-xl border-2 border-dashed border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary">
            <Gift className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold text-foreground">Your Referral Code</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Share this code with friends and they get ₹100 off their first booking!
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 rounded-lg border border-border bg-background px-4 py-2">
                <code className="text-lg font-mono text-foreground">{referralCode}</code>
              </div>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="flex-shrink-0"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Form */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <Mail className="h-5 w-5 text-saffron" />
          Send Email Invitation
        </h3>
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="friend-email">Friend's Email</Label>
            <Input
              id="friend-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="friend@example.com"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="friend-name">Friend's Name</Label>
            <Input
              id="friend-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter their name"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal note..."
              rows={3}
              className="mt-1.5"
            />
          </div>
          <Button onClick={handleInvite} disabled={inviting} className="w-full">
            {inviting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {inviting ? "Sending..." : "Send Invitation"}
          </Button>
        </div>
      </div>

      {/* Quick Share */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <Share2 className="h-5 w-5 text-saffron" />
          Quick Share
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Share via WhatsApp, SMS, or any messaging app
        </p>
        <div className="mt-4">
          <Textarea
            readOnly
            value={shareMessage}
            rows={3}
            className="bg-muted text-sm"
          />
          <div className="mt-3 flex gap-2">
            <Button onClick={copyToClipboard} variant="outline" className="flex-1">
              <Copy className="mr-2 h-4 w-4" />
              Copy Message
            </Button>
            <Button onClick={shareNative} className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Invites */}
      {referrals.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-foreground">Recent Invitations</h3>
          <div className="mt-4 space-y-3">
            {referrals.slice(0, 5).map((referral: any) => (
              <div key={referral._row_id} className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3">
                <div>
                  <p className="font-medium text-foreground">{referral.referee_name}</p>
                  <p className="text-xs text-muted-foreground">{referral.referee_email}</p>
                </div>
                <div className="text-right">
                  {referral.signed_up ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                      <Check className="h-3 w-3" />
                      Joined
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {new Date(referral._created_at * 1000).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteFriends;