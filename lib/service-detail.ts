import type { IconName } from "@/components/Icon";

export type ServiceDetail = {
  title: string; lead: string; cta: { label: string; href: string };
  offer: { icon: IconName; title: string; text: string }[]; outcomes: string[]; faq: [string, string][];
};

export const serviceDetail: Record<string, ServiceDetail> = {
  "infrastructure": {
    "title": "Infrastructure that stays up while you scale.",
    "lead": "Design, deployment and management of servers, networks, cloud and end-user computing, engineered for uptime and governed by ITIL.",
    "cta": {
      "label": "Request This Service",
      "href": "/service-request?service=Infrastructure%20Solutions"
    },
    "offer": [
      {
        "icon": "server",
        "title": "Servers & storage",
        "text": "Right-sized compute, virtualisation, backup and disaster recovery."
      },
      {
        "icon": "network",
        "title": "Networking",
        "text": "LAN/WAN, SD-WAN, Wi-Fi and structured cabling with Cisco, Meraki and Fortinet."
      },
      {
        "icon": "cloud",
        "title": "Cloud infrastructure",
        "text": "AWS and Microsoft Azure landing zones, migration and hybrid cloud."
      },
      {
        "icon": "dashboard",
        "title": "Managed infrastructure",
        "text": "24/7 monitoring and maintenance with clear SLAs, visible in NerveHUB."
      },
      {
        "icon": "lock",
        "title": "Data centre & security",
        "text": "Power, cooling, physical and perimeter security for critical sites."
      },
      {
        "icon": "phone-dev",
        "title": "End-user computing",
        "text": "Device rollout, imaging and lifecycle management for every employee."
      }
    ],
    "outcomes": [
      "Higher availability through redundant, monitored design",
      "Lower total cost with right-sized, consolidated platforms",
      "Faster recovery with tested backup and DR runbooks",
      "One accountable partner from design to operations"
    ],
    "faq": [
      [
        "Do you work with our existing hardware?",
        "Yes. We start with an audit, keep what is sound, and plan upgrades only where they pay off."
      ],
      [
        "Can you manage infrastructure across several branches?",
        "Yes. We design multi-site networks and manage them centrally with on-site support in Lagos and partner coverage beyond."
      ],
      [
        "Which cloud platforms do you support?",
        "Microsoft Azure and AWS, plus hybrid set-ups that keep sensitive workloads on-premise."
      ]
    ]
  },
  "consulting": {
    "title": "Strategy first. Technology second.",
    "lead": "Digital transformation roadmaps, IT strategy and advisory that tie every investment to measurable business outcomes.",
    "cta": {
      "label": "Book a Consultation",
      "href": "/consultation"
    },
    "offer": [
      {
        "icon": "compass",
        "title": "Digital transformation roadmaps",
        "text": "Where you are, where you need to be, and a sequenced plan to get there."
      },
      {
        "icon": "target",
        "title": "IT strategy & governance",
        "text": "Balanced Scorecard-aligned strategy, policies and decision rights."
      },
      {
        "icon": "layers",
        "title": "Enterprise architecture",
        "text": "Rationalise applications, integrations and data flows."
      },
      {
        "icon": "sigma",
        "title": "Process optimisation",
        "text": "Lean & Six Sigma to remove waste before you automate."
      },
      {
        "icon": "chart",
        "title": "Technology due diligence",
        "text": "Independent assessment of vendors, platforms and proposals."
      },
      {
        "icon": "users",
        "title": "Change management",
        "text": "Bring people along: adoption plans, training and communication."
      }
    ],
    "outcomes": [
      "A board-ready roadmap with costs and milestones",
      "Clear priorities instead of scattered projects",
      "Measurable KPIs for every technology investment",
      "Vendor-neutral advice you can act on"
    ],
    "faq": [
      [
        "How long does a roadmap engagement take?",
        "Typically four to eight weeks depending on scope and the number of business units."
      ],
      [
        "Are you tied to particular vendors?",
        "No. We partner with many OEMs, but our advice is vendor-neutral and based on your requirements."
      ]
    ]
  },
  "cybersecurity": {
    "title": "Security you can prove, not just promise.",
    "lead": "A proactive Cyber Security Framework (assessments, managed defence and compliance) that protects your data and your reputation.",
    "cta": {
      "label": "Request This Service",
      "href": "/service-request?service=Cybersecurity"
    },
    "offer": [
      {
        "icon": "search",
        "title": "Security assessments",
        "text": "Vulnerability scans, penetration testing and configuration reviews."
      },
      {
        "icon": "shield",
        "title": "Managed detection & response",
        "text": "Threat monitoring with Fortinet, Palo Alto, Check Point and Kaspersky stacks."
      },
      {
        "icon": "audit",
        "title": "Compliance support",
        "text": "NDPA/NDPR, ISO 27001 and PCI-DSS readiness, with evidence."
      },
      {
        "icon": "lock",
        "title": "Identity & access",
        "text": "MFA, privileged access and zero-trust network design."
      },
      {
        "icon": "bell",
        "title": "Incident response",
        "text": "Playbooks, tabletop exercises and on-call response when it matters."
      },
      {
        "icon": "users",
        "title": "Security awareness",
        "text": "Phishing simulations and training that changes behaviour."
      }
    ],
    "outcomes": [
      "Known, prioritised risk instead of guesswork",
      "Faster detection and containment of incidents",
      "Audit-ready evidence for regulators and partners",
      "Staff who recognise and report threats"
    ],
    "faq": [
      [
        "We had a breach. Can you help now?",
        "Yes. Contact us on WhatsApp or phone for immediate incident response, then we'll harden to prevent recurrence."
      ],
      [
        "Do you support NDPA compliance?",
        "Yes. We map your data flows, close control gaps and help you prepare documentation for the Nigeria Data Protection Act."
      ]
    ]
  },
  "outsourcing": {
    "title": "Managed IT, so your team can focus on the business.",
    "lead": "Helpdesk, managed services and IT support packages with clear SLAs, turning fixed IT overhead into predictable service.",
    "cta": {
      "label": "Get a Quote",
      "href": "/service-request?service=BPO%20%26%20Managed%20Services"
    },
    "offer": [
      {
        "icon": "headset",
        "title": "Service desk",
        "text": "Multi-channel helpdesk with ITIL incident and request management."
      },
      {
        "icon": "dashboard",
        "title": "Managed IT services",
        "text": "Proactive monitoring, patching and maintenance of your estate."
      },
      {
        "icon": "users",
        "title": "IT staff augmentation",
        "text": "Skilled engineers embedded in your team, short or long term."
      },
      {
        "icon": "briefcase",
        "title": "Business process outsourcing",
        "text": "Back-office processes run to measured service levels."
      },
      {
        "icon": "clock",
        "title": "On-site support",
        "text": "Scheduled and on-call engineers across Lagos."
      },
      {
        "icon": "chart",
        "title": "Service reporting",
        "text": "Monthly SLA, ticket and trend reporting through NerveHUB."
      }
    ],
    "outcomes": [
      "Predictable monthly cost",
      "Measured SLAs and transparent reporting",
      "Access to specialist skills on demand",
      "Internal teams freed for strategic work"
    ],
    "faq": [
      [
        "What support hours do you cover?",
        "Standard business hours by default, with extended and 24/7 options for critical systems."
      ],
      [
        "Can we start small?",
        "Yes. Many clients start with service desk only and add managed services as trust builds."
      ]
    ]
  },
  "procurement": {
    "title": "The right hardware and software, genuinely sourced.",
    "lead": "Certified OEM supply of hardware, software and licences, with warranty, deployment and lifecycle support included.",
    "cta": {
      "label": "Request a Quote",
      "href": "/service-request?service=IT%20Procurement"
    },
    "offer": [
      {
        "icon": "box",
        "title": "Hardware supply",
        "text": "Servers, storage, laptops, desktops and peripherals from Dell, HP, Lenovo and HPE."
      },
      {
        "icon": "network",
        "title": "Networking & security appliances",
        "text": "Cisco, Meraki, Fortinet, Palo Alto and Check Point."
      },
      {
        "icon": "code",
        "title": "Software & licensing",
        "text": "Microsoft, Kaspersky, Veritas and more, with licence optimisation."
      },
      {
        "icon": "shield",
        "title": "Genuine, warrantied stock",
        "text": "Sourced through authorised OEM channels."
      },
      {
        "icon": "phone-dev",
        "title": "Deployment & imaging",
        "text": "Delivered configured and ready for your users."
      },
      {
        "icon": "refresh",
        "title": "Lifecycle & disposal",
        "text": "Refresh planning and secure, certified disposal."
      }
    ],
    "outcomes": [
      "Genuine products with full manufacturer warranty",
      "Consolidated purchasing and better pricing",
      "Faster rollout with pre-configured devices",
      "Licence compliance without overspend"
    ],
    "faq": [
      [
        "Do you supply outside Lagos?",
        "Yes. We deliver nationwide and coordinate installation with partner engineers where needed."
      ]
    ]
  },
  "training": {
    "title": "Build the team your technology deserves.",
    "lead": "The EBSL Learning Academy runs certification tracks, workshops and leadership programmes for IT and business teams.",
    "cta": {
      "label": "Enrol Now",
      "href": "/training-enrol"
    },
    "offer": [
      {
        "icon": "grad",
        "title": "Certification tracks",
        "text": "Cisco, Microsoft, CompTIA, ITIL and cybersecurity certifications."
      },
      {
        "icon": "users",
        "title": "Corporate training",
        "text": "Custom programmes delivered on-site or virtually for your teams."
      },
      {
        "icon": "shield",
        "title": "Security awareness",
        "text": "Practical training that reduces phishing and data-handling risk."
      },
      {
        "icon": "target",
        "title": "IT leadership",
        "text": "Strategy, governance and budgeting for current and future IT leaders."
      },
      {
        "icon": "bot",
        "title": "AI for business",
        "text": "Hands-on introduction to AI and agentic automation for non-technical staff."
      },
      {
        "icon": "briefcase",
        "title": "Graduate programmes",
        "text": "Structured paths for interns and graduates into IT careers."
      }
    ],
    "outcomes": [
      "Teams certified on the platforms you run",
      "Lower dependency on outside specialists",
      "Better security behaviour across the organisation",
      "A pipeline of skilled local talent"
    ],
    "faq": [
      [
        "Do you train individuals or only companies?",
        "Both. Individuals can enrol in scheduled cohorts; companies can book dedicated programmes."
      ]
    ]
  },
  "software": {
    "title": "Software built around how you actually work.",
    "lead": "Custom applications, ERP, CRM and e-commerce portals, designed, built and supported by EBSL engineers.",
    "cta": {
      "label": "Request Demo",
      "href": "/demo?product=Software%20Development"
    },
    "offer": [
      {
        "icon": "code",
        "title": "Custom applications",
        "text": "Web and mobile apps built to your processes and integrated with your systems."
      },
      {
        "icon": "layers",
        "title": "ERP implementation",
        "text": "Finance, inventory and HR on one platform, configured for Nigerian operations."
      },
      {
        "icon": "users",
        "title": "CRM",
        "text": "Sales pipeline, customer service and marketing automation."
      },
      {
        "icon": "globe",
        "title": "E-commerce portals",
        "text": "Storefronts and B2B portals with local payment integrations."
      },
      {
        "icon": "cpu",
        "title": "NerveHUB platforms",
        "text": "Our in-house platforms: NerveHUB, NerveMedi, NerveVending and NervePOS."
      },
      {
        "icon": "refresh",
        "title": "Support & evolution",
        "text": "Maintenance, hosting and continuous improvement after launch."
      }
    ],
    "outcomes": [
      "Software that fits your processes, not the other way round",
      "Integrated data instead of spreadsheets",
      "Local support from the team that built it",
      "A clear roadmap for future features"
    ],
    "faq": [
      [
        "Who owns the code?",
        "You do, unless agreed otherwise. We document and hand over everything needed to run it."
      ]
    ]
  }
};
