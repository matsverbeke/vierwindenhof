import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Home } from "lucide-react";
import { DatePickerField } from "../components/ui/DatePickerField";
import type { AvailabilityPeriod, SiteSettings } from "../lib/sanity";

type HeroBookingProps = {
  title?: string;
  description?: string;
  siteSettings?: SiteSettings | null;
  availabilityPeriods?: AvailabilityPeriod[];
};

export const HeroBooking: React.FC<HeroBookingProps> = ({
  title = "Landelijk vakantiehuis in Loker, 4windenhof",
  description = "Bij ons staan de begrippen kindvriendelijkheid en toegankelijkheid hoog in het vaandel.",
  siteSettings = null,
  availabilityPeriods = [],
}) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [woningType, setWoningType] = useState("");
  const [woningTypeOpen, setWoningTypeOpen] = useState(false);
  const woningTypeRef = useRef<HTMLDivElement>(null);
  const smallPropertyGuests = siteSettings?.smallHouseGuests;
  const largePropertyGuests = siteSettings?.largeHouseGuests;
  const smallPropertyUnavailablePeriods = availabilityPeriods.filter(
    (period) => period.property === "small-house",
  );
  const largePropertyUnavailablePeriods = availabilityPeriods.filter(
    (period) => period.property === "large-house",
  );
  const selectedPropertyUnavailablePeriods =
    woningType === "kleine-woning"
      ? smallPropertyUnavailablePeriods
      : woningType === "grote-woning"
        ? largePropertyUnavailablePeriods
        : [];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        woningTypeRef.current &&
        !woningTypeRef.current.contains(event.target as Node)
      ) {
        setWoningTypeOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setWoningTypeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const handleRangeChange = (value: { start: string; end: string }) => {
    setCheckIn(value.start);
    setCheckOut(value.end);
  };

  return (
    <section
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/IMG_20211013_181147.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-white space-y-4 animate-rise-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-serif leading-[1.15] animate-rise-in">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 font-normal max-w-xl leading-relaxed animate-rise-in [animation-delay:120ms]">
              {description}
            </p>
          </div>

          <div className="lg:col-span-5 animate-rise-in [animation-delay:180ms]">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 backdrop-blur-sm hover-lift">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-serif">
                Zoek beschikbaarheid
              </h2>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Wanneer wil jij er even helemaal tussenuit?
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div ref={woningTypeRef} className="relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Woningtype
                  </label>
                  <button
                    type="button"
                    onClick={() => setWoningTypeOpen((current) => !current)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-left text-sm text-gray-700 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-sm hover:border-primary/30 hover:shadow-md cursor-pointer"
                  >
                    <span
                      className={woningType ? "text-gray-800" : "text-gray-400"}
                    >
                      {woningType === "kleine-woning"
                        ? "Kleine woning"
                        : woningType === "grote-woning"
                          ? "Grote woning"
                          : "Kies tussen kleine of grote woning"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${woningTypeOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {woningTypeOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 rounded-3xl border border-[#e8e1d6] bg-[#fffdf8] shadow-[0_24px_60px_rgba(17,24,39,0.16)] p-3 sm:p-4 animate-rise-in">
                      <div className="grid gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setCheckIn("");
                            setCheckOut("");
                            setWoningType("kleine-woning");
                            setWoningTypeOpen(false);
                          }}
                          className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                            woningType === "kleine-woning"
                              ? "border-blue-200 bg-blue-50 shadow-sm"
                              : "border-[#ebe2d4] bg-white hover:border-blue-200 hover:bg-blue-50/70"
                          }`}
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shrink-0">
                            <Home className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground">
                              Kleine woning
                            </div>
                            <div className="text-xs text-gray-500">
                              Ideaal voor {smallPropertyGuests ?? "..."}{" "}
                              personen
                            </div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setCheckIn("");
                            setCheckOut("");
                            setWoningType("grote-woning");
                            setWoningTypeOpen(false);
                          }}
                          className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                            woningType === "grote-woning"
                              ? "border-emerald-200 bg-emerald-50 shadow-sm"
                              : "border-[#ebe2d4] bg-white hover:border-emerald-200 hover:bg-emerald-50/70"
                          }`}
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 shrink-0">
                            <Home className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground">
                              Grote woning
                            </div>
                            <div className="text-xs text-gray-500">
                              Ideaal voor {largePropertyGuests ?? "..."}{" "}
                              personen
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <DatePickerField
                  label="Incheckdatum - Uitcheckdatum"
                  startValue={checkIn}
                  endValue={checkOut}
                  onChange={handleRangeChange}
                  placeholder="Kies je verblijfsperiode"
                  unavailablePeriods={selectedPropertyUnavailablePeriods}
                />

                <button
                  type="submit"
                  className="w-full h-12 mt-2 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center text-base"
                >
                  Contact opnemen
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
