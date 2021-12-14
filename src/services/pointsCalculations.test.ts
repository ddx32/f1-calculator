import {
  getConstructorsChampionshipPositionChange,
  getDriversChampionshipPositionChange,
  getGainedPoints,
  getPointsPerRace,
} from "./pointsCalculations";

test("returns points for a race result", () => {
  expect(getPointsPerRace(0, false)).toBe(25);
  expect(getPointsPerRace(4, true)).toBe(11);
  expect(getPointsPerRace(10, true)).toBe(0);
});

test("returns string with gained points", () => {
  expect(getGainedPoints(0, true)).toBe("+ 26");
});

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
