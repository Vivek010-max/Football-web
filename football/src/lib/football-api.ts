import { unstable_cache } from "next/cache";

export interface TournamentData {
  id: number;
  name: string;
  region: string;
  status: "Ongoing" | "Upcoming" | "Completed";
  teams: number;
  prize: string;
  startDate: string;
  endDate: string;
  emoji: string;
  topScorer: string;
  matches: number;
}

// Fallback static data if API fails or key is missing
function getFallbackTournaments(): TournamentData[] {
  return [
    { id: 2, name: "UEFA Champions League", region: "Europe", status: "Ongoing", teams: 32, prize: "€80M", startDate: "Sep 2024", endDate: "May 2025", emoji: "🏆", topScorer: "Raphinha", matches: 125 },
    { id: 39, name: "Premier League", region: "England", status: "Ongoing", teams: 20, prize: "£100M", startDate: "Aug 2024", endDate: "May 2025", emoji: "👑", topScorer: "Erling Haaland", matches: 380 },
    { id: 140, name: "La Liga", region: "Spain", status: "Ongoing", teams: 20, prize: "€60M", startDate: "Aug 2024", endDate: "May 2025", emoji: "🔴", topScorer: "Kylian Mbappé", matches: 380 },
    { id: 135, name: "Serie A", region: "Italy", status: "Ongoing", teams: 20, prize: "€50M", startDate: "Aug 2024", endDate: "May 2025", emoji: "🇮🇹", topScorer: "Lautaro Martinez", matches: 380 },
    { id: 78, name: "Bundesliga", region: "Germany", status: "Ongoing", teams: 18, prize: "€55M", startDate: "Aug 2024", endDate: "May 2025", emoji: "🦅", topScorer: "Harry Kane", matches: 306 },
  ];
}

// Map api-football status/type to our UI status
function determineStatus(startDate: string, endDate: string): TournamentData["status"] {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (now < start) return "Upcoming";
  if (now > end) return "Completed";
  return "Ongoing";
}

// Emulate a call to api-football using RapidAPI
// We fetch the current season standings and top scorers for the league
export const getTournaments = unstable_cache(
  async (): Promise<TournamentData[]> => {
    const apiKey = process.env.FOOTBALL_API_KEY;
    const isMock = process.env.USE_MOCK_DATA === "true";

    if (!apiKey || isMock) {
      console.log("Using fallback tournament data (No API key found or MOCK_DATA=true)");
      return getFallbackTournaments();
    }

    // Example of how you would fetch from API-Sports (api-football)
    // We target UEFA Champions League (id 2) and Premier League (id 39)
    try {
      const targetLeagues = [2, 39, 140, 135, 78]; // UCL, PL, La Liga, Serie A, Bundesliga
      const results: TournamentData[] = [];

      for (const leagueId of targetLeagues) {
        // Fetch league info
        const leagueRes = await fetch(`https://v3.football.api-sports.io/leagues?id=${leagueId}`, {
          headers: {
            "x-apisports-key": apiKey,
          },
          next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!leagueRes.ok) {
           throw new Error("Failed to fetch league data from API-Sports");
        }
        
        const data = await leagueRes.json();
        
        if (data.response && data.response.length > 0) {
          const leagueData = data.response[0];
          const currentSeason = leagueData.seasons.find((s: any) => s.current);
          
          let topScorerName = "TBD";
          
          // Fetch Top Scorer
          if (currentSeason) {
            try {
              const scorerRes = await fetch(`https://v3.football.api-sports.io/players/topscorers?league=${leagueId}&season=${currentSeason.year}`, {
                headers: { "x-apisports-key": apiKey },
                next: { revalidate: 7200 } // Cache for 2 hours
              });
              const scorerData = await scorerRes.json();
              if (scorerData.response && scorerData.response.length > 0) {
                topScorerName = scorerData.response[0].player.name;
              }
            } catch (e) {
              console.error("Failed to fetch top scorer", e);
            }
          }
          
          results.push({
            id: leagueData.league.id,
            name: leagueData.league.name,
            region: leagueData.country.name,
            status: currentSeason ? determineStatus(currentSeason.start, currentSeason.end) : "Completed",
            teams: targetLeagues.includes(2) && leagueId === 2 ? 32 : 20, // rough estimate if API doesn't provide easily
            prize: "Varies", // API doesn't provide prize money
            startDate: currentSeason?.start || "N/A",
            endDate: currentSeason?.end || "N/A",
            emoji: leagueId === 2 ? "🏆" : leagueId === 39 ? "👑" : "⚽",
            topScorer: topScorerName,
            matches: 380, // estimated
          });
        }
      }

      return results.length > 0 ? results : getFallbackTournaments();
    } catch (error) {
      console.error("Error fetching football API data:", error);
      return getFallbackTournaments();
    }
  },
  ["tournaments-data"],
  {
    revalidate: 3600, // Revalidate every 1 hour
    tags: ["tournaments"],
  }
);
