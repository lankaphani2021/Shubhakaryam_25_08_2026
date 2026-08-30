import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Search, Home, User, Sparkles, Heart, Baby, Sun, Bell } from "lucide-react";
import db from "@/lib/shared/app-database.js";
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { Service } from "@/lib/types";
import { Input } from "@/components/ui/input";

// User-friendly occasion-based categories
const occasions = [
  { 
    slug: "all", 
    label: "All Services", 
    icon: Sparkles,
    description: "Browse all available services",
    color: "bg-gradient-to-br from-saffron/20 to-maroon/20 border-saffron/30"
  },
  { 
    slug: "wedding", 
    label: "Weddings", 
    icon: Heart,
    description: "Complete wedding ceremonies & rituals",
    color: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200"
  },
  { 
    slug: "baby", 
    label: "Baby & Child", 
    icon: Baby,
    description: "Naming ceremony, first feeding & more",
    color: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
  },
  { 
    slug: "home", 
    label: "Home & Family", 
    icon: Home,
    description: "Griha pravesham, Satyanarayan & more",
    color: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
  },
  { 
    slug: "personal", 
    label: "Personal", 
    icon: User,
    description: "Birthdays, anniversaries & special occasions",
    color: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200"
  },
  { 
    slug: "astrology", 
    label: "Astrology", 
    icon: Sun,
    description: "Kundali matching, muhurtham & readings",
    color: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200"
  },
  { 
    slug: "traditional", 
    label: "Traditional", 
    icon: Bell,
    description: "Homams, special poojas & rituals",
    color: "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
  },
];

// Map user-friendly occasions to database categories
const occasionCategories: Record<string, string[] | null> = {
  wedding: ["Wedding"],
  baby: ["Samskara"],
  home: ["Home Pooja", "Temple"],
  personal: ["Samskara"],
  astrology: ["Astrology"],
  traditional: ["Homam"],
  all: null,
};

const Services = () => {
  const [q, setQ] = useState("");
  const [occasion, setOccasion] = useState("all");
  const [searchParams] = useSearchParams();

  // Set search query from URL params on component mount
  useEffect(() => {
    const searchParam = searchParams.get("q");
    if (searchParam) {
      setQ(searchParam);
    }
  }, [searchParams]);

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["services", "all"],
    queryFn: () => db.query("services", { active: "eq.1", order: "name.asc" }),
  });

  const filtered = services.filter(
    (s) => {
      const selectedCategories = occasionCategories[occasion];
      return (
        (!selectedCategories || selectedCategories.includes(s.category)) &&
        (s.name.toLowerCase().includes(q.toLowerCase()) ||
         s.deity.toLowerCase().includes(q.toLowerCase()))
      );
    }
  );

  return (
    <Layout>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-xs uppercase tracking-[0.2em] text-saffron">Services</p>
          <h1 className="mt-3 text-4xl text-foreground">Browse poojas, homams & astrology</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Every listing includes the priest's dakshina, samagri and expected duration —
            no surprises on the day.
          </p>

          <div className="mt-8 space-y-6">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for a service (e.g., Satyanarayan, naming ceremony)…"
                className="bg-background pl-9"
              />
            </div>

            {/* Occasion-based selection */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">What kind of ceremony do you need?</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {occasions.map((o) => {
                  const Icon = o.icon;
                  const isSelected = occasion === o.slug;
                  return (
                    <button
                      key={o.slug}
                      onClick={() => setOccasion(o.slug)}
                      className={`relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all ${
                        isSelected
                          ? `${o.color} border-current shadow-sm scale-[1.02]`
                          : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                      }`}
                    >
                      <div className={`flex flex-col items-center text-center space-y-2 ${isSelected ? '' : 'opacity-80 hover:opacity-100'}`}>
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          isSelected ? 'bg-white shadow-md' : 'bg-primary/10'
                        }`}>
                          <Icon className={`h-5 w-5 ${isSelected ? 'text-foreground' : 'text-primary'}`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{o.label}</p>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{o.description}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14">
        {isLoading ? (
          <p className="text-muted-foreground">Loading services…</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">No poojas match your search.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Services;