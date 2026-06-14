import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function Container({ className = "", children }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-semibold text-primary-600">
      {children}
    </span>
  );
}

// ── Design tokens ─────────────────────────────────────────────
// Shared motion easing (was a repeated magic-number in 3 files).
export const EASE = [0.22, 1, 0.36, 1];

// Single source of truth for text-field styling (was duplicated 5×).
// Note: no `outline-none` — the global :focus-visible ring stays visible (a11y).
export const inputClass =
  "w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground/80 focus:border-primary";

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-7 py-3.5 text-lg",
};

export function Button({
  as = "a",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    // -600/-700 shades keep white label text ≥4.5:1 (WCAG 1.4.3)
    primary: "bg-primary-600 text-on-primary hover:bg-primary-700",
    accent: "bg-accent-600 text-on-primary hover:bg-accent-700",
    outline: "border-2 border-primary text-primary-600 hover:bg-muted",
    ghost: "text-primary-600 hover:bg-muted",
  };
  const Comp = motion[as] || motion.a;
  const isDisabled = disabled || loading;
  return (
    <Comp
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      aria-busy={loading || undefined}
      disabled={as === "button" ? isDisabled : undefined}
      className={`${base} ${variants[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading && <Loader2 size={18} className="animate-spin" aria-hidden />}
      {children}
    </Comp>
  );
}

// ── Scroll-reveal helpers ─────────────────────────────────────
export const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
