import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeHero = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="https://images.pexels.com/photos/10182772/pexels-photo-10182772.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1800"
        alt="Diyas lit for a ceremony"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(20_45%_8%/0.92)] via-[hsl(20_45%_10%/0.78)] to-[hsl(20_45%_10%/0.35)]" />
    </div>

    <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32">
      <div className="max-w-2xl animate-rise">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs text-marigold backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Telugu Traditions · Hyderabad · Verified Priests
        </span>
        <h1 className="mt-6 text-4xl leading-tight text-white sm:text-6xl">
          Authentic Telugu ceremonies in Hyderabad,
          <br />
          <span className="text-marigold">traditionally arranged.</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75">
          Browse authentic poojas and homams, choose a priest from your area,
          pick an auspicious date and confirm — all in a few minutes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-saffron text-ink hover:bg-marigold">
            <Link to="/services">Browse poojas</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link to="/priests">Meet our priests</Link>
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-marigold" /> Secure checkout
          </span>
          <span className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-marigold" /> Live slot availability
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-marigold" /> Samagri included
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default HomeHero;
