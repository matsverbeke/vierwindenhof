import React from "react";
import type { SiteSettings } from "../lib/sanity";

type StatsAndIntroProps = {
  siteSettings?: SiteSettings | null;
};

export const StatsAndIntro: React.FC<StatsAndIntroProps> = ({
  siteSettings = null,
}) => {
  const minGuests = siteSettings?.smallHouseGuests;
  const maxGuests = siteSettings?.largeHouseGuests;
  const stats = [
    { value: "12.000 m²", label: "eigen grond" },
    { value: "2 woningen", label: "op één domein" },
    {
      value: `${minGuests ?? "..."}–${maxGuests ?? "..."} gasten`,
      label: "ideaal formaat",
    },
    { value: "± 10 min", label: "wandelen van dorpskern" },
  ];

  return (
    <section className="relative bg-muted-bg pb-16">
      {/* Zwevende balk die over de hero valt */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-12">
        <div className="relative -mt-12 sm:-mt-16 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 hover-lift animate-rise-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`${idx > 1 ? "pt-4 md:pt-0" : ""} animate-rise-in`}
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <div className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Introductietekst */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center animate-rise-in [animation-delay:160ms]">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground tracking-tight">
          Welkom in het 4windenhof
        </h2>
        <div className="mt-6 space-y-4 text-gray-600 leading-relaxed text-base sm:text-lg">
          <p>
            In Loker, midden in Heuvelland, gaven we in 2015 de oude stallingen
            van onze boerderij een nieuw leven met twee vakantiewoningen: één
            kleine en één grote. 4windenhof is een geliefd vakantiehuis in Loker
            voor gezinnen, wandelaars en fietsers die rust, ruimte en een
            authentieke vakantie in de Ardennen zoeken. Het ligt tussen wandel-,
            fiets- en ruiterpaden, op een steenworp van de Franse grens en vlak
            bij Ieper en Rijsel.
          </p>
          <p>
            Beide woningen zijn ingericht met hedendaags comfort en een warme
            landelijke sfeer, zodat je zorgeloos kunt ontspannen. Tegelijk is
            alles dichtbij: lokale streekproducten, bakkerijen, cafés en de
            mooiste plekjes van de Westhoek liggen binnen handbereik tijdens je
            verblijf in Heuvelland.
          </p>
        </div>
      </div>
    </section>
  );
};
