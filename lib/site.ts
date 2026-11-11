/**
 * Single source of truth for contact details, social handles, stats and nav.
 * Edit values here; every page, the header, footer and JSON-LD read from it.
 */
export const site = {
  name: "Edgeverve Business Solutions Ltd",
  short: "EBSL",
  url: "https://edgevervebs.org",
  tagline: "Empowering Businesses Through Strategic Technology",
  phone: "+234-807-693-8823",
  phoneHref: "+2348076938823",
  email: "info@edgevervebs.org",
  address: "EBSL Towers, 17C Saliu Aina Lawal Way, off Mobile Road, Lekki, Lagos, Nigeria",
  mapQuery: "17C Saliu Aina Lawal Way, Lekki, Lagos, Nigeria",
  whatsappNumber: "2348076938823",
  whatsappPrefill: "Hello EBSL, I have an enquiry about your services.",
  social: {
    linkedin: "https://www.linkedin.com/company/edgevervebs_ltd/",
    x: "https://x.com/ebsl0001",
    instagram: "https://www.instagram.com/edgevervebs_ltd/",
  },
  stats: [
    { value: 15, suffix: "+", label: "Clients served" },
    { value: 75, suffix: "+", label: "IT projects delivered" },
    { value: 45, suffix: "+", label: "Certified experts" },
    { value: 8, suffix: "+", label: "Years of excellence" },
  ],
  tawkId: "68c6397e312e381925a1fcd4/1jc7st2i1",
};

