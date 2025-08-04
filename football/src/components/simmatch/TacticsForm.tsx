"use client";
import React, { useState } from "react";

type Tactics = {
  style: "Attacking" | "Balanced" | "Defensive";
  press: "High Press" | "Medium" | "Low Block";
  buildUp: "Fast" | "Slow";
};

type TacticsFormProps = {
  onSelectTactics: (tactics: Tactics) => void;
};

export default function TacticsForm({ onSelectTactics }: TacticsFormProps) {
  const [tactics, setTactics] = useState<Tactics>({
    style: "Balanced",
    press: "Medium",
    buildUp: "Fast",
  });

  const handleChange = (field: keyof Tactics, value: string) => {
    setTactics((prev) => ({
      ...prev,
      [field]: value as any,
    }));
  };

  const handleSubmit = () => {
    onSelectTactics(tactics);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Set Your Tactics</h2>

      <div className="grid gap-6">
        {/* STYLE */}
        <div>
          <label className="block mb-2 font-semibold">Play Style</label>
          <select
            className="w-full px-4 py-2 rounded-md border bg-white dark:bg-neutral-900 dark:text-white"
            value={tactics.style}
            onChange={(e) => handleChange("style", e.target.value)}
          >
            <option>Attacking</option>
            <option>Balanced</option>
            <option>Defensive</option>
          </select>
        </div>

        {/* PRESS */}
        <div>
          <label className="block mb-2 font-semibold">Pressing</label>
          <select
            className="w-full px-4 py-2 rounded-md border bg-white dark:bg-neutral-900 dark:text-white"
            value={tactics.press}
            onChange={(e) => handleChange("press", e.target.value)}
          >
            <option>High Press</option>
            <option>Medium</option>
            <option>Low Block</option>
          </select>
        </div>

        {/* BUILD-UP */}
        <div>
          <label className="block mb-2 font-semibold">Build-up Play</label>
          <select
            className="w-full px-4 py-2 rounded-md border bg-white dark:bg-neutral-900 dark:text-white"
            value={tactics.buildUp}
            onChange={(e) => handleChange("buildUp", e.target.value)}
          >
            <option>Fast</option>
            <option>Slow</option>
          </select>
        </div>
      </div>

      <button
        className="mt-8 w-full py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition"
        onClick={handleSubmit}
      >
        Confirm Tactics
      </button>
    </div>
  );
}
