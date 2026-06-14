import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
} from "lucide-react";
import { CLINIC } from "@/lib/site";
import {
  Container,
  Section,
  Eyebrow,
  Button,
  inputClass,
} from "@/components/ui/primitives";

const info = [
  { icon: Phone, label: "Телефон", value: CLINIC.phone, href: CLINIC.phoneHref },
  { icon: Phone, label: "Телефон 2", value: CLINIC.phone2, href: CLINIC.phone2Href },
  { icon: Mail, label: "Почта", value: CLINIC.email, href: `mailto:${CLINIC.email}` },
  { icon: MapPin, label: "Адрес", value: CLINIC.address },
  { icon: Clock, label: "Часы работы", value: CLINIC.hours },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Укажите имя";
    if (form.phone.replace(/\D/g, "").length < 10) errs.phone = "Введите номер";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contacts" }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="contacts" className="relative overflow-hidden">
      <div
        aria-hidden
        className="orb absolute -left-20 bottom-0 h-[22rem] w-[22rem] bg-accent/6"
        style={{ animationDelay: "7s" }}
      />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>
              <Send size={14} aria-hidden /> Контакты
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Сделайте первый шаг —{" "}
              <span className="bg-gradient-to-r from-accent to-warm bg-clip-text text-transparent">
                позвоните
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Линия доверия работает круглосуточно. Звонок бесплатный
              и конфиденциальный — мы поможем разобраться, что делать дальше.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {info.map(({ icon: Icon, label, value, href }) => {
                const Wrap = href ? "a" : "div";
                return (
                  <motion.div
                    key={label}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Wrap
                      href={href}
                      className="pulse-glow flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-all"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon size={20} aria-hidden />
                      </span>
                      <div>
                        <div className="text-sm text-muted-foreground">{label}</div>
                        <div className="font-semibold text-foreground">{value}</div>
                      </div>
                    </Wrap>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={CLINIC.phoneHref} variant="primary">
                <Phone size={18} aria-hidden /> Позвонить
              </Button>
              <Button
                href={CLINIC.whatsapp}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} aria-hidden /> Написать в WhatsApp
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pulse-glow rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8"
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex h-full flex-col items-center justify-center py-10 text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 size={36} aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-foreground">
                  Заявка отправлена
                </h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Мы свяжемся с вами в ближайшее время. Берегите себя.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 className="text-xl font-bold text-foreground">
                  Оставить заявку
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Перезвоним и бесплатно проконсультируем.
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="c-name"
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      Имя <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "c-name-err" : undefined}
                      className={inputClass}
                      placeholder="Ваше имя"
                    />
                    {errors.name && (
                      <p id="c-name-err" role="alert" className="mt-1.5 text-sm text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="c-phone"
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      Телефон <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="c-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "c-phone-err" : undefined}
                      className={inputClass}
                      placeholder="+7 (___) ___-__-__"
                    />
                    {errors.phone && (
                      <p id="c-phone-err" role="alert" className="mt-1.5 text-sm text-destructive">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="c-message"
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      Сообщение
                    </label>
                    <textarea
                      id="c-message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      placeholder="Опишите ситуацию (необязательно)"
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
        </div>
      </Container>
    </Section>
  );
}
