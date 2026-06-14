import { motion } from "framer-motion";
import {
  ShieldPlus,
  HeartHandshake,
  Brain,
  Users,
  Sprout,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import { SERVICES, STEPS } from "@/lib/site";
import { Container, Section, Eyebrow, reveal, stagger } from "@/components/ui/primitives";

const ICONS = { ShieldPlus, HeartHandshake, Brain, Users, Sprout, LifeBuoy };

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  return (
    <Section id="services" className="relative overflow-hidden">
      {/* Background orb */}
      <div
        aria-hidden
        className="orb absolute -right-40 top-20 h-[28rem] w-[28rem] bg-primary/10"
        style={{ animationDelay: "2s" }}
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <Eyebrow>Наши услуги</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Помощь на каждом этапе —{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              от первой консультации до устойчивого результата
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Каждый этап ведут профильные специалисты. Программа подбирается
            индивидуально под человека и его историю.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.article
                key={s.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="pulse-glow group relative rounded-3xl border border-border bg-card p-6 shadow-sm transition-all"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-muted text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-lg group-hover:shadow-primary/20">
                  {Icon ? <Icon size={24} aria-hidden /> : null}
                </span>
                <h3 className="relative mt-5 text-xl font-bold text-foreground">
                  {s.title}
                </h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
                <div className="relative mt-4 flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-muted px-3 py-1 text-sm font-semibold text-primary-600">
                    {s.duration}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
                    aria-hidden
                  />
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Process steps — timeline style */}
        <div className="mt-16 rounded-3xl border border-border bg-gradient-to-br from-muted to-card p-6 sm:p-10">
          <h3 className="text-2xl font-bold text-foreground">Как мы работаем</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <motion.span
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-600 text-lg font-bold text-on-primary shadow-lg shadow-primary/20 transition-shadow"
                >
                  {step.n}
                </motion.span>
                <h4 className="mt-4 text-lg font-bold text-foreground">
                  {step.title}
                </h4>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {step.text}
                </p>
                {i < STEPS.length - 1 && (
                  <div className="absolute right-0 top-6 hidden h-px w-8 bg-gradient-to-r from-primary/40 to-transparent lg:block" aria-hidden />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
