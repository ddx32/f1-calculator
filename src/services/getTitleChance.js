function getTitleChance(standings, index) {
  const { maximumPoints, maximumWins } = standings[index];
  const others = standings.filter((entrant, listIndex) => index !== listIndex);

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
