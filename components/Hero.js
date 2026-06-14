import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MessageCircle, ShieldCheck, Lock, Clock, Sparkles } from "lucide-react";
import { CLINIC, STATS } from "@/lib/site";
import { Container, Button, stagger, reveal, EASE } from "@/components/ui/primitives";

const trust = [
  { icon: Lock, text: "Конфиденциально" },
  { icon: ShieldCheck, text: "Лицензировано" },
  { icon: Clock, text: "Круглосуточно" },
];

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=70";

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const digits = value.replace(/\D/g, "");
    const num = parseInt(digits, 10);
    if (!num) { setDisplay(value); return; }
    const duration = 1500;
    const steps = 40;
    const increment = num / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const current = Math.min(Math.round(increment * step), num);
      setDisplay(current.toLocaleString("ru-RU"));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  const digits = value.replace(/\D/g, "");
  const firstDigitIdx = digits[0] ? value.indexOf(digits[0]) : -1;
  const prefix = firstDigitIdx > 0 ? value.slice(0, firstDigitIdx) : "";
  const rest = firstDigitIdx >= 0 ? value.slice(firstDigitIdx + digits.length) : "";

  return (
    <span ref={ref}>
      {prefix}{display}{rest}
    </span>
  );
}

const orbVariants = {
  animate: (i) => ({
    y: [0, -30, 0],
    x: [0, i % 2 === 0 ? 15 : -15, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 6 + i * 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="relative isolate flex min-h-[100vh] items-center overflow-hidden">
      {/* Background photo */}
      {imgOk && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={HERO_PHOTO}
          alt=""
          aria-hidden
          onError={() => setImgOk(false)}
          className="absolute inset-0 -z-30 h-full w-full object-cover"
        />
      )}

      {/* Light scrims */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-background via-background/90 to-background/40" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-background via-background/30 to-background/60" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 grid-pattern opacity-40" aria-hidden />

      {/* Animated floating orbs */}
      {[
        { size: "h-[30rem] w-[30rem]", pos: "-left-40 top-10", color: "rgba(13,148,136,0.1)" },
        { size: "h-[22rem] w-[22rem]", pos: "-right-20 top-1/3", color: "rgba(20,184,166,0.08)" },
        { size: "h-[18rem] w-[18rem]", pos: "left-1/3 -bottom-20", color: "rgba(234,88,12,0.05)" },
      ].map((orb, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={orbVariants}
          animate="animate"
          aria-hidden
          className={`absolute -z-10 rounded-full ${orb.size} ${orb.pos}`}
          style={{ background: `radial-gradient(circle, ${orb.color}, transparent 70%)`, filter: "blur(60px)" }}
        />
      ))}

      <Container className="py-28 sm:py-36">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={reveal}>
            <span className="glass inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
              <Sparkles size={14} className="text-accent" aria-hidden />
              Бесплатная консультация 24/7
            </span>
          </motion.div>

          {/* Heading with shine */}
          <motion.h1
            variants={reveal}
            className="mt-7 text-4xl font-extrabold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl"
          >
            Заботимся о вашем
            <br className="hidden sm:block" /> душевном здоровье{" "}
            <span className="shine-text bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              — с доверием
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={reveal}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {CLINIC.fullName}. Конфиденциальная помощь психиатра,
            психотерапевта и психолога по доказательным методикам — бережно
            и с поддержкой для всей семьи.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-3">
            <Button href={CLINIC.phoneHref} variant="primary" size="lg">
              <Phone size={18} aria-hidden />
              Позвонить сейчас
            </Button>
            <Button href="#quiz" variant="outline" size="lg">
              Пройти тест-анкету
            </Button>
            <Button
              href={CLINIC.whatsapp}
              variant="ghost"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} aria-hidden />
              WhatsApp
            </Button>
          </motion.div>

          {/* Trust badges — glass cards */}
          <motion.ul variants={reveal} className="mt-8 flex flex-wrap gap-3">
            {trust.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="glass flex items-center gap-2 rounded-xl border border-border/50 px-4 py-2.5 text-sm font-medium text-foreground"
              >
                <Icon size={18} className="text-primary" aria-hidden />
                {text}
              </li>
            ))}
          </motion.ul>

          {/* Animated stats */}
          <motion.dl
            variants={reveal}
            className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t border-border/50 pt-8 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-extrabold tabular-nums text-primary sm:text-3xl">
                  <AnimatedNumber value={s.value} />
                </dt>
                <dd className="mt-0.5 text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden />
    </section>
  );
}
