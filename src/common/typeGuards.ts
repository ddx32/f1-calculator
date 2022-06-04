import { IConstructorStanding, IDriverStanding } from "../constants/types";

export function isDriverStanding(standing: any): standing is IDriverStanding {
  return standing.Driver !== undefined;
}

export function isConstructorStanding(
  standing: any
): standing is IConstructorStanding {
  return standing.Constructor !== undefined;
}
