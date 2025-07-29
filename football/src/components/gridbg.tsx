// components/TeamBuilder.tsx
"use client";

import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Player {
  id: string;
  name: string;
  icon: string;
}

interface PlacedPlayer extends Player {
  fieldId: string;
  x: number;
  y: number;
}

const availablePlayers: Player[] = [
  { id: "striker", name: "Striker", icon: "⚽" },
  { id: "midfielder", name: "Midfielder", icon: "🏃" },
  { id: "defender", name: "Defender", icon: "🛡️" },
  { id: "goalkeeper", name: "Goalkeeper", icon: "🧤" },
  { id: "forward", name: "Forward", icon: "🔥" },
  { id: "coach", name: "Coach", icon: "👨‍🏫" },
  { id: "referee", name: "Referee", icon: " whistle" },
];

export function TeamBuilder() {
  const [placedPlayers, setPlacedPlayers] = useState<PlacedPlayer[]>([]);
  const fieldRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, player: Player) => {
    e.dataTransfer.setData("playerId", player.id);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const playerId = e.dataTransfer.getData("playerId");
    const player = availablePlayers.find((p) => p.id === playerId);

    if (player && fieldRef.current) {
      const fieldRect = fieldRef.current.getBoundingClientRect();
      const x = e.clientX - fieldRect.left;
      const y = e.clientY - fieldRect.top;

      const newFieldId = `${player.id}-${Date.now()}`;

      setPlacedPlayers((prevPlayers) => [
        ...prevPlayers,
        { ...player, fieldId: newFieldId, x, y },
      ]);
    }
  }, [fieldRef]);

  const handleRemovePlayer = (fieldId: string) => {
    setPlacedPlayers((prevPlayers) => prevPlayers.filter(p => p.fieldId !== fieldId));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-black py-10">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <div className="relative z-10 w-full max-w-6xl p-4 md:p-8 bg-neutral-900/70 rounded-lg shadow-xl backdrop-blur-sm">
        <h1 className="text-center text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500 mb-8">
          Build Your Dream Team
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 p-4 bg-neutral-800 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-neutral-200 mb-4">Available Players</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
              {availablePlayers.map((player) => (
                <div
                  key={player.id}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, player)}
                  className="cursor-grab p-3 bg-neutral-700 text-white rounded-lg flex flex-col items-center justify-center text-center shadow-sm hover:bg-neutral-600 transition-colors"
                >
                  <span className="text-3xl mb-1">{player.icon}</span>
                  <span className="text-sm font-medium">{player.name}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-neutral-400 mt-4 text-center">Drag players onto the field!</p>
          </div>

          <div
            ref={fieldRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative md:w-3/4 flex-grow bg-green-700 aspect-video rounded-md shadow-lg overflow-hidden border-2 border-green-800"
            style={{ backgroundImage: "linear-gradient(to bottom, #4CAF50, #2E7D32)", backgroundSize: '100% 100%' }}
          >
            <div className="absolute inset-0 border-2 border-white border-opacity-70 flex items-center justify-center">
                <div className="absolute rounded-full border-2 border-white border-opacity-70 w-1/4 h-1/4"></div>
                <div className="absolute w-1 h-full bg-white bg-opacity-70"></div>
                <div className="absolute left-0 h-2/3 w-1/4 border-2 border-white border-opacity-70"></div>
                <div className="absolute right-0 h-2/3 w-1/4 border-2 border-white border-opacity-70"></div>
            </div>

            {placedPlayers.map((player) => (
              <div
                key={player.fieldId}
                className="absolute p-2 bg-blue-500 text-white rounded-full shadow-md cursor-pointer text-center text-xl flex items-center justify-center select-none"
                style={{
                  left: player.x - 20,
                  top: player.y - 20,
                  width: '40px',
                  height: '40px',
                }}
                onClick={() => handleRemovePlayer(player.fieldId)}
              >
                {player.icon}
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-neutral-400 mt-4 text-center">Click a player on the field to remove them.</p>
      </div>
    </div>
  );
}
