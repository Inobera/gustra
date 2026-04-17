/*
 * GUSTRA AUTOSERVISAS – Home Page
 * Design: "Road & Earth" – Organic Confidence
 * Sections: TopBar (phone CTA) → Header (nav) → Hero → About → Services → Why Us → Reviews → Contact → Footer
 */

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronDown,
  Wrench,
  Shield,
  Award,
  Users,
  Menu,
  X,
  CheckCircle2,
  Quote,
  ArrowUp,
  Mail,
} from "lucide-react";

const PHONE = "+37068585329";
const PHONE_HREF = "tel:+37068585329";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493199747/JWjNLkude6aeju5yZkETnZ/gustra-hero-gtTEcdpTiPjkybqaDWGpvk.webp";
const EXHAUST_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493199747/JWjNLkude6aeju5yZkETnZ/gustra-exhaust-JKRk4bc5KKVBstgUMCV33x.webp";
const SUSPENSION_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493199747/JWjNLkude6aeju5yZkETnZ/gustra-suspension-SCAcXwPBHjbfCj8gdLFuVY.webp";

const reviews = [
  {
    name: "Tomas K.",
    rating: 5,
    lt: "Puikus servisas! Duslintuvą suremontavo per vieną dieną, technikinę neturėjo priekaištų. Rekomenduoju visiems užsukti pas juos!",
    en: "Excellent service! Fixed the muffler in one day, no complaints about the technical inspection. I recommend everyone to visit them!",
    date: "2026-02",
  },
  {
    name: "Rasa P.",
    rating: 5,
    lt: "Stabdžius suremontavo labai greitai ir profesionaliai. Meistrai žino savo darbą, paaiškino kas buvo sugadinta ir kaip pataisė. Labai patenkinta!",
    en: "The brakes were repaired very quickly and professionally. The mechanics know their job, explained what was damaged and how it was fixed. Very satisfied!",
    date: "2025-10",
  },
  {
    name: "Mindaugas",
    rating: 5,
    lt: "Jau 5 metai vezu savo automobilius tik į Gustrą. Tvarko kokybiškai, bei pasiūlo duslintuvų dalių už gera kainą",
    en: "I've been bringing my cars to Gustra for 5 years. They fix it with quality and offer muffler parts for a good price!",
    date: "2025-09",
  },
  {
    name: "Daiva Stankevičiūtė",
    rating: 5,
    lt: "Labai patenkinta aptarnavimu. Greitai išsiaiškino problemą su važiuokle ir operatyviai suremontavo. Kaina atitiko kokybę.",
    en: "Very satisfied with the service. Quickly figured out the suspension problem and repaired it promptly. The price matched the quality.",
    date: "2025-07",
  },
  {
    name: "Algirdas Vaičiūnas",
    rating: 4,
    lt: "Geras servisas, profesionalūs meistras Alfonsas. Greitai ir kokybiškai pakeitė duslintuvą. Tikrai grįšiu.",
    en: "Good service, professional mechanic Alfonsas. He changed the muffler quickly and with quality. I will definitely return.",
    date: "2025-05",
  },
  {
    name: "Violeta",
    rating: 5,
    lt: "Visada malonus aptarnavimas, sąžiningos kainos. Rekomenduoju visiems, kas ieško patikimo autoserviso Šakiuose.",
    en: "Always pleasant service, fair prices. I recommend to anyone looking for a reliable auto service in Šakiai.",
    date: "2024-12",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          className={i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      if (footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        setShowScrollTop(footerTop < window.innerHeight);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { href: "#apie", lt: "Apie mus", en: "About" },
    { href: "#paslaugos", lt: "Paslaugos", en: "Services" },
    { href: "#kodel-mes", lt: "Kodėl mes?", en: "Why Us?" },
    { href: "#atsiliepimai", lt: "Atsiliepimai", en: "Reviews" },
    { href: "#kontaktai", lt: "Kontaktai", en: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF7] font-[Lato,sans-serif]">
      {/* ── TOP BAR ── */}
      <div className="bg-[#1A3C34] text-white py-2.5 px-4">
        <div className="container flex items-center justify-between">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 font-[Outfit,sans-serif] font-semibold text-sm sm:text-base tracking-wide hover:text-amber-300 transition-colors"
          >
            <Phone size={16} className="text-amber-400 shrink-0" />
            <span className="text-amber-300 mr-1">
              {t("Rezervuok vizitą:", "Book an appointment:")}
            </span>
            <span className="font-bold text-white">{PHONE}</span>
          </a>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-green-200">
            <Clock size={13} />
            <span>{t("Pr–Pt 8:00–18:00, Št 8:00–14:00", "Mon–Fri 8:00–18:00, Sat 8:00–14:00")}</span>
          </div>
        </div>
      </div>

      {/* ── HEADER / NAV ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-[#FAFAF7] border-b border-[#e8e4dc]"
          }`}
      >
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            {/* <div className="w-10 h-10 rounded-lg bg-[#1A3C34] flex items-center justify-center shadow-sm group-hover:bg-[#245048] transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                <circle cx="19" cy="12" r="1.5" fill="currentColor" />
                <path d="M7 12h10" />
                <path d="M8 8v8" />
                <path d="M16 8v8" />
                <rect x="3" y="10" width="18" height="4" rx="1" />
                </svg>
            </div> */}
            <div>
              <span className="font-[Outfit,sans-serif] font-bold text-xl text-[#1A3C34] leading-none">
                GUSTRA
              </span>
              <div className="text-[10px] text-[#6b7c6a] font-medium tracking-widest uppercase leading-none mt-0.5">
                Autoservisas
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#3a4a39] hover:text-[#1A3C34] transition-colors relative group"
              >
                {t(link.lt, link.en)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center bg-[#f0ede6] rounded-full p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLang("lt")}
                className={`px-3 py-1 rounded-full transition-all ${lang === "lt"
                  ? "bg-[#1A3C34] text-white shadow-sm"
                  : "text-[#5a6a59] hover:text-[#1A3C34]"
                  }`}
              >
                LT
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full transition-all ${lang === "en"
                  ? "bg-[#1A3C34] text-white shadow-sm"
                  : "text-[#5a6a59] hover:text-[#1A3C34]"
                  }`}
              >
                EN
              </button>
            </div>
            <a
              href={PHONE_HREF}
              className="bg-amber-400 hover:bg-amber-500 text-[#1A3C34] font-[Outfit,sans-serif] font-bold text-sm px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Phone size={14} />
              {t("Skambinti", "Call Now")}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="flex items-center bg-[#f0ede6] rounded-full p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLang("lt")}
                className={`px-2.5 py-1 rounded-full transition-all ${lang === "lt" ? "bg-[#1A3C34] text-white" : "text-[#5a6a59]"
                  }`}
              >
                LT
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full transition-all ${lang === "en" ? "bg-[#1A3C34] text-white" : "text-[#5a6a59]"
                  }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1A3C34] hover:bg-[#e8f0e6] transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-white border-t border-[#e8e4dc]"
            >
              <div className="container py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-lg text-[#3a4a39] font-medium hover:bg-[#f0ede6] hover:text-[#1A3C34] transition-colors"
                  >
                    {t(link.lt, link.en)}
                  </a>
                ))}
                <a
                  href={PHONE_HREF}
                  className="mt-2 bg-amber-400 text-[#1A3C34] font-[Outfit,sans-serif] font-bold text-sm px-4 py-3 rounded-lg text-center flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  {PHONE}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f1a]/85 via-[#0d1f1a]/60 to-transparent" />

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm"
            >
              <Award size={13} />
              {t("10+ metų patirtis", "10+ years of experience")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-[Outfit,sans-serif] font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5"
            >
              {t(
                <>
                  Jūsų automobilis —<br />
                  <span className="text-amber-400">mūsų rūpestis</span>
                </>,
                <>
                  Your car —<br />
                  <span className="text-amber-400">our expertise</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-green-100 text-lg leading-relaxed mb-8 max-w-xl"
            >
              {t(
                "Profesionalus išmetimo sistemos remontas ir jos dalių prekyba Šakiuose. Daugiau nei 10 metų patirtis, sąžiningos kainos ir greitas kokybiškas aptarnavimas.",
                "Professional exhaust system repair and parts sales in Šakiai. Over 10 years of experience, fair prices, and fast quality service."
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#1A3C34] font-[Outfit,sans-serif] font-bold text-base px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Phone size={18} />
                {t("Rezervuok vizitą", "Book Appointment")}
              </a>
              <a
                href="#paslaugos"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-[Outfit,sans-serif] font-semibold text-base px-6 py-3.5 rounded-xl transition-all backdrop-blur-sm"
              >
                {t("Mūsų paslaugos", "Our Services")}
                <ChevronDown size={16} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-12 flex flex-wrap gap-6"
            >
              {[
                { num: "10+", lt: "Metų patirtis", en: "Years experience" },
                { num: "2000+", lt: "Aptarnautų klientų", en: "Clients served" },
                { num: "100%", lt: "Kokybės garantija", en: "Quality guarantee" },
              ].map((stat) => (
                <div key={stat.num} className="text-center">
                  <div className="font-[Outfit,sans-serif] font-extrabold text-3xl text-amber-400">
                    {stat.num}
                  </div>
                  <div className="text-green-200 text-xs mt-0.5">{t(stat.lt, stat.en)}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
        >
          <span className="text-xs">{t("Slinkti žemyn", "Scroll down")}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="apie" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative">
                <video
                  src="https://videos.pexels.com/video-files/18019165/18019165-uhd_2560_1440_50fps.mp4"
                  className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 rounded-2xl bg-black/10" />
                <div className="absolute -bottom-5 -right-5 bg-[#1A3C34] text-white rounded-2xl p-5 shadow-xl">
                  <div className="font-[Outfit,sans-serif] font-extrabold text-4xl text-amber-400">
                    10+
                  </div>
                  <div className="text-sm text-green-200 mt-0.5">
                    {t("Metų patirtis", "Years experience")}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="lg:pl-4">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-4">
                  {t("Apie mus", "About us")}
                </span>
                <h2 className="font-[Outfit,sans-serif] font-bold text-3xl sm:text-4xl text-[#1A3C34] mb-5 leading-tight">
                  {t(
                    "Patikimas partneris jūsų automobiliui",
                    "A trusted partner for your vehicle"
                  )}
                </h2>
                <p className="text-[#4a5a49] leading-relaxed mb-4">
                  {t(
                    "Gustra autoservisas įsikūręs Šakiuose jau daugiau nei 10 metų. Per tą laiką esame aptarnavę tūkstančius klientų iš Šakių rajono ir aplinkinių miestų ir miestelių. Mūsų specializacija – duslintuvų ir išmetimo sistemų remontas, bei prekyba jų dalimis, važiuoklės patikra ir remontas.",
                    "Gustra auto service has been operating in Šakiai for over 10 years. During this time, we have served thousands of customers from the Šakiai district and surrounding towns. Our specialization is the repair of mufflers and exhaust systems, as well as the sale of their parts, and suspension diagnostics and repair."
                  )}
                </p>
                <p className="text-[#4a5a49] leading-relaxed mb-6">
                  {t(
                    "Mūsų meistrai yra patyre ir kvalifikuoti, naudojam tik laiko patikrintas sudedamasias dalis. Kiekvienam klientui skiriame individualų dėmesį ir aiškiai paaiškiname, kokie darbai bus atliekami ir kiek tai kainuos.",
                    "Our mechanics are experienced and qualified, and we use only time-tested components. We give individual attention to every client and clearly explain what work will be done and how much it will cost."
                  )}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { lt: "Profesionalūs meistrai", en: "Professional mechanics" },
                    { lt: "Sąžiningos kainos", en: "Fair pricing" },
                    { lt: "Greitas aptarnavimas", en: "Fast service" },
                    { lt: "Kokybės garantija", en: "Quality guarantee" },
                  ].map((item) => (
                    <div key={item.lt} className="flex items-center gap-2 text-sm text-[#3a4a39]">
                      <CheckCircle2 size={16} className="text-[#1A3C34] shrink-0" />
                      {t(item.lt, item.en)}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="paslaugos" className="py-20 bg-[#FAFAF7]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-4">
              {t("Paslaugos", "Services")}
            </span>
            <h2 className="font-[Outfit,sans-serif] font-bold text-3xl sm:text-4xl text-[#1A3C34] mb-4">
              {t("Ką mes siūlome?", "What do we offer?")}
            </h2>
            <p className="text-[#5a6a59] max-w-xl mx-auto leading-relaxed">
              {t(
                "Specializuojamės dviejose pagrindinėse srityse, kuriose turime didžiausią patirtį ir kompetenciją.",
                "We specialize in two main areas where we have the greatest experience and competence."
              )}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Exhaust */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#e8e4dc] group">
                <div className="relative overflow-hidden h-56">
                  <img
                    src={EXHAUST_IMG}
                    alt={lang === "lt" ? "Duslintuvų remontas" : "Exhaust repair"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1a]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-amber-400 text-[#1A3C34] text-xs font-bold px-3 py-1 rounded-full">
                      {t("Specializacija", "Specialization")}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-[Outfit,sans-serif] font-bold text-xl text-[#1A3C34] mb-3">
                    {t("Išmetimo sistemos remontas", "Exhaust System Repair")}
                  </h3>
                  <p className="text-[#5a6a59] text-sm leading-relaxed mb-4">
                    {t(
                      "Atliekame visų tipų duslintuvų ir išmetimo sistemų diagnostiką, remontą ir keitimą. Naudojame kokybiškus atsargines dalis, tinkančias visų markių automobiliams.",
                      "We perform diagnostics, repair and replacement of all types of mufflers and exhaust systems. We use quality spare parts suitable for all car brands."
                    )}
                  </p>
                  <ul className="space-y-2">
                    {[
                      { lt: "Duslintuvų diagnostika ir remontas", en: "Muffler diagnostics and repair" },
                      { lt: "Išmetimo vamzdžių keitimas", en: "Exhaust pipe replacement" },
                      { lt: "Katalizatorių tikrinimas", en: "Catalytic converter inspection" },
                      { lt: "Sujungimų sandarinimas", en: "Joint sealing" },
                      { lt: "Viso išmetimo sistemos keitimas", en: "Full exhaust system replacement" },
                    ].map((item) => (
                      <li key={item.lt} className="flex items-start gap-2 text-sm text-[#3a4a39]">
                        <CheckCircle2 size={15} className="text-[#1A3C34] shrink-0 mt-0.5" />
                        {t(item.lt, item.en)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Suspension */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#e8e4dc] group">
                <div className="relative overflow-hidden h-56">
                  <img
                    src={SUSPENSION_IMG}
                    alt={lang === "lt" ? "Važiuoklės remontas" : "Suspension repair"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1a]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-amber-400 text-[#1A3C34] text-xs font-bold px-3 py-1 rounded-full">
                      {t("Specializacija", "Specialization")}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-[Outfit,sans-serif] font-bold text-xl text-[#1A3C34] mb-3">
                    {t("Važiuoklės darbai", "Suspension Repair")}
                  </h3>
                  <p className="text-[#5a6a59] text-sm leading-relaxed mb-4">
                    {t(
                      "Profesionali važiuoklės diagnostika ir remontas. Tikriname ir keičiame visus važiuoklės elementus, užtikrindami saugų ir patogų važiavimą.",
                      "Professional suspension diagnostics and repair. We check and replace all suspension components, ensuring safe and comfortable driving."
                    )}
                  </p>
                  <ul className="space-y-2">
                    {[
                      { lt: "Stabdžių sistemos remontas", en: "Brake system repair" },
                      { lt: "Amortizatorių keitimas", en: "Shock absorber diagnostics and replacement" },
                      { lt: "Vairo traukių remontas", en: "Tie rod repair" },
                      { lt: "Svirčių ir atramų keitimas", en: "Control arm and mount replacement" },
                      { lt: "Kiti važiuoklės darbai", en: "Other chassis work" },
                    ].map((item) => (
                      <li key={item.lt} className="flex items-start gap-2 text-sm text-[#3a4a39]">
                        <CheckCircle2 size={15} className="text-[#1A3C34] shrink-0 mt-0.5" />
                        {t(item.lt, item.en)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Additional services */}
          <AnimatedSection delay={0.1}>
            <div className="bg-[#1A3C34] rounded-2xl p-8 text-white">
              <h3 className="font-[Outfit,sans-serif] font-bold text-xl mb-5 text-amber-300">
                {t("Papildomos paslaugos", "Additional Services")}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { lt: "Prekyba duslintuvais ir jų komponentais", en: "Exhaust and exhaust system components sales" },
                  { lt: "Tepalų ir kitų skysčių keitimas", en: "Oil and other fluid changes" },
                  { lt: "Bendroji automobilio patikra", en: "General vehicle diagnostics" },
                ].map((item) => (
                  <div key={item.lt} className="flex items-center gap-2 text-sm text-green-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {t(item.lt, item.en)}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="kodel-mes" className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-4">
              {t("Kodėl mes?", "Why us?")}
            </span>
            <h2 className="font-[Outfit,sans-serif] font-bold text-3xl sm:text-4xl text-[#1A3C34] mb-4">
              {t("Mūsų pranašumai", "Our advantages")}
            </h2>
            <p className="text-[#5a6a59] max-w-xl mx-auto leading-relaxed">
              {t(
                "Kodėl šimtai klientų renkasi Gustra autoservisą? Štai pagrindinės priežastys.",
                "Why do hundreds of clients choose Gustra auto service? Here are the main reasons."
              )}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                lt: "10+ Metų patirtis",
                en: "10+ Years experience",
                desc_lt:
                  "Nuo 2013 metų teikiame aukštos kokybės autoserviso paslaugas Šakių rajone.",
                desc_en:
                  "Since 2013 we have been providing high quality auto service in the Šakiai district.",
              },
              {
                icon: Shield,
                lt: "Kokybės garantija",
                en: "Quality guarantee",
                desc_lt:
                  "Visiems atliktiems darbams suteikiame garantiją. Jūsų saugumas – mūsų prioritetas.",
                desc_en:
                  "We provide a guarantee for all work performed. Your safety is our priority.",
              },
              {
                icon: Users,
                lt: "Individualus požiūris",
                en: "Individual approach",
                desc_lt:
                  "Kiekvienam klientui skiriame asmeninį dėmesį ir aiškiai paaiškiname visus darbus.",
                desc_en:
                  "We give personal attention to every client and clearly explain all the work.",
              },
              {
                icon: Wrench,
                lt: "Patikimų gamintojų detalės",
                en: "Reliable parts",
                desc_lt:
                  "Naudojame patikimų gamintojų detales visų markių automobiliams.",
                desc_en:
                  "We use reliable parts from trusted manufacturers for all car brands.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.lt} delay={i * 0.1}>
                <div className="bg-[#FAFAF7] rounded-2xl p-6 border border-[#e8e4dc] hover:border-[#1A3C34]/30 hover:shadow-md transition-all group text-center">
                  <div className="w-14 h-14 rounded-xl bg-[#1A3C34] flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400 transition-colors">
                    <item.icon size={24} className="text-amber-400 group-hover:text-[#1A3C34]" />
                  </div>
                  <h3 className="font-[Outfit,sans-serif] font-bold text-[#1A3C34] mb-2">
                    {t(item.lt, item.en)}
                  </h3>
                  <p className="text-sm text-[#5a6a59] leading-relaxed">
                    {t(item.desc_lt, item.desc_en)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="atsiliepimai" className="py-20 bg-[#FAFAF7]">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-4">
              {t("Atsiliepimai", "Reviews")}
            </span>
            <h2 className="font-[Outfit,sans-serif] font-bold text-3xl sm:text-4xl text-[#1A3C34] mb-4">
              {t("Ką sako mūsų klientai?", "What do our clients say?")}
            </h2>
            <div className="flex flex-col items-center justify-center gap-2 text-[#5a6a59]">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-[#1A3C34]">4.9 / 5</span>
              </div>
              <span className="text-sm text-center">({t("remiantis klientų atsiliepimais", "based on client reviews")})</span>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <AnimatedSection key={review.name} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-[#e8e4dc] shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-[Outfit,sans-serif] font-semibold text-[#1A3C34]">
                        {review.name}
                      </div>
                      <div className="text-xs text-[#8a9a89] mt-0.5">{review.date}</div>
                    </div>
                    <Quote size={20} className="text-[#1A3C34]/20 shrink-0" />
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-sm text-[#4a5a49] leading-relaxed mt-3 flex-1">
                    {t(review.lt, review.en)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA after reviews */}
          <AnimatedSection delay={0.1} className="mt-12 text-center">
            <div className="bg-[#1A3C34] rounded-2xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="font-[Outfit,sans-serif] font-bold text-2xl mb-2 text-amber-300">
                {t("Prisijunkite prie mūsų klientų!", "Join our satisfied clients!")}
              </h3>
              <p className="text-green-200 text-sm mb-5">
                {t(
                  "Rezervuokite vizitą šiandien ir įsitikinkite patys, kodėl mus renkasi tiek daug klientų.",
                  "Book an appointment today and see for yourself why so many clients choose us."
                )}
              </p>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#1A3C34] font-[Outfit,sans-serif] font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <Phone size={18} />
                {t("Skambinti dabar", "Call now")} {PHONE}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="kontaktai" className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-4">
              {t("Kontaktai", "Contact")}
            </span>
            <h2 className="font-[Outfit,sans-serif] font-bold text-3xl sm:text-4xl text-[#1A3C34] mb-4">
              {t("Susisiekite su mumis", "Get in touch")}
            </h2>
            <p className="text-[#5a6a59] max-w-lg mx-auto">
              {t(
                "Turite klausimų ar norite rezervuoti vizitą? Skambinkite arba atvykite pas mus.",
                "Have questions or want to book an appointment? Call us or come visit."
              )}
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Phone,
                lt: "Telefonas",
                en: "Phone",
                value: PHONE,
                href: PHONE_HREF,
                sub_lt: "Skambinkite rezervuoti vizitą",
                sub_en: "Call to book an appointment",
              },
              {
                icon: MapPin,
                lt: "Adresas",
                en: "Address",
                value: "Parko g. 7, Giedručiai, 71105, Lietuva",
                href: "https://maps.app.goo.gl/HwbmXwvUvxGP9taz6",
                sub_lt: "Šakių rajonas",
                sub_en: "Šakiai district",
              },
              {
                icon: Clock,
                lt: "Darbo laikas",
                en: "Working hours",
                value: t("Pr–Pt: 8:00–18:00", "Mon–Fri: 8:00–18:00"),
                href: null,
                sub_lt: "Šeštadienis: 8:00–14:00",
                sub_en: "Saturday: 8:00–14:00",
              },
            ].map((item) => (
              <AnimatedSection key={item.lt}>
                <div className="bg-[#FAFAF7] rounded-2xl p-6 border border-[#e8e4dc] text-center hover:border-[#1A3C34]/30 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#1A3C34] flex items-center justify-center mx-auto mb-4">
                    <item.icon size={22} className="text-amber-400" />
                  </div>
                  <div className="font-[Outfit,sans-serif] font-semibold text-[#1A3C34] text-sm mb-1">
                    {t(item.lt, item.en)}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="font-bold text-[#1A3C34] hover:text-amber-600 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="font-bold text-[#1A3C34]">{item.value}</div>
                  )}
                  <div className="text-xs text-[#8a9a89] mt-1">{t(item.sub_lt, item.sub_en)}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE MAPS ── */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2336.823!2d24.0854!3d55.2347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e7125d4c8c8c8d%3A0x1234567890abcdef!2sParko%20g.%207%2C%20Giedru%C4%8diai%2071105!5e0!3m2!1slt!2slt!4v1704067200000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Gustra autoservisas lokacija"
        />
      </div>

      {/* ── FOOTER ── */}
      <footer ref={footerRef} className="bg-[#1A3C34] text-white py-12">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 w-full">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center">
                  <Wrench size={20} className="text-[#1A3C34]" />
                </div>
                <div>
                  <div className="font-[Outfit,sans-serif] font-bold text-xl leading-none">GUSTRA</div>
                  <div className="text-[10px] text-green-300 tracking-widest uppercase mt-0.5">
                    Autoservisas
                  </div>
                </div>
              </div>
              <p className="text-green-200 text-sm leading-relaxed">
                {t(
                  "UAB Gustra - patikimas autoservisas Šakiuose. Duslintuvų ir važiuoklės remontas, bei išmetimo sistemos dalių prekyba.",
                  "UAB Gustra - reliable auto service in Šakiai. Exhaust and suspension repair, and exhaust system parts sales."
                )}
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-[Outfit,sans-serif] font-semibold text-amber-300 mb-4 text-sm uppercase tracking-wide">
                {t("Navigacija", "Navigation")}
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-green-200 hover:text-amber-300 text-sm transition-colors"
                    >
                      {t(link.lt, link.en)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-[Outfit,sans-serif] font-semibold text-amber-300 mb-4 text-sm uppercase tracking-wide">
                {t("Kontaktai", "Contact")}
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:info@gustra.lt"
                  className="flex items-center gap-2 text-green-200 hover:text-amber-300 text-sm transition-colors"
                >
                  <Mail size={14} />
                  info@gustra.lt
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2 text-green-200 hover:text-amber-300 text-sm transition-colors"
                >
                  <Phone size={14} />
                  {PHONE}
                </a>
                <div className="flex items-center gap-2 text-green-200 text-sm">
                  <MapPin size={14} />
                  Parko g. 7, Giedručiai, Šakių r.
                </div>
                <div className="flex items-start gap-2 text-green-200 text-sm">
                  <Clock size={14} className="mt-0.5 shrink-0" />
                  <div>
                    <div>{t("Pr–Pt: 8:00–18:00", "Mon–Fri: 8:00–18:00")}</div>
                    <div>{t("Šeštadienis: 8:00–14:00", "Saturday: 8:00–14:00")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col gap-1 items-center sm:items-start">
              <p className="text-green-300 text-xs">
                © {new Date().getFullYear()} Gustra. {t("Visos teisės saugomos.", "All rights reserved.")}
              </p>
              <p className="text-green-300/60 text-[10px]">
                {t("Sukurta:", "Created by:")} <a href="https://pnf.lt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">PNF.lt</a>
              </p>
            </div>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#1A3C34] font-[Outfit,sans-serif] font-bold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <Phone size={14} />
              {t("Rezervuok vizitą", "Book appointment")}
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-amber-400 hover:bg-amber-500 text-[#1A3C34] p-3 rounded-full shadow-lg transition-colors z-50"
            title="Grįžti į viršų"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
