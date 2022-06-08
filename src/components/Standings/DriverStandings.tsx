import { useState } from "react";
import styled from "styled-components";

import { colors } from "../../common/colors";
import { getStandingsWithTitleChance } from "../../services/getTitleChance";
import { ReactComponent as HelmetIcon } from "../../svg/helmet.svg";
import { IDriverStanding, IRaceTable } from "../../types/api";
import { TitleTrophy } from "../TitleTrophy";
import {
  Chevron,
  IconCell,
  ResultsTable,
  ShortList,
  StandingsContainer,
  StandingsHeader,
} from "./StandingsSection";

const DriverPill = styled.div`
  background-color: ${colors.white};
  border: 0.2rem ${colors.black} solid;
  color: ${colors.black};
  padding: 0.15rem 0.5rem;
  margin-right: 0.3rem;
  font-size: 0.9rem;
`;

type Props = {
  driverStandings: IDriverStanding[];
  raceSchedule: IRaceTable;
  round: number;
};

export function DriverStandings({
  driverStandings,
  raceSchedule,
  round,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const fullStandings = getStandingsWithTitleChance(
    driverStandings,
    raceSchedule,
    round
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
                {shortList.map((driver) => (
                  <DriverPill key={driver.Driver.driverId}>
                    {driver.position}. {driver.Driver.code}
                  </DriverPill>
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
              <tr>
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
