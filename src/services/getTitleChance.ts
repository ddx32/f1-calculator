import { Entry } from "../constants/types";

function getTitleChance<T extends Entry>(
  standings: T[],
  index: number
): boolean {
  const { maximumPoints, maximumWins } = standings[index];
  const others = standings.filter((entrant, listIndex) => index !== listIndex);

  if (maximumPoints === undefined || maximumWins === undefined) {
    throw new Error(
      "Can not calculate points title chance. Maximum points or wins not provided."
    );
  }

  const chanceOnPoints = others.every((entrant) => {
    return entrant.points < maximumPoints;
  });

  const isPointsTied = others.some((entrant) => {
    return entrant.points === maximumPoints;
  });

  const chanceOnWins = others.every((entrant) => {
    return entrant.wins < maximumWins;
  });

  if (chanceOnPoints) {
    return true;
  } else if (isPointsTied && chanceOnWins) {
    return true;
  }

  return false;
}

export default getTitleChance;
