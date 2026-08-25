import { Search, CalendarDays, UserCheck, CreditCard } from "lucide-react";

const steps = [
  { icon: Search, title: "Choose a pooja", text: "Browse by deity, occasion or category with clear pricing." },
  { icon: UserCheck, title: "Pick your priest", text: "See tradition, languages and experience before you decide." },
  { icon: CalendarDays, title: "Select date & slot", text: "Only genuinely open muhurtham slots are shown." },
  { icon: CreditCard, title: "Confirm securely", text: "Pay online and receive an instant booking reference." },
];

const HowItWorks = () => (
  <section className="mx-auto max-w-6xl px-4 py-20">
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-saffron">How it works</p>
      <h2 className="mt-3 text-3xl text-foreground">Book poojas across Hyderabad in 4 steps</h2>
    </div>
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-maroon">
            <s.icon className="h-5 w-5" />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Step {i + 1}</p>
          <h3 className="mt-1 font-display text-lg text-foreground">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
