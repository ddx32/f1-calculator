import { getRemainingRaces } from "./getRemainingRaces";
import { raceSchedule } from "../../fixtures/raceSchedule";

test("should calculate remaining races", () => {
  const remainingEvents = getRemainingRaces(raceSchedule, 1);

  expect(remainingEvents.sprintRaces).toBe(1);
  expect(remainingEvents.grandsPrix).toBe(4);
});
