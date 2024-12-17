export const BASE_URL = "/api";

const currentYear = new Date().getFullYear();

export const PATH = {
  driverStandings: `${currentYear}/driverstandings/`,
  constructorStandings: `${currentYear}/constructorstandings/`,
  raceSchedule: `${currentYear}/results/`,
};
