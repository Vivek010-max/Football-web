import { getTournaments } from "@/lib/football-api";
import TournamentGrid from "./TournamentGrid";

export default async function TournamentsPage() {
  const tournaments = await getTournaments();

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <section className="pt-28 pb-4 px-6 text-center">
        <h1 className="relative z-10 text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-4">
          Tournaments
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto text-base">
          Every major competition tracked — from group stage battles to grand finals.
        </p>
        <div className="mt-10 flex justify-center gap-3 flex-wrap">
          {[
            { label: "Live Competitions", val: tournaments.filter(t => t.status === "Ongoing").length },
            { label: "Total Teams", val: tournaments.reduce((a, b) => a + b.teams, 0) },
            { label: "Total Matches", val: tournaments.reduce((a, b) => a + b.matches, 0) },
          ].map(s => (
            <div key={s.label} className="bg-[#111111] rounded-2xl px-6 py-4 border border-white/[0.04]">
              <div className="text-2xl font-bold text-white">{s.val}</div>
              <div className="text-xs text-neutral-600 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <TournamentGrid tournaments={tournaments} />
    </main>
  );
}