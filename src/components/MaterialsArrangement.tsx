import { Package, User, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface MaterialsArrangementProps {
  value: string;
  onChange: (value: string) => void;
}

const materials = [
  {
    id: "priest",
    title: "Priest brings all materials",
    description: "Convenience • Complete setup • No preparation needed",
    icon: Package,
    color: "bg-green-50 border-green-200",
    selectedColor: "border-green-500 bg-green-50",
    features: [
      "Priest brings all pooja samagri",
      "Complete ritual setup provided",
      "No preparation required from your side",
      "Ideal for busy families"
    ]
  },
  {
    id: "customer",
    title: "I will arrange materials",
    description: "Traditional • Cost effective • Personal preparation",
    icon: User,
    color: "bg-orange-50 border-orange-200",
    selectedColor: "border-orange-500 bg-orange-50",
    features: [
      "You arrange all pooja materials",
      "Priest guidance on requirements provided",
      "Traditional approach",
      "Cost effective option"
    ]
  }
];

const MaterialsArrangement = ({ value, onChange }: MaterialsArrangementProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium text-foreground">
        Who will arrange pooja materials?
      </Label>
      <div className="grid gap-3 sm:grid-cols-2">
        {materials.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.id;
          
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                isSelected 
                  ? `${option.selectedColor} shadow-sm` 
                  : `${option.color} border-transparent hover:border-border/50`
              }`}
            >
              {isSelected && (
                <div className="absolute right-3 top-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  isSelected ? 'bg-white' : 'bg-white/60'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">
                    {option.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
              
              <ul className="mt-3 space-y-1">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-current opacity-50" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
      
      <p className="text-xs text-muted-foreground">
        💡 Tip: Most families prefer priest bringing materials for convenience, but traditional families often prefer arranging materials themselves.
      </p>
    </div>
  );
};

export default MaterialsArrangement;