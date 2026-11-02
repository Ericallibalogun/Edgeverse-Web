import type { Metadata } from "next";
import { Choices, EbslForm, Field } from "@/components/Form";
import FormShell from "@/components/FormShell";
import { Serif } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book a Free IT Consultation, Health Check or Proposal",
  description: "Book a free IT consultation, an IT health check / assessment, or request a proposal from EBSL's consultants in Lagos.",
  alternates: { canonical: "/consultation" },
};

export default function Consultation() {
  return (
    <FormShell eyebrow="Consultations" crumb="Consultations" title={<>Book a free <Serif>consultation.</Serif></>}
      lead="Three ways to start: a strategy conversation, a structured health check of your IT estate, or a formal proposal for a defined project."
      points={["Choose the consultation type that fits.", "Tell us when you're available.", "A senior consultant confirms by email and meets you on-site or online."]}>
      <EbslForm kind="consultation" submitLabel="Book Consultation" prefill={{ type: "type" }}
        success="Booked. A senior consultant will confirm your slot by email within one business day.">
        <Choices name="type" legend="Consultation type" options={[
          { value: "consultation", label: "Free IT Consultation", sub: "45-min strategy call" },
          { value: "assessment", label: "IT Health Check", sub: "Structured assessment" },
          { value: "proposal", label: "Request a Proposal", sub: "Scoped project quote" },
        ]} />
        <Field name="full_name" label="Full name" auto="name" />
        <Field name="company" label="Company" auto="organization" />
        <Field name="email" label="Email" type="email" auto="email" />
        <Field name="phone" label="Phone" type="tel" auto="tel" />
        <Field name="availability" label="Available times" full placeholder="e.g. Tue or Thu mornings, next two weeks" />
        <Field name="message" label="Describe what you'd like to discuss" type="textarea" full />
      </EbslForm>
    </FormShell>
  );
}
