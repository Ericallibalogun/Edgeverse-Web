import type { Metadata } from "next";
import Icon, { Arrow } from "@/components/Icon";
import { EbslForm, Field } from "@/components/Form";
import { d, FeatureList, PageHero, SectionHead, Serif, Split } from "@/components/ui";
import { jobs } from "@/lib/people";

export const metadata: Metadata = {
  title: "Careers at EBSL: Jobs, Internships & Graduate Programmes",
  description: "Build your career in infrastructure, cybersecurity, consulting and AI. See open roles, internship and graduate programmes, or send your CV to EBSL.",
  alternates: { canonical: "/careers" },
};

export default function Careers() {
  return (
    <>
      <PageHero title={<>Do the best work of <Serif>your career.</Serif></>} eyebrow="Careers" crumbs={[{ label: "Careers" }]}
        lead="Join a team solving real infrastructure, security and AI problems for businesses across Africa, with certification and mentoring built in."
        actions={<><a className="btn" href="#apply" data-magnetic>Submit Your CV <Arrow /></a><a className="btn btn--outline-light" href="#positions">Open positions</a></>} />

      <section className="section" id="positions" aria-labelledby="pos-h" style={{ scrollMarginTop: 96 }}>
        <div className="container">
          <SectionHead eyebrow="Open positions" id="pos-h" title="Current openings." />
          {jobs.length ? (
            <div style={{ borderTop: "1px solid var(--line)" }}>
              {jobs.map((j) => (
                <article className="job reveal" key={j.title}>
                  <div><h3>{j.title}</h3><p className="meta mb-0">{j.summary}</p></div>
                  <span className="meta">{j.type} · {j.location}</span>
                  <a className="btn btn--sm" href={`?position=${encodeURIComponent(j.title)}#apply`}>Apply Now<span className="sr-only"> for {j.title}</span></a>
                </article>
              ))}
            </div>
          ) : (
            <div className="card reveal" style={{ flexDirection: "row", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <span className="svc-icon"><Icon name="briefcase" /></span>
              <div style={{ flex: 1, minWidth: 240 }}><h3 className="mb-0">No open roles listed right now</h3><p className="mb-0">We&apos;re always glad to hear from talented people. Send a general application and we&apos;ll keep you in mind.</p></div>
              <a className="btn" href="#apply">Apply Now <Arrow /></a>
            </div>
          )}
        </div>
      </section>

      <section className="section section--dark" id="internship" aria-labelledby="int-h" style={{ scrollMarginTop: 96 }}>
        <div className="container split split--even">
          <div>
            <p className="eyebrow">Internship &amp; graduate programmes</p>
            <Split className="h2" id="int-h">Start your IT career with real work.</Split>
            <p className="lead reveal">Structured six- to twelve-month programmes pairing graduates and interns with senior engineers on live client projects.</p>
          </div>
          <div className="reveal" style={d(120)}>
            <FeatureList items={["Hands-on rotation across infrastructure, security and software", "Certification support through the EBSL Learning Academy", "A named mentor and regular feedback", "A path to full-time roles for strong performers"]} />
            <a className="btn btn--light mt-m" href="?position=Internship%20%2F%20Graduate%20Programme#apply">Apply for the programme <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="section section--tint" id="apply" aria-labelledby="ap-h" style={{ scrollMarginTop: 96 }}>
        <div className="container split">
          <div>
            <p className="eyebrow">Submit your CV</p>
            <Split className="h2" id="ap-h">Apply to EBSL.</Split>
            <p className="lead reveal">PDF or Word, up to 5MB. You&apos;ll get an acknowledgement by email, and our HR team reviews every application.</p>
          </div>
          <div className="form-card reveal">
            <EbslForm kind="careers" submitLabel="Submit Application" prefill={{ position: "position" }}
              success="Application received. We've emailed an acknowledgement, and our HR team will be in touch if there's a fit.">
              <Field name="full_name" label="Full name" auto="name" />
              <Field name="email" label="Email" type="email" auto="email" />
              <Field name="phone" label="Phone" type="tel" auto="tel" />
              <Field name="position" label="Position applying for" placeholder="e.g. Network Engineer, or General application" />
              <Field name="cv" label="Upload CV" type="file" full accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hint="PDF or Word, max 5MB." />
              <Field name="cover_letter" label="Cover letter" type="textarea" full required={false} />
            </EbslForm>
          </div>
        </div>
      </section>
    </>
  );
}
