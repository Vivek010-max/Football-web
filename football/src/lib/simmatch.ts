/* eslint-disable */
/**
 * Type definition for a Football Team.
 */
export type Team = {
  name: string;
  attack: number;
  midfield: number;
  defense: number;
  logo: string;
};

export type Tactics = {
  style: "Attacking" | "Balanced" | "Defensive";
  press: "High Press" | "Medium" | "Low Block";
  buildUp: "Fast" | "Slow";
};

export type MatchStats = {
  possession: [number, number]; // [Team A %, Team B %]
  shots: [number, number];
  shotsOnTarget: [number, number];
  xG: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
};

export type MatchEvent = {
  minute: number;
  type: "Goal" | "Shot" | "Save" | "Foul" | "Card" | "Corner" | "Kickoff" | "HalfTime" | "FullTime" | "Sub";
  team?: "A" | "B";
  description: string;
};

export type MatchResult = {
  teamA: Team;
  teamB: Team;
  halfTimeScore: [number, number];
  fullTimeScore: [number, number];
  stats: MatchStats;
  events: MatchEvent[];
  goalscorersA: string[];
  goalscorersB: string[];
};

const getRandomPlayer = (position: string) => {
  const numbers = [7, 8, 9, 10, 11, 20, 21];
  return `${position} #${numbers[Math.floor(Math.random() * numbers.length)]}`;
};

