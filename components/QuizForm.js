import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { QUIZ, CLINIC } from "@/lib/site";
import {
  Container,
  Section,
  Eyebrow,
  Button,
  inputClass,
  EASE,
} from "@/components/ui/primitives";

const toneMap = {
  accent: { bg: "bg-accent/10", text: "text-accent-600", ring: "ring-accent/30" },
  warm: { bg: "bg-warm/15", text: "text-warm-700", ring: "ring-warm/40" },
  primary: { bg: "bg-primary/10", text: "text-primary-600", ring: "ring-primary/30" },
};

export default function QuizForm() {
  // step: 0..N-1 questions, "result", "contact", "done"
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});

  // Focus management: when a step changes via user action, move focus to the
  // new panel so keyboard / screen-reader users aren't dropped to <body>.
  const panelRef = useRef(null);
  const advancedRef = useRef(false);

  const questions = QUIZ.questions;
  const total = questions.length;
  const isQuestion = typeof step === "number";

  const score = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers]
  );
  const result = useMemo(
    () => QUIZ.results.find((r) => score <= r.max) ?? QUIZ.results.at(-1),
    [score]
  );

  const progress = isQuestion
    ? (step / total) * 100
    : step === "result"
    ? 100
    : 100;

  function pick(qId, value) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    advancedRef.current = true;
    // auto-advance for snappy feel
    setTimeout(() => {
      setStep((s) => (typeof s === "number" && s < total - 1 ? s + 1 : "result"));
    }, 220);
  }

  function back() {
    advancedRef.current = true;
    if (typeof step === "number" && step > 0) setStep(step - 1);
    else if (step === "result") setStep(total - 1);
    else if (step === "contact") setStep("result");
  }

  // Focus the freshly-mounted question panel after its enter animation.
  // Guarded so it never steals focus / scrolls on initial page load.
  function focusPanel() {
    if (advancedRef.current) panelRef.current?.focus();
  }

  function validateAndSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (contact.name.trim().length < 2) errs.name = "Укажите имя";
    const digits = contact.phone.replace(/\D/g, "");
    if (digits.length < 10) errs.phone = "Введите корректный номер";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const details =
        questions
          .map((q) => {
            const opt = q.options.find((o) => o.score === answers[q.id]);
            return `• ${q.text} — ${opt ? opt.label : "—"}`;
          })
          .join("\n") + `\n\nРезультат: ${result?.title ?? "—"} (баллы: ${score})`;
      // fire-and-forget → Telegram через /api/lead
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          phone: contact.phone,
          source: "quiz",
          details,
        }),
      }).catch(() => {});
      setStep("done");
    }
  }

  function reset() {
    advancedRef.current = false;
    setStep(0);
    setAnswers({});
    setContact({ name: "", phone: "" });
    setErrors({});
  }

  const tone = toneMap[result?.tone] ?? toneMap.primary;

  return (
    <Section id="quiz">
      <Container className="max-w-3xl">
        <div className="text-center">
          <Eyebrow>
            <Sparkles size={16} aria-hidden /> Конфиденциальный тест
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Нужна ли помощь? Проверьте за 1 минуту
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {QUIZ.intro}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
          {/* progress */}
          <div
            className="h-1.5 w-full bg-muted"
            role="progressbar"
            aria-label="Прогресс теста"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>

          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {/* ── Questions ── */}
              {isQuestion && (
                <motion.div
                  key={`q-${step}`}
                  ref={panelRef}
                  tabIndex={-1}
                  className="outline-none"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  onAnimationComplete={focusPanel}
                >
                  <p className="text-sm font-semibold text-primary-600">
                    Вопрос {step + 1} из {total}
                  </p>
                  <h3
                    id={`q-head-${step}`}
                    className="mt-2 text-xl font-bold text-foreground sm:text-2xl"
                  >
                    {questions[step].text}
                  </h3>

                  <div
                    className="mt-6 grid gap-3"
                    role="radiogroup"
                    aria-labelledby={`q-head-${step}`}
                  >
                    {questions[step].options.map((opt) => {
                      const selected = answers[questions[step].id] === opt.score;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => pick(questions[step].id, opt.score)}
                          className={`flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left text-[15px] font-medium transition-all cursor-pointer ${
                            selected
                              ? "border-primary bg-muted text-foreground"
                              : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/60"
                          }`}
                        >
                          {opt.label}
                          <span
                            className={`grid h-6 w-6 place-items-center rounded-full border-2 ${
                              selected
                                ? "border-primary bg-primary text-on-primary"
                                : "border-border"
                            }`}
                          >
                            {selected && <CheckCircle2 size={16} aria-hidden />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <ArrowLeft size={16} aria-hidden /> Назад
                    </button>
                  )}
                </motion.div>
              )}

              {/* ── Result ── */}
              {step === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div
                    className={`mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ring-1 ${tone.bg} ${tone.text} ${tone.ring}`}
                  >
                    Ваш результат
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
                    {result.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                    {result.text}
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button
                      as="button"
                      variant="primary"
                      onClick={() => setStep("contact")}
                    >
                      Получить консультацию
                      <ArrowRight size={18} aria-hidden />
                    </Button>
                    <Button as="button" variant="ghost" onClick={reset}>
                      <RotateCcw size={16} aria-hidden /> Пройти заново
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ── Contact capture ── */}
              {step === "contact" && (
                <motion.form
                  key="contact"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={validateAndSubmit}
                  noValidate
                >
                  <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                    Оставьте контакты — перезвоним в течение 15 минут
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Бесплатно и конфиденциально. Нажимая «Отправить», вы соглашаетесь
                    на обработку данных.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label
                        htmlFor="q-name"
                        className="mb-1.5 block text-sm font-semibold text-foreground"
                      >
                        Как к вам обращаться?{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="q-name"
                        type="text"
                        autoComplete="name"
                        value={contact.name}
                        onChange={(e) =>
                          setContact({ ...contact, name: e.target.value })
                        }
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "q-name-err" : undefined}
                        className={inputClass}
                        placeholder="Имя"
                      />
                      {errors.name && (
                        <p
                          id="q-name-err"
                          role="alert"
                          className="mt-1.5 text-sm text-destructive"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="q-phone"
                        className="mb-1.5 block text-sm font-semibold text-foreground"
                      >
                        Телефон <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="q-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={contact.phone}
                        onChange={(e) =>
                          setContact({ ...contact, phone: e.target.value })
                        }
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "q-phone-err" : undefined}
                        className={inputClass}
                        placeholder="+7 (___) ___-__-__"
                      />
                      {errors.phone && (
                        <p
                          id="q-phone-err"
                          role="alert"
                          className="mt-1.5 text-sm text-destructive"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button as="button" type="submit" variant="accent">
                      <Phone size={18} aria-hidden /> Отправить заявку
                    </Button>
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <ArrowLeft size={16} aria-hidden /> Назад
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ── Done ── */}
              {step === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="py-6 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent"
                  >
                    <CheckCircle2 size={36} aria-hidden />
                  </motion.span>
                  <h3 className="mt-5 text-2xl font-bold text-foreground">
                    Спасибо, {contact.name || "друг"}!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                    Заявка принята. Специалист перезвонит вам в ближайшее время.
                    Если нужно срочно — звоните сами:
                  </p>
                  <a
                    href={CLINIC.phoneHref}
                    className="mt-3 inline-block text-xl font-extrabold text-primary"
                  >
                    {CLINIC.phone}
                  </a>
                  <div className="mt-6">
                    <Button as="button" variant="ghost" onClick={reset}>
                      <RotateCcw size={16} aria-hidden /> Пройти тест заново
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
