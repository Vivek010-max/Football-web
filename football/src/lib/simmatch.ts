/**
 * Type definition for a Football Team.
 * @property {string} name - The name of the team.
 * @property {number} attack - The attack rating of the team (e.g., 1-100).
 * @property {number} midfield - The midfield rating of the team (e.g., 1-100).
 * @property {number} defense - The defense rating of the team (e.g., 1-100).
 * @property {string} logo - URL or path to the team's logo.
 */
type Team = {
  name: string;
  attack: number;
  midfield: number;
  defense: number;
  logo: string;
};

/**
 * Type definition for a Team's Tactics.
 * @property {"Attacking" | "Balanced" | "Defensive"} style - The overall play style.
 * @property {"High Press" | "Medium" | "Low Block"} press - The pressing intensity.
 * @property {"Fast" | "Slow"} buildUp - The pace of build-up play.
 */
type Tactics = {
  style: "Attacking" | "Balanced" | "Defensive";
  press: "High Press" | "Medium" | "Low Block";
  buildUp: "Fast" | "Slow";
};

/**
 * Type definition for the result of a Match.
 * @property {Team} teamA - The first team.
 * @property {Team} teamB - The second team.
 * @property {[number, number]} halfTimeScore - Score at half-time [teamA_goals, teamB_goals].
 * @property {[number, number]} fullTimeScore - Final score [teamA_goals, teamB_goals].
 * @property {string[]} events - A chronological list of match events.
 */
type MatchResult = {
  teamA: Team;
  teamB: Team;
  halfTimeScore: [number, number];
  fullTimeScore: [number, number];
  events: string[];
};

/**
 * Simulates a football match between two teams with their respective tactics.
 * @param {Team} teamA - The first team.
 * @param {Team} teamB - The second team.
 * @param {Tactics} tacticsA - Tactics for team A.
 * @param {Tactics} tacticsB - Tactics for team B.
 * @returns {MatchResult} The result of the simulated match.
 */
export function simulateMatch(
  teamA: Team,
  teamB: Team,
  tacticsA: Tactics,
  tacticsB: Tactics
): MatchResult {
  // Constants for expected goals calculation
  const BASE_XG_AVERAGE = 1.3; // Average xG per team in a balanced game

  // Calculate expected goals for each team
  // xG for Team A against Team B's defense and tactics
  const xGA = calculateExpectedGoals(teamA, tacticsA, teamB, tacticsB, BASE_XG_AVERAGE);
  // xG for Team B against Team A's defense and tactics
  const xGB = calculateExpectedGoals(teamB, tacticsB, teamA, tacticsA, BASE_XG_AVERAGE);

  // Generate actual goals based on expected goals using Poisson distribution
  const aScore = poissonRandom(xGA);
  const bScore = poissonRandom(xGB);

  // Distribute goals between halves more realistically
  const [aFirstHalfGoals, aSecondHalfGoals] = distributeGoalsBetweenHalves(aScore);
  const [bFirstHalfGoals, bSecondHalfGoals] = distributeGoalsBetweenHalves(bScore);

  const halfTimeScore: [number, number] = [aFirstHalfGoals, bFirstHalfGoals];
  const fullTimeScore: [number, number] = [aScore, bScore];

  // Generate a richer list of match events
  const events = generateMatchEvents(
    teamA,
    teamB,
    halfTimeScore,
    fullTimeScore
  );

  return {
    teamA,
    teamB,
    halfTimeScore,
    fullTimeScore,
    events,
  };
}

/**
 * Calculates the Expected Goals (xG) for an attacking team against a defending team.
 * @param {Team} attackingTeam - The team generating the attacking chances.
 * @param {Tactics} attackingTactics - The tactics of the attacking team.
 * @param {Team} defendingTeam - The team defending against the attack.
 * @param {Tactics} defendingTactics - The tactics of the defending team.
 * @param {number} baseAvgXg - The baseline average xG for a team.
 * @returns {number} The calculated expected goals (xG).
 */
