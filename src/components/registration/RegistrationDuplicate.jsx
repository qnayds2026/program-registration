import { useState } from "react";
import { AlertCircle, ArrowLeft, Mail, RefreshCw, ExternalLink, Award, Copy, Check } from "lucide-react";

export default function RegistrationDuplicate({
  duplicateInfo,
  onReset,
  onBackToForm,
}) {
  const [copied, setCopied] = useState(false);
  const lmsUrl = import.meta.env.VITE_LMS_URL || "https://lms.qnayds.in/register";
  const registeredEmail = duplicateInfo?.email || "";

  const handleCopyEmail = () => {
    if (registeredEmail) {
      navigator.clipboard.writeText(registeredEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-3xl border border-amber-200 bg-white p-6 sm:p-8 text-center shadow-xl animate-in fade-in zoom-in-95 duration-300">
      {/* Alert Badge Icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-inner">
        <AlertCircle className="h-9 w-9 stroke-[2.5]" />
      </div>

      <span className="mt-4 inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-xs font-bold text-amber-700">
        Registration Already Active
      </span>

      <h3 className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
        You're Already Registered!
      </h3>

      {/* Program & Email Info Card */}
      <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
          Program Details
        </p>
        <p className="mt-1 text-base font-bold text-slate-900">
          {duplicateInfo?.programTitle || "Selected Program"}
        </p>
        {registeredEmail && (
          <div className="mt-2 flex items-center justify-between gap-2 border-t border-amber-200/50 pt-2 text-xs text-slate-700">
            <span className="flex items-center gap-1.5 truncate">
              <Mail className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span className="truncate">Registered with: <strong>{registeredEmail}</strong></span>
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold text-amber-800 shadow-2xs hover:bg-amber-100/50 transition-colors shrink-0"
              title="Copy registered email"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        )}
      </div>

      {/* LMS & Certificate Guidance Box */}
      <div className="mt-5 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-5 text-left shadow-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <Award className="h-4.5 w-4.5 text-blue-600 shrink-0" />
          <span>Looking for your Certificate or Program Access?</span>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Since you are already enrolled in this program, you don't need to register again! Simply log in to the <strong>QNAYDS LMS Portal</strong> using your registered email (<code>{registeredEmail || "your email"}</code>).
        </p>
        <p className="mt-2 text-xs sm:text-sm text-slate-700 font-medium">
          Once your program requirements are completed, you can view, claim, and download your official certificate directly inside the <strong>Certificates</strong> section of the LMS.
        </p>
      </div>

      {/* Primary Action: Go to LMS for Certificate */}
      <div className="mt-6 space-y-3">
        <a
          href={lmsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/35"
        >
          <span>Go to LMS to Access Certificate</span>
          <ExternalLink className="h-4.5 w-4.5" />
        </a>

        {/* Secondary Options */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <button
            type="button"
            onClick={onBackToForm}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Edit Details</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Select Another Program</span>
          </button>
        </div>
      </div>
    </div>
  );
}
