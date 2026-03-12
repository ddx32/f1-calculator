const baseUrl = "/api";
const currentYear = new Date().getFullYear();
// const currentYear = 2024;

const apiPaths = {
  driverStandings: `${currentYear}/driverstandings/`,
  constructorStandings: `${currentYear}/constructorstandings/`,
  raceSchedule: `${currentYear}/races/`,
  raceResults: `${currentYear}/results/`,
  drivers: `${currentYear}/drivers/`,
  constructors: `${currentYear}/constructors/`,
} as const;

export type ApiEndpoint = keyof typeof apiPaths;

export async function fetchApi<T>(endpoint: ApiEndpoint): Promise<T> {
  const response = await fetch(`${baseUrl}/${apiPaths[endpoint]}`);
  return response.json();
}
