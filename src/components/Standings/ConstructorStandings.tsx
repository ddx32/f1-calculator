import { useState } from "react";

import { getStandingsWithTitleChance } from "../../services/getTitleChance";
import { ReactComponent as FormulaCarIcon } from "../../svg/formula_car.svg";
import { IConstructorStanding } from "../../types/api";
import { IRaceEvent } from "../../types/app";
import { ConstructorPill } from "./ConstructorPill";
import {
  Chevron,
  IconCell,
  ResultsTable,
  ShortList,
  StandingsContainer,
  StandingsHeader,
} from "./StandingsSection";
import { TitleTrophy } from "./TitleTrophy";

type Props = {
  constructorStandings: IConstructorStanding[];
  raceSchedule: IRaceEvent[];
  lastRound: IRaceEvent;
};

export function ConstructorStandings({
  constructorStandings,
  raceSchedule,
  lastRound,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const fullStandings = getStandingsWithTitleChance(
    constructorStandings,
    raceSchedule,
    lastRound
  );
  const shortList = fullStandings.slice(0, 3);

  return (
    <StandingsContainer>
      <StandingsHeader onClick={() => setExpanded((prevState) => !prevState)}>
        <div style={{ display: "flex" }}>
          <IconCell size="4.4rem" scale="1.3" offset="0.6rem" rotate="36deg">
            <FormulaCarIcon />
          </IconCell>
          <div className="summary-container">
            <h2>Constructors</h2>
            {!expanded && (
              <ShortList>
                {shortList.map((standing) => (
                  <ConstructorPill
                    key={standing.Constructor.constructorId}
                    constructorStanding={standing}
                  ></ConstructorPill>
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
        </ResultsTable>
      )}
    </StandingsContainer>
  );
}
