import type { Metadata } from "next";
import { Choices, EbslForm, Field } from "@/components/Form";
import FormShell from "@/components/FormShell";
import { Serif } from "@/components/ui";
import { serviceOptions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tell Us What You Need | Service Request",
  description: "Request any EBSL service: infrastructure, consulting, cybersecurity, managed services, procurement, training, software, Agentic AI or Phlyp Pay.",
  alternates: { canonical: "/service-request" },
};

export default function ServiceRequest() {
  return (
    <FormShell eyebrow="Service request" crumb="Service request" title={<>Tell us what <Serif>you need.</Serif></>}
      lead="One form for every EBSL service. Share a little context and the right specialist will come back to you within one business day."
      points={["You get an email confirming we've received your request.", "A specialist reviews it and contacts you by your preferred channel.", "We agree scope, timeline and a clear quote, with no obligation."]}>
      <EbslForm kind="service-request" submitLabel="Send My Request" prefill={{ service: "service", product: "service" }}
        success="Thanks, your request is with our team. We've emailed you a confirmation and will be in touch within one business day.">
        <Field name="service" label="Select service" options={serviceOptions} full />
        <Field name="full_name" label="Full name" auto="name" />
        <Field name="company" label="Business / company name" auto="organization" />
        <Field name="email" label="Email address" type="email" auto="email" />
        <Field name="phone" label="Phone number" type="tel" auto="tel" />
        <Choices name="contact_method" legend="Preferred contact method" options={[{ value: "Email", label: "Email" }, { value: "Phone", label: "Phone" }, { value: "WhatsApp", label: "WhatsApp" }]} />
        <Field name="message" label="Describe your requirement" type="textarea" full placeholder="What are you trying to achieve? Any timelines or constraints?" />
      </EbslForm>
    </FormShell>
  );
}
