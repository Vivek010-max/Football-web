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

const TacticRow = ({
  label,
  currentValue,
  icon,
  options,
  onChange
}: {
  label: string;
  currentValue: string;
  icon: React.ReactNode;
  options: string[];
  onChange: (opt: string) => void;
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
          onClick={() => onChange(opt)}
          className={`flex-1 py-2 text-sm border transition
            ${
              currentValue === opt
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

export default function TacticsForm({ onSelectTactics }: TacticsFormProps) {
  const [tactics, setTactics] = useState<Tactics>({
    style: "Balanced",
    press: "Medium",
    buildUp: "Fast",
  });

  const handleChange = (field: keyof Tactics, value: string) => {
    setTactics((prev) => ({ ...prev, [field]: value as Tactics[keyof Tactics] }));
    const node = document.getElementById("tactics-form");
    node?.classList.add("animate-pulse");
    setTimeout(() => node?.classList.remove("animate-pulse"), 150);
  };

  const handleSubmit = () => onSelectTactics(tactics);

  return (
    <div className="w-full flex items-center justify-center text-white py-12">
      <div id="tactics-form" className="w-full max-w-md space-y-8 bg-neutral-900/60 p-8 rounded-2xl border border-neutral-800 backdrop-blur-md shadow-2xl">
        <h1 className="text-center font-mono text-xl tracking-widest uppercase text-neutral-300">
          Set Tactics
        </h1>

        <TacticRow
          label="Play Style"
          currentValue={tactics.style}
          icon={<Target className="w-4 h-4" />}
          options={["Attacking", "Balanced", "Defensive"]}
          onChange={(val) => handleChange("style", val)}
        />

        <TacticRow
          label="Pressing"
          currentValue={tactics.press}
          icon={<Zap className="w-4 h-4" />}
          options={["High Press", "Medium", "Low Block"]}
          onChange={(val) => handleChange("press", val)}
        />

        <TacticRow
          label="Build-up"
          currentValue={tactics.buildUp}
          icon={<Shield className="w-4 h-4" />}
          options={["Fast", "Slow"]}
          onChange={(val) => handleChange("buildUp", val)}
        />

        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 py-3 mt-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-neutral-200 transition"
        >
          Confirm Tactics
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}