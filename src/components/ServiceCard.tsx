import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Service, formatINR, formatDuration } from "@/lib/types";

const ServiceCard = ({ service }: { service: Service }) => (
  <Link
    to={`/services/${service.slug}`}
    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="relative h-44 overflow-hidden bg-secondary/20 flex items-center justify-center">
      <img
        src={service.image_url || "/icons/shubkaryam-192.png"}
        alt={service.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/icons/shubkaryam-192.png";
        }}
        loading="lazy"
      />
      <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-maroon">
        {service.category}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="font-display text-lg text-foreground">{service.name}</h3>
      <p className="mt-1 text-xs text-saffron">{service.deity}</p>
      <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div>
          <span className="font-display text-lg text-maroon">{formatINR(service.price)}</span>
          <span className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatDuration(service.duration_minutes)}
          </span>
        </div>
        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

export default ServiceCard;
