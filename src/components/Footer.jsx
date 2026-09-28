import logo from "../assets/QNAYDS_LOGO.png";
import { MessageCircle, ExternalLink } from "lucide-react";

export default function Footer({ onRegisterClick }) {
  const lmsUrl = import.meta.env.VITE_LMS_URL || "https://lms.qnayds.in/register";
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=919074871204&text=Hi%20QNAYDS%20Team%2C%20I%20need%20help%20with%20program%20registration%20and%20certificates.&type=phone_number&app_absent=0";

  const scrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          {/* Logo & Description */}
          <div className="space-y-2 text-center md:text-left">
            <img
              src={logo}
              alt="QNAYDS"
              className="h-8 w-auto object-contain mx-auto md:mx-0"
            />
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Official registration portal for QNAYDS webinars, industrial
              workshops, and internships. Integrated with the QNAYDS LMS.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
            <button
              type="button"
              onClick={onRegisterClick}
              className="hover:text-blue-600 transition-colors"
            >
              Register
            </button>
            <a
              href="#certificate-guide"
              onClick={(e) => scrollTo(e, "certificate-guide")}
              className="hover:text-blue-600 transition-colors"
            >
              How to Get Certificate
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Support</span>
            </a>
            <a
              href={lmsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <span>LMS Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} QNAYDS. All rights reserved.</p>
          <p>Public External Program Registration & LMS Certificate Verification</p>
        </div>
      </div>
    </footer>
  );
}
