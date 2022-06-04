import React from "react";
import {
  IConstructorStanding,
  IDriverStanding,
  IRaceTable,
  IStandingsList,
} from "../constants/types";
import { getStandingsWithTitleChance } from "../services/getTitleChance";
import { TitleTrophy } from "./TitleTrophy";

interface Props {
  standingsList: IStandingsList;
  driverStandings: IDriverStanding[];
  constructorStandings: IConstructorStanding[];
  raceSchedule: IRaceTable;
}

export default function CurrentStandings({
  standingsList,
  driverStandings,
  constructorStandings,
  raceSchedule,
}: Props) {
  const standingsWithTitleChance = getStandingsWithTitleChance(
    driverStandings,
    raceSchedule,
    standingsList.round
  );

  const constructorStandingsWithTitleChance = getStandingsWithTitleChance(
    constructorStandings,
    raceSchedule,
    standingsList.round
  );

  const lastRound = raceSchedule.Races.find(
    (race) => race.round === standingsList.round
  );

  return (
    <div>
      <div>
        <h2>Current standings</h2>
        <p style={{ color: "white" }}>
          Last round: #{standingsList.round} {lastRound?.raceName}
        </p>
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
            {standingsWithTitleChance.map((standing) => (
              <tr key={standing.Driver.driverId}>
                <td>
                  <TitleTrophy standing={standing} />
                </td>
                <td>{standing.position}</td>
                <td>{standing.Driver.code}</td>
                <td>{standing.points}</td>
                <td>{standing.wins > 0 && standing.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <table className="standings">
          <tbody>
            {constructorStandingsWithTitleChance.map((standing) => (
              <tr key={standing.Constructor.constructorId}>
                <td>
                  <TitleTrophy standing={standing} />
                </td>
                <td>{standing.position}</td>
                <td>{standing.Constructor.name}</td>
                <td>{standing.points}</td>
                <td>{standing.wins > 0 && standing.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
