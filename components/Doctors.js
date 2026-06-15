import { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope, Quote } from "lucide-react";
import { DOCTORS } from "@/lib/site";
import { Container, Section, Eyebrow, reveal, stagger } from "@/components/ui/primitives";

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function DoctorCard({ doc }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="pulse-glow group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/15 to-accent/15">
        {imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={doc.photo}
            alt={`Фото врача: ${doc.name}, ${doc.role}`}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-5xl font-extrabold text-on-primary"
            aria-hidden
          >
            {initials(doc.name)}
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Experience badge */}
        <motion.span
          whileHover={{ scale: 1.1 }}
          className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-primary-600 backdrop-blur-sm shadow-lg shadow-black/10"
        >
          {doc.exp}
        </motion.span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground">{doc.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Stethoscope size={15} className="shrink-0 text-primary" aria-hidden />
          {doc.role}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {doc.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function Doctors() {
  return (
    <Section id="doctors" className="relative overflow-hidden bg-muted/40">
      <div
        aria-hidden
        className="orb absolute -left-20 top-1/3 h-[22rem] w-[22rem] bg-secondary/8"
      />
      <Container className="relative">
        <div className="grid items-end gap-6 sm:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <Eyebrow>
              <Stethoscope size={16} aria-hidden /> Команда врачей
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Вас лечат люди, которым{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                можно доверять
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Психиатры, психотерапевты и психологи с подтверждённой квалификацией.
              Каждый специалист — это годы практики и сотни историй,
              когда людям стало легче.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden items-start gap-2 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground sm:flex"
          >
            <Quote size={18} className="shrink-0 text-primary" aria-hidden />
            <span className="max-w-[15rem]">
              «Сложности — это не выбор, а состояние. И с ним можно справиться.»
            </span>
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:mx-auto lg:max-w-3xl"
        >
          {DOCTORS.map((doc) => (
            <DoctorCard key={doc.name} doc={doc} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
