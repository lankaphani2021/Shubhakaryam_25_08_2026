import { Flame } from "lucide-react";

const SiteFooter = () => (
  <footer className="mt-24 border-t border-border bg-secondary/50">
    <div className="paisley-divider h-3 w-full opacity-70" />
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
      <div>
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-saffron" />
          <span className="font-display text-lg text-maroon">Shubhakaryam</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Authentic Vedic ceremonies across Hyderabad, performed by verified
          priests and booked in minutes.
        </p>
      </div>
      <div>
        <h4 className="font-display text-sm text-foreground">Popular poojas</h4>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li>Satyanarayana Vratam</li>
          <li>Griha Pravesham</li>
          <li>Ganapathi Homam</li>
          <li>Rudrabhishekam</li>
        </ul>
      </div>
      <div>
        <h4 className="font-display text-sm text-foreground">Support</h4>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li>help@shubhakaryam.example</li>
          <li>+91 98000 00000</li>
          <li>Mon–Sun, 6am to 9pm IST</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Shubhakaryam. Demo platform — payments are simulated.
    </div>
  </footer>
);

export default SiteFooter;
