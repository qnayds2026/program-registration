import { useState } from "react";
import {
  Loader2,
  ArrowRight,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  Calendar,
  Tag,
  CheckCircle2,
  Award,
  Sparkles,
  Mail,
  GraduationCap,
  ExternalLink,
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

  const lmsUrl = import.meta.env.VITE_LMS_URL || "https://lms.qnayds.in";

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const selectedProgramObj = programs.find(
    (p) => String(p.id) === String(selectedProgramId)
  );

  const validateField = (field, value) => {
    switch (field) {
      case "program": {
        if (!value) return "Please select a program.";
        return "";
      }
      case "name": {
        const trimmed = (value || "").trim();
        if (!trimmed) return "Please enter your name.";
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
    <div className="w-full max-w-full rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xl">
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Ready to join the program?
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Register for your selected QNAYDS program and take the next step in
          your learning journey.
        </p>
      </div>

      {/* COMPACT & CATCHY LMS CERTIFICATE NOTICE */}
      <div className="mb-5 flex items-start sm:items-center gap-3 rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 via-amber-50/80 to-orange-50/50 p-3 sm:px-4 sm:py-3 text-left shadow-2xs">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
          <Award className="h-5 w-5" />
        </div>
        <div className="flex-1 text-xs sm:text-sm text-slate-800 leading-snug">
          <span className="font-extrabold text-amber-900 mr-1.5 inline-flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-600 inline shrink-0" />
            Certificate Note:
          </span>
          To receive your certificate, create an account on{" "}
          <a
            href={lmsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-700 hover:text-blue-900 underline decoration-blue-300 hover:decoration-blue-700 inline-flex items-center gap-0.5"
          >
            <span>QNAYDS LMS</span>
            <ExternalLink className="h-3 w-3" />
          </a>{" "}
          using the <strong className="font-bold text-amber-950 underline decoration-amber-400 decoration-2 underline-offset-2">same email</strong> you register with below.
        </div>
      </div>

      {/* API Level Error Banner */}
      {apiError && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700 animate-in fade-in duration-200"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Unable to complete registration</p>
            <p className="mt-0.5 text-xs leading-relaxed text-red-600">
              {apiError}
            </p>
          </div>
          {onClearApiError && (
            <button
              type="button"
              onClick={onClearApiError}
              className="text-xs font-semibold text-red-600 hover:text-red-800"
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 text-left">
        {/* PROGRAM SELECT - 100% MOBILE RESPONSIVE */}
        <div className="w-full max-w-full">
          <label
            htmlFor="program-select"
            className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
          >
            Program <span className="text-red-500">*</span>
          </label>

          {loadingPrograms ? (
            <div className="flex min-h-[48px] w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              <span>Loading available programs...</span>
            </div>
          ) : loadProgramsError ? (
            <div className="rounded-xl border border-red-200 bg-red-50/70 p-3.5 text-xs text-red-700">
              <p>{loadProgramsError}</p>
              <button
                type="button"
                onClick={onRetryLoadPrograms}
                className="mt-2 inline-flex items-center gap-1.5 font-bold text-blue-700 hover:underline"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry loading programs</span>
              </button>
            </div>
          ) : (
            <div className="relative w-full max-w-full">
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
                className={`w-full min-h-[48px] max-w-full appearance-none rounded-xl border bg-white pl-4 pr-10 py-3 text-sm sm:text-base font-medium text-slate-900 transition-all focus:outline-none focus:ring-2 truncate ${
                  errors.program
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              >
                <option value="">Select a program</option>
                {programs.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.title} {prog.type ? `(${prog.type})` : ""}
                  </option>
                ))}
              </select>

              {/* Custom SVG dropdown chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          )}

          {/* Mobile-Friendly Selected Program Summary Badge */}
          {selectedProgramObj && (
            <div className="mt-2.5 rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-xs text-slate-700 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-1.5 font-bold text-slate-900">
                <span className="truncate max-w-[200px] sm:max-w-xs">{selectedProgramObj.title}</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                  <Tag className="h-3 w-3" />
                  <span>{selectedProgramObj.type || "TRACK"}</span>
                </span>
              </div>
              {selectedProgramObj.startDate && (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                  <Calendar className="h-3 w-3 text-blue-600 shrink-0" />
                  <span>
                    Starts: {new Date(selectedProgramObj.startDate).toLocaleDateString(undefined, {
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
            <p
              id="program-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.program}</span>
            </p>
          )}
        </div>

        {/* FULL NAME */}
        <div>
          <label
            htmlFor="full-name"
            className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="full-name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full min-h-[48px] rounded-xl border bg-white px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* EMAIL ADDRESS */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="email-address"
              className="block text-xs sm:text-sm font-bold text-slate-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] font-medium text-slate-500">
              (Must match your LMS account email)
            </span>
          </div>
          <input
            id="email-address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full min-h-[48px] rounded-xl border bg-white px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* PHONE NUMBER */}
        <div>
          <label
            htmlFor="phone-number"
            className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone-number"
            type="tel"
            name="phone"
            placeholder="+91 9876543210"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`w-full min-h-[48px] rounded-xl border bg-white px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.phone && (
            <p
              id="phone-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600"
            >
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
            className={`inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 ${
              isSubmitting || loadingPrograms
                ? "cursor-not-allowed bg-blue-400 opacity-80"
                : "bg-blue-600 shadow-blue-500/30 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl active:translate-y-0"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              <>
                <span>Register Now</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>

        {/* Social Proof Note */}
        <div className="flex items-center justify-center gap-2 pt-1 text-center text-xs text-slate-500">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>Over 450+ learners registered across programs this month</span>
        </div>
      </form>
    </div>
  );
}
