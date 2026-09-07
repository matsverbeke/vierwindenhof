import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export const LocationMap: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`w-full h-80 bg-gray-100 relative transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <iframe
        loading="lazy"
        title="Locatie 4windenhof"
        src="https://www.google.com/maps?q=4windenhof,+Gildestraat,+Heuvelland&t=h&z=15&output=embed"
        className="w-full h-full border-0 transition-opacity duration-500 opacity-95 hover:opacity-100"
      />
    </section>
  );
};
