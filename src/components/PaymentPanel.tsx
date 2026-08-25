import { Lock, CreditCard } from "lucide-react";
import { formatINR } from "@/lib/types";

const PaymentPanel = ({ amount }: { amount: number }) => (
  <div className="rounded-xl border border-border bg-secondary/50 p-5">
    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
      <CreditCard className="h-4 w-4 text-saffron" /> Payment
    </div>
    <p className="mt-2 text-sm text-muted-foreground">
      A secure card payment of{" "}
      <span className="font-medium text-maroon">{formatINR(amount)}</span> is taken when
      you confirm. In this demo the payment is simulated and marked as paid instantly.
    </p>
    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
      <Lock className="h-3 w-3" /> Card details are never stored on our servers.
    </p>
  </div>
);

export default PaymentPanel;
