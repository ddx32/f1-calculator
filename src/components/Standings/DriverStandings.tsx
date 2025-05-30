import { useState } from "react";

import { css } from "../../../styled-system/css";
import { getStandingsWithTitleChance } from "../../services/getTitleChance";
import HelmetIcon from "../../svg/helmet.svg?react";
import { DriverStanding, RaceEvent } from "../../types/entities";
import { Chevron } from "../common/Chevron";
import { DriverPill } from "../common/DriverPill";
import {
  ResultsTable,
  ShortList,
  StandingsContainer,
  StandingsHeader,
} from "./StandingsSection";
import { TitleTrophy } from "./TitleTrophy";

type Props = {
  driverStandings: DriverStanding[];
  raceSchedule: RaceEvent[];
  lastRound: RaceEvent;
};

export function DriverStandings({
  driverStandings,
  raceSchedule,
  lastRound,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const fullStandings = getStandingsWithTitleChance(
    driverStandings,
    raceSchedule,
    lastRound,
  );
  const shortList = fullStandings.slice(0, 3);

  return (
    <StandingsContainer>
      <StandingsHeader onClick={() => setExpanded((prevState) => !prevState)}>
        <div style={{ display: "flex" }}>
          <div
            className={css({
              flex: "4.4rem 0 0",
            })}
          >
            <HelmetIcon
              className={css({
                transform: "translate(-1.2rem)",
              })}
            />
          </div>

          <div className="summary-container">
            <h2>Drivers</h2>
            {!expanded && (
              <ShortList>
                {shortList.map((standing) => (
                  <DriverPill
                    key={standing.Driver.driverId}
                    driverCode={standing.Driver.code}
                    position={standing.position}
                  />
                ))}
              </ShortList>
            )}
          </div>
        </div>

        <Chevron expanded={expanded} />
      </StandingsHeader>

      {expanded && (
        <ResultsTable>
          <thead>
            <tr>
              <th />
              <th>P</th>
              <th>Driver</th>
              <th>Points</th>
              <th>Wins</th>
            </tr>
          </thead>

          <tbody>
            {fullStandings.map((standing) => (
              <tr key={standing.Driver.driverId}>
                <td>
                  <TitleTrophy standing={standing} />
                </td>
                <td>{standing.position}</td>
                <td>
                  {standing.Driver.givenName} {standing.Driver.familyName}
                </td>
                <td>{standing.points}</td>
                <td>{standing.wins > 0 && standing.wins}</td>
              </tr>
            ))}
          </tbody>
        </ResultsTable>
      )}
    </StandingsContainer>
  );
}
