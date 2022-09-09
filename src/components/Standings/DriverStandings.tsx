import { useState } from "react";

import { getStandingsWithTitleChance } from "../../services/getTitleChance";
import { ReactComponent as HelmetIcon } from "../../svg/helmet.svg";
import { IDriverStanding } from "../../types/api";
import { IRaceEvent } from "../../types/app";
import { DriverPill } from "../common/DriverPill";
import { TitleTrophy } from "../TitleTrophy";
import {
  Chevron,
  IconCell,
  ResultsTable,
  ShortList,
  StandingsContainer,
  StandingsHeader,
} from "./StandingsSection";

type Props = {
  driverStandings: IDriverStanding[];
  raceSchedule: IRaceEvent[];
  lastRound: IRaceEvent;
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
    lastRound
  );
  const shortList = fullStandings.slice(0, 3);

  return (
    <StandingsContainer>
      <StandingsHeader onClick={() => setExpanded((prevState) => !prevState)}>
        <div style={{ display: "flex" }}>
          <IconCell size="4.4rem" offset="-1.2rem">
            <HelmetIcon />
          </IconCell>
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
