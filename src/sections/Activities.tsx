import React from "react";
import { Footprints, Trees, Waves } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const activities = [
  {
    icon: Footprints,
    title: "Wandelen en fietsen",
    desc: "Stap de voordeur uit en start direct op aangesloten wandelknooppunten en rustige landelijke fietsroutes.",
  },
  {
    icon: Trees,
    title: "Flora & Fauna ontdekken",
    desc: "Geniet van fazanten, hazen en reeën in de vroege ochtend en kom volledig tot rust tussen het groen.",
  },
  {
    icon: Waves,
    title: "Ontspannen & Terras",
    desc: "Geniet op het privéterras van weidse zonsondergangen met een lokaal streekbiertje of barbecue.",
  },
];

export const Activities: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`py-20 bg-white border-t border-border transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Linker kolom: Tekst + Items */}
          <div className="lg:col-span-7 space-y-8 animate-rise-in">
            <div className="animate-rise-in">
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground">
                Hier begint het <span className="text-primary">avontuur</span>
              </h2>
              <p className="mt-3 text-gray-600 text-base sm:text-lg">
                Rondom de vakantiewoning ligt de rust van het platteland, maar
                wil je eropuit? Dan is er in de regio altijd iets te beleven.
              </p>
            </div>

            <div className="space-y-6">
              {activities.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 hover-lift rounded-2xl p-3 -mx-3 animate-rise-in"
                    style={{ animationDelay: `${idx * 90}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-serif text-foreground">
                        {act.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {act.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rechter kolom: Verticale sfeerfoto */}
          <div className="lg:col-span-5 animate-rise-in [animation-delay:140ms]">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover-lift">
              <img
                src="/images/kalenderscale.jpg"
                alt="Wandelen in de natuur"
                className="w-full h-120 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
