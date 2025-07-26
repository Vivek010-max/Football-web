import { HoverEffect } from "@/components/ui/card-hover-effect";

export function Cardhover() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "PSG Win European Treble with 5‑0 Final Victory ",
    description:
      "Paris Saint‑Germain completed a historic treble after dominating Inter Milan in the UEFA Champions League final.",
    link: "#psg-treble",
  },
  {
    title: "Riots in Paris After PSG’s Champions League Win",
    description:
      "Celebratory riots broke out across Paris after PSG’s landmark victory—leading to over 500 arrests and two fatalities.",
    link: "#psg-riots",
  },
  {
    title: "Transfer Rumours: Bayern, Real & Barça Target Konaté",
    description:
      "Top European clubs compete for Liverpool defender Ibrahima Konaté in a high-stakes €50M saga.",
    link: "#konate-race",
  },
  {
    title: "Everton Plans Key Summer Signings Ahead of 2025",
    description:
      "The club focuses on reinforcements in midfield and fullbacks after budget restructuring under new ownership.",
    link: "#everton-transfers",
  },
  {
    title: "Munich Overrun by PSG Fans Celebrating Treble Riot",
    description:
      "Paris erupts as PSG wins Champions League; escalating celebrations took a violent turn in the streets.",
    link: "#paris-celebrations",
  },
  {
    title: "Messi Suspended for MLS Rule Violation",
    description:
      "MLS slapped Messi with a one-match ban after missing All-Star Game — Inter Miami calls the decision ‘draconian.’",
    link: "#messi-ban",
  },
];
