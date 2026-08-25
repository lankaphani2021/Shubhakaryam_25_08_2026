import { Booking, formatINR } from "@/lib/types";
import { CalendarCheck, IndianRupee, Clock3, XCircle } from "lucide-react";

const AdminStats = ({ bookings }: { bookings: Booking[] }) => {
  const active = bookings.filter((b) => b.status === "confirmed");
  const revenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((s, b) => s + b.amount, 0);
  const upcoming = active.filter((b) => b.booking_date >= new Date().toISOString().slice(0, 10));
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  const stats = [
    { label: "Total bookings", value: String(bookings.length), icon: CalendarCheck },
    { label: "Upcoming", value: String(upcoming.length), icon: Clock3 },
    { label: "Revenue", value: formatINR(revenue), icon: IndianRupee },
    { label: "Cancelled", value: String(cancelled.length), icon: XCircle },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <s.icon className="h-5 w-5 text-saffron" />
          <p className="mt-3 font-display text-2xl text-foreground">{s.value}</p>
          <p className="text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
