import { useState, useEffect } from "react";
import programService from "../../services/programService";
import RegistrationForm from "./RegistrationForm";
import RegistrationSuccess from "./RegistrationSuccess";
import RegistrationDuplicate from "./RegistrationDuplicate";
import { CheckCircle2, ShieldCheck, Mail } from "lucide-react";

export default function ProgramRegistration({ selectedTrackType }) {
  const [programs, setPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [loadProgramsError, setLoadProgramsError] = useState(null);

  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [status, setStatus] = useState("IDLE"); // IDLE, SUBMITTING, SUCCESS, DUPLICATE
  const [registeredProgram, setRegisteredProgram] = useState(null);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [duplicateInfo, setDuplicateInfo] = useState(null);
  const [apiError, setApiError] = useState(null);

  const fetchPrograms = async () => {
    setLoadingPrograms(true);
    setLoadProgramsError(null);
    try {
      const data = await programService.getAllPrograms();
      const activePrograms = data.filter((p) => p.isActive !== false);
      const list = activePrograms.length > 0 ? activePrograms : data;
      setPrograms(list);
      if (list.length > 0 && !selectedProgramId) {
        setSelectedProgramId(String(list[0].id));
      }
    } catch (err) {
      console.error("Failed to load programs:", err);
      setLoadProgramsError(
        "We couldn't load the program list. Please refresh the page and try again."
      );
    } finally {
      setLoadingPrograms(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function loadInitialPrograms() {
      try {
        const data = await programService.getAllPrograms();
        if (!ignore) {
          const activePrograms = data.filter((p) => p.isActive !== false);
          const list = activePrograms.length > 0 ? activePrograms : data;
          setPrograms(list);
          if (list.length > 0) {
            setSelectedProgramId(String(list[0].id));
          }
          setLoadingPrograms(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load programs:", err);
          setLoadProgramsError(
            "We couldn't load the program list. Please refresh the page and try again."
          );
          setLoadingPrograms(false);
        }
      }
    }

    loadInitialPrograms();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedTrackType || programs.length === 0) return;

    const match = programs.find(
      (p) => (p.type || "").toUpperCase() === selectedTrackType.toUpperCase()
    );
    if (match) {
      const timer = setTimeout(() => {
        setSelectedProgramId(String(match.id));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedTrackType, programs]);

  const handleSubmit = async (payload) => {
    setStatus("SUBMITTING");
    setApiError(null);

    const programObj = programs.find(
      (p) => String(p.id) === String(payload.programId)
    );

    try {
      await programService.register(payload.programId, payload);
      setRegisteredProgram(programObj || { title: `Program #${payload.programId}` });
      setRegisteredEmail(payload.email);
      setStatus("SUCCESS");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.isDuplicate) {
        setDuplicateInfo({
          email: payload.email,
          programTitle: programObj?.title || "your attended program",
        });
        setStatus("DUPLICATE");
      } else {
        setStatus("IDLE");
        setApiError(err.message || "Please check your information and try again.");
      }
    }
  };

  const handleReset = () => {
    setStatus("IDLE");
    setApiError(null);
    setRegisteredProgram(null);
    setRegisteredEmail("");
    setDuplicateInfo(null);
  };

  const handleBackToForm = () => {
    setStatus("IDLE");
    setApiError(null);
  };

  return (
    <section className="bg-slate-50/70 py-14 sm:py-20 border-b border-slate-200/80" id="register">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Flow & Guidelines for Attendees */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Certificate Claim Instructions
            </span>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
              Submit Attendance to Generate Certificate
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Your instructor shared this link upon completing your session. Fill out this
              attendance verification form to record your program completion in our database,
              enabling your certificate to be issued on the LMS.
            </p>

            {/* Practical Guidelines */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3.5 shadow-2xs">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold text-slate-900">Name on Certificate</p>
                  <p className="text-slate-500 mt-0.5">
                    Enter your name precisely as you would like it to appear on your official certificate of completion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/70 p-3.5 shadow-2xs">
                <Mail className="h-5 w-5 shrink-0 text-amber-700 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold text-amber-950">Email Matching (Next Step)</p>
                  <p className="text-amber-900 mt-0.5">
                    First submit this form with your active email. Then, sign in to <strong>lms.qnayds.in</strong> with that same email to collect your certificate.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3.5 shadow-2xs">
                <ShieldCheck className="h-5 w-5 shrink-0 text-slate-700 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold text-slate-900">Official LMS Credential</p>
                  <p className="text-slate-500 mt-0.5">
                    After submitting, your verified PDF certificate will be generated and available in your LMS Certificates dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Existing LMS user reminder */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-2xs">
              <p className="font-semibold text-slate-900">Already have a QNAYDS LMS account?</p>
              <p className="mt-1 text-slate-500">
                Simply enter your existing LMS account email in the form. Your completion record will automatically sync with your profile upon submission.
              </p>
            </div>
          </div>

          {/* Right Column: Certificate Claim Form */}
          <div className="lg:col-span-7">
            {status === "SUCCESS" && (
              <RegistrationSuccess
                program={registeredProgram}
                registeredEmail={registeredEmail}
                onReset={handleReset}
              />
            )}

            {status === "DUPLICATE" && (
              <RegistrationDuplicate
                duplicateInfo={duplicateInfo}
                onReset={handleReset}
                onBackToForm={handleBackToForm}
              />
            )}

            {(status === "IDLE" || status === "SUBMITTING") && (
              <RegistrationForm
                programs={programs}
                loadingPrograms={loadingPrograms}
                loadProgramsError={loadProgramsError}
                onRetryLoadPrograms={fetchPrograms}
                selectedProgramId={selectedProgramId}
                onSelectProgramId={setSelectedProgramId}
                onSubmit={handleSubmit}
                isSubmitting={status === "SUBMITTING"}
                apiError={apiError}
                onClearApiError={() => setApiError(null)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
