import { motion } from "framer-motion";
import { ScrollText, ShieldCheck } from "lucide-react";
import { LICENSES } from "@/lib/site";
import { Container, Section, Eyebrow, reveal, stagger } from "@/components/ui/primitives";

export default function Licenses() {
  return (
    <Section id="licenses" className="relative overflow-hidden">
      <div
        aria-hidden
        className="orb absolute right-0 top-0 h-[16rem] w-[16rem] bg-primary/5"
        style={{ animationDelay: "6s" }}
      />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <Eyebrow>
              <ShieldCheck size={16} aria-hidden /> Документы
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Работаем{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                официально и легально
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Все процедуры проводятся на основании действующих лицензий
              и разрешений. Документы предоставляются по запросу.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-5 sm:grid-cols-2"
        >
          {LICENSES.map((l) => (
            <motion.div
              key={l.num}
              variants={reveal}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="pulse-glow flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors">
                <ScrollText size={24} aria-hidden />
              </span>
              <div>
                <h3 className="font-bold text-foreground">{l.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {l.num} · {l.org}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
