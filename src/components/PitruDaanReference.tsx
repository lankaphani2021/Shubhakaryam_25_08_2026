import { PITRU_DAAN_INFO, PITRU_DOSH_SIGNS } from "@/lib/pitru-daan-info";

const PitruDaanReference = () => (
  <div className="rounded-xl border border-border bg-secondary/30 p-6">
    <h3 className="font-display text-lg text-foreground mb-4">Understanding Pind Daan</h3>
    
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-saffron mb-2">What is Pind Daan?</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {PITRU_DAAN_INFO.significance}
        </p>
      </div>

      <div>
        <h4 className="font-medium text-saffron mb-2">Benefits of Pind Daan</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {PITRU_DAAN_INFO.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-saffron mt-1">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-saffron mb-2">When to Perform</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {PITRU_DAAN_INFO.whenToPerform.map((time, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-saffron mt-1">•</span>
              <span>{time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
        <h4 className="font-medium text-foreground mb-2">Signs of Pitru Dosh (Ancestral Affliction)</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Consider performing Pind Daan if your family experiences:
        </p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          {PITRU_DOSH_SIGNS.map((sign, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-saffron">⚠</span>
              <span>{sign}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 rounded-lg bg-saffron/10 border border-saffron/20">
        <h4 className="font-medium text-foreground mb-2">How It Works</h4>
        <p className="text-xs text-muted-foreground">
          {PITRU_DAAN_INFO.process}
        </p>
        <p className="mt-3 text-xs text-foreground">
          <strong>Home Visit Service:</strong> Our trained priest will visit your home with all necessary materials, 
          perform the complete ceremony, and ensure proper disposal of offerings in sacred waters as per tradition.
        </p>
      </div>
    </div>
  </div>
);

export default PitruDaanReference;
