export function getDriverStandings(driverData) {
  return driverData.sort((a, b) => {
    const pointsComparison = b.points - a.points;

    if (pointsComparison === 0) {
      return b.wins - a.wins;
    }

    return pointsComparison;
  });
}

export function getConstructorStandings(driverData) {
  return driverData
    .reduce((acc, current) => {
      const findTeamFunction = (team) => team.name === current.team;
      const teamEntry = acc.find(findTeamFunction);
      const teamIndex = acc.findIndex(findTeamFunction);

      if (!teamEntry) {
        acc.push({
          name: current.team,
          points: current.points,
        });
      } else {
        acc[teamIndex].points += current.points;
      }

      return acc;
    }, [])
    .sort((a, b) => b.points - a.points);
}
