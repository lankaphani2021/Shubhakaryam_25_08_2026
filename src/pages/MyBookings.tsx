import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { CalendarX } from "lucide-react";
import db from "@/lib/shared/kliv-database.js";
import Layout from "@/components/Layout";
import BookingRow from "@/components/BookingRow";
import { Booking } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const MyBookings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: ["bookings", "mine"],
    queryFn: () => db.query("bookings", { order: "booking_date.desc" }),
    enabled: !!user,
  });

  const cancel = async (b: Booking) => {
    await db.update("bookings", { _row_id: `eq.${b._row_id}` }, { status: "cancelled" });
    toast.success("Booking cancelled");
    qc.invalidateQueries({ queryKey: ["bookings"] });
  };

  if (!loading && !user)
    return (
      <Layout>
        <div className="mx-auto max-w-md px-4 py-28 text-center">
          <h1 className="text-3xl text-foreground">Sign in to see your bookings</h1>
          <Button className="mt-6" onClick={() => navigate("/signin?next=/bookings")}>
            Sign in
          </Button>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <p className="text-xs uppercase tracking-[0.2em] text-saffron">Your account</p>
          <h1 className="mt-3 text-4xl text-foreground">My bookings</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {isLoading || loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-14 text-center">
            <CalendarX className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-4 font-display text-lg text-foreground">No bookings yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse our poojas and book your first ceremony.
            </p>
            <Button asChild className="mt-6">
              <Link to="/services">Browse poojas</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <BookingRow key={b._row_id} booking={b} onCancel={cancel} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyBookings;
