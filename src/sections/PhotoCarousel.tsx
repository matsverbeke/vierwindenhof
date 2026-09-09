import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const photos = [
  { src: "/images/4.webp", alt: "Terras" },
  { src: "/images/2.webp", alt: "Overkapping" },
  { src: "/images/20230306_161749.webp", alt: "Woonkamer grote woning" },
  { src: "/images/15.webp", alt: "Keuken grote woning" },
  { src: "/images/7.webp", alt: "Slaapkamer" },
  { src: "/images/8.webp", alt: "Slaapkamer" },

  { src: "/images/6.webp", alt: "Keuken kleine woning" },
  { src: "/images/5.webp", alt: "Woonkamer kleine woning" },
  { src: "/images/9.webp", alt: "Slaapkamer" },
  { src: "/images/DSCN8084.webp", alt: "Uitzicht" },
  { src: "/images/bovenaanzicht.webp", alt: "Bovenaanzicht" },
  { src: "/images/16.webp", alt: "Uitzicht" },
  { src: "/images/18.webp", alt: "Activiteiten" },
  {
    src: "/images/56269940_1250816698376488_3599188890470055936_o.webp",
    alt: "Activiteiten",
  },
];

export const PhotoCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollReveal();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={ref}
      className={`bg-[#F9F8F5] pb-24 transition-opacity duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-end justify-between animate-rise-in">
        <div>
          <h2 className="text-3xl font-bold font-serif text-foreground">
            Kijk alvast rond in het 4windenhof
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Een kleine impressie van jouw volgende verblijf
          </p>
        </div>

        {/* Scroll Navigatieknoppen */}
        <div className="hidden sm:flex items-center space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-full bg-white border border-gray-200 text-foreground hover:bg-primary hover:text-white transition-colors transition-transform duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            aria-label="Vorige foto"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-full bg-white border border-gray-200 text-foreground hover:bg-primary hover:text-white transition-colors transition-transform duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            aria-label="Volgende foto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontale scroller */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto px-4 sm:px-6 lg:px-8 no-scrollbar scroll-smooth snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {photos.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 sm:w-80 md:w-96 h-72 rounded-2xl overflow-hidden snap-start shadow-md group relative hover-lift animate-rise-in"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              width={720}
              height={720}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <span className="text-white text-sm font-medium">{item.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
