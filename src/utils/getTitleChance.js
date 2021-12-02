const pointsPerRound = 26;

export function getTitleChance(standings, index, roundsToGo) {
  const currentPoints = standings[index].points;
  const maximumPoints = pointsPerRound * roundsToGo + currentPoints;
  const otherDrivers = standings.filter(
    (driver, listIndex) => index !== listIndex
  );

  return !otherDrivers.some((driver) => driver.points > maximumPoints);
}
