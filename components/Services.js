import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldPlus,
  HeartHandshake,
  Brain,
  Users,
  Sprout,
  LifeBuoy,
  ArrowRight,
  Phone,
  X,
  CheckCircle2,
} from "lucide-react";
import { SERVICES, STEPS } from "@/lib/site";
import {
  Container,
  Section,
  Eyebrow,
  Button,
  inputClass,
  stagger,
} from "@/components/ui/primitives";

const ICONS = { ShieldPlus, HeartHandshake, Brain, Users, Sprout, LifeBuoy };

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  const [active, setActive] = useState(null); // название услуги или null
  const [form, setForm] = useState({ phone: "", message: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function openModal(title) {
    setActive(title);
    setForm({ phone: "", message: "" });
    setError("");
    setSent(false);
  }
  function closeModal() {
    setActive(null);
  }

  async function submit(e) {
    e.preventDefault();
    if (form.phone.replace(/\D/g, "").length < 10) {
      setError("Введите корректный номер телефона");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone,
          message: form.message,
          source: `Услуга: ${active}`,
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

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
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="pulse-glow group relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all"
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
                <Button
                  as="button"
                  type="button"
                  variant="outline"
                  className="relative mt-5 w-full"
                  onClick={() => openModal(s.title)}
                >
                  <Phone size={16} aria-hidden /> Проконсультироваться
                </Button>
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

      {/* ── Модалка консультации ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Заявка на консультацию"
          >
            <motion.div
              className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Закрыть"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
              >
                <X size={20} aria-hidden />
              </button>

              {sent ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent">
                    <CheckCircle2 size={36} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-foreground">
                    Заявка отправлена
                  </h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">
                    Мы перезвоним вам в ближайшее время. Берегите себя.
                  </p>
                  <Button as="button" variant="ghost" className="mt-6" onClick={closeModal}>
                    Закрыть
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <p className="text-sm font-semibold text-primary-600">{active}</p>
                  <h3 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                    Проконсультироваться
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Оставьте телефон — перезвоним и бесплатно проконсультируем.
                  </p>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label
                        htmlFor="svc-phone"
                        className="mb-1.5 block text-sm font-semibold text-foreground"
                      >
                        Телефон <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="svc-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        autoFocus
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        aria-invalid={!!error}
                        className={inputClass}
                        placeholder="+7 (___) ___-__-__"
                      />
                      {error && (
                        <p role="alert" className="mt-1.5 text-sm text-destructive">
                          {error}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="svc-msg"
                        className="mb-1.5 block text-sm font-semibold text-foreground"
                      >
                        Текст заявки
                      </label>
                      <textarea
                        id="svc-msg"
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputClass} resize-none`}
                        placeholder="Опишите вашу ситуацию или вопрос"
                      />
                    </div>
                  </div>

                  <Button
                    as="button"
                    type="submit"
                    variant="accent"
                    className="mt-6 w-full"
                    loading={loading}
                  >
                    {loading ? "Отправляем…" : "Отправить заявку"}
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
