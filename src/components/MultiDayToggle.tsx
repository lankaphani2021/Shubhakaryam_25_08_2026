import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  enabled: boolean;
  onEnabledChange: (v: boolean) => void;
  endDate: string;
  onEndDateChange: (v: string) => void;
  startDate: string;
}

const MultiDayToggle = ({ enabled, onEnabledChange, endDate, onEndDateChange, startDate }: Props) => {
  const minDate = startDate ? new Date(new Date(startDate).getTime() + 86400000).toISOString().slice(0, 10) : "";

  return (
    <div className="rounded-xl border border-border bg-secondary/50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Multi-day event</p>
          <p className="text-xs text-muted-foreground">
            Enable for weddings that span multiple days
          </p>
        </div>
        <Switch checked={enabled} onCheckedChange={onEnabledChange} />
      </div>

      {enabled && (
        <div className="mt-4">
          <Label htmlFor="end-date" className="text-xs text-muted-foreground">
            End date (last ceremony)
          </Label>
          <Input
            id="end-date"
            type="date"
            min={minDate}
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="mt-1.5"
          />
        </div>
      )}
    </div>
  );
};

export default MultiDayToggle;
