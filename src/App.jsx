import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProgramRegistration from "./components/registration/ProgramRegistration";
import HowItWorks from "./components/HowItWorks";
import WhatsAppSupport from "./components/WhatsAppSupport";
import Footer from "./components/Footer";
import { ArrowUp, ArrowRight } from "lucide-react";

export default function App() {
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  const whatsappPhone = "919074871204";
  const whatsappMessage =
    "Hi QNAYDS Team, I attended a program and need help claiming my certificate on the LMS.";
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappPhone}&text=${encodeURIComponent(
    whatsappMessage
  )}&type=phone_number&app_absent=0`;

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToRegistration = () => {
    const element = document.getElementById("register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <Navbar onRegisterClick={scrollToRegistration} />

      {/* Main Flow */}
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero onRegisterClick={scrollToRegistration} />

        {/* 2. Program Registration Form & LMS Integration (Kept exactly as requested) */}
        <ProgramRegistration />

        {/* 3. How to Get Your Certificate Guide */}
        <HowItWorks />

        {/* 4. WhatsApp Help & Support Session */}
        <WhatsAppSupport />
      </main>

      {/* Footer */}
      <Footer onRegisterClick={scrollToRegistration} />

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with QNAYDS on WhatsApp"
        className="fixed bottom-6 right-5 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none"
        title="Need help? Chat with us on WhatsApp"
      >
        <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Floating CTA */}
      {showFloatingCta && (
        <div className="fixed bottom-24 right-5 sm:right-6 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            type="button"
            onClick={scrollToRegistration}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 cursor-pointer"
          >
            <span>Claim Certificate</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition-colors hover:bg-slate-100 cursor-pointer"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
