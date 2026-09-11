import React, { useEffect, useState } from "react";
import { Check, FileText, X } from "lucide-react";
import type { SiteSettings } from "../lib/sanity";
import { useScrollReveal } from "../hooks/useScrollReveal";

const smallHouseHighlights = [
  "4 slaapkamers, 2 badkamers en 2 aparte toiletten",
  "Benedenverdieping met keuken, eetruimte, zitruimte en berging",
  "Bovenverdieping met slaapkamers voor gezinnen en groepen",
  "Rolstoeltoegankelijke ruimtes op de benedenverdieping",
];

const largeHouseHighlights = [
  "6 slaapkamers, 3 badkamers en 2 aparte toiletten",
  "Semi-professionele keuken en ruime eet- en zithoek",
  "Speelhoek / tweede zitruimte op de nachthal boven",
  "Ruime opzet voor grotere groepen en families",
];

const advantages = [
  "Uitzonderlijk uitzicht op de Rodeberg, Dranouter, Nieuwkerke, Rijsel en de Douvevallei",
  "Rustige ligging, maar toch dichtbij Ieper, Poperinge, Rijsel en Belle",
  "Wandelafstand van zetellift, manège, minigolf, fietsenverhuur en gezellige cafés",
  "Ruime terrassen met tuinmeubilair en BBQ, plus speelruimte voor kinderen",
  "Binnenspeelruimte, fietsenberging en laadpaal voor elektrische wagens",
];

type WoningenPageProps = {
  siteSettings?: SiteSettings | null;
};

