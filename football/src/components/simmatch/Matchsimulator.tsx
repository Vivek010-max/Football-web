"use client";
import React, { useEffect, useState } from "react";
import { simulateMatch } from "@/lib/simmatch";

type Team = {
  name: string;
  attack: number;
  midfield: number;
  defense: number;
  logo: string;
};

type Tactics = {
  style: "Attacking" | "Balanced" | "Defensive";
  press: "High Press" | "Medium" | "Low Block";
  buildUp: "Fast" | "Slow";
};

type MatchSimulatorProps = {
  team: Team;
  tactics: Tactics;
  onSimulate: (result: any) => void;
};

export default function MatchSimulator({
  team,
  tactics,
  onSimulate,
}: MatchSimulatorProps) {
  const [events, setEvents] = useState<string[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    const opponent = pickRandomOpponent(team.name);

    const result = simulateMatch(team, opponent, tactics, {
      style: "Balanced",
      press: "Medium",
      buildUp: "Fast",
    });

    setEvents(result.events);

    // Simulate live feed
    let i = 0;
    const interval = setInterval(() => {
      if (i < result.events.length) {
        setDisplayedEvents((prev) => [...prev, result.events[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onSimulate(result);
        }, 1000); // brief pause before showing results
      }
    }, 1200); // 1.2 seconds per event

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Match In Progress</h2>
      <div className="bg-black text-white rounded-lg p-6 h-[400px] overflow-y-auto space-y-3 font-mono shadow-xl">
        {displayedEvents.length === 0 && <p>Loading kickoff...</p>}
        {displayedEvents.map((line, index) => (
          <p key={index} className="fade-in">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function pickRandomOpponent(excludeName: string): Team {
  const opponents: Team[] = [
    {
      name: "Real Madrid",
      attack: 88,
      midfield: 86,
      defense: 84,
      logo: "/teams/realmadrid.png",
    },
    {
      name: "Manchester City",
      attack: 90,
      midfield: 89,
      defense: 87,
      logo: "/teams/mancity.png",
    },
    {
      name: "Bayern Munich",
      attack: 86,
      midfield: 84,
      defense: 85,
      logo: "/teams/bayern.png",
    },
  ];
  const available = opponents.filter((t) => t.name !== excludeName);
  return available[Math.floor(Math.random() * available.length)];
}
