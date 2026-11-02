export type Insight = {
  slug: string; tag: "Case study" | "Insight" | "News"; title: string; summary: string;
  art: "a" | "b" | "c"; date: string; read: string; body: { h?: string; p?: string; list?: string[]; quote?: string }[];
};

// TODO(EBSL): replace with real case-study content (spec §11). Kept generic: no client names or invented figures.
export const insights: Insight[] = [
  {
    slug: "itil-service-management-nigeria", tag: "Case study", art: "a", date: "2026-01-20", read: "6 min",
    title: "How ITIL-led service management turns a reactive helpdesk into a predictable service",
    summary: "Standardising incident, change and problem management gives IT teams control of their backlog.",
    body: [
      { p: "Most IT teams we meet are not short of effort. They are short of structure. Requests arrive by phone, WhatsApp, email and hallway conversations; nobody can say how many are open, which are urgent, or why the same faults keep returning." },
      { h: "Where the time goes" },
      { p: "Before changing any tooling, we measure. In a typical first assessment we find three patterns: undefined priorities, so everything is urgent; no problem management, so recurring incidents are fixed again and again; and unmanaged changes, which cause a large share of new incidents." },
      { h: "What we put in place" },
      { list: ["A single front door for every request, with clear categories and priorities", "Service levels agreed with the business, not invented by IT", "Problem management that removes root causes rather than symptoms", "A lightweight change process that catches risky changes without slowing safe ones", "Monthly reporting that leadership can read in five minutes"] },
      { quote: "The goal isn't more process. It's fewer surprises." },
      { h: "What changes" },
      { p: "Within a quarter, teams usually move from firefighting to planned work. Backlogs shrink because repeat incidents disappear, and the business finally has numbers to judge IT by. If that sounds like the shift your team needs, book an IT Health Check and we'll show you where to start." },
    ],
  },
  {
    slug: "cybersecurity-framework-2026", tag: "Insight", art: "b", date: "2026-02-04", read: "8 min",
    title: "A practical cybersecurity framework for Nigerian businesses in 2026",
    summary: "The controls that close most of the gaps we find in audits, and how to roll them out in 90 days.",
    body: [
      { p: "Security frameworks can feel like they were written for organisations with ten-person security teams. Most Nigerian businesses don't have that. What they need is a short list of controls that stop the most common attacks, rolled out in an order that makes sense." },
      { h: "Five controls first" },
      { list: ["Multi-factor authentication on email, VPN and every admin account", "Patching on a fixed schedule, with exceptions tracked", "Backups that are offline or immutable, and restores that are tested", "Endpoint protection with central monitoring", "Staff awareness training with realistic phishing simulations"] },
      { h: "Then prove it" },
      { p: "Regulators, banks and enterprise customers increasingly ask for evidence, not assurances. The Nigeria Data Protection Act makes that expectation explicit. Documenting what you've done, and reviewing it regularly, is part of the control." },
      { quote: "Security you can prove is worth more than security you can only describe." },
      { p: "Our Cyber Security Framework packages these controls with continuous audit so they don't decay after the project ends." },
    ],
  },
  {
    slug: "agentic-ai-for-enterprise", tag: "News", art: "c", date: "2026-02-12", read: "5 min",
    title: "EBSL launches Agentic AI: what it changes for enterprise operations",
    summary: "AI that acts, not just answers: where autonomous agents pay off, and where they still need a human.",
    body: [
      { p: "EBSL now offers Grace AI, an agentic AI platform for African enterprises. Unlike a chatbot, an agent is given a goal, works out the steps, uses your systems to complete them, and reports back." },
      { h: "Where agents pay off first" },
      { list: ["High-volume, rules-heavy back-office work such as invoice matching and onboarding", "Customer service requests that need data from more than one system", "IT operations: triaging alerts and running standard runbooks", "Compliance checks that need evidence captured as they run"] },
      { h: "Where humans stay in charge" },
      { p: "Agents work inside guardrails you set. Anything outside those limits, such as a payment above a threshold or an unusual customer request, goes to a person for approval. That's how you get speed without losing control." },
      { p: "Want to see it on a real workflow from your business? Book a demo and we'll build one with you." },
    ],
  },
];
