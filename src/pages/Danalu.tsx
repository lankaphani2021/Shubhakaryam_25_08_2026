import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Gift, ArrowRight, Home, Heart, ShieldCheck, Truck } from "lucide-react";
import db from "@/lib/shared/app-database.js";
import Layout from "@/components/Layout";
import NavagrahaReference from "@/components/NavagrahaReference";
import PitruDaanReference from "@/components/PitruDaanReference";
import { formatINR } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Danalu = () => {
  const { data: danaluServices = [], isLoading } = useQuery<any[]>({
    queryKey: ["danalu", "services"],
    queryFn: () => db.query("danalu_services", { active: "eq.1", order: "category.asc, price.asc" }),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = danaluServices.filter((s: any) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || s.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Group services by category
  const navagrahaServices = filtered.filter((s: any) => s.category === "Navagraha");
  const pitruServices = filtered.filter((s: any) => s.category === "Pitru Daan");
  const traditionalServices = filtered.filter((s: any) => s.category === "Offering");

  const features = [
    { icon: Home, text: "Priest visits your home to collect offerings" },
    { icon: Truck, text: "We handle transport to temples and beneficiaries" },
    { icon: ShieldCheck, text: "Transparent process with photo documentation" },
    { icon: Heart, text: "Your dana reaches those who truly need it" },
  ];

  const categories = [
    { name: "all", label: "All Offerings", icon: Gift },
    { name: "Navagraha", label: "Navagraha (9 Planets)", icon: ShieldCheck },
    { name: "Pitru Daan", label: "Pind Daan (Ancestors)", icon: Heart },
    { name: "Offering", label: "Traditional Offerings", icon: Truck },
  ];

  return (
    <Layout>
      {/* Hero section */}
      <section className="border-b border-border bg-gradient-to-br from-secondary/80 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-center gap-2 text-saffron">
            <Gift className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">Navagraha Daan</span>
          </div>
          <h1 className="mt-4 text-4xl text-foreground sm:text-5xl">
            Give daan from your doorstep
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Traditional Hindu offerings with modern convenience. Priests visit your home, receive your daan, 
            and ensure it reaches temples, goshalas, or those in need — all documented and transparent.
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

      {/* Categories quick links */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategoryFilter(cat.name)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors ${
                  categoryFilter === cat.name
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services listing */}
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-saffron">Sacred offerings</p>
              <h2 className="mt-3 text-3xl text-foreground">Choose your daan</h2>
            </div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search offerings (e.g., Surya, Annadanam)... "
              className="max-w-xs"
            />
          </div>

          {categoryFilter === "all" && navagrahaServices.length > 0 && (
            <>
              <div className="mb-12">
                <div className="mb-6">
                  <h3 className="text-xl font-display text-foreground mb-2">Navagraha Daan (9 Planet Offerings)</h3>
                  <p className="text-sm text-muted-foreground">
                    Appease the 9 planets according to Vedic astrology. Each planet has specific offerings that bring blessings and remedy doshas.
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {navagrahaServices.map((s: any) => (
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
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-primary/90 px-2.5 py-1 text-xs font-medium text-white">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Navagraha
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
              </div>
              
              {pitruServices.length > 0 && (
                <div className="mt-16 pt-8 border-t border-border">
                  <div className="mb-6">
                    <h3 className="text-xl font-display text-foreground mb-2">Pind Daan (Ancestral Offerings)</h3>
                    <p className="text-sm text-muted-foreground">
                      Sacred offerings for peace of ancestors' souls. Remove Pitru Dosh and bring blessings to your family through traditional Pind Daan ceremonies.
                    </p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pitruServices.map((s: any) => (
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
                </div>
              )}
              
              {traditionalServices.length > 0 && (
                <div className="mt-16 pt-8 border-t border-border">
                  <h3 className="text-xl font-display text-foreground mb-6">Traditional Offerings</h3>
                </div>
              )}
            </>
          )}

          {categoryFilter === "Navagraha" && (
            <div className="mb-8">
              <h3 className="text-lg font-display text-foreground mb-4">9 Planet Offerings</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Click on any planet to book the specific daan
              </p>
            </div>
          )}

          {categoryFilter === "Pitru Daan" && (
            <div className="mb-8">
              <h3 className="text-lg font-display text-foreground mb-4">Ancestral Offerings</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Book Pind Daan for peace of your ancestors' souls and removal of Pitru Dosh
              </p>
            </div>
          )}

          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading services…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">No offerings match your search.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(categoryFilter === "Navagraha" ? navagrahaServices : 
                categoryFilter === "Pitru Daan" ? pitruServices :
                categoryFilter === "Offering" ? traditionalServices : 
                filtered).map((s: any) => (
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
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-maroon">
                      <Home className="h-3.5 w-3.5" />
                      Home visit
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

      {/* Navagraha Educational Content */}
      <section className="border-b border-border bg-gradient-to-br from-secondary/80 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-saffron">Understanding Navagraha</p>
            <h2 className="mt-3 text-3xl text-foreground">Why Navagraha Daan is Important</h2>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-xl text-foreground mb-4">What are Navagrahas?</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                In Vedic astrology, Navagrahas (नवग्रह) are the nine planetary deities that influence human life. 
                Each planet governs different aspects of life and can cause challenges when unfavorably positioned in one's horoscope.
                Performing daan (offerings) to these planets is a powerful remedy to pacify them and receive their blessings.
              </p>
              
              <h3 className="font-display text-xl text-foreground mb-4">Benefits of Navagraha Daan</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-1">✓</span>
                  <span>Reduces malefic effects of planets in your birth chart</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-1">✓</span>
                  <span>Brings prosperity, health, and peace of mind</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-1">✓</span>
                  <span>Helps overcome obstacles and delays in important matters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-1">✓</span>
                  <span>Strengthens beneficial planets for maximum positive impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-1">✓</span>
                  <span>Creates positive karma through charitable acts</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-display text-xl text-foreground mb-4">How It Works</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                When you book a Navagraha Daan, our trained priest will visit your home, receive the specified items, 
                and perform the necessary rituals. The items are then donated to appropriate temples, Brahmins, or beneficiaries 
                on your behalf, ensuring the maximum spiritual benefit.
              </p>
              
              <h3 className="font-display text-xl text-foreground mb-4">When to Perform</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-1">•</span>
                  <span>During planetary dasha or antardasha periods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-1">•</span>
                  <span>When facing specific life challenges related to a planet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-1">•</span>
                  <span>On birthdays or anniversaries for ongoing blessings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-1">•</span>
                  <span>After consulting an astrologer for specific remedies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-saffron mt-1">•</span>
                  <span>During Navagraha Shanti puja ceremonies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Table */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-foreground">Complete Navagraha Reference</h2>
            <p className="mt-3 text-muted-foreground">Items, benefits, and significance for each planet</p>
          </div>
          <NavagrahaReference />
        </div>
      </section>

      {/* Pitru Daan Educational Content */}
      <section className="border-b border-border bg-gradient-to-br from-maroon/10 to-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-saffron">Pitru Daan</p>
            <h2 className="mt-3 text-3xl text-foreground">Pind Daan - Peace for Your Ancestors</h2>
            <p className="mt-3 text-muted-foreground">Understanding ancestral offerings and their importance in Hindu tradition</p>
          </div>
          <PitruDaanReference />
        </div>
      </section>

      {/* Process section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl text-foreground">How Navagraha Daan works</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-secondary text-saffron">
                <span className="font-display text-lg">1</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">Choose your daan</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select from Navagraha offerings or traditional daan
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-secondary text-saffron">
                <span className="font-display text-lg">2</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">Priest visits home</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Priest comes to your doorstep, receives the offering, and provides blessings
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-secondary text-saffron">
                <span className="font-display text-lg">3</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-foreground">Documented delivery</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We deliver to temple or beneficiaries and share photo proof of completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-saffron/10 to-maroon/10 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl text-foreground">Ready to give daan?</h2>
          <p className="mt-4 text-muted-foreground">
            Book a home visit and let us handle the logistics while you earn punya
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg">
              <Link to="/danalu">Browse all offerings</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link to="/priests">View available priests</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Danalu;
