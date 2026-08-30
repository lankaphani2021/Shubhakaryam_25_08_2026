import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Home, CalendarDays, ShieldCheck } from "lucide-react";
import db from "@/lib/shared/app-database.js";
import Layout from "@/components/Layout";
import PitruDaanReference from "@/components/PitruDaanReference";
import { formatINR } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const PindDaan = () => {
  const { data: pitruServices = [], isLoading } = useQuery<any[]>({
    queryKey: ["danalu", "pitru"],
    queryFn: () => db.query("danalu_services", { active: "eq.1", category: "eq.Pitru Daan", order: "price.asc" }),
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = pitruServices.filter((s: any) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const features = [
    { icon: Home, text: "Priest performs ceremony at your home" },
    { icon: ShieldCheck, text: "All materials brought by priest" },
    { icon: CalendarDays, text: "Available on Amavasya and Pitru Paksha" },
    { icon: Heart, text: "Brings peace to ancestors' souls" },
  ];

  return (
    <Layout>
      {/* Hero section */}
      <section className="border-b border-border bg-gradient-to-br from-maroon/20 to-secondary/80">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-center gap-2 text-saffron">
            <Heart className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">Pind Daan</span>
          </div>
          <h1 className="mt-4 text-4xl text-foreground sm:text-5xl">
            Peace for your ancestors
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Traditional Pind Daan ceremonies performed at your doorstep. Help your ancestors attain moksha 
            and bring blessings to your family through sacred ancestral offerings.
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

      {/* Services listing */}
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-saffron">Ancestral offerings</p>
              <h2 className="mt-3 text-3xl text-foreground">Choose your ceremony</h2>
            </div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ceremonies (e.g., Gaya, Shraddh)... "
              className="max-w-xs"
            />
          </div>

          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading services…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">No ceremonies match your search.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s: any) => (
                <div
                  key={s.slug}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={s.image_url + "&fit=crop"}
                      alt={s.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-maroon/90 px-2.5 py-1 text-xs font-medium text-white">
                      <Heart className="h-3.5 w-3.5" />
                      Pitru Daan
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg text-foreground">{s.name}</h3>
                      <span className="font-display text-lg text-maroon">{formatINR(s.price)}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                    {s.items_provided && (
                      <p className="mt-3 text-xs text-saffron">✓ {s.items_provided}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-xs text-muted-foreground">~{s.duration_minutes} mins</span>
                      <Button asChild size="sm" className="rounded-full">
                        <Link to={`/danalu/${s.slug}`}>
                          Book now <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Educational Content */}
      <section className="border-b border-border bg-gradient-to-br from-maroon/10 to-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-saffron">Understanding Pitru Daan</p>
            <h2 className="mt-3 text-3xl text-foreground">Why Pind Daan is Important</h2>
            <p className="mt-3 text-muted-foreground">Understanding ancestral offerings and their significance in Hindu tradition</p>
          </div>
          <PitruDaanReference />
        </div>
      </section>

      {/* Process section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl text-foreground">How Pind Daan works</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-secondary text-saffron">
                <span className="font-display text-lg">1</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">Choose ceremony</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select from Pind Daan, Shraddh, Tarpanam, or special packages
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-secondary text-saffron">
                <span className="font-display text-lg">2</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">Priest visits home</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Priest comes with all materials, performs ceremony at your home
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-secondary text-saffron">
                <span className="font-display text-lg">3</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">Sacred disposal</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Offerings disposed in sacred waters as per tradition
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-saffron/10 to-maroon/10 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl text-foreground">Ready to help your ancestors?</h2>
          <p className="mt-4 text-muted-foreground">
            Book a Pind Daan ceremony and bring peace to your ancestors' souls while earning blessings for your family
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg">
              <Link to="/pind-daan">Browse all ceremonies</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link to="/astrology">Consult astrologer</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PindDaan;
