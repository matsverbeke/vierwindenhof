import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/layout/Navbar";
import { HeroBooking } from "./sections/HeroBooking";
import { StatsAndIntro } from "./sections/StatsAndIntro";
import { PhotoCarousel } from "./sections/PhotoCarousel";
import { Activities } from "./sections/Activities";
import { LocationMap } from "./sections/LocationMap";
import { Footer } from "./components/layout/Footer";
import { WoningenPage } from "./pages/WoningenPage";
import { StreekPage } from "./pages/StreekPage";
import {
  fetchAvailabilityPeriods,
  fetchSiteSettings,
  type AvailabilityPeriod,
  type SiteSettings,
} from "./lib/sanity";

type Page = "home" | "woningen" | "streek" | "admin";

const pageMeta: Record<
  Page,
  {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  }
> = {
  home: {
    title: "Vakantiehuis in Loker, Heuvelland | 4windenhof",
    description:
      "Vakantiehuis in Loker, Heuvelland bij 4windenhof. Comfortabele verblijfplaats in Heuvelland voor gezinnen, wandelaars en fietsers.",
    keywords:
      "vakantiehuis Loker, vakantiehuis Heuvelland, vakantie in Heuvelland, 4windenhof, vakantiewoning Heuvelland, familie vakantie Loker",
    canonical: "https://www.4windenhof.be/",
    ogTitle: "Vakantiehuis in Loker, Heuvelland | 4windenhof",
    ogDescription:
      "Geniet van een rustiek en comfortabel vakantiehuis in Loker, Heuvelland, ideaal voor gezinnen, wandelaars en fietsers in Heuvelland.",
    twitterTitle: "Vakantiehuis in Loker, Heuvelland | 4windenhof",
    twitterDescription:
      "Rustig vakantiehuis in Loker, Heuvelland voor gezinnen, wandelaars en fietsers.",
  },
  woningen: {
    title: "Vakantiewoningen in Loker, Heuvelland | 4windenhof",
    description:
      "Ontdek de vakantiewoningen van 4windenhof in Loker, Heuvelland. Ruime, comfortabele woningen voor een ontspannen vakantie in Heuvelland.",
    keywords:
      "vakantiewoningen Heuvelland, vakantiehuis Loker, 4windenhof woningen, huurwoning Heuvelland, vakantie in Ardennen",
    canonical: "https://www.4windenhof.be/woningen",
    ogTitle: "Vakantiewoningen in Loker, Heuvelland | 4windenhof",
    ogDescription:
      "Bekijk onze comfortabele vakantiewoningen in Loker, Heuvelland en boek een ontspannen verblijf in Heuvelland.",
    twitterTitle: "Vakantiewoningen in Loker, Heuvelland | 4windenhof",
    twitterDescription:
      "Ruime en comfortabele vakantiewoningen in Loker, Heuvelland.",
  },
  streek: {
    title: "Wandelen en fietsen in Loker, Heuvelland | 4windenhof",
    description:
      "Verken de natuur rond 4windenhof in Loker, Heuvelland: wandelroutes, fietspaden en rustige vakantie in Heuvelland.",
    keywords:
      "Heuvelland wandelen, fietsen Ardennen, Loker natuur, vakantie in Heuvelland, wandelvakantie Loker",
    canonical: "https://www.4windenhof.be/streek",
    ogTitle: "Wandelen en fietsen in Loker, Heuvelland | 4windenhof",
    ogDescription:
      "Ontdek wandelroutes, fietspaden en de rustige natuur rond Loker in het Heuvelland bij 4windenhof.",
    twitterTitle: "Wandelen en fietsen in Loker, Heuvelland | 4windenhof",
    twitterDescription:
      "Ontdek de natuur, wandelroutes en fietspaden rond Loker, Heuvelland.",
  },
  admin: {
    title: "Beheer | 4windenhof",
    description: "Doorsturen naar het Sanity beheer voor 4windenhof.",
    keywords: "sanity, beheer, 4windenhof",
    canonical: "https://www.4windenhof.be/admin",
    ogTitle: "Beheer | 4windenhof",
    ogDescription: "Doorsturen naar het Sanity beheer voor 4windenhof.",
    twitterTitle: "Beheer | 4windenhof",
    twitterDescription: "Doorsturen naar het Sanity beheer voor 4windenhof.",
  },
};

function getPageFromPathname(pathname: string): Page {
  if (pathname === "/admin") return "admin";
  if (pathname === "/woningen") return "woningen";
  if (pathname === "/streek") return "streek";
  return "home";
}

function getPathForPage(page: Page) {
  if (page === "admin") return "/admin";
  if (page === "woningen") return "/woningen";
  if (page === "streek") return "/streek";
  return "/";
}

