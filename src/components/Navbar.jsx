import { useState } from "react";
import logo from "../assets/QNAYDS_LOGO.png";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";

export default function Navbar({ onRegisterClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="QNAYDS"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#register"
            onClick={(e) => handleNavClick(e, "register")}
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            Claim Certificate
          </a>
          <a
            href="#certificate-guide"
            onClick={(e) => handleNavClick(e, "certificate-guide")}
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            How to Get Certificate
          </a>
          <a
            href="#help"
            onClick={(e) => handleNavClick(e, "help")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span>WhatsApp Help</span>
          </a>
        </nav>

        {/* Claim Certificate CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={onRegisterClick}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
          >
            <span>Claim Certificate</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <a
            href="#register"
            onClick={(e) => handleNavClick(e, "register")}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
          >
            Claim Certificate
          </a>
          <a
            href="#certificate-guide"
            onClick={(e) => handleNavClick(e, "certificate-guide")}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
          >
            How to Get Certificate
          </a>
          <a
            href="#help"
            onClick={(e) => handleNavClick(e, "help")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span>WhatsApp Help</span>
          </a>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterClick();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
            >
              <span>Claim Certificate</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
