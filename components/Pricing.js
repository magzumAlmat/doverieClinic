import { motion } from "framer-motion";
import { Check, Phone, Star, Sparkles } from "lucide-react";
import { PRICING, PRICING_PERKS, CLINIC } from "@/lib/site";
import { Container, Section, Eyebrow, Button, reveal, stagger } from "@/components/ui/primitives";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Pricing() {
  return (
    <Section id="pricing" className="relative overflow-hidden">
      <div
        aria-hidden
        className="orb absolute -left-32 bottom-0 h-[24rem] w-[24rem] bg-accent/8"
        style={{ animationDelay: "3s" }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>
            <Sparkles size={14} aria-hidden /> Услуги и цены
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Прозрачные цены —{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              без скрытых доплат
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Стоимость зависит от состояния и выбранной программы. Точную цену
            назовём на бесплатной консультации.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PRICING.map((p) => (
            <motion.div
              key={p.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`pulse-glow relative flex flex-col rounded-3xl border p-6 shadow-sm transition-all ${
                p.featured
                  ? "border-primary/50 bg-gradient-to-br from-primary-600 to-primary-700 text-on-primary shadow-primary/20 shadow-lg"
                  : "border-border bg-card"
              }`}
            >
              {p.featured && (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
                  <Star size={13} aria-hidden /> Популярное
                </span>
              )}
              <h3
                className={`pr-20 text-lg font-bold ${
                  p.featured ? "text-on-primary" : "text-foreground"
                }`}
              >
                {p.title}
              </h3>
              <motion.p
                className={`mt-3 text-3xl font-extrabold tracking-tight tabular-nums ${
                  p.featured ? "text-on-primary" : "text-primary"
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {p.price}
              </motion.p>
              <p
                className={`mt-2 flex-1 text-sm leading-relaxed ${
                  p.featured ? "text-on-primary/90" : "text-muted-foreground"
                }`}
              >
                {p.note}
              </p>
              <Button
                href={CLINIC.phoneHref}
                variant={p.featured ? "accent" : "outline"}
                className="mt-5 w-full"
              >
                <Phone size={17} aria-hidden /> Узнать подробнее
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Perks bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-3xl border border-border bg-muted/50 px-6 py-5"
        >
          {PRICING_PERKS.map((perk) => (
            <span
              key={perk}
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <Check size={18} className="text-accent" aria-hidden />
              {perk}
            </span>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Цены указаны как ориентир. Окончательная стоимость определяется
          индивидуально.
        </p>
      </Container>
    </Section>
  );
}
