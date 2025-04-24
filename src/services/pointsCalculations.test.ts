import { expect, test } from "vitest";

import { getPointsPerRace } from "./pointsCalculations";

test("returns points for a race result", () => {
  expect(getPointsPerRace(0, false)).toBe(25);
  expect(getPointsPerRace(4, true)).toBe(11);
  expect(getPointsPerRace(10, true)).toBe(0);
});

