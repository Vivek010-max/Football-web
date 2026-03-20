"use client";
import React, { useState } from "react";
import TeamPicker from "@/components/simmatch/Teampicker";
import TacticsForm from "@/components/simmatch/TacticsForm";
import MatchSimulator from "@/components/simmatch/Matchsimulator";
import ResultCard from "@/components/simmatch/Resultcard";
import { Team, Tactics, MatchResult } from "@/lib/simmatch";
import { motion } from "framer-motion";

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="w-full flex justify-center w-full"
  >
    {children}
  </motion.div>
);

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
    <main className="w-full px-6 pt-24 pb-12 bg-neutral-100 dark:bg-black flex flex-col justify-center items-center font-sans">
      <div className="w-full flex flex-col justify-center">
        {step === 1 && (
          <PageTransition key="step1">
            <TeamPicker
              onSelectTeam={(team) => {
                setSelectedTeam(team);
                setStep(2);
              }}
            />
          </PageTransition>
        )}

        {step === 2 && selectedTeam && (
          <PageTransition key="step2">
            <TacticsForm
              onSelectTactics={(tacticChoice) => {
                setTactics(tacticChoice);
                setStep(3);
              }}
            />
          </PageTransition>
        )}

        {step === 3 && selectedTeam && tactics && (
          <PageTransition key="step3">
            <MatchSimulator
              team={selectedTeam}
              tactics={tactics}
              onSimulate={(result) => {
                setMatchResult(result);
                setStep(4);
              }}
            />
          </PageTransition>
        )}

        {step === 4 && matchResult && (
          <PageTransition key="step4">
            <ResultCard result={matchResult} onReset={resetGame} />
          </PageTransition>
        )}
      </div>
    </main>
  );
}
