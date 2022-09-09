import { raceResults } from "../../fixtures/raceResults";
import { driverStandings } from "../../fixtures/standings";
import { RaceType } from "../types/app";
import { getStandingsAfterRounds } from "./standings";

// test("should calculate standings after a race (races)", () => {
//   const afterRaceStandings = getStandingsAfterRounds(
//     driverStandings,
//     raceResults,
//     RaceType.GRAND_PRIX
//   );

//   expect(afterRaceStandings[3].Driver.driverId).toBe("sainz");
//   expect(afterRaceStandings[1].Driver.driverId).toBe("max_verstappen");
//   expect(afterRaceStandings[0].wins).toBe(3);
// });
