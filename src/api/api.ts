const baseUrl = "/api";
const currentYear = new Date().getFullYear();
// const currentYear = 2024;

export const apiPaths = {
  driverStandings: `${currentYear}/driverstandings/`,
  constructorStandings: `${currentYear}/constructorstandings/`,
  raceSchedule: `${currentYear}/races/`,
  raceResults: `${currentYear}/results/`,
  drivers: `${currentYear}/drivers/`,
  constructors: `${currentYear}/constructors/`,
} as const;

async function get(path: string) {
  const response = await fetch(`${baseUrl}/${path}`);
  return response.json();
}

export async function getDriverStandings() {
  return get(apiPaths.driverStandings);
}

export async function getConstructorStandings() {
  return get(apiPaths.constructorStandings);
}

export async function getDrivers() {
  return get(apiPaths.drivers);
}

export async function getConstructors() {
  return get(apiPaths.constructors);
}

export async function getRaceSchedule() {
  return get(apiPaths.raceSchedule);
}

export async function getRaceResults() {
  return get(apiPaths.raceResults);
}
