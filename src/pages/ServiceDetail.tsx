import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Clock, Sparkles, ArrowLeft, Check } from "lucide-react";
import db from "@/lib/shared/kliv-database.js";
import Layout from "@/components/Layout";
import { Service, formatINR, formatDuration } from "@/lib/types";
import { Button } from "@/components/ui/button";

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<Service[]>({
    queryKey: ["service", slug],
    queryFn: () => db.query("services", { slug: `eq.${slug}` }),
  });

  const service = data?.[0];

  if (isLoading)
    return (
      <Layout>
        <p className="mx-auto max-w-6xl px-4 py-24 text-muted-foreground">Loading…</p>
      </Layout>
    );

  if (!service)
    return (
      <Layout>
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h1 className="text-2xl">Pooja not found</h1>
          <Button asChild className="mt-6">
            <Link to="/services">Back to services</Link>
          </Button>
        </div>
      </Layout>
    );

  const includes = [
    "Priest dakshina and travel within city",
    service.samagri,
    "Sankalpam with your gotra and nakshatra",
    "Prasadam distribution guidance",
  ];

  return (
    <Layout>
      <div className="relative h-72 overflow-hidden sm:h-96">
        <img src={service.image_url} alt={service.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20_45%_8%/0.9)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-4 pb-8">
            <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> All poojas
            </Link>
            <h1 className="mt-3 text-3xl text-white sm:text-5xl">{service.name}</h1>
            <p className="mt-2 text-marigold">{service.deity} · {service.category}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1fr_340px]">
        <div>
          <h2 className="font-display text-2xl text-foreground">About this ceremony</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{service.description}</p>

          <h3 className="mt-10 font-display text-xl text-foreground">What's included</h3>
          <ul className="mt-4 space-y-3">
            {includes.map((i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                {i}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-border bg-secondary/50 p-6">
            <h3 className="font-display text-lg text-foreground">Before the pooja</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your acharya will call a day earlier to confirm the sankalpam details and
              any arrangements needed at your venue. Please keep a clean space with a low
              table facing east.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Starting at</p>
            <p className="mt-1 font-display text-3xl text-maroon">{formatINR(service.price)}</p>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-saffron" /> {formatDuration(service.duration_minutes)} duration
              </p>
              <p className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-saffron" /> Samagri included
              </p>
            </div>
            <Button className="mt-6 w-full" size="lg" onClick={() => navigate(`/book/${service.slug}`)}>
              Check availability
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Free cancellation up to 48 hours before
            </p>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
