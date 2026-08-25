import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import db from "@/lib/shared/kliv-database.js";
import Layout from "@/components/Layout";
import AdminStats from "@/components/AdminStats";
import BookingRow from "@/components/BookingRow";
import WhitelistManager from "@/components/WhitelistManager";
import { Booking } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const filters = ["all", "confirmed", "completed", "cancelled"];

const Admin = () => {
  const { isAdmin, loading } = useAuth();
  const qc = useQueryClient();
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");
  const [view, setView] = useState<"bookings" | "whitelist">("bookings");

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["bookings", "admin"],
    queryFn: () => db.query("bookings", { order: "booking_date.desc", limit: "500" }),
    enabled: isAdmin,
  });

  const setStatusFor = async (b: Booking, next: string) => {
    await db.update("bookings", { _row_id: `eq.${b._row_id}` }, { status: next });
    toast.success(`Booking ${b.reference} marked ${next}`);
    qc.invalidateQueries({ queryKey: ["bookings"] });
  };

  if (loading)
    return (
      <Layout>
        <p className="mx-auto max-w-6xl px-4 py-24 text-muted-foreground">Loading…</p>
      </Layout>
    );

  if (!isAdmin)
    return (
      <Layout>
        <div className="mx-auto max-w-lg px-4 py-28 text-center">
          <h1 className="text-3xl text-foreground">Administrators only</h1>
          <p className="mt-3 text-muted-foreground">
            Ask an existing admin to add your account to the “Pooja Admins” group.
          </p>
        </div>
      </Layout>
    );

  const filtered = bookings.filter(
    (b) =>
      (status === "all" || b.status === status) &&
      (b.reference.toLowerCase().includes(q.toLowerCase()) ||
        b.customer_name?.toLowerCase().includes(q.toLowerCase()) ||
        b.service_name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <Layout>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-xs uppercase tracking-[0.2em] text-saffron">Administration</p>
          <h1 className="mt-3 text-4xl text-foreground">Admin Dashboard</h1>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => setView("bookings")}
              variant={view === "bookings" ? "default" : "outline"}
              size="sm"
            >
              Bookings
            </Button>
            <Button
              onClick={() => setView("whitelist")}
              variant={view === "whitelist" ? "default" : "outline"}
              size="sm"
            >
              Whitelist
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12">
        {view === "whitelist" ? (
          <WhitelistManager />
        ) : (
          <>
            <AdminStats bookings={bookings} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setStatus(f)}
                className={`rounded-full border px-3.5 py-1.5 text-xs capitalize transition-colors ${
                  status === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search reference, customer or pooja…"
            className="sm:max-w-xs"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No bookings match this filter.
          </p>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <BookingRow
                key={b._row_id}
                booking={b}
                onCancel={(bk) => setStatusFor(bk, "cancelled")}
                onComplete={(bk) => setStatusFor(bk, "completed")}
              />
            ))}
          </div>
        )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
