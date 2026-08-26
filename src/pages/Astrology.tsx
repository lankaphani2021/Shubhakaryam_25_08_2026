import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Star, Sparkles, ArrowRight, CalendarCheck, IndianRupee, ShieldCheck } from "lucide-react";
import db from "@/lib/shared/kliv-database.js";
import Layout from "@/components/Layout";
import { Service, formatINR } from "@/lib/types";
import { Button } from "@/components/ui/button";

const Astrology = () => {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["services", "astrology"],
    queryFn: () => db.query("services", { category: "eq.Astrology", active: "eq.1", order: "price.asc" }),
  });

  const { data: priests = [] } = useQuery<any[]>({
    queryKey: ["priests", "astrology"],
    queryFn: () => db.query("priests", { tradition: "ilike.%Astrology%", active: "eq.1", order: "rating.desc" }),
  });

  const features = [
    { icon: CalendarCheck, text: "Book appointments online at your convenience" },
    { icon: ShieldCheck, text: "Verified astrologers with years of experience" },
    { icon: IndianRupee, text: "Transparent pricing — no hidden charges" },
    { icon: Sparkles, text: "Birth chart analysis & detailed reports included" },
  ];

  return (
    <Layout>
      {/* Hero section */}
      <section className="border-b border-border bg-gradient-to-br from-secondary/80 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-center gap-2 text-saffron">
            <Star className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">Astrology Services</span>
          </div>
          <h1 className="mt-4 text-4xl text-foreground sm:text-5xl">
            Get guidance from the stars
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Book consultations with expert Vedic astrologers for horoscope analysis,
            muhurtham finding, kundali matching and more — all from the comfort of your home.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.text} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-saffron" />
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our astrologers */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-saffron">Our experts</p>
              <h2 className="mt-3 text-3xl text-foreground">Meet your astrologers</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/priests">View all priests</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {priests.map((p: any) => (
              <div key={p.slug} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
                <div className="h-56 overflow-hidden bg-secondary/20 flex items-center justify-center">
                  <img
                    src={p.photo_url || "/icons/shubhakaryam-192.png"}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/icons/shubhakaryam-192.png";
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base leading-snug text-foreground">{p.name}</h3>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-maroon">
                      <Star className="h-3 w-3 fill-saffron text-saffron" />
                      {p.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-saffron">{p.tradition}</p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                  <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      {p.city} · {p.experience_years} yrs experience
                    </p>
                    <p className="flex items-center gap-1.5">{p.languages}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services listing */}
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-saffron">Services</p>
            <h2 className="mt-3 text-3xl text-foreground">Choose your astrology service</h2>
            <p className="mt-3 max-w-xl mx-auto text-muted-foreground">
              Each service includes personalized analysis and detailed guidance from our expert astrologers
            </p>
          </div>

          {isLoading ? (
            <p className="mt-10 text-center text-muted-foreground">Loading services…</p>
          ) : services.length === 0 ? (
            <p className="mt-10 text-center text-muted-foreground">No astrology services available at the moment.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-44 overflow-hidden bg-secondary/20 flex items-center justify-center">
                    <img
                      src={s.image_url || "/icons/shubhakaryam-192.png"}
                      alt={s.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/icons/shubhakaryam-192.png";
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg text-foreground">{s.name}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <span className="font-display text-lg text-maroon">{formatINR(s.price)}</span>
                      <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works for astrology */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl text-foreground">How astrology consultations work</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-secondary text-saffron">
                <span className="font-display text-lg">1</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">Choose service</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select from kundali matching, birth chart analysis, muhurtham finding and more
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-secondary text-saffron">
                <span className="font-display text-lg">2</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">Fill birth details</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Provide your date, time and place of birth for accurate horoscope analysis
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-secondary text-saffron">
                <span className="font-display text-lg">3</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">Get consultation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Meet your astrologer via video call or receive detailed report via email
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-saffron/10 to-maroon/10 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl text-foreground">Ready for guidance from the stars?</h2>
          <p className="mt-4 text-muted-foreground">
            Book your astrology consultation today and get personalized insights for life's important decisions
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/services">Browse all astrology services</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Astrology;