export const waChat = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappPrefill)}`;

export type IconName = import("@/components/Icon").IconName;

export type Service = { slug: string; name: string; short: string; icon: IconName; isNew?: boolean; href: string };

export const services: Service[] = [
  { slug: "infrastructure", name: "Infrastructure Solutions", short: "Servers, networking, cloud and managed infrastructure built to stay up.", icon: "server", href: "/services/infrastructure" },
  { slug: "consulting", name: "IT Consulting & Advisory", short: "Digital transformation roadmaps and strategy aligned to business goals.", icon: "compass", href: "/services/consulting" },
  { slug: "cybersecurity", name: "Cybersecurity", short: "Proactive threat management, audits and compliance you can prove.", icon: "shield", href: "/services/cybersecurity" },
  { slug: "outsourcing", name: "BPO & Managed Services", short: "Helpdesk, managed IT and support packages that free your team.", icon: "headset", href: "/services/outsourcing" },
  { slug: "procurement", name: "IT Procurement", short: "Certified OEM hardware and software supply, delivered and supported.", icon: "box", href: "/services/procurement" },
  { slug: "training", name: "Training & Learning Academy", short: "Certification tracks and capacity building for technical teams.", icon: "grad", href: "/services/training" },
  { slug: "software", name: "Software Development", short: "Custom software, ERP, CRM and e-commerce portals.", icon: "code", href: "/services/software" },
  { slug: "agentic-ai", name: "Agentic AI (Grace AI)", short: "Autonomous AI agents that run multi-step work end to end.", icon: "bot", isNew: true, href: "/agentic-ai" },
  { slug: "fortis", name: "Fortis Security Testing", short: "Security checks on every release for fintechs, with evidence for CBN, NDPA and PCI DSS reviews.", icon: "shield", isNew: true, href: "https://fortis-website-three.vercel.app/" },
  { slug: "phlyp-pay", name: "Phlyp Pay QR Payments", short: "Scan-to-pay business payments. No POS terminal needed.", icon: "qr", isNew: true, href: "/phlyp-pay" },
];
export const svc = (slug: string) => services.find((s) => s.slug === slug)!;
export const serviceOptions = [...services.map((s) => s.name.split(" (")[0]), "Other / Not sure yet"];

export const partners = [
  { key: "aws", name: "AWS" }, { key: "cisco", name: "Cisco" }, { key: "dell", name: "Dell" }, { key: "fortinet", name: "Fortinet" },
  { key: "hp", name: "HP" }, { key: "ibm", name: "IBM" }, { key: "lenovo", name: "Lenovo" }, { key: "microsoft", name: "Microsoft" },
];

export const socials = [
  { key: "linkedin", name: "LinkedIn", blurb: "Company news and hiring" },
  { key: "x", name: "X", blurb: "Live updates and threads" },
  { key: "instagram", name: "Instagram", blurb: "Behind the scenes" },
] as const;

export type NavLink = { label: string; href: string; external?: boolean };
export type NavItem = { label: string; href: string; section: string; children?: NavLink[]; mega?: boolean };

export const nav: NavItem[] = [
  { label: "Home", href: "/", section: "/" },
  { label: "About", href: "/about", section: "/about", children: [
    { label: "Who We Are", href: "/about#who-we-are" }, { label: "Our Mission & Vision", href: "/about#mission" },
    { label: "Our DNA | Legacy Walk", href: "/about#dna" },
    { label: "Our Partners & OEM Brands", href: "/about#partners" }] },
  { label: "Services", href: "/services", section: "/services", mega: true },
  { label: "Media", href: "/insights", section: "/media", children: [
    { label: "Insights & Case Studies", href: "/insights" }, { label: "Blog & News", href: "/blog" }] },
  { label: "Careers", href: "/careers", section: "/careers", children: [
    { label: "Open Positions", href: "/careers#positions" }, { label: "Internship & Graduate Programs", href: "/careers#internship" },
    { label: "Submit Your CV", href: "/careers#apply" }] },
  { label: "Consultations", href: "/consultation", section: "/consultation", children: [
    { label: "Book a Free Consultation", href: "/consultation" }, { label: "IT Health Check / Assessment", href: "/consultation?type=assessment" },
    { label: "Request a Proposal", href: "/consultation?type=proposal" }] },
  { label: "Demo", href: "/demo", section: "/demo" },
  { label: "Contact", href: "/contact", section: "/contact" },
];

/** Map a pathname to its top-level nav section for the active underline. */
export function sectionFor(path: string) {
  if (path === "/") return "/";
  if (/^\/(services|agentic-ai|phlyp-pay|process|service-request|training-enrol)/.test(path)) return "/services";
  if (/^\/(insights|blog|gallery)/.test(path)) return "/media";
  return "/" + path.split("/")[1];
}

export const processSteps = [
  { slug: "itsm", title: "ITSM / ITIL Modelling", short: "Service catalogues, SLAs and incident workflows that make IT predictable.", icon: "layers",
    body: "We model your service catalogue, define SLAs, and implement incident, problem, change and request management on ITIL 4 practices, so IT becomes measurable and predictable." },
  { slug: "lean-six-sigma", title: "Lean & Six Sigma", short: "Remove waste and variance from the processes your teams run every day.", icon: "sigma",
    body: "We map value streams, measure variation with DMAIC, and remove waste from the processes your teams repeat every day, before any automation is built." },
  { slug: "mof", title: "Microsoft Operations Framework", short: "Lifecycle guidance for planning, delivering and operating Microsoft estates.", icon: "cpu",
    body: "For Microsoft-centred estates we apply MOF across the Plan, Deliver, Operate and Manage phases to keep services reliable through change." },
  { slug: "balanced-scorecard", title: "Balanced Scorecard", short: "Tie every technology investment to measurable business objectives.", icon: "target",
    body: "Every initiative is tied to financial, customer, internal-process and learning objectives, so leadership can see what technology spending returns." },
  { slug: "process-improvement", title: "Process Re-Improvement", short: "Redesign broken workflows before automating them, not after.", icon: "refresh",
    body: "Broken workflows are redesigned with the people who run them. Automating a bad process only makes it fail faster." },
  { slug: "audit", title: "Continuous Audit & Assessment", short: "Ongoing checks that keep systems secure, compliant and efficient.", icon: "audit",
    body: "Scheduled and continuous assessments of security, performance and compliance keep improvements from decaying after go-live." },
] as const;
