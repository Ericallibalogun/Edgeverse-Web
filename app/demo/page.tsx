import type { Metadata } from "next";
import { EbslForm, Field } from "@/components/Form";
import FormShell from "@/components/FormShell";
import { Serif } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Book a live demo of Agentic AI, Phlyp Pay, NerveHUB or any EBSL solution. Pick a date and time that suits you.",
  alternates: { canonical: "/demo" },
};

const products = ["Agentic AI", "Phlyp Pay", "NerveHUB Platform", "Software Development", "Cybersecurity", "Infrastructure Solutions", "IT Consulting", "Managed Services", "Other"];
const today = new Date().toISOString().slice(0, 10);

export default function Demo() {
  return (
    <FormShell eyebrow="Book a demo" crumb="Demo" title={<>See it working <Serif>before</Serif> you commit.</>}
      lead="Pick a product and a time. We'll tailor the demo to your industry and show it running on a realistic workflow."
      points={["You receive an email confirming your request.", "We send a calendar invite for your preferred slot, or suggest the nearest one.", "A 30–45 minute live demo with Q&A, tailored to your business."]}>
      <EbslForm kind="demo" submitLabel="Book My Demo" prefill={{ product: "product" }}
        success="Your demo request is in. We've emailed a confirmation and will send a calendar invite shortly.">
        <Field name="product" label="Product / service for demo" options={products} full />
        <Field name="full_name" label="Full name" auto="name" />
        <Field name="email" label="Email" type="email" auto="email" />
        <Field name="phone" label="Phone" type="tel" auto="tel" />
        <Field name="company" label="Company name" auto="organization" />
        <Field name="industry" label="Industry" options={["Banking & Finance", "Oil & Gas / Energy", "Telecoms", "Government / Public sector", "Healthcare", "Education", "Retail & FMCG", "Hospitality", "Manufacturing", "Other"]} />
        <Field name="date" label="Preferred demo date" type="date" min={today} />
        <Field name="time" label="Preferred time" options={["09:00 – 11:00", "11:00 – 13:00", "13:00 – 15:00", "15:00 – 17:00"]} hint="West Africa Time (WAT)" />
        <Field name="message" label="Any specific requirements" type="textarea" required={false} full />
      </EbslForm>
    </FormShell>
  );
}
