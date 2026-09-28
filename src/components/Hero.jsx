import { ArrowRight, Sparkles, Award, ShieldCheck, UserCheck } from "lucide-react";

const gridBg = {
  backgroundImage:
    "linear-gradient(to right, rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.07) 1px, transparent 1px)",
  backgroundSize: "36px 36px",
};

export default function Hero({ onRegisterClick }) {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-10 pb-12 sm:pt-16 sm:pb-18" id="home">
      {/* Background Grid Pattern */}
      <div className="pointer-events-none absolute inset-0" style={gridBg} />

      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/12 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
            <span>Official QNAYDS Certificate Portal • For Program Attendees</span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.18]">
            Claim Your Program Attendance &amp;{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LMS Certificate
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Attended a QNAYDS <strong>Webinar</strong>, <strong>Offline Workshop</strong>, or <strong>Internship</strong>?
            Submit your details below to record your attendance, then create or sign in to your LMS account with the <strong>same email</strong> to access and download your verified certificate.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={onRegisterClick}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/35 cursor-pointer"
            >
              <span>Claim Your Certificate</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="#certificate-guide"
              onClick={(e) => scrollToSection(e, "certificate-guide")}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-slate-50"
            >
              How to Get Certificate
            </a>
          </div>

          {/* 3 Value Pillars */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-left">
            <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-3.5 border border-slate-200/70 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">1. Submit Attendance</p>
                <p className="text-[11px] text-slate-500">Enter program &amp; your full name</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-3.5 border border-slate-200/70 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">2. Create LMS Account</p>
                <p className="text-[11px] text-slate-500">Sign up with the exact same email</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-3.5 border border-slate-200/70 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">3. Download Certificate</p>
                <p className="text-[11px] text-slate-500">Claim in LMS certificates tab</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
