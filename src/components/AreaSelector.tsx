import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const AreaSelector = ({ value, onChange }: Props) => (
  <div className="space-y-2.5">
    <Label htmlFor="area" className="text-sm flex items-center gap-1.5">
      <MapPin className="h-4 w-4 text-saffron" />
      Area in Hyderabad
    </Label>
    <select
      id="area"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <option value="">Select your area</option>
      <option value="Central Hyderabad" disabled>Central Hyderabad</option>
      {["Banjara Hills", "Jubilee Hills", "Madhapur", "Gachibowli", "Kondapur", "Hitech City", "Manikonda", "Kukatpally", "Miyapur", "KPHB Colony", "Moosapet", "Bowenpally", "Balapur", "Chandrayanagutta", "Charminar", "Dilsukhnagar", "ECIL", "Falaknuma", "Golconda", "Habsiguda", "Himayatnagar", "Hyderguda", "Kachiguda", "Koti", "Lakdi Ka Pul", "Langer House", "Malkajgiri", "Mallapur", "Masab Tank", "Nampally", "Narayanguda", "Punjagutta", "Ramanthapur", "Safilguda", "Sainikpuri", "Sanathnagar", "Secunderabad", "Sriram Nagar", "Tarnaka", "Tolichowki", "Uppal", "Vanasthalipuram", "Yapral"].map(area => (
        <option key={area} value={area}>{area}</option>
      ))}
    </select>
    <p className="text-xs text-muted-foreground">Currently serving Hyderabad only. Other cities coming soon.</p>
  </div>
);

export default AreaSelector;
