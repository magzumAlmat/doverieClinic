import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";
import { FAQ } from "@/lib/site";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";

function Item({ item, open, onToggle, id }) {
  return (
    <div className="border-b border-border/50">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary"
        >
          <span className="text-lg font-semibold text-foreground">
            {item.q}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-primary transition-colors"
          >
            <Plus size={20} aria-hidden />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 text-[15px] leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <Section id="faq" className="relative overflow-hidden bg-muted/40">
      <div
        aria-hidden
        className="orb absolute left-1/2 top-0 h-[18rem] w-[18rem] -translate-x-1/2 bg-primary/6"
        style={{ animationDelay: "5s" }}
      />
      <Container className="relative max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Eyebrow>
            <HelpCircle size={14} aria-hidden /> Частые вопросы
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Отвечаем на{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              главное
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 rounded-3xl border border-border bg-card px-6 sm:px-8"
        >
          {FAQ.map((item, i) => (
            <Item
              key={item.q}
              id={i}
              item={item}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
