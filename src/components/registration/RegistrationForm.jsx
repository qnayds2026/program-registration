import { useState } from "react";
import {
  Loader2,
  ArrowRight,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  Calendar,
  Tag,
  Info,
  ShieldCheck,
} from "lucide-react";

export default function RegistrationForm({
  programs,
  loadingPrograms,
  loadProgramsError,
  onRetryLoadPrograms,
  selectedProgramId,
  onSelectProgramId,
  onSubmit,
  isSubmitting,
  apiError,
  onClearApiError,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });


  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const selectedProgramObj = programs.find(
    (p) => String(p.id) === String(selectedProgramId)
  );

  const validateField = (field, value) => {
    switch (field) {
      case "program": {
        if (!value) return "Please select the program you attended.";
        return "";
      }
      case "name": {
        const trimmed = (value || "").trim();
        if (!trimmed) return "Please enter your full name for the certificate.";
        if (trimmed.length < 2) return "Please enter a valid name (at least 2 characters).";
        return "";
      }
      case "email": {
        const trimmed = (value || "").trim();
        if (!trimmed) return "Please enter your email address.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
          return "Please enter a valid email address.";
        }
        return "";
      }
      case "phone": {
        const trimmed = (value || "").trim();
        if (!trimmed) return "Please enter your phone number.";
        const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
        if (!phoneRegex.test(trimmed)) {
          return "Please enter a valid phone number (e.g., +91 9876543210).";
        }
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (apiError && onClearApiError) {
      onClearApiError();
    }

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleProgramChange = (e) => {
    const value = e.target.value;
    onSelectProgramId(value);

    if (apiError && onClearApiError) {
      onClearApiError();
    }

    if (touched.program) {
      const errorMsg = validateField("program", value);
      setErrors((prev) => ({ ...prev, program: errorMsg }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      program: true,
      name: true,
      email: true,
      phone: true,
    });

    const programErr = validateField("program", selectedProgramId);
    const nameErr = validateField("name", formData.name);
    const emailErr = validateField("email", formData.email);
    const phoneErr = validateField("phone", formData.phone);

    const newErrors = {
      program: programErr,
      name: nameErr,
      email: emailErr,
      phone: phoneErr,
    };

    setErrors(newErrors);

    if (programErr || nameErr || emailErr || phoneErr) {
      return;
    }

    onSubmit({
      programId: selectedProgramId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
      {/* Form Header */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
          Step 1 of 2
        </span>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
          Certificate Claim Form
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Confirm the program you completed and enter your details to generate your certificate.
        </p>
      </div>

      {/* API Level Error Banner */}
      {apiError && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50/80 p-3.5 text-left text-xs sm:text-sm text-red-800"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Submission Issue</p>
            <p className="mt-0.5 text-xs text-red-700">{apiError}</p>
          </div>
          {onClearApiError && (
            <button
              type="button"
              onClick={onClearApiError}
              className="text-xs font-semibold text-red-700 hover:text-red-900"
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5 text-left">
        {/* PROGRAM SELECT */}
        <div>
          <label
            htmlFor="program-select"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Program You Attended <span className="text-red-500">*</span>
          </label>

          {loadingPrograms ? (
            <div className="flex min-h-[44px] w-full items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-slate-600" />
              <span>Loading program directory...</span>
            </div>
          ) : loadProgramsError ? (
            <div className="rounded-lg border border-red-200 bg-red-50/70 p-3 text-xs text-red-700">
              <p>{loadProgramsError}</p>
              <button
                type="button"
                onClick={onRetryLoadPrograms}
                className="mt-2 inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:underline"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
            </div>
          ) : (
            <div className="relative w-full">
              <select
                id="program-select"
                name="program"
                value={selectedProgramId || ""}
                onChange={handleProgramChange}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, program: true }));
                  setErrors((prev) => ({
                    ...prev,
                    program: validateField("program", selectedProgramId),
                  }));
                }}
                disabled={isSubmitting}
                aria-invalid={!!errors.program}
                aria-describedby={errors.program ? "program-error" : undefined}
                className={`w-full min-h-[44px] appearance-none rounded-lg border bg-white pl-3.5 pr-10 py-2.5 text-sm font-medium text-slate-900 transition-colors focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 truncate ${
                  errors.program ? "border-red-300" : "border-slate-300 hover:border-slate-400"
                }`}
              >
                <option value="">Select the program you attended</option>
                {programs.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.title} {prog.type ? `(${prog.type})` : ""}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          )}

          {/* Selected Program Details */}
          {selectedProgramObj && (
            <div className="mt-2.5 rounded-lg border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-slate-900 truncate max-w-[260px] sm:max-w-xs">
                  {selectedProgramObj.title}
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-slate-200/80 px-2 py-0.5 text-[11px] font-semibold text-slate-700 uppercase">
                  <Tag className="h-3 w-3" />
                  <span>{selectedProgramObj.type || "PROGRAM"}</span>
                </span>
              </div>
              {selectedProgramObj.startDate && (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                  <Calendar className="h-3 w-3 text-slate-500 shrink-0" />
                  <span>
                    Session Date: {new Date(selectedProgramObj.startDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </p>
              )}
            </div>
          )}

          {errors.program && (
            <p id="program-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.program}</span>
            </p>
          )}
        </div>

        {/* FULL NAME */}
        <div>
          <label
            htmlFor="full-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Full Name (For Certificate) <span className="text-red-500">*</span>
          </label>
          <input
            id="full-name"
            type="text"
            name="name"
            placeholder="e.g. John Doe (exactly as it should appear on certificate)"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full min-h-[44px] rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 ${
              errors.name ? "border-red-300" : "border-slate-300 hover:border-slate-400"
            }`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* EMAIL ADDRESS */}
        <div>
          <label
            htmlFor="email-address"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email-address"
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full min-h-[44px] rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 ${
              errors.email ? "border-red-300" : "border-slate-300 hover:border-slate-400"
            }`}
          />

          {/* Clear sequential email guidance with amber highlight */}
          <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50/80 p-2.5 text-xs text-amber-900 leading-normal flex items-start gap-2">
            <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-950">Certificate Delivery: </strong>
              Enter your active email address. <strong>After submitting this form</strong>, you will use this same email to sign in to the QNAYDS LMS and download your certificate.
            </div>
          </div>

          {errors.email && (
            <p id="email-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* PHONE NUMBER */}
        <div>
          <label
            htmlFor="phone-number"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            WhatsApp / Contact Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone-number"
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`w-full min-h-[44px] rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 ${
              errors.phone ? "border-red-300" : "border-slate-300 hover:border-slate-400"
            }`}
          />
          <p className="mt-1 text-[11px] text-slate-400">
            For certificate delivery updates and support if required.
          </p>
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || loadingPrograms}
            className={`inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-all cursor-pointer ${
              isSubmitting || loadingPrograms
                ? "bg-slate-400 cursor-not-allowed opacity-80"
                : "bg-slate-900 hover:bg-slate-800 active:scale-[0.99] shadow-xs"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Recording Attendance...</span>
              </>
            ) : (
              <>
                <span>Submit Attendance &amp; Claim Certificate</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Trust & Privacy Notice */}
        <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
          <span>Official QNAYDS Certificate Verification • Synced with LMS Database</span>
        </div>
      </form>
    </div>
  );
}
