import {
  getUpdatedDriversPointsStandings,
  getDriversChampionshipPositionChange,
  getUpdatedConstructorsPointsStandings,
} from "../utils/pointsCalculations";

function getPositionChange(driver, index) {
  const changeValue = getDriversChampionshipPositionChange(driver, index);
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

export default function AfterRaceStandings({ raceResults }) {
  const updatedPointsStandings = getUpdatedDriversPointsStandings(raceResults);

  return (
    <div>
      <div>
        <h2>Championship standings after next race</h2>
        <table className="standings">
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Points</th>
            <th>Wins</th>
            <th>Chg</th>
          </tr>
          {updatedPointsStandings.map((driver, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{driver.abbreviation}</td>
              <td>{driver.points}</td>
              <td>{driver.wins > 0 && driver.wins}</td>
              <td>{getPositionChange(driver, index)}</td>
            </tr>
          ))}
        </table>
      </div>

      <div>
        <table className="standings">
          {getUpdatedConstructorsPointsStandings(raceResults).map((team) => (
            <tr>
              <td>{team.name}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
