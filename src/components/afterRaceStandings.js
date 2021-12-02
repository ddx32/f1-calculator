import {
  getUpdatedDriversPointsStandings,
  getDriversChampionshipPositionChange,
  getUpdatedConstructorsPointsStandings,
} from "../utils/pointsCalculations";

export default function AfterRaceStandings({ raceResults }) {
  const updatedPointsStandings = getUpdatedDriversPointsStandings(raceResults);

  return (
    <div>
      <div>
        <h2>Championship standings after next race</h2>
        <table>
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
              <td>{driver.name}</td>
              <td>{driver.points}</td>
              <td>{driver.wins}</td>
              <td>{getDriversChampionshipPositionChange(driver, index)}</td>
            </tr>
          ))}
        </table>
      </div>

      <div>
        <table>
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
