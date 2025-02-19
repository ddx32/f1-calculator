import { ConstructorStanding, DriverStanding } from "../types/entities";

export function isDriverStanding(standing: any): standing is DriverStanding {
  return standing.Driver !== undefined;
}

export function isConstructorStanding(
  standing: any
): standing is ConstructorStanding {
  return standing.Constructor !== undefined;
}
