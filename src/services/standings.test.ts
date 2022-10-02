import { driverStandings } from "../../fixtures/standings";
import { upcomingRaceResults } from "../../fixtures/upcomingRaceResults";
import { getStandingsAfterRounds } from "./standings";

test("should calculate standings after a race (races)", () => {
  const afterRaceStandings = getStandingsAfterRounds(
    driverStandings,
    upcomingRaceResults
  );

  expect(afterRaceStandings[3].Driver.driverId).toBe("russell");
  expect(afterRaceStandings[1].Driver.driverId).toBe("leclerc");
  expect(afterRaceStandings[0].wins).toBe(7);
});
