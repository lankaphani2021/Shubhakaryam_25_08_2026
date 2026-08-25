import { useQuery } from "@tanstack/react-query";
import db from "@/lib/shared/kliv-database.js";
import Layout from "@/components/Layout";
import PriestCard from "@/components/PriestCard";
import { Priest } from "@/lib/types";

const Priests = () => {
  const { data: priests = [], isLoading } = useQuery<Priest[]>({
    queryKey: ["priests", "all"],
    queryFn: () => db.query("priests", { active: "eq.1", order: "rating.desc" }),
  });

  return (
    <Layout>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-xs uppercase tracking-[0.2em] text-saffron">Acharyas</p>
          <h1 className="mt-3 text-4xl text-foreground">Our priests</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Each acharya is verified for lineage, training and punctuality. Choose one
            during checkout, or let us assign the best available.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14">
        {isLoading ? (
          <p className="text-muted-foreground">Loading priests…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {priests.map((p) => (
              <PriestCard key={p.slug} priest={p} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Priests;
