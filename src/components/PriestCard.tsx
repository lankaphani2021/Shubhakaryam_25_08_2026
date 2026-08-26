import { Star, MapPin, Languages } from "lucide-react";
import { Priest } from "@/lib/types";

const PriestCard = ({ priest }: { priest: Priest }) => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
    <div className="h-56 overflow-hidden bg-secondary/20 flex items-center justify-center">
      <img
        src={priest.photo_url || "/icons/shubkaryam-192.png"}
        alt={priest.name}
        className="h-full w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/icons/shubkaryam-192.png";
        }}
        loading="lazy"
      />
    </div>
    <div className="p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-base leading-snug text-foreground">{priest.name}</h3>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-maroon">
          <Star className="h-3 w-3 fill-saffron text-saffron" />
          {priest.rating.toFixed(1)}
        </span>
      </div>
      <p className="mt-1 text-xs text-saffron">{priest.tradition}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{priest.bio}</p>
      <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> {priest.city} · {priest.experience_years} yrs experience
        </p>
        <p className="flex items-center gap-1.5">
          <Languages className="h-3.5 w-3.5" /> {priest.languages}
        </p>
      </div>
    </div>
  </div>
);

export default PriestCard;
