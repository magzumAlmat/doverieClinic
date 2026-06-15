import Head from "next/head";
import { CLINIC } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Doctors from "@/components/Doctors";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
// import Licenses from "@/components/Licenses"; // скрыто: лицензий пока нет
import Faq from "@/components/Faq";
import QuizForm from "@/components/QuizForm";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Head>
        <title>Психолог и психиатр в Алматы — центр «Доверие» | Помощь при тревоге и депрессии</title>
        <meta
          name="description"
          content="Медико-психологический центр «Доверие» в Алматы: приём психиатра, психотерапевта и психолога. Помощь при тревоге, депрессии, панических атаках, стрессе и выгорании. Конфиденциально, 24/7. Бесплатная первичная консультация."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="психолог Алматы, психиатр Алматы, психотерапевт Алматы, консультация психолога, консультация психиатра, помощь при депрессии, лечение тревоги, панические атаки, психологический центр Алматы, психолог онлайн"
        />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="KZ-ALA" />
        <meta name="geo.placename" content="Алматы" />
        <link rel="canonical" href="https://doverie-clinic.kz/" />

        {/* Open Graph */}
        <meta property="og:title" content="Психолог и психиатр в Алматы — центр «Доверие»" />
        <meta property="og:description" content={CLINIC.tagline} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://doverie-clinic.kz/" />
        <meta property="og:site_name" content="Медико-психологический центр «Доверие»" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:image" content="https://doverie-clinic.kz/og.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Психолог и психиатр в Алматы — центр «Доверие»" />
        <meta name="twitter:description" content={CLINIC.tagline} />
        <meta name="twitter:image" content="https://doverie-clinic.kz/og.jpg" />

        <link rel="icon" href="/favicon.ico" />

        {/* Structured data — local medical business (rich results + local SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              name: "Медико-психологический центр «Доверие»",
              url: "https://doverie-clinic.kz/",
              telephone: CLINIC.phone,
              email: CLINIC.email,
              image: "https://doverie-clinic.kz/og.jpg",
              medicalSpecialty: ["Psychiatry", "Psychotherapy"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Горняцкая 22",
                addressLocality: "Алматы",
                addressCountry: "KZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 43.238949,
                longitude: 76.889709,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday", "Tuesday", "Wednesday", "Thursday",
                  "Friday", "Saturday", "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              priceRange: "₸₸",
              areaServed: "Алматы",
              sameAs: [CLINIC.whatsapp],
            }),
          }}
        />
      </Head>

      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Doctors />
        <Pricing />
        <Testimonials />
        <About />
        {/* <Licenses /> — скрыто: лицензий пока нет */}
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
