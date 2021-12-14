import {
  getDriversChampionshipPositionChange,
  getConstructorsChampionshipPositionChange,
} from "../services/pointsCalculations";
import { drivers, constructors } from "../services/standings";
import getTitleChance from "../services/getTitleChance";
import {
  ConstructorEntry,
  DriverEntry,
  DriverResult,
} from "../constants/types";

function getPositionChange(changeValue: number) {
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

function getDriversPositionChange(driver: DriverEntry, index: number) {
  const changeValue = getDriversChampionshipPositionChange(driver, index);
  return getPositionChange(changeValue);
}

function getConstructorsPositionChange(
  constructor: ConstructorEntry,
  raceResults: DriverResult[]
) {
  const changeValue = getConstructorsChampionshipPositionChange(
    constructor,
    raceResults
  );
  return getPositionChange(changeValue);
}

export default function AfterRaceStandings({
  raceResults,
}: {
  raceResults: DriverResult[];
}) {
  const driverStandings = drivers.getStandingsAfterNextRound(raceResults);
  const constructorStandings =
    constructors.getStandingsAfterNextRound(raceResults);

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
            {driverStandings.map((driver, index) => (
              <tr key={index}>
                <td>{getTitleChance(driverStandings, index) && "🏆"}</td>
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
            {constructorStandings.map((team, index) => (
              <tr key={index}>
                <td>{getTitleChance(constructorStandings, index) && "🏆"}</td>
                <td>{index + 1}</td>
                <td>{team.name}</td>
                <td>{team.points}</td>
                <td>{team.wins > 0 && team.wins}</td>
                <td>{getConstructorsPositionChange(team, raceResults)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
