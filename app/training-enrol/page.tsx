import type { Metadata } from "next";
import { Choices, EbslForm, Field } from "@/components/Form";
import FormShell from "@/components/FormShell";
import { Serif } from "@/components/ui";

export const metadata: Metadata = {
  title: "Enrol | EBSL Training & Learning Academy",
  description: "Enrol individuals or teams in EBSL Learning Academy certification tracks, corporate training and leadership programmes.",
  alternates: { canonical: "/training-enrol" },
};

export default function TrainingEnrol() {
  return (
    <FormShell eyebrow="Learning Academy" crumb="Training enrolment" title={<>Enrol in the <Serif>Learning Academy.</Serif></>}
      lead="Certification tracks, corporate programmes and leadership training, for individuals or whole teams."
      points={["Tell us the course and how many people.", "We confirm schedule, venue or virtual link and fees by email.", "You receive a calendar invite and joining pack."]}>
      <EbslForm kind="training" submitLabel="Enrol Now" prefill={{ course: "course" }}
        success="Enrolment received. We've emailed a confirmation and will send schedule and joining details shortly.">
        <Field name="course" label="Course" full options={["Cisco networking (CCNA)", "Microsoft Azure / 365", "CompTIA (A+, Network+, Security+)", "ITIL 4 Foundation", "Cybersecurity awareness", "IT leadership & governance", "AI for business", "Custom corporate programme"]} />
        <Field name="full_name" label="Full name" auto="name" />
        <Field name="email" label="Email" type="email" auto="email" />
        <Field name="phone" label="Phone" type="tel" auto="tel" />
        <Field name="company" label="Company" auto="organization" required={false} />
        <Field name="level" label="Experience level" options={["Beginner", "Intermediate", "Advanced"]} />
        <Field name="candidates" label="Number of candidates" type="number" min="1" />
        <Choices name="training_type" legend="Type of training" options={[{ value: "Virtual", label: "Virtual" }, { value: "In-person", label: "In-person (Lagos)" }, { value: "On-site", label: "On-site at our company" }]} />
      </EbslForm>
    </FormShell>
  );
}
