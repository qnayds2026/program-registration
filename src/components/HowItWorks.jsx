import { UserCheck, KeyRound, Rocket, Award, ExternalLink, AlertCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Rocket,
    title: "1. Attend Your Program",
    desc: "Participate in the offline college workshop, live webinar, or technical internship organized by QNAYDS.",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "2. Submit Attendance",
    desc: "Use the link provided by your tutor at the end of the session to record your completed program and name.",
  },
  {
    step: "03",
    icon: KeyRound,
    title: "3. Create LMS Account",
    desc: "Visit the QNAYDS LMS portal (lms.qnayds.in/register) and register using the EXACT same email address you used in this form.",
    highlight: "Crucial: Use the same email to automatically link your certificate to your student dashboard.",
  },
  {
    step: "04",
    icon: Award,
    title: "4. Download Certificate",
    desc: "Navigate to the 'Certificates' section in your LMS dashboard to view, verify, and download your official credential.",
  },
];

export default function HowItWorks() {
  const lmsUrl = import.meta.env.VITE_LMS_URL || "https://lms.qnayds.in/register";

  return (
    <section className="bg-white py-16 sm:py-24 border-t border-slate-200/80" id="certificate-guide">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
            LMS Certification Pathway
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How to Get Your Certificate
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Follow these simple steps from submitting your attendance to claiming your verified
            certificate in the official QNAYDS Learning Management System.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100/70 text-blue-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-extrabold text-slate-700 shadow-2xs">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base sm:text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>

                  {item.highlight && (
                    <div className="mt-3.5 rounded-xl border border-amber-200 bg-amber-50 p-2.5 text-[11px] font-medium text-amber-800 flex items-start gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600 mt-0.5" />
                      <span>{item.highlight}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Action Card to LMS */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50/60 p-6 sm:p-8 text-left shadow-xs">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Ready to access your student portal?
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Create your account with your registered email at <strong>lms.qnayds.in/register</strong>.
            </p>
          </div>

          <a
            href={lmsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            <span>Open QNAYDS LMS Portal</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
