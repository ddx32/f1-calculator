import {
  getUpdatedDriversPointsStandings,
  getDriversChampionshipPositionChange,
  getUpdatedConstructorsPointsStandings,
  getConstructorsChampionshipPositionChange,
} from "../utils/pointsCalculations";
import { getTitleChance } from "../utils/getTitleChance";

function getPositionChange(changeValue) {
  if (changeValue === 0) {
    return;
  }

  const arrow = {
    positive: {
      char: String.fromCharCode(9650),
      color: "#037e03",
    },
    negative: {
      char: String.fromCharCode(9660),
      color: "#910707",
    },
  };

  return (
    <span
      style={{
        color: changeValue > 0 ? arrow.positive.color : arrow.negative.color,
      }}
    >
      {changeValue > 0 ? arrow.positive.char : arrow.negative.char}
      {Math.abs(changeValue)}
    </span>
  );
}

function getDriversPositionChange(driver, index) {
  const changeValue = getDriversChampionshipPositionChange(driver, index);
  return getPositionChange(changeValue);
}

function getConstructorsPositionChange(constructor, raceResults) {
  const changeValue = getConstructorsChampionshipPositionChange(
    constructor,
    raceResults
  );
  return getPositionChange(changeValue);
}

export default function AfterRaceStandings({ raceResults }) {
  const updatedPointsStandings = getUpdatedDriversPointsStandings(raceResults);

  return (
    <div>
      <div>
        <h2>Championship standings after next race</h2>
        <table className="standings">
          <thead>
            <tr>
              <th>Title</th>
              <th>Pos</th>
              <th>Driver</th>
              <th>Points</th>
              <th>Wins</th>
              <th>Chg</th>
            </tr>
          </thead>
          <tbody>
            {updatedPointsStandings.map((driver, index) => (
              <tr key={index}>
                <td>
                  {getTitleChance(updatedPointsStandings, index, 0) && "🏆"}
                </td>
                <td>{index + 1}</td>
                <td>{driver.abbreviation}</td>
                <td>{driver.points}</td>
                <td>{driver.wins > 0 && driver.wins}</td>
                <td>{getDriversPositionChange(driver, index)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <table className="standings">
          <tbody>
            {getUpdatedConstructorsPointsStandings(raceResults).map(
              (team, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{team.name}</td>
                  <td>{team.points}</td>
                  <td>{getConstructorsPositionChange(team, raceResults)}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
