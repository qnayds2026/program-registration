import { useState } from "react";
import { Info, ArrowLeft, RefreshCw, ExternalLink, Mail, Copy, Check } from "lucide-react";

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
    <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 text-left shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
          <Info className="h-6 w-6" />
        </div>
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Attendance Record Found
          </span>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Attendance Already Submitted
          </h3>
        </div>
      </div>

      {/* Program & Email Details */}
      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Program Record
          </span>
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
            Verified
          </span>
        </div>
        <p className="mt-1 text-base font-bold text-slate-900">
          {duplicateInfo?.programTitle || "Selected Program"}
        </p>

        {registeredEmail && (
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2.5 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 truncate">
              <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Registered with: <strong className="text-slate-900">{registeredEmail}</strong></span>
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
              title="Copy registered email"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-slate-400" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Guidance */}
      <div className="mt-5 text-xs text-slate-600 leading-relaxed space-y-2">
        <p>
          You have already submitted your attendance for this program. You do not need to register again! Your certificate record is already active in our database.
        </p>
        <p>
          To access, view, or download your official certificate, log into the <strong>QNAYDS LMS</strong> using the same email address (<code>{registeredEmail || "your email"}</code>) and head over to the <strong>Certificates</strong> section.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
        <a
          href={lmsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-xs"
        >
          <span>Go to LMS to Download Certificate</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>

        <button
          type="button"
          onClick={onBackToForm}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Edit Details</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Other Programs</span>
        </button>
      </div>
    </div>
  );
}
