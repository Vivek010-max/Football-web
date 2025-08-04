"use client";
import React from "react";

type Team = {
  name: string;
  attack: number;
  midfield: number;
  defense: number;
  logo: string;
};

type MatchResult = {
  teamA: Team;
  teamB: Team;
  halfTimeScore: [number, number];
  fullTimeScore: [number, number];
  events: string[];
};

type ResultCardProps = {
  result: MatchResult;
  onReset: () => void;
};

export default function ResultCard({ result, onReset }: ResultCardProps) {
  const { teamA, teamB, halfTimeScore, fullTimeScore, events } = result;

  return (
    <div className="max-w-2xl mx-auto text-center px-4">
      <h2 className="text-3xl font-bold mb-6">🏁 Full-Time</h2>

      <div className="flex items-center justify-center gap-6 mb-6">
        {/* Team A */}
        <div className="flex flex-col items-center">
          <img
            src={teamA.logo}
            alt={teamA.name}
            className="w-16 h-16 object-contain mb-2"
          />
          <p className="font-semibold">{teamA.name}</p>
        </div>

        {/* Score */}
        <div className="text-4xl font-bold">
          {fullTimeScore[0]} - {fullTimeScore[1]}
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center">
          <img
            src={teamB.logo}
            alt={teamB.name}
            className="w-16 h-16 object-contain mb-2"
          />
          <p className="font-semibold">{teamB.name}</p>
        </div>
      </div>

      {/* Half-time Score */}
      <p className="mb-2 text-sm text-gray-500 dark:text-neutral-400">
        HT: {halfTimeScore[0]} - {halfTimeScore[1]}
      </p>

      {/* Match Events */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Key Events</h3>
        <div className="bg-neutral-900 text-white rounded-lg p-4 h-60 overflow-y-auto text-sm font-mono space-y-1">
          {events.map((event, i) => (
            <p key={i}>{event}</p>
          ))}
        </div>
      </div>

      {/* Play Again Button */}
      <button
        className="mt-8 bg-black text-white py-2 px-6 rounded-lg hover:bg-neutral-800 transition"
        onClick={onReset}
      >
        🔁 Play Again
      </button>
    </div>
  );
}
