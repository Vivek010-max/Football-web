"use client";
import React, { useEffect, useState, useRef } from "react";
import { simulateMatch, Team, Tactics, MatchResult, MatchEvent } from "@/lib/simmatch";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Activity, Zap, Info } from "lucide-react";

type MatchSimulatorProps = {
  team: Team;
  tactics: Tactics;
  onSimulate: (result: MatchResult) => void;
};

export default function MatchSimulator({
  team,
  tactics,
  onSimulate,
}: MatchSimulatorProps) {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [displayedEvents, setDisplayedEvents] = useState<MatchEvent[]>([]);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opponent = pickRandomOpponent(team.name);
    const generatedResult = simulateMatch(team, opponent, tactics, {
      style: "Balanced",
      press: "Medium",
      buildUp: "Fast",
    });

    setResult(generatedResult);

    // Live Feed Simulation
    const totalDurationMs = 15000; // The match sim runs in 15 seconds
    const intervalMs = totalDurationMs / 90; // Tick every simulated minute

    let currentMin = 0;
    const interval = setInterval(() => {
      currentMin++;
      if (currentMin > 90) {
        clearInterval(interval);
        setTimeout(() => onSimulate(generatedResult), 2000);
        return;
      }

      setCurrentMinute(currentMin);
      
      const newEvents = generatedResult.events.filter(e => e.minute === currentMin);
      if (newEvents.length > 0) {
        setDisplayedEvents(prev => [...prev, ...newEvents]);
        
        // Update Score realistically on goals
        newEvents.forEach(e => {
          if (e.type === "Goal") {
            if (e.team === "A") setScoreA(s => s + 1);
            if (e.team === "B") setScoreB(s => s + 1);
          }
        });
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [team, tactics, onSimulate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedEvents]);

  if (!result) return null;

  return (
    <div className="w-full max-w-5xl mx-auto pt-24 px-4 text-white">
      {/* Scoreboard Header */}
      <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl p-6 border border-neutral-800 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />
        <h2 className="text-center text-sm uppercase tracking-[0.2em] font-mono text-neutral-400 mb-6 flex items-center justify-center gap-2">
          <Timer className="w-4 h-4 animate-pulse text-red-500" />
          {currentMinute === 90 ? "Full Time" : `${currentMinute}'`}
        </h2>
        
        <div className="flex items-center justify-center gap-12">
          {/* Team A */}
          <div className="flex flex-col items-center flex-1">
            <img src={result.teamA.logo} alt={result.teamA.name} className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-4" />
            <h3 className="text-xl font-bold font-sans text-center">{result.teamA.name}</h3>
            <p className="text-neutral-500 text-sm mt-1">OVR {(result.teamA.attack + result.teamA.midfield + result.teamA.defense) / 3 | 0}</p>
          </div>

          {/* Score */}
          <div className="flex items-center gap-6">
            <span className="text-7xl font-mono font-black tabular-nums tracking-tighter shadow-black drop-shadow-md">{scoreA}</span>
            <span className="text-3xl text-neutral-600">-</span>
            <span className="text-7xl font-mono font-black tabular-nums tracking-tighter shadow-black drop-shadow-md">{scoreB}</span>
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center flex-1">
            <img src={result.teamB.logo} alt={result.teamB.name} className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-4" />
            <h3 className="text-xl font-bold font-sans text-center">{result.teamB.name}</h3>
            <p className="text-neutral-500 text-sm mt-1">OVR {(result.teamB.attack + result.teamB.midfield + result.teamB.defense) / 3 | 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Play-by-Play Commentary (2 columns) */}
        <div className="lg:col-span-2 bg-black/40 border border-neutral-800 rounded-2xl p-6">
          <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-400 mb-4 pb-4 border-b border-neutral-800">
            <Activity className="w-4 h-4" /> Live Events
          </h3>
          <div 
            ref={scrollRef} 
            className="h-[400px] overflow-y-auto pr-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-700"
          >
            <AnimatePresence>
              {displayedEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-4 p-3 rounded-lg border text-sm ${
                    event.type === "Goal" 
                      ? "bg-emerald-950/30 border-emerald-900/50 text-emerald-200"
                      : event.type === "Card"
                      ? "bg-amber-950/30 border-amber-900/50 text-amber-200"
                      : "bg-neutral-900/50 border-neutral-800/50 text-neutral-300"
                  }`}
                >
                  <span className="font-mono text-neutral-500 w-8">{event.minute}'</span>
                  <p className="flex-1">{event.description}</p>
                  {event.type === "Goal" && <span className="text-xl">⚽</span>}
                  {event.type === "Card" && <span className="text-xl">🟨</span>}
                  {event.type === "Save" && <span className="text-xl">🧤</span>}
                  {event.type === "Shot" && <span className="text-xl">🎯</span>}
                </motion.div>
              ))}
            </AnimatePresence>
            {currentMinute < 90 && (
              <div className="animate-pulse flex gap-4 p-3">
                <span className="font-mono text-neutral-600">--'</span>
                <p className="text-neutral-600">Simulating action...</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Match Stats View (1 column) */}
        <div className="bg-black/40 border border-neutral-800 rounded-2xl p-6">
          <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-400 mb-4 pb-4 border-b border-neutral-800">
            <Zap className="w-4 h-4" /> Live Stats
          </h3>
          <div className="space-y-6">
            <StatBar title="Possession" valueA={result.stats.possession[0]} valueB={result.stats.possession[1]} isPercentage />
            <StatBar title="Shots" valueA={Math.round(result.stats.shots[0] * (currentMinute/90))} valueB={Math.round(result.stats.shots[1] * (currentMinute/90))} />
            <StatBar title="Shots On Target" valueA={Math.round(result.stats.shotsOnTarget[0] * (currentMinute/90))} valueB={Math.round(result.stats.shotsOnTarget[1] * (currentMinute/90))} />
            <StatBar title="Expected Goals (xG)" valueA={Number((result.stats.xG[0] * (currentMinute/90)).toFixed(2))} valueB={Number((result.stats.xG[1] * (currentMinute/90)).toFixed(2))} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBar({ title, valueA, valueB, isPercentage = false }: { title: string; valueA: number; valueB: number; isPercentage?: boolean }) {
  const total = valueA + valueB || 1;
  const percentA = (valueA / total) * 100;
  
  return (
    <div>
      <div className="flex justify-between text-xs text-neutral-400 mb-2 uppercase tracking-wide font-mono">
        <span>{valueA}{isPercentage && "%"}</span>
        <span>{title}</span>
        <span>{valueB}{isPercentage && "%"}</span>
      </div>
      <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden flex">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: "50%" }}
          animate={{ width: `${percentA}%` }} 
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="h-full bg-red-500"
          initial={{ width: "50%" }}
          animate={{ width: `${100 - percentA}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
}

function pickRandomOpponent(excludeName: string): Team {
  const opponents: Team[] = [
    { name: "Real Madrid", attack: 88, midfield: 86, defense: 84, logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
    { name: "Manchester City", attack: 90, midfield: 89, defense: 87, logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
    { name: "Bayern Munich", attack: 86, midfield: 84, defense: 85, logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
    { name: "PSG", attack: 85, midfield: 84, defense: 80, logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
    { name: "Liverpool", attack: 86, midfield: 85, defense: 82, logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" }
  ];
  const available = opponents.filter((t) => t.name !== excludeName);
  return available[Math.floor(Math.random() * available.length)];
}
