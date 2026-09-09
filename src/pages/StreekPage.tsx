import React from "react";
import {
  ArrowRight,
  Bike,
  MapPin,
  Mountain,
  Trees,
  Umbrella,
  Users,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const kidsTips = [
  "Landschapspark 'de Kosmos' met speelplein te Westouter (op 10 minuten wandelen)",
  "De kinderbrouwerij te Reningelst",
  "Avonturenparcours en speelplein te Nieuwkerke",
  "Outside travel: quadrijden, touwenparcours, vlotten bouwen, mountainbike",
  "Mini golf / Pit Pat",
  "Ezelpad",
  "Kabelbaan Cordoba tussen Rodeberg en Zwarteberg (op 10 minuten wandelen)",
];

const quietMemories = [
  "Commandobunker Kemmel",
  "Pool of Peace",
  "In Flanders Fields Museum in Ieper",
  "Autoroute frontleven",
];

const walkingAndCycling = [
  "Geocaching",
  "Knooppuntenwandelingen: 4windenhof ligt tussen de punten 43 en 44",
  "Fietsknooppuntenroute: 4windenhof ligt tussen de punten 98 en 99",
  "Rolstoelwandeling / buggywandeling te Westouter",
  "Stiltepad (kaarten beschikbaar in 4windenhof)",
];

const goodLife = [
  "Vintage (Heuvelland)",
  "De Bralle (Dranouter)",
  "Den Heksenstoel (Loker)",
  "'t Hellegat (Westouter)",
];

const streekFacts = [
  {
    icon: MapPin,
    title: "In het hart van Heuvelland",
    text: "Loker is een rustig dorpje in West-Vlaanderen, op een boogscheut van Westouter en Dranouter.",
  },
  {
    icon: Mountain,
    title: "Tussen geschiedenis en landschap",
    text: "De Sint-Petruskerk werd in de jaren 20 heropgebouwd door architect Dumont en in de omgeving vind je verschillende Britse militaire begraafplaatsen.",
  },
  {
    icon: Trees,
    title: "Wandel- en fietsvriendelijk",
    text: "Rond de hoeve lopen heel wat routes, ideaal om Heuvelland al wandelend of fietsend te ontdekken.",
  },
];

function InfoList({
  title,
  items,
  accent,
  revealDelay = 0,
}: {
  title: string;
  items: string[];
  accent: string;
  revealDelay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`rounded-3xl border border-[#e8dfd0] bg-white shadow-lg p-7 sm:p-8 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${revealDelay}ms` }}
    >
      <div
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${accent}`}
      >
        {title}
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-gray-700 leading-relaxed">
            <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const StreekPage: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: factsRef, isVisible: factsVisible } = useScrollReveal();
  const { ref: listsRef, isVisible: listsVisible } = useScrollReveal();
  const { ref: closingRef, isVisible: closingVisible } = useScrollReveal();

  return (
    <main className="bg-muted-bg text-foreground">
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-end overflow-hidden bg-cover bg-center bg-[#1f1f1f]"
        style={{ backgroundImage: "url('/images/DSC_7465.webp')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-black/25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-24 lg:py-28 w-full">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div
              className={`lg:col-span-7 space-y-6 text-white transition-all duration-700 ease-out ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                De streek
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight leading-[1.05]">
                Wandelen en fietsen in Loker, Heuvelland
              </h1>
              <p className="text-lg sm:text-xl text-white/85 max-w-3xl leading-relaxed">
                Rond 4windenhof ontdek je een van de mooiste delen van
                Heuvelland: heuvels, wandelroutes, fietspaden, kindvriendelijke
                uitstappen en gezellige dorpsplekken maken van elk verblijf een
                ontspannen vakantie in de Ardennen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={factsRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 transition-all duration-700 ease-out ${
          factsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid lg:grid-cols-3 gap-6">
          {streekFacts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <article
                key={fact.title}
                className={`rounded-3xl border border-[#e8dfd0] bg-white p-7 sm:p-8 shadow-lg transition-all duration-700 ease-out ${
                  factsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 text-primary mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-serif mb-3">
                  {fact.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{fact.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        ref={listsRef}
        className={`bg-white border-y border-[#ebe5d9] transition-all duration-700 ease-out ${
          listsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8">
            <InfoList
              title="Tips voor kids"
              items={kidsTips}
              accent="bg-blue-50 text-blue-600"
              revealDelay={0}
            />
            <InfoList
              title="Stille herinnering"
              items={quietMemories}
              accent="bg-slate-50 text-slate-600"
              revealDelay={120}
            />
            <InfoList
              title="Wandelen en fietsen"
              items={walkingAndCycling}
              accent="bg-emerald-50 text-emerald-700"
              revealDelay={240}
            />
            <InfoList
              title="Genieten van het goede leven"
              items={goodLife}
              accent="bg-amber-50 text-amber-700"
              revealDelay={360}
            />
          </div>
        </div>
      </section>

      <section
        ref={closingRef}
        className={`bg-[#f4efe2] border-t border-[#e6dbc8] transition-all duration-700 ease-out ${
          closingVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div
              className={`rounded-3xl bg-white/85 backdrop-blur border border-white shadow-xl p-8 sm:p-10 space-y-5 transition-all duration-700 ease-out ${
                closingVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <h2 className="text-3xl font-bold font-serif tracking-tight">
                Waarom gasten hier graag verblijven
              </h2>
              <p className="text-gray-700 leading-relaxed">
                De streek rond 4windenhof is perfect voor wie buiten wil zijn
                zonder in te leveren op comfort of bereikbaarheid. Je kunt hier
                actief op pad, maar net zo goed rustig genieten van het
                landschap, een goed glas of een gezellig terras.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-3 rounded-2xl bg-[#faf7f0] border border-[#e8dfd0] p-4">
                  <Bike className="w-5 h-5 text-primary" />
                  Fietsen en wandelen
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#faf7f0] border border-[#e8dfd0] p-4">
                  <Users className="w-5 h-5 text-primary" />
                  Gezinsvriendelijke uitstappen
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#faf7f0] border border-[#e8dfd0] p-4">
                  <Umbrella className="w-5 h-5 text-primary" />
                  Terrasjes en lokale adresjes
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#faf7f0] border border-[#e8dfd0] p-4">
                  <Mountain className="w-5 h-5 text-primary" />
                  Uitzicht op de heuvels
                </div>
              </div>
            </div>

            <div
              className={`rounded-3xl overflow-hidden shadow-2xl border border-[#e8dfd0] bg-white transition-all duration-700 ease-out ${
                closingVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "240ms" }}
            >
              <img
                src="/images/DSCN8084.webp"
                alt="Streekbeeld rond 4windenhof"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
