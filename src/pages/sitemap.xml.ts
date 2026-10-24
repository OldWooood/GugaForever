import type { APIRoute } from "astro";

import { SITE } from "../config";
import { gugas } from "../data/guga";
import { absoluteUrl } from "../utils/url";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = () => {
  const lastmod = SITE.updatedLabel.replace(/\./g, "-");

  const urls = [
    {
      loc: absoluteUrl("/"),
      lastmod,
      changefreq: "monthly",
      priority: "1.0"
    },
    ...gugas.map((guga) => ({
      loc: absoluteUrl(`/guga/${guga.id}/`),
      lastmod: guga.date,
      changefreq: "yearly",
      priority: "0.8"
    }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
