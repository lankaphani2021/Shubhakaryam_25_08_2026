import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  placeholder?: string;
}

const BirthField = ({ value, onChange, label, placeholder }: Props) => (
  <div className="space-y-1.5">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="text-sm"
    />
  </div>
);

interface FormProps {
  birthDetails: string;
  onBirthDetailsChange: (v: string) => void;
  partnerDetails: string;
  onPartnerDetailsChange: (v: string) => void;
  showPartner?: boolean;
}

const BirthDetailsForm = ({
  birthDetails,
  onBirthDetailsChange,
  partnerDetails,
  onPartnerDetailsChange,
  showPartner,
}: FormProps) => (
  <div className="rounded-2xl border border-border bg-secondary/50 p-5">
    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
      <CalendarDays className="h-4 w-4 text-saffron" />
      Birth details
    </div>
    <p className="mt-2 text-xs text-muted-foreground">
      These details are needed for accurate horoscope analysis
    </p>

    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <BirthField
        label="Date of birth"
        placeholder="e.g., 15 Aug 1990"
        value={birthDetails}
        onChange={onBirthDetailsChange}
      />
      <BirthField
        label="Time of birth"
        placeholder="e.g., 10:30 AM"
        value={birthDetails}
        onChange={onBirthDetailsChange}
      />
      <BirthField
        label="Place of birth"
        placeholder="City, state"
        value={birthDetails}
        onChange={onBirthDetailsChange}
      />
      <BirthField
        label="Gotra (optional)"
        placeholder="Your gotra"
        value={birthDetails}
        onChange={onBirthDetailsChange}
      />
    </div>

    <div className="mt-3">
      <Label htmlFor="notes-birth" className="text-xs text-muted-foreground">
        Additional details (nakshatra, rashi, etc.)
      </Label>
      <Textarea
        id="notes-birth"
        className="mt-1.5 text-sm"
        rows={2}
        value={birthDetails}
        onChange={(e) => onBirthDetailsChange(e.target.value)}
        placeholder="Any other astrology information you'd like to share..."
      />
    </div>

    {showPartner && (
      <>
        <div className="mt-6 border-t border-border pt-4">
          <p className="text-xs font-medium text-muted-foreground">Partner details (for kundali matching)</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <BirthField
              label="Partner date of birth"
              placeholder="e.g., 22 Dec 1992"
              value={partnerDetails}
              onChange={onPartnerDetailsChange}
            />
            <BirthField
              label="Partner time of birth"
              placeholder="e.g., 6:45 PM"
              value={partnerDetails}
              onChange={onPartnerDetailsChange}
            />
            <BirthField
              label="Partner place of birth"
              placeholder="City, state"
              value={partnerDetails}
              onChange={onPartnerDetailsChange}
            />
            <BirthField
              label="Partner gotra (optional)"
              placeholder="Their gotra"
              value={partnerDetails}
              onChange={onPartnerDetailsChange}
            />
          </div>
        </div>
      </>
    )}
  </div>
);

export default BirthDetailsForm;
