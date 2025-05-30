import { expect, test } from "vitest";

import { getPointsPerRace } from "./pointsCalculations";

test("returns points for a race result", () => {
  expect(getPointsPerRace(0)).toBe(25);
  expect(getPointsPerRace(4)).toBe(10);
  expect(getPointsPerRace(10)).toBe(0);
});