export function simulateMatch(
  teamA: Team,
  teamB: Team,
  tacticsA: Tactics,
  tacticsB: Tactics
): MatchResult {
  const events: MatchEvent[] = [];
  
  // Base stats calculation using a refined algorithm
  const strengthA = (teamA.attack * 1.2 + teamA.midfield * 1.5 + teamA.defense * 0.8) / 3;
  const strengthB = (teamB.attack * 1.2 + teamB.midfield * 1.5 + teamB.defense * 0.8) / 3;
  
  // Tactical adjustments for possession
  let possA = 50 + (teamA.midfield - teamB.midfield) * 0.5;
  if (tacticsA.buildUp === "Slow") possA += 5;
  if (tacticsB.buildUp === "Slow") possA -= 5;
  if (tacticsA.press === "High Press") possA += 2;
  
  possA = Math.max(25, Math.min(75, Math.round(possA)));
  const possB = 100 - possA;

  // Expected goals (xG)
  let base_xG_A = 1.0 + ((teamA.attack - teamB.defense) / 15);
  let base_xG_B = 1.0 + ((teamB.attack - teamA.defense) / 15);

  if (tacticsA.style === "Attacking") base_xG_A *= 1.3;
  if (tacticsA.style === "Defensive") base_xG_A *= 0.7;
  if (tacticsA.press === "High Press") base_xG_A *= 1.2;

  if (tacticsB.style === "Attacking") base_xG_B *= 1.3;
  if (tacticsB.style === "Defensive") base_xG_B *= 0.7;
  if (tacticsB.press === "High Press") base_xG_B *= 1.2;

  // Add randomness
  base_xG_A = Math.max(0.1, base_xG_A + (Math.random() * 0.5 - 0.25));
  base_xG_B = Math.max(0.1, base_xG_B + (Math.random() * 0.5 - 0.25));

  // Actual goals based on poisson
  const aScore = poissonRandom(base_xG_A);
  const bScore = poissonRandom(base_xG_B);

  const [aFirstHalfGoals, aSecondHalfGoals] = distributeGoalsBetweenHalves(aScore);
  const [bFirstHalfGoals, bSecondHalfGoals] = distributeGoalsBetweenHalves(bScore);

  const halfTimeScore: [number, number] = [aFirstHalfGoals, bFirstHalfGoals];
  const fullTimeScore: [number, number] = [aScore, bScore];

  // Additional Match Stats
  const shotsA = Math.round(base_xG_A * 8) + Math.floor(Math.random() * 5);
  const shotsB = Math.round(base_xG_B * 8) + Math.floor(Math.random() * 5);
  
  const shotsOnTargetA = Math.round(shotsA * 0.4);
  const shotsOnTargetB = Math.round(shotsB * 0.4);

  const cornersA = Math.round(shotsA * 0.6);
  const cornersB = Math.round(shotsB * 0.6);

  const foulsA = 8 + Math.floor(Math.random() * 8) + (tacticsA.press === "High Press" ? 4 : 0);
  const foulsB = 8 + Math.floor(Math.random() * 8) + (tacticsB.press === "High Press" ? 4 : 0);

  const ycA = Math.floor(foulsA / 5.5);
  const ycB = Math.floor(foulsB / 5.5);

  const stats: MatchStats = {
    possession: [possA, possB],
    shots: [shotsA, shotsB],
    shotsOnTarget: [shotsOnTargetA, shotsOnTargetB],
    xG: [parseFloat(base_xG_A.toFixed(2)), parseFloat(base_xG_B.toFixed(2))],
    corners: [cornersA, cornersB],
    fouls: [foulsA, foulsB],
    yellowCards: [ycA, ycB]
  };

  const goalscorersA: string[] = [];
  const goalscorersB: string[] = [];

  // Generate Events Timeline
  events.push({ minute: 0, type: "Kickoff", description: "The referee blows the whistle and we are underway!" });

  const addGoalsToTimeline = (score: number, teamId: "A" | "B", teamName: string, start: number, end: number, goalscorersList: string[]) => {
    let added = 0;
    while(added < score) {
      let minute = Math.floor(Math.random() * (end - start)) + start;
      const player = getRandomPlayer("Striker");
      goalscorersList.push(`${player} (${minute}')`);
      events.push({
        minute,
        type: "Goal",
        team: teamId,
        description: `GOOAL! Brilliant finish by ${player} for ${teamName}!`
      });
      added++;
    }
  };

  addGoalsToTimeline(aFirstHalfGoals, "A", teamA.name, 1, 45, goalscorersA);
  addGoalsToTimeline(bFirstHalfGoals, "B", teamB.name, 1, 45, goalscorersB);
  
  events.push({ minute: 45, type: "HalfTime", description: `Half-time: ${teamA.name} ${aFirstHalfGoals} - ${bFirstHalfGoals} ${teamB.name}` });

  addGoalsToTimeline(aSecondHalfGoals, "A", teamA.name, 46, 90, goalscorersA);
  addGoalsToTimeline(bSecondHalfGoals, "B", teamB.name, 46, 90, goalscorersB);

  // Pad with random events
  const totalRandomEvents = 15;
  for (let i = 0; i < totalRandomEvents; i++) {
    const minute = Math.floor(Math.random() * 90) + 1;
    if (minute === 45 || minute === 90) continue;

    const teamId = Math.random() > 0.5 ? "A" : "B";
    const tName = teamId === "A" ? teamA.name : teamB.name;
    const opponentName = teamId === "A" ? teamB.name : teamA.name;
    
    let type: MatchEvent["type"] = "Shot";
    let desc = "";
    
    const r = Math.random();
    if (r < 0.3) {
      type = "Shot";
      desc = `Close! ${getRandomPlayer("Midfielder")} for ${tName} aims for the top corner but misses wide.`;
    } else if (r < 0.5) {
      type = "Save";
      desc = `Spectacular save by the ${opponentName} goalkeeper to deny a header from ${tName}'s ${getRandomPlayer("Winger")}!`;
    } else if (r < 0.7) {
      type = "Foul";
      desc = `Clumsy foul by ${tName}'s ${getRandomPlayer("Defender")}. Free kick awarded to ${opponentName}.`;
    } else if (r < 0.85) {
      type = "Corner";
      desc = `Corner kick won by ${tName} after dangerous play down the flanks.`;
    } else {
      type = "Card";
      desc = `Referee pulls out the yellow card for a late challenge by ${tName}'s ${getRandomPlayer("Defender")}.`;
    }

    events.push({ minute, type, team: teamId, description: desc });
  }

  // Sort and finalize
  events.sort((a, b) => a.minute - b.minute);
  
  events.push({ minute: 90, type: "FullTime", description: `Full-time! Final whistle blows. The match concludes.` });

  return {
    teamA,
    teamB,
    halfTimeScore,
    fullTimeScore,
    stats,
    events,
    goalscorersA,
    goalscorersB
  };
}

function poissonRandom(lambda: number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

function distributeGoalsBetweenHalves(totalGoals: number): [number, number] {
  if (totalGoals === 0) return [0, 0];
  const firstHalfPercentage = 0.3 + Math.random() * 0.4;
  let firstHalf = Math.round(totalGoals * firstHalfPercentage);
  firstHalf = Math.min(firstHalf, totalGoals);
  return [firstHalf, totalGoals - firstHalf];
}


