import { motion } from "framer-motion";
import { HeartPulse, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { CLINIC, NAV } from "@/lib/site";
import { Container } from "@/components/ui/primitives";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/20">
                <HeartPulse size={22} aria-hidden />
              </span>
              <span className="text-xl font-extrabold text-foreground">
                {CLINIC.name}
                <span className="text-primary"> clinic</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {CLINIC.tagline}.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Разделы
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {n.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Контакты
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" aria-hidden />
                <a href={CLINIC.phoneHref} className="transition-colors hover:text-primary">
                  {CLINIC.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" aria-hidden />
                <a href={CLINIC.phone2Href} className="transition-colors hover:text-primary">
                  {CLINIC.phone2}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" aria-hidden />
                <a href={`mailto:${CLINIC.email}`} className="transition-colors hover:text-primary">
                  {CLINIC.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-primary" aria-hidden />
                {CLINIC.address}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Помощь рядом
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Если вы или близкий в кризисе — не оставайтесь одни. Позвоните,
              мы на связи {CLINIC.hours.toLowerCase()}.
            </p>
            <motion.a
              href={CLINIC.phoneHref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-3 inline-block rounded-full bg-accent-600 px-5 py-2.5 text-sm font-semibold text-on-primary shadow-lg shadow-accent/20 transition-colors hover:bg-accent-700"
            >
              Позвонить сейчас
            </motion.a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {year} {CLINIC.fullName}. Все права защищены.
          </p>
          <p>Есть противопоказания. Необходима консультация специалиста.</p>
        </div>
      </Container>
    </footer>
  );
}
