import type { MetadataRoute } from "next";
import { insights } from "@/lib/insights";
import { services, site } from "@/lib/site";

const pages = ["", "/about", "/services", "/process", "/service-request", "/demo", "/consultation", "/training-enrol",
  "/contact", "/careers", "/insights", "/blog", "/gallery", "/privacy-policy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...pages.map((p) => ({ url: site.url + p, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: site.url + s.href, lastModified: now, priority: 0.8 })),
    ...insights.map((i) => ({ url: `${site.url}/insights/${i.slug}`, lastModified: new Date(i.date), priority: 0.6 })),
  ];
}
