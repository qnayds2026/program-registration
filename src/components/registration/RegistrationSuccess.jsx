import { useState } from "react";
import { CheckCircle2, ArrowRight, ExternalLink, Copy, Check, ShieldCheck, Mail, BookmarkCheck } from "lucide-react";

export default function RegistrationSuccess({
  program,
  registeredEmail,
  onReset,
}) {
  const [copied, setCopied] = useState(false);
  const programTitle = program?.title || "your selected program";
  const programType = program?.type || "PROGRAM";
  const lmsUrl = import.meta.env.VITE_LMS_URL || "https://lms.qnayds.in/register";

  const handleCopyEmail = () => {
    if (registeredEmail) {
      navigator.clipboard.writeText(registeredEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8 text-center shadow-xl animate-in fade-in zoom-in-95 duration-300">
      {/* Success Badge Icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
        <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-700">
        <BookmarkCheck className="h-3.5 w-3.5" />
        <span>{programType} REGISTRATION CONFIRMED</span>
      </span>

      <h3 className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
        Registration Successful!
      </h3>

      {/* Program Summary Card */}
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
          Enrolled Program
        </p>
        <p className="mt-1 text-base sm:text-lg font-bold text-slate-900">
          {programTitle}
        </p>
        {registeredEmail && (
          <div className="mt-2 flex items-center justify-between gap-2 border-t border-blue-200/60 pt-2 text-xs text-slate-700">
            <span className="flex items-center gap-1.5 truncate">
              <Mail className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span className="truncate">Registered Email: <strong>{registeredEmail}</strong></span>
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold text-blue-600 shadow-2xs hover:bg-blue-50 transition-colors shrink-0"
              title="Copy registered email"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Critical Next Steps Guidance */}
      <div className="mt-6 rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50/80 to-white p-5 text-left shadow-xs">
        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <ShieldCheck className="h-4.5 w-4.5 text-blue-600" />
          <span>What's Next? (Important LMS Instructions)</span>
        </h4>

        <div className="mt-4 space-y-3.5">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white mt-0.5">
              1
            </span>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="font-bold text-slate-900">Create an LMS Account</p>
              <p className="mt-0.5 text-slate-600">
                Go to the QNAYDS LMS portal and create an account using the <strong>exact same email</strong> (<code>{registeredEmail || "your registered email"}</code>). This ensures your program registration links to your student profile.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white mt-0.5">
              2
            </span>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="font-bold text-slate-900">Attend & Complete Program Activities</p>
              <p className="mt-0.5 text-slate-600">
                Participate in the live sessions, interactive tasks, and project milestones as instructed.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white mt-0.5">
              3
            </span>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="font-bold text-slate-900">Access Your Certificate</p>
              <p className="mt-0.5 text-slate-600">
                After satisfying program completion criteria, navigate to the <strong>Certificates</strong> section in your LMS dashboard to view and claim your official certificate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main LMS Portal Navigation Button */}
      <div className="mt-6 space-y-3">
        <a
          href={lmsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/35"
        >
          <span>Go to QNAYDS LMS Portal</span>
          <ExternalLink className="h-4.5 w-4.5" />
        </a>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <span>Register for another program</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
