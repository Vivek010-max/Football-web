"use client";
import React from "react";
import { MatchResult } from "@/lib/simmatch";
import { motion } from "framer-motion";

type ResultCardProps = {
  result: MatchResult;
  onReset: () => void;
};

export default function ResultCard({ result, onReset }: ResultCardProps) {
  const { teamA, teamB, halfTimeScore, fullTimeScore, stats, events, goalscorersA, goalscorersB } = result;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 pt-24 pb-12 text-white"
    >
      {/* Header Board */}
      <div className="bg-black/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/20 to-transparent pointer-events-none" />
        
        <h2 className="text-center text-sm font-mono tracking-widest text-neutral-400 uppercase mb-8">
          Full-Time
        </h2>

        <div className="flex items-start justify-center gap-12 relative z-10">
          {/* Team A */}
          <div className="flex flex-col items-center flex-1">
            <img src={teamA.logo} alt={teamA.name} className="w-24 h-24 object-contain mb-4 drop-shadow-2xl" />
            <h3 className="text-2xl font-bold text-center mb-4">{teamA.name}</h3>
            <div className="flex flex-col items-center space-y-1 text-sm text-neutral-400 font-mono">
              {goalscorersA.map((g, i) => (
                <span key={i} className="flex items-center gap-2">⚽ {g}</span>
              ))}
            </div>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center mt-4">
            <div className="flex items-center gap-6 mb-2">
              <span className="text-7xl font-black font-mono tracking-tighter shadow-black drop-shadow-xl">{fullTimeScore[0]}</span>
              <span className="text-3xl text-neutral-600">-</span>
              <span className="text-7xl font-black font-mono tracking-tighter shadow-black drop-shadow-xl">{fullTimeScore[1]}</span>
            </div>
            <p className="text-neutral-500 font-mono text-xs">HT: {halfTimeScore[0]} - {halfTimeScore[1]}</p>
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center flex-1">
            <img src={teamB.logo} alt={teamB.name} className="w-24 h-24 object-contain mb-4 drop-shadow-2xl" />
            <h3 className="text-2xl font-bold text-center mb-4">{teamB.name}</h3>
            <div className="flex flex-col items-center space-y-1 text-sm text-neutral-400 font-mono">
              {goalscorersB.map((g, i) => (
                <span key={i} className="flex items-center gap-2">⚽ {g}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Match Stats */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6">
          <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-6 text-center">Match Statistics</h3>
          <div className="space-y-6">
            <StatBar title="Possession (%)" valueA={stats.possession[0]} valueB={stats.possession[1]} />
            <StatBar title="Expected Goals (xG)" valueA={stats.xG[0]} valueB={stats.xG[1]} />
            <StatBar title="Total Shots" valueA={stats.shots[0]} valueB={stats.shots[1]} />
            <StatBar title="Shots on Target" valueA={stats.shotsOnTarget[0]} valueB={stats.shotsOnTarget[1]} />
            <StatBar title="Corner Kicks" valueA={stats.corners[0]} valueB={stats.corners[1]} />
            <StatBar title="Fouls Committed" valueA={stats.fouls[0]} valueB={stats.fouls[1]} invertColors />
            <StatBar title="Yellow Cards" valueA={stats.yellowCards[0]} valueB={stats.yellowCards[1]} invertColors />
          </div>
        </div>

        {/* Timeline Log */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 flex flex-col items-center justify-between">
          <div className="w-full">
             <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-6 text-center">Match Timeline</h3>
             <div className="h-[300px] overflow-y-auto pr-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-700">
                {events.map((event, i) => (
                  <div key={i} className="flex gap-4 text-sm text-neutral-300 items-start">
                    <span className="font-mono text-neutral-500 w-8 flex-shrink-0">{event.minute}'</span>
                    <p>{event.description}</p>
                  </div>
                ))}
             </div>
          </div>
          
          <button
            className="mt-8 w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10"
            onClick={onReset}
          >
            Start New Simulation
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StatBar({ title, valueA, valueB, invertColors = false }: { title: string; valueA: number; valueB: number, invertColors?: boolean }) {
  const total = valueA + valueB || 1; // Avoid Division by Zero
  const percentA = (valueA / total) * 100;
  
  const bgA = invertColors ? "bg-red-500" : "bg-blue-500";
  const bgB = invertColors ? "bg-blue-500" : "bg-red-500";

  return (
    <div>
      <div className="flex justify-between text-xs text-neutral-300 font-mono mb-2">
        <span className="font-bold text-lg">{valueA}</span>
        <span className="text-neutral-500 uppercase tracking-widest leading-loose">{title}</span>
        <span className="font-bold text-lg">{valueB}</span>
      </div>
      <div className="h-2 w-full bg-neutral-800 rounded-full flex overflow-hidden">
        <motion.div 
          className={`h-full ${bgA}`}
          initial={{ width: "50%" }}
          whileInView={{ width: `${percentA}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.div 
          className={`h-full ${bgB}`}
          initial={{ width: "50%" }}
          whileInView={{ width: `${100 - percentA}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );
}
