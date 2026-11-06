"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Icon, { Arrow } from "./Icon";
import { site, waChat } from "@/lib/site";

export type FormKind = "service-request" | "demo" | "consultation" | "training" | "careers" | "contact" | "phlyp-access" | "newsletter";

type Ctl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function message(f: Ctl) {
  if (f.validity.valid) return "";
  if (f.validity.valueMissing) return f instanceof HTMLInputElement && f.type === "file" ? "Please attach a file." : "This field is required.";
  if (f.validity.typeMismatch && f.type === "email") return "Enter a valid email, e.g. name@company.com.";
  if (f.validity.rangeUnderflow) return "Please choose a later date.";
  return f.validationMessage;
}

function setError(f: Ctl, msg: string) {
  const wrap = f.closest(".field");
  if (!wrap) return;
  wrap.classList.toggle("has-error", !!msg);
  let e = wrap.querySelector<HTMLParagraphElement>(".error");
  const hint = wrap.querySelector(".hint")?.id;
  if (msg) {
    if (!e) { e = document.createElement("p"); e.className = "error"; e.id = `${f.id}-err`; wrap.appendChild(e); }
    e.textContent = msg;
    f.setAttribute("aria-invalid", "true");
    f.setAttribute("aria-describedby", [hint, e.id].filter(Boolean).join(" "));
  } else {
    e?.remove(); f.removeAttribute("aria-invalid");
    if (hint) f.setAttribute("aria-describedby", hint); else f.removeAttribute("aria-describedby");
  }
}

/**
 * Posts to /api/forms. Client-side validation with inline errors, honeypot + timing anti-spam,
 * success state replaces the form. `prefill` maps URL query params to field names.
 */
