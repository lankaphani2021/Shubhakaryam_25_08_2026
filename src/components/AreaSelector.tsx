import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const AreaSelector = ({ value, onChange }: Props) => (
  <div className="space-y-2.5">
    <Label htmlFor="area" className="text-sm flex items-center gap-1.5">
      <MapPin className="h-4 w-4 text-saffron" />
      Your Location
    </Label>
    <Input
      id="area"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your city or region"
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    />
  </div>
);

export default AreaSelector;
