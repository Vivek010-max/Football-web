"use client";
import { useState } from "react";
import { TournamentData } from "@/lib/football-api";

const statusStyles: Record<string, string> = {
  Ongoing: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Upcoming: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Completed: "bg-neutral-700/30 text-neutral-500 border border-neutral-600/20",
};

const filters = ["All", "Ongoing", "Upcoming", "Completed"];

export default function TournamentGrid({ tournaments }: { tournaments: TournamentData[] }) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? tournaments : tournaments.filter(t => t.status === active);

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 mb-8 mt-10">
        <div className="flex gap-2 flex-wrap justify-center">
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
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusStyles[t.status] || "bg-neutral-700/30 text-neutral-500"}`}>{t.status}</span>
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
                  <p className="text-neutral-300 text-xs font-medium mt-0.5 truncate max-w-[120px]">{t.status === "Completed" && t.name.includes("Euro") ? "Spain 🇪🇸" : t.topScorer}</p>
                </div>
                <span className="text-neutral-700 text-sm group-hover:text-neutral-400 transition">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
