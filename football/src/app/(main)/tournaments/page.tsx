"use client";
import { useState } from "react";

const tournaments = [
  { id: 1, name: "UEFA Champions League", region: "Europe", status: "Ongoing", teams: 32, prize: "€80M", startDate: "Sep 2024", endDate: "May 2025", emoji: "🏆", topScorer: "Raphinha", matches: 125 },
  { id: 2, name: "Premier League", region: "England", status: "Ongoing", teams: 20, prize: "£100M", startDate: "Aug 2024", endDate: "May 2025", emoji: "👑", topScorer: "Erling Haaland", matches: 380 },
  { id: 3, name: "FIFA World Cup 2026", region: "Global", status: "Upcoming", teams: 48, prize: "$440M", startDate: "Jun 2026", endDate: "Jul 2026", emoji: "🌍", topScorer: "TBD", matches: 104 },
  { id: 4, name: "La Liga", region: "Spain", status: "Ongoing", teams: 20, prize: "€60M", startDate: "Aug 2024", endDate: "May 2025", emoji: "🔴", topScorer: "Kylian Mbappé", matches: 380 },
  { id: 5, name: "Serie A", region: "Italy", status: "Ongoing", teams: 20, prize: "€50M", startDate: "Aug 2024", endDate: "May 2025", emoji: "🇮🇹", topScorer: "Lautaro Martinez", matches: 380 },
  { id: 6, name: "UEFA Euro 2024", region: "Europe", status: "Completed", teams: 24, prize: "€331M", startDate: "Jun 2024", endDate: "Jul 2024", emoji: "⭐", topScorer: "Jamal Musiala", matches: 51 },
  { id: 7, name: "Bundesliga", region: "Germany", status: "Ongoing", teams: 18, prize: "€55M", startDate: "Aug 2024", endDate: "May 2025", emoji: "🦅", topScorer: "Harry Kane", matches: 306 },
  { id: 8, name: "Copa América 2024", region: "Americas", status: "Completed", teams: 16, prize: "$50M", startDate: "Jun 2024", endDate: "Jul 2024", emoji: "🏅", topScorer: "Lautaro Martinez", matches: 32 },
];

const statusStyles: Record<string, string> = {
  Ongoing: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Upcoming: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Completed: "bg-neutral-700/30 text-neutral-500 border border-neutral-600/20",
};

const filters = ["All", "Ongoing", "Upcoming", "Completed"];

export default function TournamentsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? tournaments : tournaments.filter(t => t.status === active);

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <section className="pt-28 pb-16 px-6 text-center">
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

      <section className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === f
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-neutral-500 border border-white/[0.04] hover:text-neutral-300 hover:border-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(t => (
            <div
              key={t.id}
              className="bg-[#111111] rounded-3xl border border-white/[0.04] p-5 hover:border-white/[0.10] hover:bg-[#161616] transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{t.emoji}</span>
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusStyles[t.status]}`}>{t.status}</span>
              </div>
              <h2 className="text-white font-bold text-base mb-1 leading-tight">{t.name}</h2>
              <p className="text-neutral-600 text-xs mb-4">{t.region} · {t.startDate} – {t.endDate}</p>
              <div className="space-y-2 mb-4">
                {[{ label: "Teams", val: t.teams, max: 50 }, { label: "Matches", val: t.matches, max: 400 }].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-600">{s.label}</span>
                      <span className="text-neutral-400 font-medium">{s.val}</span>
                    </div>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <div className="h-full bg-white/20 rounded-full" style={{ width: `${Math.min((s.val / s.max) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-neutral-600 uppercase tracking-wide">{t.status === "Completed" ? "Winner" : "Top Scorer"}</p>
                  <p className="text-neutral-300 text-xs font-medium mt-0.5 truncate max-w-[120px]">{t.status === "Completed" ? "Spain 🇪🇸" : t.topScorer}</p>
                </div>
                <span className="text-neutral-700 text-sm group-hover:text-neutral-400 transition">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}