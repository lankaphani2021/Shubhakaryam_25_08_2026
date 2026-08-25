import { NAVAGRAHA_ITEMS, PLANET_ORDER } from "@/lib/navagraha-items";

const NavagrahaReference = () => (
  <div className="rounded-xl border border-border bg-secondary/30 p-6">
    <h3 className="font-display text-lg text-foreground mb-4">Navagraha Daan Items Reference</h3>
    <p className="text-sm text-muted-foreground mb-6">
      According to Vedic astrology, each of the 9 planets (Navagraha) has specific offerings that bring blessings 
      and remedy doshas when donated through priests.
    </p>
    
    <div className="space-y-4">
      {PLANET_ORDER.map((planet) => {
        const info = NAVAGRAHA_ITEMS[planet as keyof typeof NAVAGRAHA_ITEMS];
        return (
          <div key={planet} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-display text-base text-foreground">{info.name}</h4>
                  <span className="text-xs text-muted-foreground">({info.hindi})</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-saffron">Items to offer: </span>
                    <span className="text-muted-foreground">{info.items.join(", ")}</span>
                  </div>
                  <div>
                    <span className="font-medium text-saffron">Benefits: </span>
                    <span className="text-muted-foreground">{info.benefits}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Day: {info.day}</span>
                    <span>Color: {info.color}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    
    <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
      <p className="text-xs text-foreground">
        <strong>Important:</strong> These items should be donated through qualified priests who will 
        perform the necessary rituals and ensure the offerings reach appropriate temples or beneficiaries. 
        Book a Navagraha Daan home visit for proper procedure and maximum benefits.
      </p>
    </div>
  </div>
);

export default NavagrahaReference;
