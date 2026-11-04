import type { Metadata } from "next";
import Legal from "@/components/Legal";
import { photoCredits } from "@/lib/photos";

export const metadata: Metadata = { title: "Photo credits", description: "Credits for the photographs used on this website.", alternates: { canonical: "/credits" } };

export default function Credits() {
  return (
    <Legal title="Photo credits" updated="November 2026">
      <p>Photographs on this site are used under their creators&apos; open licences, via Wikimedia Commons.</p>
      <ul>
        {photoCredits.map((c) => (
          <li key={c.page}>
            <a href={c.page} target="_blank" rel="noopener noreferrer">{c.title}</a> by {c.creator} ({c.license})
          </li>
        ))}
      </ul>
    </Legal>
  );
}
