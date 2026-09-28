import { useState } from "react";
import { CheckCircle2, ArrowRight, ExternalLink, Copy, Check, Mail, KeyRound } from "lucide-react";

export default function RegistrationSuccess({
  program,
  registeredEmail,
  onReset,
}) {
  const [copied, setCopied] = useState(false);
  const programTitle = program?.title || "your attended program";
  const lmsUrl = import.meta.env.VITE_LMS_URL || "https://lms.qnayds.in/register";

  const handleCopyEmail = () => {
    if (registeredEmail) {
      navigator.clipboard.writeText(registeredEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 text-left shadow-xs">
      {/* Header status */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
            Attendance Verified • Step 1 Complete
          </span>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Attendance Recorded Successfully!
          </h3>
        </div>
      </div>

      {/* Program Summary Pass */}
      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Completed Program
          </span>
          <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
            Record Saved
          </span>
        </div>
        <p className="mt-1 text-base font-bold text-slate-900">
          {programTitle}
        </p>

        {registeredEmail && (
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2.5 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 truncate">
              <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Registered Email: <strong className="text-slate-900">{registeredEmail}</strong></span>
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

      {/* Important: How to Access Certificate on LMS */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50/50 p-4">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
          <KeyRound className="h-4 w-4 text-blue-600" />
          <span>Final Step: Access Your Certificate on the LMS</span>
        </h4>

        <div className="mt-3 space-y-2.5 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white mt-0.5">
              1
            </span>
            <p>
              <strong>Create an account or Sign In:</strong> Visit{" "}
              <a
                href={lmsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-700 hover:underline"
              >
                lms.qnayds.in
              </a>{" "}
              and sign up with <strong>{registeredEmail || "your registered email"}</strong>.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white mt-0.5">
              2
            </span>
            <p>
              <strong>Automatic Linking:</strong> Because your email address matches, our system automatically links your certificate to your student profile.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white mt-0.5">
              3
            </span>
            <p>
              <strong>Download Certificate:</strong> Go to the <strong>Certificates</strong> section on your student dashboard to view and download your verifiable credential.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href={lmsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-xs"
        >
          <span>Open LMS Portal &amp; Get Certificate</span>
          <ExternalLink className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <span>Submit Another</span>
          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>
    </div>
  );
}
