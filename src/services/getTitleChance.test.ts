import { raceSchedule } from "../../fixtures/raceSchedule";
import { driverStandings } from "../../fixtures/standings";
import { TitleChance } from "../types/api";
import { getStandingsWithTitleChance } from "./getTitleChance";

// test("should calculate title chance", () => {
//   expect(
//     getStandingsWithTitleChance(driverStandings, raceSchedule, 2)[0].titleChance
//   ).toBe(TitleChance.POTENTIAL);

//   expect(
//     getStandingsWithTitleChance(driverStandings, raceSchedule, 2)[2].titleChance
//   ).toBe(TitleChance.POTENTIAL);

//   expect(
//     getStandingsWithTitleChance(driverStandings, raceSchedule, 5)[0].titleChance
//   ).toBe(TitleChance.SECURED);

//   expect(
//     getStandingsWithTitleChance(driverStandings, raceSchedule, 5)[3].titleChance
//   ).toBe(TitleChance.NONE);
// });
