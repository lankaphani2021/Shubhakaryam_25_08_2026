import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Flame, Loader2, Lock } from "lucide-react";
import auth from "@/lib/shared/kliv-auth.js";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import functions from "@/lib/shared/kliv-functions.js";

const SignIn = () => {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const { refresh } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/bookings";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      // Check whitelist before proceeding
      const whitelistCheck = await functions.invoke("whitelist_access", { email });
      
      if (!whitelistCheck.allowed) {
        toast.error(whitelistCheck.message || "Access restricted to invited users only");
        toast.error("Please contact admin.shubhakaryam@yopmail.com for access");
        setBusy(false);
        return;
      }

      if (mode === "in") await auth.signIn(email, password);
      else await auth.signUp(email, password, name);
      await refresh();
      toast.success("Welcome to Shubhakaryam");
      navigate(next);
    } catch (err: any) {
      const m = err?.message || "";
      if (m.includes("bad_credentials")) toast.error("Email or password is incorrect");
      else if (m.includes("email_exists")) toast.error("An account with this email already exists");
      else if (m.includes("password")) toast.error("Password must be at least 8 characters and not easily guessed");
      else toast.error("Something went wrong, please try again");
    }
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 border-r border-border/50">
        <div className="relative w-full max-w-xl aspect-square overflow-hidden flex items-center justify-center">
          <img
            src="/images/signin-bg.jpg"
            alt="Traditional Kalash and Om"
            className="w-[104%] h-[104%] max-w-none object-cover scale-[1.04]"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2 bg-white">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-maroon text-white">
              <Flame className="h-4 w-4" />
            </span>
            <span className="font-display text-xl text-maroon">Shubhakaryam</span>
          </Link>

          <div className="mb-6 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Private Access Required</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  This app is only accessible to invited users. Your email must be whitelisted before you can sign in or create an account.
                </p>
                <p className="mt-2 text-xs text-primary">
                  Contact: admin.shubhakaryam@yopmail.com for access
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-3xl text-foreground">
            {mode === "in" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "in"
              ? "Sign in to manage your bookings."
              : "One account for all your family's ceremonies."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "up" && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                className="mt-1.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="mt-1.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={busy}>
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "in" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "in" ? "New here?" : "Already have an account?"}{" "}
            <button
              className="text-primary underline-offset-4 hover:underline"
              onClick={() => setMode(mode === "in" ? "up" : "in")}
            >
              {mode === "in" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
