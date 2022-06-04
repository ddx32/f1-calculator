import {
  getGainedPoints,
  getPointsPerRace,
  getPositionChange,
  getRemainingDriverPoints,
  getRemainingConstructorsPoints,
} from "./pointsCalculations";

import {
  driverStandings,
  constructorStandings,
} from "../../fixtures/standings";
import { raceSchedule } from "../../fixtures/raceSchedule";

test("returns points for a race result", () => {
  expect(getPointsPerRace(0, false)).toBe(25);
  expect(getPointsPerRace(4, true)).toBe(11);
  expect(getPointsPerRace(10, true)).toBe(0);
});

test("returns string with gained points", () => {
  expect(getGainedPoints(0, true)).toBe("+ 26");
});

test("returns change in drivers championship", () => {
  const standing = {
    position: 2,
    positionText: "2",
    points: 125,
    wins: 4,
    Driver: {
      driverId: "max_verstappen",
    },
  };

  expect(getPositionChange(standing, driverStandings)).toBe(-1);
});

test("returns change in constructors championship", () => {
  const standing = {
    position: 3,
    positionText: "3",
    points: 235,
    wins: 5,
    Constructor: {
      constructorId: "red_bull",
      url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
      name: "Red Bull",
      nationality: "Austrian",
    },
  };

  expect(getPositionChange(standing, constructorStandings)).toBe(-2);
});

test("returns maximum remaining WDC points", () => {
  expect(getRemainingDriverPoints(raceSchedule, 1)).toBe(112);
  expect(getRemainingDriverPoints(raceSchedule, 2)).toBe(86);
  expect(getRemainingDriverPoints(raceSchedule, 4)).toBe(26);
  expect(getRemainingDriverPoints(raceSchedule, 2, 2)).toBe(61);
});

test("returns maximum remaining WCC points", () => {
  expect(getRemainingConstructorsPoints(raceSchedule, 1)).toBe(191);
  expect(getRemainingConstructorsPoints(raceSchedule, 4)).toBe(44);
});