function setMetaTag(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  const selector = `${attribute}="${key}"`;
  let tag = document.head.querySelector(`meta[${selector}]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonicalLink(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

export default function App() {
  const adminRedirectUrl =
    import.meta.env.VITE_ADMIN_URL?.trim() ||
    (import.meta.env.DEV ? "http://localhost:3333" : "/admin");
  const [page, setPage] = useState<Page>(() =>
    getPageFromPathname(window.location.pathname),
  );
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [availabilityPeriods, setAvailabilityPeriods] = useState<
    AvailabilityPeriod[]
  >([]);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const announcementVisible =
    page === "home" &&
    !!siteSettings?.homeAnnouncementEnabled &&
    !!siteSettings.homeAnnouncementText &&
    !announcementDismissed;

  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromPathname(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (page === "admin") {
      window.location.replace(adminRedirectUrl);
    }
  }, [adminRedirectUrl, page]);

  useEffect(() => {
    if (page === "admin") {
      return;
    }

    let cancelled = false;

    Promise.all([fetchSiteSettings(), fetchAvailabilityPeriods()])
      .then(([settings, periods]) => {
        if (!cancelled) {
          setSiteSettings(settings);
          setAvailabilityPeriods(periods);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSiteSettings(null);
          setAvailabilityPeriods([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  useEffect(() => {
    const meta = pageMeta[page];
    const effectiveTitle = meta.title;
    const effectiveDescription = meta.description;
    const effectiveOgTitle = meta.ogTitle;
    const effectiveOgDescription = meta.ogDescription;
    const effectiveTwitterTitle = meta.twitterTitle;
    const effectiveTwitterDescription = meta.twitterDescription;

    document.documentElement.lang = "nl";
    document.title = effectiveTitle;
    setMetaTag("name", "description", effectiveDescription);
    setMetaTag("name", "keywords", meta.keywords);
    setMetaTag(
      "name",
      "robots",
      page === "admin" ? "noindex, nofollow" : "index, follow",
    );
    setCanonicalLink(meta.canonical);
    setMetaTag("property", "og:title", effectiveOgTitle);
    setMetaTag("property", "og:description", effectiveOgDescription);
    setMetaTag("property", "og:url", meta.canonical);
    setMetaTag("property", "og:site_name", "4windenhof");
    setMetaTag("property", "og:locale", "nl_BE");
    setMetaTag("name", "twitter:title", effectiveTwitterTitle);
    setMetaTag("name", "twitter:description", effectiveTwitterDescription);
    setMetaTag("name", "twitter:card", "summary_large_image");
  }, [page, siteSettings]);

  const navigate = (nextPage: Page) => {
    if (nextPage !== page) {
      window.history.pushState({}, "", getPathForPage(nextPage));
      setPage(nextPage);
    }
  };

  if (page === "admin") {
    return (
      <main className="min-h-screen bg-muted-bg text-foreground flex items-center justify-center px-6 text-center">
        <p className="text-base sm:text-lg text-gray-600">
          Even geduld, je wordt doorgestuurd naar het Sanity beheer...
        </p>
      </main>
    );
  }

  return (
    <>
      <Analytics />
      <div className="min-h-screen bg-muted-bg text-foreground flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
        {announcementVisible ? (
          <section className="bg-[#5E7D3B] text-white animate-rise-in">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
              <p className="text-center text-sm sm:text-base font-medium leading-relaxed pr-10">
                {siteSettings?.homeAnnouncementText}
              </p>
              <button
                type="button"
                onClick={() => setAnnouncementDismissed(true)}
                className="absolute right-4 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center text-white/85 transition-all duration-300 hover:text-white hover:scale-110"
                aria-label="Sluit mededeling"
              >
                <span className="text-2xl font-medium mb-1.5 leading-none bg-[#5E7D3B] text-white">
                  ×
                </span>
              </button>
            </div>
          </section>
        ) : null}
        <Navbar
          activePage={page}
          onNavigateHome={() => navigate("home")}
          onNavigateWoningen={() => navigate("woningen")}
          onNavigateStreek={() => navigate("streek")}
          announcementVisible={announcementVisible}
        />
        {page === "woningen" ? (
          <WoningenPage siteSettings={siteSettings} />
        ) : page === "streek" ? (
          <StreekPage />
        ) : (
          <main className="grow">
            <HeroBooking
              title="Landelijk vakantiehuis in Loker, 4windenhof"
              description="Bij ons staan de begrippen kindvriendelijkheid en toegankelijkheid hoog in het vaandel."
              siteSettings={siteSettings}
              availabilityPeriods={availabilityPeriods}
            />
            <StatsAndIntro siteSettings={siteSettings} />
            <PhotoCarousel />
            <Activities />
            <LocationMap />
          </main>
        )}
        <Footer />
      </div>
    </>
  );
}