function calculateExpectedGoals(
  attackingTeam: Team,
  attackingTactics: Tactics,
  defendingTeam: Team,
  defendingTactics: Tactics,
  baseAvgXg: number
): number {
  // Normalize team ratings to a 0-1 range for calculation clarity
  const normalizedAttack = attackingTeam.attack / 100;
  const normalizedMidfield = attackingTeam.midfield / 100;
  const normalizedDefense = attackingTeam.defense / 100;

  const opponentNormalizedAttack = defendingTeam.attack / 100;
  const opponentNormalizedMidfield = defendingTeam.midfield / 100;
  const opponentNormalizedDefense = defendingTeam.defense / 100;

  // Calculate offensive and defensive strengths
  const offensiveStrength = (normalizedAttack * 0.7 + normalizedMidfield * 0.3);
  const defensiveResistance = (opponentNormalizedDefense * 0.7 + opponentNormalizedMidfield * 0.3);

  // Calculate base xG based on relative strengths.
  // Add a small constant to the denominator to prevent division by zero or overly high values
  let xG = baseAvgXg + (offensiveStrength * 1.5) - (defensiveResistance * 1.5);

  // Apply tactical modifiers (positive for attacking team's xG, negative if tactics hinder)
  xG += getTacticsEffectModifier(attackingTactics, defendingTactics);

  // Add a small random variance for realism
  xG += (Math.random() - 0.5) * 0.4; // +/- 0.2 xG variance

  // Ensure xG is within a reasonable range (e.g., 0.2 to 4.0)
  return Math.max(0.2, Math.min(4.0, xG));
}

/**
 * Calculates a modifier to xG based on the interaction of two teams' tactics.
 * @param {Tactics} teamTactics - The tactics of the attacking team.
 * @param {Tactics} opponentTactics - The tactics of the defending team.
 * @returns {number} A numerical modifier to be added to xG.
 */
function getTacticsEffectModifier(teamTactics: Tactics, opponentTactics: Tactics): number {
  let modifier = 0;

  // Play Style Interactions
  if (teamTactics.style === "Attacking" && opponentTactics.style === "Defensive") {
    modifier += 0.15; // Attacking team benefits against a passive defense
  } else if (teamTactics.style === "Defensive" && opponentTactics.style === "Attacking") {
    modifier -= 0.1; // Defensive team might concede more against a determined attack
  }

  // Pressing vs. Build-up Interactions
  if (teamTactics.press === "High Press" && opponentTactics.buildUp === "Slow") {
    modifier += 0.25; // High press is very effective against slow build-up
  } else if (teamTactics.press === "Low Block" && opponentTactics.buildUp === "Fast") {
    modifier -= 0.15; // Low block can be vulnerable if opponent builds up quickly
  } else if (teamTactics.press === "Medium" && opponentTactics.buildUp === "Fast") {
    modifier -= 0.05; // Medium press might struggle slightly against fast build-up
  }

  // Build-up vs. Pressing Interactions (reverse perspective)
  if (teamTactics.buildUp === "Fast" && opponentTactics.press === "High Press") {
    modifier -= 0.1; // Fast build-up can be disrupted by strong high press
  } else if (teamTactics.buildUp === "Slow" && opponentTactics.press === "Low Block") {
    modifier += 0.05; // Slow build-up might control possession against a low block

  } else if (teamTactics.buildUp === "Fast" && opponentTactics.press === "Medium") {
    modifier += 0.05; // Fast build-up might exploit gaps against medium press
  }


  // Additional considerations for balanced style or medium press
  if (teamTactics.style === "Balanced" && opponentTactics.style === "Balanced") {
    modifier += 0.05; // Balanced vs Balanced can lead to tighter games
  }

  return modifier;
}


/**
 * Generates a random integer from a Poisson distribution.
 * Used to model rare events like goals.
 * @param {number} lambda - The average number of occurrences (expected goals).
 * @returns {number} A random integer representing the number of goals.
 */
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

/**
 * Distributes total goals between the first and second halves.
 * @param {number} totalGoals - The total number of goals to distribute.
 * @returns {[number, number]} An array with goals for the first half and second half.
 */
function distributeGoalsBetweenHalves(totalGoals: number): [number, number] {
  if (totalGoals === 0) return [0, 0];

  // Randomly determine the percentage of goals in the first half (e.g., 30-70%)
  const firstHalfPercentage = 0.3 + Math.random() * 0.4;
  let firstHalf = Math.round(totalGoals * firstHalfPercentage);
  firstHalf = Math.min(firstHalf, totalGoals); // Ensure first half goals don't exceed total

  const secondHalf = totalGoals - firstHalf;
  return [firstHalf, secondHalf];
}

