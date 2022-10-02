import { IConstructorStanding, IDriverStanding } from "../types/api";

export function isDriverStanding(standing: any): standing is IDriverStanding {
  return standing.Driver !== undefined;
}

export function isConstructorStanding(
  standing: any
): standing is IConstructorStanding {
  return standing.Constructor !== undefined;
}
