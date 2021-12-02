import React from "react";
import driverData from "../data/driverData";
import {
  getDriverStandings,
  getConstructorStandings,
} from "../utils/getStandings";
import { getTitleChance } from "../utils/getTitleChance";

export default function CurrentStandings() {
  return (
    <div>
      <div>
        <h2>Current championship standings</h2>
        <table className="standings">
          <tr>
            <th>Title</th>
            <th>Pos</th>
            <th>Driver</th>
            <th>Points</th>
            <th>Wins</th>
          </tr>
          {getDriverStandings(driverData).map((driver, index) => (
            <tr>
              <td>{getTitleChance(driverData, index, 2) && "🏆"}</td>
              <td>{index + 1}</td>
              <td>{driver.abbreviation}</td>
              <td>{driver.points}</td>
              <td>{driver.wins > 0 && driver.wins}</td>
            </tr>
          ))}
        </table>
      </div>

      <div>
        <table className="standings">
          {getConstructorStandings(driverData).map((team, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
