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

export function simulateMatch(
  teamA: Team,
  teamB: Team,
  tacticsA: Tactics,
  tacticsB: Tactics
): MatchResult {
  const aScore = calculateScore(teamA, tacticsA);
  const bScore = calculateScore(teamB, tacticsB);

  const halfTimeScore: [number, number] = [
    Math.floor(aScore / 2),
    Math.floor(bScore / 2),
  ];

  const fullTimeScore: [number, number] = [aScore, bScore];

  const events = generateMatchEvents(teamA, teamB, fullTimeScore);

  return {
    teamA,
    teamB,
    halfTimeScore,
    fullTimeScore,
    events,
  };
}

function calculateScore(team: Team, tactics: Tactics): number {
  const baseScore =
    (team.attack * 0.5 + team.midfield * 0.3 + team.defense * 0.2) / 10;

  const tacticsBoost = getTacticBonus(tactics);

  const randomness = Math.random() * 2; // adds unpredictability

  return Math.round(baseScore + tacticsBoost + randomness);
}

function getTacticBonus(tactics: Tactics): number {
  let bonus = 0;
  if (tactics.style === "Attacking") bonus += 1.2;
  if (tactics.style === "Defensive") bonus -= 0.5;

  if (tactics.press === "High Press") bonus += 0.5;
  if (tactics.press === "Low Block") bonus -= 0.3;

  if (tactics.buildUp === "Fast") bonus += 0.5;
  if (tactics.buildUp === "Slow") bonus -= 0.2;

  return bonus;
}

function generateMatchEvents(
  teamA: Team,
  teamB: Team,
  score: [number, number]
): string[] {
  const events: string[] = [];

  const [aGoals, bGoals] = score;

  const goalScorersA = Array.from({ length: aGoals }, (_, i) => `${Math.floor(Math.random() * 90)}' ⚽ Goal for ${teamA.name}`);
  const goalScorersB = Array.from({ length: bGoals }, (_, i) => `${Math.floor(Math.random() * 90)}' ⚽ Goal for ${teamB.name}`);

  const allEvents = [...goalScorersA, ...goalScorersB].sort(() => Math.random() - 0.5);

  events.push(...allEvents);
  events.unshift("Kick-off 🔔");
  events.splice(events.length / 2, 0, "Halftime ⏸️");
  events.push("Full-time 🔚");

  return events;
}
