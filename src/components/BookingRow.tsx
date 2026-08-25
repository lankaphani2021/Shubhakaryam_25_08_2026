import { CalendarDays, Clock, MapPin, User, CalendarRange } from "lucide-react";
import { Booking, formatINR } from "@/lib/types";
import { Button } from "@/components/ui/button";

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-800",
  completed: "bg-sky-100 text-sky-800",
  cancelled: "bg-rose-100 text-rose-800",
  pending: "bg-amber-100 text-amber-900",
};

interface Props {
  booking: Booking;
  onCancel?: (b: Booking) => void;
  onComplete?: (b: Booking) => void;
}

const BookingRow = ({ booking, onCancel, onComplete }: Props) => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="font-display text-lg text-foreground">{booking.service_name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">Ref {booking.reference}</p>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
          statusStyles[booking.status] || "bg-muted text-muted-foreground"
        }`}
      >
        {booking.status}
      </span>
    </div>

    <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
      <p className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-saffron" />
        {booking.booking_date}
        {booking.is_multi_day && booking.end_date && (
          <span className="flex items-center gap-1">
            <CalendarRange className="h-3.5 w-3.5" /> {booking.end_date}
          </span>
        )}
      </p>
      <p className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-saffron" /> {booking.booking_time}
      </p>
      <p className="flex items-center gap-2">
        <User className="h-4 w-4 text-saffron" /> {booking.priest_name || "To be assigned"}
      </p>
      <p className="flex items-center gap-2 truncate">
        <MapPin className="h-4 w-4 shrink-0 text-saffron" />
        <span className="truncate">{booking.address}</span>
      </p>
    </div>

    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
      <span className="text-sm">
        <span className="font-display text-lg text-maroon">{formatINR(booking.amount)}</span>
        <span className="ml-2 text-xs capitalize text-muted-foreground">· {booking.payment_status}</span>
      </span>
      <div className="flex gap-2">
        {onComplete && booking.status === "confirmed" && (
          <Button size="sm" variant="outline" onClick={() => onComplete(booking)}>
            Mark completed
          </Button>
        )}
        {onCancel && booking.status !== "cancelled" && booking.status !== "completed" && (
          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onCancel(booking)}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  </div>
);

export default BookingRow;
