'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Grid } from '@/components/Grid';
import { Lspotlight } from '@/components/ui/spotlight-new';

/* ---------- data ---------- */
export type Team = {
  name: string;
  attack: number;
  midfield: number;
  defense: number;
  logo: string;
};

const teams: Team[] = [
  { name: 'FC Barcelona', attack: 87, midfield: 85, defense: 83, logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
  { name: 'Real Madrid', attack: 88, midfield: 86, defense: 84, logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },
  { name: 'Manchester City', attack: 90, midfield: 89, defense: 87, logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' },
  { name: 'Bayern Munich', attack: 86, midfield: 84, defense: 85, logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg' },
  { name: 'Chelsea', attack: 85, midfield: 83, defense: 84, logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
  { name: 'Liverpool', attack: 86, midfield: 85, defense: 82, logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
  { name: 'Arsenal', attack: 84, midfield: 83, defense: 81, logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' },
  { name: 'PSG', attack: 85, midfield: 84, defense: 80, logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },
  { name: 'Napoli', attack: 83, midfield: 82, defense: 83, logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/SSC_Napoli_2025_%28white_and_azure%29.svg' },
  { name: 'Inter Milan', attack: 84, midfield: 83, defense: 83, logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg' },
  { name: 'Manchester United', attack: 83, midfield: 82, defense: 82, logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' },
  { name: 'Ajax', attack: 84, midfield: 83, defense: 80, logo: 'https://upload.wikimedia.org/wikipedia/sco/7/79/Ajax_Amsterdam.svg' },
  { name: 'Atletico Madrid', attack: 83, midfield: 81, defense: 86, logo: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Atletico_Madrid_Logo_2024.svg' },
  { name: 'Borussia Dortmund', attack: 84, midfield: 83, defense: 79, logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg' },
];

/* ---------- props ---------- */
type Props = { onSelectTeam: (team: Team) => void };

/* ---------- sub-components ---------- */
const TeamCard = ({
  team,
  isSelected,
  onSelect,
}: {
  team: Team;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <motion.div
    layout
    whileHover={{ scale: 1.04, rotate: 0.5 }}
    whileTap={{ scale: 0.96 }}
    onClick={onSelect}
    className={`relative rounded-2xl bg-gradient-to-b from-neutral-800/70 to-black/90
                border border-neutral-700/60 overflow-hidden cursor-pointer
                transition-all duration-300
                ${isSelected
                  ? 'ring-2 ring-neutral-300 ring-offset-2 ring-offset-slate-900'
                  : 'hover:border-neutral-300'}`}
  >
    <div className="p-4 flex flex-col items-center text-white">
      <div className="w-20 h-20 flex items-center justify-center">
        <Image
          src={team.logo}
          alt={team.name}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>

      <h3 className="mt-2 h-11 flex flex-col justify-center text-lg font-bold text-center leading-tight line-clamp-2">
        {team.name}
      </h3>

      <div className="mt-3 w-full space-y-1 text-xs">
        <StatBar label="⚔️ ATT" value={team.attack} />
        <StatBar label="🎯 MID" value={team.midfield} />
        <StatBar label="🛡️ DEF" value={team.defense} />
      </div>
    </div>

    {isSelected && (
      <motion.div
        layoutId="pulseRing"
        className="absolute inset-0 rounded-2xl border-2 border-neutral-300"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
    )}
  </motion.div>
);

const StatBar = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-2">
    <span className="w-10">{label}</span>
    <div className="flex-1 h-1.5 bg-neutral-600 rounded-full">
      <motion.div
        className="h-full bg-gradient-to-r from-neutral-200 to-neutral-600"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
    <span className="w-6 text-right">{value}</span>
  </div>
);

/* ---------- main ---------- */
export default function TeamPicker({ onSelectTeam }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="relative max-w-7xl mx-auto px-4 pt-36 pb-10">

      {/* Background absolutely positioned */}
      <div className="absolute inset-0 z-0">
        <Grid />
        <Lspotlight />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent 
                   bg-gradient-to-b from-neutral-200 to-neutral-600 
                   text-center font-sans font-bold mb-10"
      >
        Pick Your Team
      </motion.h1>

      <motion.div
        layout
        className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4"
      >
        {teams.map((team) => (
          <TeamCard
            key={team.name}
            team={team}
            isSelected={selected === team.name}
            onSelect={() => {
              setSelected(team.name);
              onSelectTeam(team);
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
