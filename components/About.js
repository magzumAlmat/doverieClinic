import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, BadgeCheck, Clock, Hand } from "lucide-react";
import { VALUES, STATS } from "@/lib/site";
import { Container, Section, Eyebrow, reveal, stagger } from "@/components/ui/primitives";

const ICONS = { Lock, BadgeCheck, Clock, Hand };

function AnimatedStat({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const digits = value.replace(/\D/g, "");
    const num = parseInt(digits, 10);
    if (!num) { setDisplay(value); return; }
    const steps = 30;
    const increment = num / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const current = Math.min(Math.round(increment * step), num);
      setDisplay(current.toLocaleString("ru-RU"));
      if (step >= steps) clearInterval(timer);
    }, 1200 / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  const digits = value.replace(/\D/g, "");
  const firstIdx = digits[0] ? value.indexOf(digits[0]) : -1;
  const prefix = firstIdx > 0 ? value.slice(0, firstIdx) : "";
  const rest = firstIdx >= 0 ? value.slice(firstIdx + digits.length) : "";

  return <span ref={ref}>{prefix}{display}{rest}</span>;
}

export default function About() {
  return (
    <Section id="about" className="relative overflow-hidden bg-muted/40">
      <div
        aria-hidden
        className="orb absolute -right-32 bottom-10 h-[20rem] w-[20rem] bg-accent/6"
        style={{ animationDelay: "4s" }}
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>О центре</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              «Доверие» — это безопасное пространство{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                для выздоровления
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Мы — команда врачей, психологов и консультантов, которые более
              12 лет помогают людям вернуться к полноценной жизни. Мы не осуждаем
              и не давим. Мы создаём условия, в которых человек способен
              захотеть выздороветь и удержать результат.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <div className="text-2xl font-extrabold text-primary sm:text-3xl tabular-nums">
                    <AnimatedStat value={s.value} />
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {VALUES.map((v) => {
              const Icon = ICONS[v.icon];
              return (
                <motion.div
                  key={v.title}
                  variants={reveal}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="pulse-glow rounded-2xl border border-border bg-card p-5 transition-all"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="mt-3 font-bold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
