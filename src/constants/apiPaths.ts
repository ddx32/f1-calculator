// Use cached API for production
export const BASE_URL = import.meta.env.DEV
  ? "https://ergast.com/api/f1"
  : "/api";

export const PATH = {
  driverStandings: "current/driverStandings.json",
  constructorStandings: "current/constructorStandings.json",
  raceSchedule: "current.json",
};
