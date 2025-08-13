"use client";
import React, { useState } from "react";
import { Target, Zap, Shield, ArrowRight } from "lucide-react";

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
    setTactics((prev) => ({ ...prev, [field]: value as any }));
    // micro-pulse
    const node = document.getElementById("tactics-form");
    node?.classList.add("animate-pulse");
    setTimeout(() => node?.classList.remove("animate-pulse"), 150);
  };

  const handleSubmit = () => onSelectTactics(tactics);

  const TacticRow = ({
    label,
    field,
    icon,
    options,
  }: {
    label: string;
    field: keyof Tactics;
    icon: React.ReactNode;
    options: string[];
  }) => (
    <div>
      <label className="flex items-center gap-2 mb-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
        {icon}
        {label}
      </label>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleChange(field, opt)}
            className={`flex-1 py-2 text-sm border transition
              ${
                tactics[field] === opt
                  ? "bg-white text-black border-white"
                  : "border-neutral-700 text-neutral-400 hover:border-neutral-500"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4 pt-10">
      <div id="tactics-form" className="w-full max-w-md space-y-8">
        <h1 className="text-center font-mono text-2xl tracking-widest uppercase">
          Set Tactics
        </h1>

        <TacticRow
          label="Play Style"
          field="style"
          icon={<Target className="w-4 h-4" />}
          options={["Attacking", "Balanced", "Defensive"]}
        />

        <TacticRow
          label="Pressing"
          field="press"
          icon={<Zap className="w-4 h-4" />}
          options={["High Press", "Medium", "Low Block"]}
        />

        <TacticRow
          label="Build-up"
          field="buildUp"
          icon={<Shield className="w-4 h-4" />}
          options={["Fast", "Slow"]}
        />

        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 py-3 border border-white text-white hover:bg-white hover:text-black transition"
        >
          Confirm
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}