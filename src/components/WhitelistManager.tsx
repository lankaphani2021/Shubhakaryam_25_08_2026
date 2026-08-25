import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, UserPlus, Trash2, Check, X, Shield, Users, Globe } from "lucide-react";
import db from "@/lib/shared/kliv-database.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const WhitelistManager = () => {
  const [email, setEmail] = useState("");
  const [emailType, setEmailType] = useState<"individual" | "domain">("individual");
  const [notes, setNotes] = useState("");
  const [adding, setAdding] = useState(false);

  const { data: whitelist = [], refetch } = useQuery({
    queryKey: ["whitelist"],
    queryFn: () => db.query("whitelist", { order: "_created_at.desc" }),
  });

  const handleAdd = async () => {
    if (!email) {
      toast.error("Please enter an email or domain");
      return;
    }

    setAdding(true);
    try {
      await db.insert("whitelist", {
        email: email,
        email_type: emailType,
        status: "active",
        notes: notes || null,
      });

      toast.success(`Added ${emailType === 'domain' ? 'domain' : 'email'} to whitelist`);
      setEmail("");
      setNotes("");
      refetch();
    } catch (error) {
      toast.error("Failed to add to whitelist");
      console.error("Add error:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (id: number, email: string) => {
    try {
      await db.delete("whitelist", { _row_id: `eq.${id}` });
      toast.success(`Removed ${email} from whitelist`);
      refetch();
    } catch (error) {
      toast.error("Failed to remove from whitelist");
      console.error("Remove error:", error);
    }
  };

  const handleToggleStatus = async (entry: any) => {
    try {
      await db.update("whitelist", { _row_id: `eq.${entry._row_id}` }, {
        status: entry.status === "active" ? "inactive" : "active",
      });
      toast.success(`Updated ${entry.email} status`);
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Update error:", error);
    }
  };

  const individualCount = whitelist.filter((w: any) => w.email_type === "individual").length;
  const domainCount = whitelist.filter((w: any) => w.email_type === "domain").length;
  const activeCount = whitelist.filter((w: any) => w.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Users className="mx-auto h-8 w-8 text-saffron" />
          <p className="mt-2 text-2xl font-display font-bold text-foreground">{individualCount}</p>
          <p className="text-xs text-muted-foreground">Individual Emails</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Globe className="mx-auto h-8 w-8 text-saffron" />
          <p className="mt-2 text-2xl font-display font-bold text-foreground">{domainCount}</p>
          <p className="text-xs text-muted-foreground">Domains</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Shield className="mx-auto h-8 w-8 text-saffron" />
          <p className="mt-2 text-2xl font-display font-bold text-foreground">{activeCount}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
      </div>

      {/* Add New */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-saffron" />
          Add to Whitelist
        </h3>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email or Domain</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={emailType === "domain" ? "gmail.com" : "user@example.com"}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Type</Label>
              <select
                value={emailType}
                onChange={(e) => setEmailType(e.target.value as "individual" | "domain")}
                className="w-full mt-1.5 rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="individual">Individual Email</option>
                <option value="domain">Domain (Google Groups)</option>
              </select>
            </div>
          </div>
          <div>
            <Label>Notes (Optional)</Label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Team name, department, etc."
              className="mt-1.5"
            />
          </div>
          <Button onClick={handleAdd} disabled={adding} className="w-full">
            {adding && <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />}
            Add to Whitelist
          </Button>
        </div>
      </div>

      {/* Whitelist Entries */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg font-semibold text-foreground">Whitelist Entries</h3>
        <div className="mt-4 space-y-2">
          {whitelist.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No whitelist entries yet</p>
          ) : (
            whitelist.map((entry: any) => (
              <div key={entry._row_id} className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {entry.email_type === "domain" ? (
                      <Globe className="h-4 w-4 text-primary" />
                    ) : (
                      <Mail className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{entry.email}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="capitalize">{entry.email_type}</span>
                      {entry.notes && <span>• {entry.notes}</span>}
                      <span>• {entry.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleToggleStatus(entry)}
                    variant="ghost"
                    size="sm"
                    className={entry.status === "active" ? "text-green-600" : "text-muted-foreground"}
                  >
                    {entry.status === "active" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={() => handleRemove(entry._row_id, entry.email)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-dashed border-primary/50 bg-primary/5 p-4">
        <p className="text-sm text-foreground">
          <strong className="text-primary">🔒 Private Access Mode:</strong> Only whitelisted users can access this app. 
          Add individual emails or entire domains (like gmail.com) to grant access. 
          Users must sign up with whitelisted email addresses.
        </p>
      </div>
    </div>
  );
};

export default WhitelistManager;