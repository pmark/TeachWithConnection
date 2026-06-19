export const site = {
  name: "With Connection",
  legalName: "With Connection, LLC",
  person: "Katie Statman-Weil",
  credentials: "EdD, LCSW",
  url: "https://teachwithconnection.com",
  relatedPracticeUrl: "https://www.withconnectionpdx.com",
  description:
    "Relationship-centered professional development, keynotes, and consultation for early childhood organizations.",
};

export const primaryNavigation = [
  { label: "Workshops", href: "/workshops/" },
  { label: "Keynotes", href: "/keynotes/" },
  { label: "Consultation", href: "/consultation/" },
  { label: "Bookstore", href: "/bookstore/" },
  { label: "About", href: "/about/" },
  { label: "Resources", href: "/resources/" },
];

export const footerNavigation = [
  ...primaryNavigation,
  { label: "Articles", href: "/articles/" },
  { label: "Publications", href: "/publications/" },
  { label: "Contact", href: "/contact/" },
  { label: "Privacy", href: "/privacy/" },
];

export function createServiceStructuredData(name: string, description: string, path: string) {
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
      audienceType: "Early childhood organizations, schools, districts, educators, and conference planners",
    },
  };
}