export const WoningenPage: React.FC<WoningenPageProps> = ({
  siteSettings = null,
}) => {
  const { ref: introRef, isVisible: introVisible } = useScrollReveal();
  const { ref: infoRef, isVisible: infoVisible } = useScrollReveal();
  const { ref: priceRef, isVisible: priceVisible } = useScrollReveal();
  const { ref: practicalRef, isVisible: practicalVisible } = useScrollReveal();
  const [imageOpen, setImageOpen] = useState(false);
  const smallPropertyGuests = siteSettings?.smallHouseGuests;
  const largePropertyGuests = siteSettings?.largeHouseGuests;
  const smallHousePdfUrl = siteSettings?.smallHouseKitchenPdf?.asset?.url;
  const largeHousePdfUrl = siteSettings?.largeHouseKitchenPdf?.asset?.url;
  const pricingRows = siteSettings?.priceRows ?? [];

  const formatEuro = (value?: number) => {
    if (typeof value !== "number") {
      return "€ 0";
    }

    return `€ ${new Intl.NumberFormat("nl-BE", { maximumFractionDigits: 0 }).format(value)}`;
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setImageOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <main className="bg-muted-bg text-foreground">
      <section
        className="relative min-h-[78vh] flex items-end overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/IMG_20210925_180450.webp')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-black/25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28 w-full">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7 space-y-6 text-white animate-rise-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                Woningen
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight leading-[1.05]">
                Vakantiewoningen in Loker, Heuvelland
              </h1>
              <p className="text-lg sm:text-xl text-white/85 max-w-3xl leading-relaxed">
                Op 4windenhof verblijf je in een volledig vernieuwde hoeve in
                Loker, Heuvelland, opgedeeld in een kleine woning voor{" "}
                {smallPropertyGuests ?? "..."} personen en een grote woning voor{" "}
                {largePropertyGuests ?? "..."} personen. Beide vakantiewoningen
                combineren comfort, ruimte en rust met een prachtig uitzicht
                over de Westhoek en Heuvelland.
              </p>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center animate-rise-in [animation-delay:140ms]">
              <button
                type="button"
                onClick={() => setImageOpen(true)}
                className="group size-3/4 m-auto rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-sm cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-white/60 hover-lift"
                aria-label="Vergroot de plattegrond van de woningen"
              >
                <img
                  src="/images/hoeve.webp"
                  alt="Plattegrond van de woningen op 4windenhof"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {imageOpen && (
        <div
          className="fixed inset-0 z-80 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
          onClick={() => setImageOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Vergrote plattegrond van de woningen"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setImageOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              aria-label="Sluit afbeelding"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src="/images/hoeve.webp"
              alt="Vergrote plattegrond van de woningen op 4windenhof"
              loading="lazy"
              decoding="async"
              width={1600}
              height={1200}
              className="max-h-[90vh] w-full object-contain bg-black"
            />
          </div>
        </div>
      )}

      <section
        ref={introRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 transition-all duration-700 ease-out ${
          introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <article className="rounded-3xl border border-blue-200 bg-white shadow-lg overflow-hidden hover-lift animate-rise-in">
            <div className="p-8 sm:p-10 border-b border-blue-100 bg-linear-to-br from-blue-50 to-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-500 mb-3">
                Kleine woning - blauw aangeduid
              </p>
              <h2 className="text-3xl font-bold font-serif text-foreground mb-3">
                Voor {smallPropertyGuests ?? "..."} personen
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Een gezellige woning met vier slaapkamers, twee badkamers en
                twee aparte toiletten. Ideaal voor families of kleinere groepen
                die graag samen zijn, maar toch hun eigen plek willen hebben.
              </p>
            </div>
            <div className="p-8 sm:p-10 space-y-5">
              <ul className="space-y-3">
                {smallHouseHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 leading-relaxed">
                Beneden vind je de keuken, eetruimte, zitruimte, berging met
                extra koelkast en wasmachine, een slaapkamer voor 4 personen en
                de sanitaire ruimtes. Boven zijn er drie slaapkamers en een
                extra badkamer.
              </p>
              <div className="pt-4 border-t border-blue-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 mb-3">
                  keukeninventaris
                </p>
                {smallHousePdfUrl ? (
                  <a
                    href={smallHousePdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <FileText className="h-4 w-4" />
                    Open PDF
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-500">
                    <FileText className="h-4 w-4" />
                    Nog niet toegevoegd
                  </span>
                )}
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-emerald-200 bg-white shadow-lg overflow-hidden hover-lift animate-rise-in [animation-delay:120ms]">
            <div className="p-8 sm:p-10 border-b border-emerald-100 bg-linear-to-br from-emerald-50 to-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 mb-3">
                Grote woning - groen aangeduid
              </p>
              <h2 className="text-3xl font-bold font-serif text-foreground mb-3">
                Voor {largePropertyGuests ?? "..."} personen
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ruimer opgevat, met zes slaapkamers, drie badkamers en twee
                aparte toiletten. Deze woning is gemaakt voor grotere families,
                vriendengroepen en samenkomsten waar veel ruimte en comfort
                belangrijk zijn.
              </p>
            </div>
            <div className="p-8 sm:p-10 space-y-5">
              <ul className="space-y-3">
                {largeHouseHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <Check className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 leading-relaxed">
                Ook hier zijn de benedenruimtes rolstoeltoegankelijk, inclusief
                één badkamer en het afzonderlijk toilet.
              </p>
              <div className="pt-4 border-t border-emerald-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 mb-3">
                  keukeninventaris
                </p>
                {largeHousePdfUrl ? (
                  <a
                    href={largeHousePdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    <FileText className="h-4 w-4" />
                    Open PDF
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-500">
                    <FileText className="h-4 w-4" />
                    Nog niet toegevoegd
                  </span>
                )}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        ref={infoRef}
        className={`bg-white border-y border-[#ebe5d9] transition-all duration-700 ease-out ${
          infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight">
                Onze troeven
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Wat 4windenhof voor veel gasten bijzonder maakt, is de
                combinatie van rust, ruimte en bereikbaarheid. Je zit midden in
                het landschap, maar toch dicht bij alles wat een verblijf
                aangenaam maakt.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {advantages.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#faf7f0] border border-[#e9dfcf] p-5 shadow-sm"
                >
                  <div className="flex gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={priceRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 transition-all duration-700 ease-out ${
          priceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight">
              Prijzen
            </h2>
            <p className="text-gray-700 leading-relaxed">
              In de prijs zit de huur, opgemaakte bedden, water, gas,
              elektriciteit, wifi en eindschoonmaak inbegrepen. De
              toeristenbelasting is niet inbegrepen.
            </p>
          </div>

          <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-[#e9dfcf] bg-white shadow-lg hover-lift">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-[#f4efe6] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
              <div>Periode</div>
              <div>Kleine woning</div>
              <div>Grote woning</div>
            </div>
            <div className="divide-y divide-[#eee5d7]">
              {pricingRows.length ? (
                pricingRows.map((item) => (
                  <div
                    key={item.period}
                    className="grid grid-cols-[1.5fr_1fr_1fr] px-5 py-4 text-sm sm:text-base"
                  >
                    <div className="font-medium text-foreground">
                      {item.period}
                    </div>
                    <div className="text-gray-700">
                      {formatEuro(item.smallHousePrice)}
                    </div>
                    <div className="text-gray-700">
                      {formatEuro(item.largeHousePrice)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-5 py-4 text-sm text-gray-500">
                  Prijstabel wordt geladen of is nog niet gepubliceerd.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={practicalRef}
        className={`bg-[#f4efe2] border-t border-[#e6dbc8] transition-all duration-700 ease-out ${
          practicalVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="rounded-3xl bg-white/85 backdrop-blur border border-white shadow-xl p-8 sm:p-10 space-y-5 max-w-4xl hover-lift">
            <h2 className="text-3xl font-bold font-serif tracking-tight">
              Praktische info
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>Weekend: van vrijdag 16u tot zondag 18u.</p>
              <p>Midweek: van maandag 14u tot vrijdag 10u.</p>
              <p>
                Week: van maandag 14u tot de volgende maandag 10u of van vrijdag
                14u tot de volgende vrijdag 10u.
              </p>
              <p>Andere aankomsttijden zijn mogelijk in overleg.</p>
              <p>Huisdieren zijn niet toegelaten.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
