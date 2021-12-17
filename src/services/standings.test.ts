import { drivers, constructors } from "./standings";

jest.mock("../constants/driverData", () => ({
  __esModule: true,
  default: [
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
      name: "Hemis Lewinton",
      points: 100,
      wins: 1,
      team: "Nercebes",
    },
    {
      name: "Pernio Serez",
      points: 80,
      wins: 0,
      team: "Pink Cow",
    },
  ],
}));

const raceResults = [
  {
    name: "Vax Mercslappen",
    fastestLap: true,
  },
  {
    name: "Pernio Serez",
    fastestLap: false,
  },
  {
    name: "Baltteri Vottas",
    fastestLap: false,
  },
  {
    name: "Hemis Lewinton",
    fastestLap: false,
  },
];

test("returns current standings, sorted by points and wins", () => {
  const standings = drivers.getCurrentStandings();

  expect(standings[0].name).toBe("Hemis Lewinton");
  expect(standings[1].name).toBe("Vax Mercslappen");
  expect(standings[2].name).toBe("Baltteri Vottas");
});

test("returns standings after next round", () => {
  const standings = drivers.getStandingsAfterNextRound(raceResults);

  expect(standings[0].name).toBe("Vax Mercslappen");
  expect(standings[0].wins).toBe(1);
  expect(standings[0].points).toBe(126);
  expect(standings[1].name).toBe("Hemis Lewinton");
  expect(standings[1].points).toBe(112);
  expect(standings[1].wins).toBe(1);
  expect(standings[2].name).toBe("Pernio Serez");
});

test("returns constructor standings", () => {
  const constructorStandings = constructors.getCurrentStandings();
  expect(constructorStandings[0].name).toBe("Nercebes");
  expect(constructorStandings[0].points).toBe(181);
  expect(constructorStandings[1].name).toBe("Pink Cow");
  expect(constructorStandings[1].points).toBe(180);
  expect(constructorStandings).toHaveLength(2);
});

test("returns constructor standings after next round", () => {
  const constructorStandings =
    constructors.getStandingsAfterNextRound(raceResults);

  expect(constructorStandings[0].name).toBe("Pink Cow");
  expect(constructorStandings[0].points).toBe(224);
  expect(constructorStandings[0].wins).toBe(1);
  expect(constructorStandings[1].points).toBe(208);
});
