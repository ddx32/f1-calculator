import { z } from "zod";

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

export async function fetchApi<T>(
  endpoint: ApiEndpoint,
  schema: z.ZodType<T>,
): Promise<T> {
  const response = await fetch(`${baseUrl}/${apiPaths[endpoint]}`);
  const data = await response.json();

  try {
    return schema.parse(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
