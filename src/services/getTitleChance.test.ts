import { raceEvents } from "../../fixtures/raceEvents";
import { driverStandings } from "../../fixtures/standings";
import { TitleChance } from "../types/api";
import { getStandingsWithTitleChance } from "./getTitleChance";

test("should calculate title chance", () => {
  expect(
    getStandingsWithTitleChance(driverStandings, raceEvents, raceEvents[2])[0]
      .titleChance
  ).toBe(TitleChance.POTENTIAL);

  expect(
    getStandingsWithTitleChance(driverStandings, raceEvents, raceEvents[2])[2]
      .titleChance
  ).toBe(TitleChance.POTENTIAL);

  expect(
    getStandingsWithTitleChance(driverStandings, raceEvents, raceEvents[24])[0]
      .titleChance
  ).toBe(TitleChance.SECURED);

  expect(
    getStandingsWithTitleChance(driverStandings, raceEvents, raceEvents[24])[3]
      .titleChance
  ).toBe(TitleChance.NONE);
});
