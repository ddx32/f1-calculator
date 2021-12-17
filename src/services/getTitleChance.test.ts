import getTitleChance from "./getTitleChance";

const drivers = [
  {
    name: "Hemis Lewinton",
    points: 126,
    wins: 2,
    team: "Nercebes",
    maximumPoints: 152,
    maximumWins: 3,
  },
  {
    name: "Vax Mercslappen",
    points: 100,
    wins: 0,
    team: "Pink Cow",
    maximumPoints: 126,
    maximumWins: 1,
  },
  {
    name: "Baltteri Vottas",
    points: 81,
    wins: 0,
    team: "Nercebes",
    maximumPoints: 107,
    maximumWins: 1,
  },
];

const chanceOnWinsDrivers = [
  {
    name: "Hemis Lewinton",
    points: 100,
    wins: 2,
    team: "Nercebes",
    maximumPoints: 126,
    maximumWins: 3,
  },
  {
    name: "Vax Mercslappen",
    points: 74,
    wins: 5,
    team: "Pink Cow",
    maximumPoints: 100,
    maximumWins: 6,
  },
];

const throwsErrorDriver = [
  {
    name: "Hemis Lewinton",
    points: 100,
    wins: 2,
    team: "Nercebes",
  },
];

test("returns driver's or constructor's chance for title", () => {
  expect(getTitleChance(drivers, 0)).toBe(true);
  expect(getTitleChance(drivers, 1)).toBe(false);
  expect(getTitleChance(drivers, 2)).toBe(false);
  expect(getTitleChance(chanceOnWinsDrivers, 1)).toBe(true);
});

test("throws error when maximumPoints or maximumWins missing", () => {
  expect(() => getTitleChance(throwsErrorDriver, 0)).toThrow(
    "Can not calculate points title chance. Maximum points or wins not provided."
  );
});