/**
 * Generates a detailed list of match events including goals and other common occurrences.
 * @param {Team} teamA - The first team.
 * @param {Team} teamB - The second team.
 * @param {[number, number]} halfTimeScore - The half-time score.
 * @param {[number, number]} fullTimeScore - The full-time score.
 * @returns {string[]} An array of chronological match events.
 */
function generateMatchEvents(
  teamA: Team,
  teamB: Team,
  halfTimeScore: [number, number],
  fullTimeScore: [number, number]
): string[] {
  const events: { minute: number; description: string }[] = [];

  // Initial kick-off event
  events.push({ minute: 0, description: "Kick-off 🔔" });

  // Generate all goal events with unique minutes
  const goalMinutes = new Set<number>();

  const addGoalEvents = (score: number, teamName: string, isFirstHalf: boolean, startMin: number, endMin: number) => {
    let goalsAdded = 0;
    while (goalsAdded < score) {
      let minute = Math.floor(Math.random() * (endMin - startMin + 1)) + startMin;
      // Ensure unique goal minutes. If a minute is taken, try nearby minutes.
      let attempts = 0;
      while (goalMinutes.has(minute) && attempts < 10) { // Limit attempts to prevent infinite loop for too many goals
          minute = Math.floor(Math.random() * (endMin - startMin + 1)) + startMin;
          attempts++;
      }
      if (!goalMinutes.has(minute)) {
          goalMinutes.add(minute);
          events.push({ minute, description: `${minute}' ⚽ Goal for ${teamName}` });
          goalsAdded++;
      } else if (attempts === 10) {
        // Fallback for extremely rare cases where a minute can't be found
        console.warn(`Could not find a unique minute for a goal for ${teamName}. Adding to existing minute.`);
        events.push({ minute: minute, description: `${minute}' ⚽ Goal for ${teamName}` });
        goalsAdded++;
      }
    }
  };

  // First half goals
  addGoalEvents(halfTimeScore[0], teamA.name, true, 1, 45);
  addGoalEvents(halfTimeScore[1], teamB.name, true, 1, 45);

  // Second half goals (difference between full-time and half-time)
  const aSecondHalfGoals = fullTimeScore[0] - halfTimeScore[0];
  const bSecondHalfGoals = fullTimeScore[1] - halfTimeScore[1];
  addGoalEvents(aSecondHalfGoals, teamA.name, false, 46, 90);
  addGoalEvents(bSecondHalfGoals, teamB.name, false, 46, 90);

  // Add non-goal events
  const totalNonGoalEvents = 25 + Math.floor(Math.random() * 10); // Between 25 and 34 non-goal events
  const eventTypes = [
    (team: Team) => `Shot on target by ${team.name} 🎯`,
    (team: Team) => `Foul by ${team.name} ⚠️`,
    (team: Team) => `Corner for ${team.name} 🚩`,
    (team: Team) => `Yellow card for ${team.name} 🟨`,
    (team: Team) => `Great save by ${team.name}'s GK! 🧤`,
  ];

  for (let i = 0; i < totalNonGoalEvents; i++) {
    const minute = Math.floor(Math.random() * 90) + 1;
    const team = Math.random() < 0.5 ? teamA : teamB;
    const eventGen = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    events.push({ minute, description: eventGen(team) });
  }

  // Sort all events chronologically
  events.sort((a, b) => a.minute - b.minute);

  // Add half-time and full-time markers
  const finalEvents: string[] = [];
  let halfTimeAdded = false;

  for (const event of events) {
    if (!halfTimeAdded && event.minute >= 45) {
      finalEvents.push("45' Half-time ⏸️");
      halfTimeAdded = true;
    }
    finalEvents.push(event.description);
  }

  // Ensure half-time is added even if no events around 45 min
  if (!halfTimeAdded) {
    finalEvents.splice(finalEvents.findIndex(e => e.includes("Kick-off")) + 1, 0, "45' Half-time ⏸️"); // Simple splice after kick-off if no events near 45.
  }

  finalEvents.push("90' Full-time 🔚"); // Always add full-time at the end

  return finalEvents;
}


// Helper to sort events by minute (if needed outside generateMatchEvents)
// Not strictly used by generateMatchEvents with the new object structure, but kept for reference
function sortByMinute(a: string, b: string): number {
  const minA = parseInt(a.split("'")[0]);
  const minB = parseInt(b.split("'")[0]);
  return minA - minB;
}
