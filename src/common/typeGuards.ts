import { ConstructorStanding, DriverStanding } from "../types/entities";

export function isDriverStanding(
  standing: unknown,
): standing is DriverStanding {
  return (standing as DriverStanding).Driver !== undefined;
}

export function isConstructorStanding(
  standing: unknown,
): standing is ConstructorStanding {
  return (standing as ConstructorStanding).Constructor !== undefined;
}
