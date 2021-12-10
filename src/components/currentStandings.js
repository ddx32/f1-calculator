import React from "react";
import { drivers, constructors } from "../services/standings";
import getTitleChance from "../services/getTitleChance";

export default function CurrentStandings() {
  const currentStandings = drivers.getCurrentStandings();

  return (
    <div>
      <div>
        <h2>Current championship standings</h2>
        <table className="standings">
          <thead>
            <tr>
              <th>Title</th>
              <th>Pos</th>
              <th>Driver</th>
              <th>Points</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {currentStandings.map((driver, index) => (
              <tr key={index}>
                <td>{getTitleChance(currentStandings, index) && "🏆"}</td>
                <td>{index + 1}</td>
                <td>{driver.abbreviation}</td>
                <td>{driver.points}</td>
                <td>{driver.wins > 0 && driver.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <table className="standings">
          <tbody>
            {constructors.getCurrentStandings().map((team, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{team.name}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
