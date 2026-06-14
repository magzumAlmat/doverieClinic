import "@/styles/globals.css";
import { MotionConfig } from "framer-motion";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  // reducedMotion="user" → all framer-motion animations honor
  // the OS "reduce motion" setting (Accessible & Ethical style).
  return (
    <MotionConfig reducedMotion="user">
      {/* Google tag (gtag.js) — Google Ads AW-18239073730 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18239073730"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18239073730');`}
      </Script>
      <Component {...pageProps} />
    </MotionConfig>
  );
}
