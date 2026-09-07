import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export const Footer: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer
      id="contact"
      ref={ref}
      className={`bg-muted-bg border-t border-border pt-16 pb-8 text-foreground transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-gray-200">
          {/* Linker kolom: Contact & Socials */}
          <div className="space-y-4 animate-rise-in">
            <h3 className="text-2xl font-bold font-serif">
              Neem contact met ons op
            </h3>

            <div className="pt-2 space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                Vakantiehuis in Loker, Heuvelland
              </p>
              <a
                href="mailto:info@4windenhof.be"
                className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                info@4windenhof.be
              </a>
              <p className="flex items-center gap-2 text-base text-gray-500">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">
                  Gildestraat 4, 8958 Loker, België
                </span>
              </p>
              <a
                href="tel:+32478489467"
                className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                0478/48 94 67
              </a>
            </div>
          </div>

          {/* Rechter kolom: Reservaties */}
          <div className="space-y-4 animate-rise-in [animation-delay:120ms]">
            <h4 className="text-xl font-bold font-serif">
              Reservaties & beschikbaarheid
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Voor vragen over beschikbaarheid of reservaties kun je ons altijd
              mailen, bellen of via Facebook contact opnemen.
            </p>
            <a
              href="https://www.facebook.com/4windenhof"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#3e92ff] text-white shadow-md hover:bg-primary-hover hover:scale-105 transition-all duration-300"
              aria-label="4windenhof op Facebook"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
                aria-hidden="true"
              >
                <path d="M13.5 22v-8.5h2.75l.5-3.3H13.5V8.1c0-.95.3-1.6 1.85-1.6H16.9V3.55c-.3-.04-1.3-.12-2.48-.12-2.45 0-4.13 1.5-4.13 4.24v2.53H7.5v3.3h2.8V22h3.2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Onderbalk met links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 space-y-4 sm:space-y-0 animate-rise-in [animation-delay:180ms]">
          <p>
            © {new Date().getFullYear()} 4windenhof. Alle rechten voorbehouden.
          </p>
          <a
            href="https://matsverbeke.be"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-gray-500 hover:text-foreground transition-colors"
          >
            By Mats
          </a>
        </div>
      </div>
    </footer>
  );
};