export function EbslForm({ kind, children, success, className = "", submitLabel, inline = false, prefill }: {
  kind: FormKind; children: ReactNode; success: string; className?: string; submitLabel?: string; inline?: boolean;
  prefill?: Record<string, string>;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const started = useRef(0);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [status, setStatus] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    started.current = Date.now();
    const form = ref.current;
    if (!form) return;
    const q = new URLSearchParams(location.search);
    Object.entries(prefill ?? {}).forEach(([param, name]) => {
      const v = q.get(param);
      if (!v) return;
      const els = form.querySelectorAll<Ctl>(`[name="${name}"]`);
      els.forEach((el) => {
        if (el instanceof HTMLInputElement && el.type === "radio") { if (el.value.toLowerCase() === v.toLowerCase()) el.checked = true; }
        else if (el instanceof HTMLSelectElement) {
          const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
          const o = Array.from(el.options).find((o) => o.value && norm(o.value).startsWith(norm(v)));
          if (o) el.value = o.value;
        } else el.value = v;
      });
    });
    const onBlur = (e: FocusEvent) => { const f = e.target as Ctl; if (f.matches?.("input, select, textarea") && f.value) setError(f, message(f)); };
    form.addEventListener("focusout", onBlur);
    return () => form.removeEventListener("focusout", onBlur);
  }, [prefill]);

  useEffect(() => { if (state === "done") doneRef.current?.focus(); }, [state]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    let first: Ctl | null = null;
    form.querySelectorAll<Ctl>("input, select, textarea").forEach((f) => {
      if (f.closest(".hp") || f.type === "hidden") return;
      let msg = message(f);
      if (!msg && f instanceof HTMLInputElement && f.type === "file" && f.files?.[0] && f.files[0].size > 5 * 1024 * 1024) msg = "File must be 5MB or smaller.";
      setError(f, msg);
      if (msg && !first) first = f;
    });
    if (first) { (first as Ctl).focus(); setStatus("Please fix the highlighted fields."); return; }

    setState("sending"); setStatus("");
    const fd = new FormData(form);
    fd.set("_form", kind);
    fd.set("_t", String(started.current));
    try {
      const res = await fetch("/api/forms", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setState("done");
    } catch (err) {
      setState("idle");
      setStatus(`${(err as Error).message} You can also reach us on WhatsApp or by email.`);
    }
  }

  if (state === "done") {
    return inline
      ? <p className="form-status" role="status">{success}</p>
      : (
        <div className="form-success" role="status" tabIndex={-1} ref={doneRef}>
          <div className="tick"><Icon name="check" /></div>
          <h3>Request received</h3>
          <p>{success}</p>
        </div>
      );
  }

  const busy = state === "sending";
  const statusId = `${kind}-status`;
  return (
    <form ref={ref} className={inline ? "inline-wrap" : className} onSubmit={submit} noValidate aria-busy={busy}
      aria-describedby={inline && status ? statusId : undefined}>
      <div className="hp" aria-hidden="true">
        <label>Leave this empty<input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {inline ? (
        <>
          <div className={className}>
            {children}
            <button className="btn" type="submit" disabled={busy}>{busy ? "Sending…" : <>{submitLabel ?? "Subscribe"} <Arrow /></>}</button>
          </div>
          {status && (
            <p className="inline-status" id={statusId} role="alert">
              <Icon name="bell" />
              <span>{status.replace(/ You can also reach us.*$/, "")} Try again shortly, or reach us on{" "}
                <a href={waChat} target="_blank" rel="noopener noreferrer">WhatsApp</a> or at <a href={`mailto:${site.email}`}>{site.email}</a>.</span>
            </p>
          )}
        </>
      ) : (
        <div className="form-grid">
          {children}
          <div className="full">
            <button className="btn" type="submit" disabled={busy}>{busy ? "Sending…" : <>{submitLabel ?? "Submit"} <Arrow /></>}</button>
            <p className={`form-status${status ? " is-error" : ""}`} role="alert" aria-live="polite">{status}</p>
            <p className="hint" style={{ marginTop: 8 }}>
              We reply within one business day. Your details are handled under our <Link className="link-arrow" href="/privacy-policy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      )}
    </form>
  );
}

type FieldProps = {
  name: string; label: string; type?: string; required?: boolean; full?: boolean; auto?: string; hint?: string;
  options?: string[]; placeholder?: string; min?: string; accept?: string;
};

export function Field({ name, label, type = "text", required = true, full, auto, hint, options, placeholder, min, accept }: FieldProps) {
  const id = `f-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const common = { id, name, required, "aria-describedby": hintId };
  let ctl: ReactNode;
  if (options) {
    ctl = (
      <select {...common} defaultValue="">
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  } else if (type === "textarea") ctl = <textarea {...common} placeholder={placeholder} />;
  else if (type === "file") {
    ctl = <FileDrop {...common} accept={accept} />;
  } else ctl = <input {...common} type={type} autoComplete={auto} placeholder={placeholder} min={min} />;
  return (
    <div className={`field${full ? " full" : ""}`}>
      <label htmlFor={id}>
        {label}{" "}
        {required ? <span className="req" aria-hidden="true">*</span> : <span style={{ fontWeight: 500, color: "var(--muted)" }}>(optional)</span>}
      </label>
      {ctl}
      {hint && <p className="hint" id={hintId}>{hint}</p>}
    </div>
  );
}

function FileDrop(props: { id: string; name: string; required: boolean; accept?: string; "aria-describedby"?: string }) {
  const [name, setName] = useState("");
  const [drag, setDrag] = useState(false);
  return (
    <div className={`file-drop${drag ? " is-drag" : ""}`} onDragEnter={() => setDrag(true)} onDragLeave={() => setDrag(false)} onDrop={() => setDrag(false)}>
      <input type="file" {...props} onChange={(e) => setName(e.target.files?.[0]?.name ?? "")} />
      <Icon name="upload" className="svc-icon" />
      <p className="mb-0">{name ? <span className="fname">{name}</span> : <>Drag your file here or <strong>browse</strong></>}</p>
    </div>
  );
}

export function Choices({ name, legend, options, required = true }: { name: string; legend: string; options: { value: string; label: string; sub?: string }[]; required?: boolean }) {
  return (
    <fieldset className="field full" style={{ border: 0, padding: 0, margin: 0 }}>
      <legend style={{ marginBottom: 8 }}>{legend} {required && <span className="req" aria-hidden="true">*</span>}</legend>
      <div className="choice-row">
        {options.map((o, i) => (
          <label className={`choice${o.sub ? " choice-card" : ""}`} key={o.value}>
            <input type="radio" name={name} value={o.value} required={required} defaultChecked={i === 0} />
            <span>{o.label}{o.sub && <small>{o.sub}</small>}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
