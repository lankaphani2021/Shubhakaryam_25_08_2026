import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import db from "@/lib/shared/kliv-database.js";
import Layout from "@/components/Layout";
import HomeHero from "@/components/HomeHero";
import HowItWorks from "@/components/HowItWorks";
import ServiceCard from "@/components/ServiceCard";
import PriestCard from "@/components/PriestCard";
import { Service, Priest } from "@/lib/types";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["services", "featured"],
    queryFn: () => db.query("services", { active: "eq.1", order: "price.asc", limit: "6" }),
  });

  const { data: priests = [] } = useQuery<Priest[]>({
    queryKey: ["priests", "featured"],
    queryFn: () => db.query("priests", { active: "eq.1", order: "rating.desc", limit: "3" }),
  });

  return (
    <Layout>
      {/* Private Access Banner */}
      <div className="border-b-4 border-primary bg-gradient-to-r from-primary/10 to-maroon/10">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-lg">🔒</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Private Access Only</p>
                <p className="text-sm text-muted-foreground">This app is exclusively for invited users. Gmail users & verified contacts only.</p>
              </div>
            </div>
            <Button asChild size="sm" className="hidden sm:flex">
              <Link to="/signin">Request Access</Link>
            </Button>
          </div>
        </div>
      </div>

      <HomeHero />

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-saffron">Popular services</p>
            <h2 className="mt-3 text-3xl text-foreground">Poojas families book most</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/services">
              View all <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <div className="paisley-divider h-3 w-full" />

      <HowItWorks />

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-saffron">Our acharyas</p>
              <h2 className="mt-3 text-3xl text-foreground">Priests you can trust</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/priests">
                All priests <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {priests.map((p) => (
              <PriestCard key={p.slug} priest={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-saffron/10 to-maroon/10 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-saffron">Telugu Traditional Services</p>
              <h2 className="mt-4 text-4xl text-foreground sm:text-5xl">Authentic Telugu Ceremonies</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Traditional Andhra Pradesh & Telangana ceremonies performed by verified Vedic priests from Telugu states.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-white/50 px-3 py-2 text-sm font-medium text-maroon shadow-sm backdrop-blur-sm">
                  <span className="text-lg">✨</span> Weddings
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/50 px-3 py-2 text-sm font-medium text-maroon shadow-sm backdrop-blur-sm">
                  <span className="text-lg">🏠</span> Griha Pravesham
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/50 px-3 py-2 text-sm font-medium text-maroon shadow-sm backdrop-blur-sm">
                  <span className="text-lg">👶</span> Naming Ceremonies
                </div>
              </div>
              <Button asChild size="lg" className="mt-10">
                <Link to="/services">
                  Explore Telugu traditions <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img src="/images/wedding.jpg" alt="Wedding ritual" className="h-64 w-full object-cover transition-transform hover:scale-105" />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img src="/images/wedding-2.jpg" alt="Wedding decor" className="h-48 w-full object-cover transition-transform hover:scale-105" />
                </div>
              </div>
              <div className="flex items-center">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img src="/images/wedding-3.jpg" alt="Traditional ceremony" className="h-[432px] w-full object-cover transition-transform hover:scale-105" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-maroon/10 to-secondary/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-saffron">Navagraha Daan</p>
              <h2 className="mt-3 text-3xl text-foreground">Give daan from your doorstep</h2>
              <p className="mt-2 max-w-md text-muted-foreground">
                Navagraha Daan, Pind Daan for ancestors, and traditional offerings with priest home visits
              </p>
            </div>
            <Button asChild>
              <Link to="/danalu">
                Browse offerings <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-saffron/10 to-maroon/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-saffron">Pind Daan</p>
              <h2 className="mt-3 text-3xl text-foreground">Peace for your ancestors</h2>
              <p className="mt-2 max-w-md text-muted-foreground">
                Help your ancestors attain moksha through traditional Pind Daan ceremonies performed at your home
              </p>
            </div>
            <Button asChild>
              <Link to="/pind-daan">
                View ceremonies <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h2 className="text-3xl text-foreground">Have a muhurtham in mind?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Tell us the date and we'll match you with an available acharya and take care of
          the samagri, so your family can focus on the ceremony.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/services">Start booking</Link>
        </Button>
      </section>
    </Layout>
  );
};

export default Index;
