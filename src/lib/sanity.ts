import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "aowmls6r";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2025-01-01";

const clientConfig =
  projectId && dataset
    ? {
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
      }
    : null;

export const hasSanityConfig = Boolean(clientConfig);

export const sanityClient = clientConfig ? createClient(clientConfig) : null;

export type SiteSettings = {
  homeAnnouncementEnabled?: boolean;
  homeAnnouncementText?: string;
  smallHouseGuests?: number;
  largeHouseGuests?: number;
  smallHouseKitchenPdf?: PdfFile;
  largeHouseKitchenPdf?: PdfFile;
  priceRows?: PricingRow[];
};

export type PdfFile = {
  asset?: {
    url?: string;
    originalFilename?: string;
  };
};

export type AvailabilityPeriod = {
  property?: "small-house" | "large-house";
  dateFrom?: string;
  dateTo?: string;
  notes?: string;
};

export type PricingRow = {
  period?: string;
  smallHousePrice?: number;
  largeHousePrice?: number;
};

export const siteSettingsQuery = `*[_id == "siteSettings"][0]{
  homeAnnouncementEnabled,
  homeAnnouncementText,
  smallHouseGuests,
  largeHouseGuests,
  smallHouseKitchenPdf{asset->{url, originalFilename}},
  largeHouseKitchenPdf{asset->{url, originalFilename}},
  priceRows[]{
    period,
    smallHousePrice,
    largeHousePrice
  }
}`;

export const siteSettingsFallbackQuery = `*[_type == "siteSettings"] | order(_updatedAt desc)[0]{
  homeAnnouncementEnabled,
  homeAnnouncementText,
  smallHouseGuests,
  largeHouseGuests,
  smallHouseKitchenPdf{asset->{url, originalFilename}},
  largeHouseKitchenPdf{asset->{url, originalFilename}},
  priceRows[]{
    period,
    smallHousePrice,
    largeHousePrice
  }
}`;

export async function fetchSiteSettings() {
  if (!sanityClient) {
    return null;
  }

  const settings = await sanityClient.fetch<SiteSettings | null>(
    siteSettingsQuery,
  );

  if (settings) {
    return settings;
  }

  return sanityClient.fetch<SiteSettings | null>(siteSettingsFallbackQuery);
}

export const availabilityPeriodsQuery = `*[_type == "availabilityPeriod"] | order(dateFrom asc){
  property,
  dateFrom,
  dateTo,
  notes
}`;

export async function fetchAvailabilityPeriods() {
  if (!sanityClient) {
    return [];
  }

  return sanityClient.fetch<AvailabilityPeriod[]>(availabilityPeriodsQuery);
}
