import { getConstructorStandings } from "../data/getStandings";
import driverData from "../data/driverData";
import {
  getUpdatedDriversPointsStandings,
  getDriversChampionshipPositionChange,
} from "../data/pointsCalculations";

export default function AfterRaceStandings({ raceResults }) {
  const updatedPointsStandings = getUpdatedDriversPointsStandings(raceResults);

  return (
    <div>
      <div>
        <h2>Drivers</h2>
        <table>
          <tr>
            <th>Driver</th>
            <th>Points</th>
            <th>Wins</th>
            <th>Change</th>
          </tr>
          {updatedPointsStandings.map((driver, index) => (
            <tr>
              <td>{driver.name}</td>
              <td>{driver.points}</td>
              <td>{driver.wins}</td>
              <td>{getDriversChampionshipPositionChange(driver, index)}</td>
            </tr>
          ))}
        </table>
      </div>

      <div>
        <h2>Teams</h2>
        <table>
          {getConstructorStandings(driverData).map((team) => (
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
