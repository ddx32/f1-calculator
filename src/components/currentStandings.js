import React from "react";
import driverData from "../data/driverData";
import {
  getDriverStandings,
  getConstructorStandings,
} from "../data/getStandings";

export default function CurrentStandings() {
  return (
    <div>
      <div>
        <h2>Drivers</h2>
        <table>
          <tr>
            <th>Driver</th>
            <th>Points</th>
            <th>Wins</th>
          </tr>
          {getDriverStandings(driverData).map((driver) => (
            <tr>
              <td>{driver.name}</td>
              <td>{driver.points}</td>
              <td>{driver.wins}</td>
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
