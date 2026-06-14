import Head from "next/head";
import { CLINIC } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Doctors from "@/components/Doctors";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Licenses from "@/components/Licenses";
import Faq from "@/components/Faq";
import QuizForm from "@/components/QuizForm";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Head>
        <title>Doverie clinic — медико-психологический центр в Алматы</title>
        <meta
          name="description"
          content="Медико-психологический центр «Доверие»: конфиденциальная помощь при зависимом поведении. Восстановительная терапия, программы поддержки, помощь семье. Бесплатная консультация 24/7."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Doverie clinic — медико-психологический центр" />
        <meta property="og:description" content={CLINIC.tagline} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Doctors />
        <Pricing />
        <Testimonials />
        <About />
        <Licenses />
        <Faq />
        <QuizForm />
        <Contacts />
      </main>
      <Footer />
      {/* Mobile sticky call/WhatsApp bar + spacer so it never covers content */}
      <div className="h-20 lg:hidden" aria-hidden />
      <FloatingCTA />
    </>
  );
}
