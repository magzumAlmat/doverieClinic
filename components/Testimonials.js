import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";

function Card({ t }) {
  return (
    <motion.figure
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      className="pulse-glow flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all"
    >
      <div className="flex items-center gap-1 text-warm" aria-label={`${t.rating} из 5`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-warm" aria-hidden />
        ))}
      </div>
      <Quote size={28} className="mt-4 text-primary/20" aria-hidden />
      <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-foreground">
        {t.text}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border/50 pt-4">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-on-primary"
          aria-hidden
        >
          {t.author[0]}
        </span>
        <span className="min-w-0">
          <span className="block font-bold text-foreground">{t.author}</span>
          <span className="block text-sm text-muted-foreground">{t.role}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

function ScrollColumn({ items, duration = 20, className = "" }) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ y: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-5 pb-5"
      >
        {doubled.map((t, i) => (
          <Card key={`${t.author}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const col1 = TESTIMONIALS.slice(0, 3);
  const col2 = TESTIMONIALS.slice(2, 5);
  const col3 = [...TESTIMONIALS.slice(0, 2), TESTIMONIALS[4]];

  return (
    <Section id="reviews" className="relative overflow-hidden">
      <div
        aria-hidden
        className="orb absolute right-0 top-1/2 h-[20rem] w-[20rem] -translate-y-1/2 bg-primary/8"
        style={{ animationDelay: "1s" }}
      />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow>
            <Star size={16} className="fill-warm text-warm" aria-hidden /> Отзывы
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Истории, ради которых{" "}
            <span className="bg-gradient-to-r from-warm to-accent bg-clip-text text-transparent">
              мы работаем
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Реальные слова близких и выпускников программы. Имена изменены —
            мы бережём конфиденциальность каждого.
          </p>
        </motion.div>

        {/* Scrolling columns — masked top/bottom */}
        <div
          className="mt-12 flex justify-center gap-5 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] max-h-[640px] overflow-hidden"
          role="region"
          aria-label="Прокручивающиеся отзывы"
        >
          <ScrollColumn items={col1} duration={22} />
          <ScrollColumn items={col2} duration={28} className="hidden md:block" />
          <ScrollColumn items={col3} duration={25} className="hidden lg:block" />
        </div>
      </Container>
    </Section>
  );
}
