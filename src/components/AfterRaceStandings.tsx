import {
  IConstructorStanding,
  IDriverStanding,
  IRaceResult,
  IRaceTable,
} from "../constants/types";
import { getStandingsAfterRounds } from "../services/standings";
import { getPositionChange } from "../services/pointsCalculations";
import { getStandingsWithTitleChance } from "../services/getTitleChance";
import { TitleTrophy } from "./TitleTrophy";
import React from "react";

function PositionChange({ changeValue }: { changeValue: number }) {
  if (changeValue === 0) {
    return null;
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

export default function AfterRaceStandings({
  raceResults,
  currentDriverStandings,
  currentConstructorStandings,
  raceSchedule,
  currentRound
}: {
  raceResults: IRaceResult[];
  currentDriverStandings: IDriverStanding[];
  currentConstructorStandings: IConstructorStanding[];
  raceSchedule: IRaceTable;
  currentRound: number;
}) {
  const allRaceResults = [raceResults];
  const driverStandings = getStandingsAfterRounds(
    currentDriverStandings,
    allRaceResults
  );
  const driverStandingsWithTitleChance = getStandingsWithTitleChance(
    driverStandings,
    raceSchedule,
    currentRound
  );

  const constructorStandings = getStandingsAfterRounds(
    currentConstructorStandings,
    allRaceResults
  );
  const constructorStandingsWithTitleChance = getStandingsWithTitleChance(
    constructorStandings,
    raceSchedule,
    currentRound
  );

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
            {driverStandingsWithTitleChance.map((standing, index) => (
              <tr key={index}>
                <td>
                  <TitleTrophy standing={standing} />
                </td>
                <td>{standing.position}</td>
                <td>{standing.Driver.code}</td>
                <td>{standing.points}</td>
                <td>{standing.wins > 0 && standing.wins}</td>
                <td>
                  <PositionChange
                    changeValue={getPositionChange(
                      standing,
                      currentDriverStandings
                    )}
                  />
                </td>
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
                <td>
                  <PositionChange
                    changeValue={getPositionChange(
                      standing,
                      currentConstructorStandings
                    )}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
