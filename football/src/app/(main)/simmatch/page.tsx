"use client";
import React, { useState } from "react";
import TeamPicker from "@/components/simmatch/Teampicker";
import TacticsForm from "@/components/simmatch/TacticsForm";
import MatchSimulator from "@/components/simmatch/Matchsimulator";
import ResultCard from "@/components/simmatch/Resultcard";
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

type MatchResult = {
  teamA: Team;
  teamB: Team;
  halfTimeScore: [number, number];
  fullTimeScore: [number, number];
  events: string[];
};

export default function SimMatchPage() {
  const [step, setStep] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [tactics, setTactics] = useState<Tactics | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  const resetGame = () => {
    setStep(1);
    setSelectedTeam(null);
    setTactics(null);
    setMatchResult(null);
  };

  return (
    <main className="min-h-screen px-6 pt-4 pb-12 bg-neutral-100 dark:bg-black">
      <div className=" max-w-5xl mx-auto">
        {step === 1 && (
          <TeamPicker
            onSelectTeam={(team) => {
              setSelectedTeam(team);
              setStep(2);
            }}
          />
        )}

        {step === 2 && selectedTeam && (
          <TacticsForm
            onSelectTactics={(tacticChoice) => {
              setTactics(tacticChoice);
              setStep(3);
            }}
          />
        )}

        {step === 3 && selectedTeam && tactics && (
          <MatchSimulator
            team={selectedTeam}
            tactics={tactics}
            onSimulate={(result) => {
              setMatchResult(result);
              setStep(4);
            }}
          />
        )}

        {step === 4 && matchResult && (
          <ResultCard result={matchResult} onReset={resetGame} />
        )}
      </div>
    </main>
  );
}
