import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Loader2, Gift } from "lucide-react";
import db from "@/lib/shared/kliv-database.js";
import functions from "@/lib/shared/kliv-functions.js";
import Layout from "@/components/Layout";
import SlotPicker from "@/components/SlotPicker";
import AreaSelector from "@/components/AreaSelector";
import MaterialsArrangement from "@/components/MaterialsArrangement";
import { formatINR } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const todayISO = () => new Date().toISOString().slice(0, 10);

const BookDanalu = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [date, setDate] = useState(todayISO());
  const [slot, setSlot] = useState("");
  const [priestSlug, setPriestSlug] = useState("");
  const [taken, setTaken] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "", itemDetails: "" });
  const [area, setArea] = useState("");
  const [materialsArrangement, setMaterialsArrangement] = useState("priest");

  const { data: serviceRows } = useQuery<any[]>({
    queryKey: ["danalu", slug],
    queryFn: () => db.query("danalu_services", { slug: `eq.${slug}` }),
  });
  const { data: priests = [] } = useQuery<any[]>({
    queryKey: ["priests", "hyderabad"],
    queryFn: () => db.query("priests", { active: "eq.1", city: "eq.Hyderabad", order: "rating.desc" }),
  });

  const service = serviceRows?.[0];

  useEffect(() => {
    if (user && !form.name) {
      setForm((f) => ({
        ...f,
        name: [user.firstName, user.lastName].filter(Boolean).join(" "),
      }));
    }
  }, [user]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setChecking(true);
      setSlot("");
      const res = await functions.get("availability", { date, priest: priestSlug });
      if (!cancelled) {
        setTaken(res.taken || []);
        setChecking(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [date, priestSlug]);

  const handleConfirm = async () => {
    if (!user) {
      toast.error("Please sign in to complete your booking");
      navigate("/signin?next=/danalu/" + slug);
      return;
    }
    if (!slot) return toast.error("Please choose a time slot");
    if (!form.name || !form.phone || !form.address)
      return toast.error("Please fill in your name, phone and address");
    if (!area) return toast.error("Please select your area in Hyderabad");
    if (!form.itemDetails) return toast.error("Please describe the items you're donating");

    setSubmitting(true);
    const priest = priests.find((p) => p.slug === priestSlug);
    const reference = "DNA-" + Math.random().toString(36).slice(2, 8).toUpperCase();

    await db.insert("danalu_bookings", {
      reference,
      service_slug: service!.slug,
      service_name: service!.name,
      priest_slug: priest?.slug || "any",
      priest_name: priest?.name || "To be assigned",
      booking_date: date,
      booking_time: slot,
      customer_name: form.name,
      customer_email: user.email,
      customer_phone: form.phone,
      address: form.address,
      area,
      notes: `${form.notes}\n\nItem details: ${form.itemDetails}`,
      amount: service!.price,
      payment_status: "paid",
      status: "confirmed",
      materials_arrangement: materialsArrangement,
    });

    setSubmitting(false);
    toast.success("Daan booking confirmed — reference " + reference);
    navigate("/bookings");
  };

  if (!service)
    return (
      <Layout>
        <p className="mx-auto max-w-6xl px-4 py-24 text-muted-foreground">Loading…</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link
          to="/danalu"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Navagraha Daan
        </Link>

        <h1 className="mt-4 text-3xl text-foreground">Book {service.name}</h1>
        <p className="mt-2 text-muted-foreground">Priest will visit your home to receive your offering</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg text-foreground">1. Choose your priest</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPriestSlug("")}
                  className={`rounded-xl border p-4 text-left text-sm transition-colors ${
                    priestSlug === "" ? "border-primary bg-secondary" : "border-border hover:border-primary/40"
                  }`}
                >
                  <p className="font-medium text-foreground">Any available priest</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    We'll assign a Hyderabad-based priest.
                  </p>
                </button>
                {priests.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setPriestSlug(p.slug)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                      priestSlug === p.slug ? "border-primary bg-secondary" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <img src={p.photo_url + "&fit=crop"} alt={p.name} className="h-11 w-11 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{p.city} · {p.languages}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg text-foreground">2. Pick date & time for home visit</h2>
                <span className="text-xs text-muted-foreground">⏰ 3-hour advance booking (round-the-clock from 7 PM)</span>
              </div>
              <div className="mt-4 max-w-xs">
                <Label htmlFor="date">Date</Label>
                <div className="relative mt-1.5">
                  <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    min={todayISO()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-5">
                <Label>Available slots</Label>
                <div className="mt-2">
                  <SlotPicker taken={taken} loading={checking} value={slot} onChange={setSlot} selectedDate={date} />
                </div>
              </div>
              {slot && (
                <p className="mt-4 text-sm text-muted-foreground bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg px-3 py-2">
                  ⏱️ Your home visit is scheduled for <span className="font-medium text-foreground">{slot}</span> on <span className="font-medium text-foreground">{new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>. 
                  Evening slots (7:30 PM onwards) are available round-the-clock. Other slots require 3-hour notice for priest travel.
                </p>
              )}
              {!slot && date === todayISO() && (
                <p className="mt-4 text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-2">
                  💡 <span className="font-medium">Available times shown:</span> Past time slots are hidden for today. For early morning ceremonies (like weddings), select a future date to see all timing options.
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg text-foreground">3. Puja materials</h2>
              <div className="mt-4">
                <MaterialsArrangement 
                  value={materialsArrangement}
                  onChange={setMaterialsArrangement}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg text-foreground">4. Your details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <AreaSelector value={area} onChange={setArea} />
                </div>
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    className="mt-1.5"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    className="mt-1.5"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 …"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Complete address</Label>
                  <Textarea
                    id="address"
                    className="mt-1.5"
                    rows={2}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="House no., street, landmark…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="itemDetails">Item details</Label>
                  <Textarea
                    id="itemDetails"
                    className="mt-1.5"
                    rows={3}
                    value={form.itemDetails}
                    onChange={(e) => setForm({ ...form, itemDetails: e.target.value })}
                    placeholder="Describe what you're donating (e.g., 5kg rice, 2 dhotis, 10g gold, etc.)"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="notes">Additional notes (optional)</Label>
                  <Textarea
                    id="notes"
                    className="mt-1.5"
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Any specific instructions or temple preference…"
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 text-saffron mb-2">
                <Gift className="h-4 w-4" />
                <span className="text-xs font-medium">HOME VISIT</span>
              </div>
              <h3 className="font-display text-lg text-foreground">{service.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{service.description}</p>
              {service.items_provided && (
                <p className="mt-2 text-xs text-saffron">✓ {service.items_provided}</p>
              )}
              <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd>~{service.duration_minutes} mins</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd>{date}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Time</dt>
                  <dd>{slot || "—"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Priest</dt>
                  <dd className="max-w-[55%] truncate text-right">
                    {priests.find((p) => p.slug === priestSlug)?.name || "Any available"}
                  </dd>
                </div>
                {area && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Area</dt>
                    <dd className="text-right">{area}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Service charge</span>
                <span className="font-display text-2xl text-maroon">{formatINR(service.price)}</span>
              </div>
              <Button className="mt-5 w-full" size="lg" onClick={handleConfirm} disabled={submitting || authLoading}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {user ? "Confirm home visit" : "Sign in to confirm"}
              </Button>
              <p className="mt-3 text-xs text-center text-muted-foreground">
                {user ? "No additional payment required" : "Sign in to complete booking"}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default BookDanalu;
