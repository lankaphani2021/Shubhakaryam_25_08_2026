import { TIME_SLOTS } from "@/lib/types";

interface Props {
  taken: string[];
  loading: boolean;
  value: string;
  onChange: (slot: string) => void;
  selectedDate: string;
}

const SlotPicker = ({ taken, loading, value, onChange, selectedDate }: Props) => {
  if (loading)
    return <p className="text-sm text-muted-foreground">Checking availability…</p>;

  // Check if selected date is today
  const today = new Date().toISOString().slice(0, 10);
  const isToday = selectedDate === today;

  // Get current time in minutes and add 3-hour buffer for priest travel time
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const minimumMinutes = currentMinutes + 180; // 3 hours = 180 minutes
  
  // Evening slots (7 PM onwards) are always available for same-day booking
  const eveningStartMinutes = 19 * 60; // 7 PM in minutes (19:00)

  // Convert time slot to minutes for comparison
  const slotToMinutes = (slot: string): number => {
    const [time, meridiem] = slot.split(" ");
    const [hoursStr, minsStr] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    const mins = parseInt(minsStr, 10);
    
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    
    return hours * 60 + mins;
  };

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {TIME_SLOTS.map((slot) => {
        const busy = taken.includes(slot);
        
        // Check if slot is within valid booking window (same-day rules)
        let isPast = false;
        let tooSoon = false;
        if (isToday) {
          const slotMinutes = slotToMinutes(slot);
          isPast = slotMinutes < currentMinutes;
          // Evening slots (7 PM onwards) are always available, others need 3-hour notice
          tooSoon = slotMinutes >= currentMinutes && slotMinutes < minimumMinutes && slotMinutes < eveningStartMinutes;
        }

        // Determine if slot should be disabled (but always show all slots)
        const disabled = busy || (isToday && (isPast || tooSoon));

        // Don't show past slots for today (but show all slots for future dates)
        if (isToday && isPast && !busy) return null;

        return (
          <button
            key={slot}
            type="button"
            disabled={disabled}
            onClick={() => onChange(slot)}
            className={`rounded-lg border px-2 py-2.5 text-xs transition-colors ${
              disabled
                ? "cursor-not-allowed border-border bg-muted text-muted-foreground/50 line-through"
                : value === slot
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary/50"
            }`}
          >
            {slot}
            {isToday && tooSoon && !busy && (
              <span className="ml-1 text-[10px] text-orange-600 font-medium">(&lt;3h)</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SlotPicker;
