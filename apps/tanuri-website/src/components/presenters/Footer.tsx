import { SiteLogo } from "@/components";
import { NAVIGATION_ITEMS } from "@/data";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 py-16 grid gap-12 md:grid-cols-2">
        <section>
          <div className="flex items-center gap-3 mb-5">
            <SiteLogo />
            <h2 className="text-2xl font-bold tracking-tight">Tanuri</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Order cooking gas with speed, safety, and convenience. Smart
            delivery, secure payments, and real-time tracking - Tanuri keeps
            your home running.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-5">Navigation</h2>
          <ul className="space-y-3">
            {NAVIGATION_ITEMS.map((navigationItem) => (
              <li key={navigationItem.href}>
                <a
                  href={`#${navigationItem.href}`}
                  className="flex items-center gap-2 text-sm hover:text-foreground hover:underline transition-colors"
                >
                  <navigationItem.Icon className="h-4 w-4" />
                  {navigationItem.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-border mt-12 pt-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} <strong>Tanuri</strong>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
