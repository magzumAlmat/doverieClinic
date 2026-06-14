import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { CLINIC } from "@/lib/site";

// Mobile-only sticky action bar — appears after the user scrolls past the hero.
// Desktop already has a persistent phone button in the navbar.
export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto flex max-w-md items-center gap-3">
            <a
              href={CLINIC.phoneHref}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent-600 font-semibold text-on-primary transition-colors hover:bg-accent-700"
            >
              <Phone size={18} aria-hidden />
              Позвонить
            </a>
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-primary text-primary-600 transition-colors hover:bg-muted"
            >
              <MessageCircle size={20} aria-hidden />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
