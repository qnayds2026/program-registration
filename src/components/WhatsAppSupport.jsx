import { ArrowRight, ShieldCheck, Clock } from "lucide-react";

export default function WhatsAppSupport() {
  const whatsappPhone = "919074871204";
  const whatsappMessage =
    "Hi QNAYDS Team, I need help regarding external program registration and LMS certificate access.";

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappPhone}&text=${encodeURIComponent(
    whatsappMessage
  )}&type=phone_number&app_absent=0`;

  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200/80" id="help">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/40 p-6 sm:p-10 shadow-lg">
          {/* Subtle background ambient blob */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left Content */}
            <div className="max-w-xl text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/80 px-3.5 py-1 text-xs font-bold text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>Instant Student Support</span>
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Need Help with Registration or Certificates?
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Have questions about program schedules, trouble submitting your
                details, or need help claiming your certificate on the LMS? Chat
                directly with our support team on WhatsApp.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span>Quick response time</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Official QNAYDS Support</span>
                </span>
              </div>
            </div>

            {/* Right Action */}
            <div className="flex flex-col items-start md:items-end justify-center shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-emerald-500/35"
              >
                {/* WhatsApp SVG Icon */}
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Chat on WhatsApp</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <span className="mt-2.5 text-xs text-slate-500 font-medium">
                Helpline: +91 90748 71204
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
