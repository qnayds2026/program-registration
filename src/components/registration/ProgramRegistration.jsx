import { useState, useEffect } from "react";
import programService from "../../services/programService";
import RegistrationForm from "./RegistrationForm";
import RegistrationSuccess from "./RegistrationSuccess";
import RegistrationDuplicate from "./RegistrationDuplicate";
import { CheckCircle2, Sparkles, GraduationCap } from "lucide-react";

const gridBg = {
  backgroundImage:
    "linear-gradient(to right, rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.07) 1px, transparent 1px)",
  backgroundSize: "36px 36px",
};

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
        "We couldn't load the available programs. Please refresh the page and try again."
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
            "We couldn't load the available programs. Please refresh the page and try again."
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

  // Update selection if user clicked a specific track from ProgramTracks component
  useEffect(() => {
    if (!selectedTrackType || programs.length === 0) return;

    const match = programs.find(
      (p) => (p.type || "").toUpperCase() === selectedTrackType.toUpperCase()
    );
    if (match) {
      // Defer state update slightly to avoid synchronous effect warning
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
          programTitle: programObj?.title || "your selected program",
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
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 border-t border-slate-200" id="register">
      {/* Background Grid & Ambient Glow */}
      <div className="pointer-events-none absolute inset-0" style={gridBg} />
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Context & Reassurance */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Direct LMS Registration</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              Ready to Accelerate Your Skills?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Register now to reserve your seat in an upcoming QNAYDS program.
              Your registration will be automatically stored in the LMS,
              enabling progress tracking and future certificate verification.
            </p>

            {/* Checklist */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Guaranteed Registration Slot
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Receive direct program materials and communications prior to launch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Unified Student Portal Access
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Link external registrations directly with your QNAYDS LMS student profile.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Post-Program LMS Certification
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Certificate eligibility handled through the LMS upon meeting requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Pill */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">QNAYDS Certified Ecosystem</p>
                <p className="text-xs text-slate-500">Official Partner & Enterprise LMS Integration</p>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Card / Success / Duplicate State */}
          <div className="lg:col-span-6">
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
