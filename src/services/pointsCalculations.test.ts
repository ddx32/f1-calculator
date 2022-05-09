import {
  getConstructorsChampionshipPositionChange,
  getDriversChampionshipPositionChange,
  getGainedPoints,
  getPointsPerRace,
  getRemainingDriverPoints,
  getRemainingConstructorsPoints,
} from "./pointsCalculations";

jest.mock("./standings", () => ({
  drivers: {
    getCurrentStandings: () => [
      {
        name: "Hemis Lewinton",
        points: 100,
        wins: 1,
        team: "Nercebes",
      },
      {
        name: "Vax Mercslappen",
        points: 100,
        wins: 0,
        team: "Pink Cow",
      },
      {
        name: "Baltteri Vottas",
        points: 81,
        wins: 0,
        team: "Nercebes",
      },
      {
        name: "Pernio Serez",
        points: 80,
        wins: 0,
        team: "Pink Cow",
      },
    ],
  },
  constructors: {
    getCurrentStandings: () => [
      {
        name: "Nercebes",
        points: 100,
        wins: 5,
      },
      {
        name: "Pink Cow",
        points: 80,
        wins: 3,
      },
    ],
    getStandingsAfterNextRound: () => [
      {
        name: "Pink Cow",
        points: 101,
        wins: 4,
      },
      {
        name: "Nercebes",
        points: 100,
        wins: 5,
      },
    ],
  },
}));

jest.mock("../constants/championshipRoundsData", () => ({
  ROUNDS_TO_GO: 4,
  SPRINT_RACES_TO_GO: 2,
  POINTS_PER_POSITION: {
    fullGrandPrix: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
    sprintRace: [8, 7, 6, 5, 4, 3, 2, 1],
  },
  FASTEST_LAP_POINTS: 1,
}));

test("returns points for a race result", () => {
  expect(getPointsPerRace(0, false)).toBe(25);
  expect(getPointsPerRace(4, true)).toBe(11);
  expect(getPointsPerRace(10, true)).toBe(0);
});

test("returns string with gained points", () => {
  expect(getGainedPoints(0, true)).toBe("+ 26");
});

test("returns change in drivers championship", () => {
  const driverEntry = {
    name: "Vax Mercslappen",
    points: 100,
    wins: 0,
    team: "Pink Cow",
    number: 1,
    abbreviation: "VER",
  };

  expect(getDriversChampionshipPositionChange(driverEntry, 0)).toBe(1);
  expect(getDriversChampionshipPositionChange(driverEntry, 3)).toBe(-2);
});

test("returns change in constructors championship", () => {
  const raceResults = [
    {
      name: "Hemis Lewinton",
      fastestLap: true,
    },
    {
      name: "Vax Mercslappen",
      fastestLap: false,
    },
  ];
  const constructorEntry = { name: "Nercebes", points: 100, wins: 5 };

  const positionChange = getConstructorsChampionshipPositionChange(
    constructorEntry,
    raceResults
  );

  expect(positionChange).toBe(-1);
});

test("returns maximum remaining WDC points", () => {
  expect(getRemainingDriverPoints()).toBe(120);
  expect(getRemainingDriverPoints(1)).toBe(120);
  expect(getRemainingDriverPoints(2)).toBe(86);
});

test("returns maximum remaining WCC points", () => {
  expect(getRemainingConstructorsPoints()).toBe(206);
});
