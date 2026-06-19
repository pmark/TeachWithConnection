export const site = {
  url: "https://teachwithconnection.com",
  relatedPracticeUrl: "https://www.withconnectionpdx.com",
};

export const primaryNavigation = [
  { labelKey: "nav.workshops", href: "/workshops/" },
  { labelKey: "nav.keynotes", href: "/keynotes/" },
  { labelKey: "nav.consultation", href: "/consultation/" },
  { labelKey: "nav.bookstore", href: "/bookstore/" },
  { labelKey: "nav.about", href: "/about/" },
  { labelKey: "nav.resources", href: "/resources/" },
];

export const footerNavigation = [
  ...primaryNavigation,
  { labelKey: "nav.articles", href: "/articles/" },
  { labelKey: "nav.publications", href: "/publications/" },
  { labelKey: "nav.contact", href: "/contact/" },
  { labelKey: "nav.privacy", href: "/privacy/" },
];

export function createServiceStructuredData(name: string, description: string, path: string, audienceType: string) {
  return {
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    audience: {
      "@type": "Audience",
      audienceType,
    },
  };
}
