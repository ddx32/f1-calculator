import { useState } from "react";

import { css } from "../../../styled-system/css";
import { getStandingsWithTitleChance } from "../../services/getTitleChance";
import FormulaCarIcon from "../../svg/formula_car.svg?react";
import { RaceEvent } from "../../types/entities";
import { ConstructorStanding } from "../../types/entities";
import { Chevron } from "../common/Chevron";
import { ConstructorPill } from "./ConstructorPill";
import {
  ResultsTable,
  ShortList,
  StandingsContainer,
  StandingsHeader,
} from "./StandingsSection";
import { TitleTrophy } from "./TitleTrophy";

type Props = {
  constructorStandings: ConstructorStanding[];
  raceSchedule: RaceEvent[];
  lastRound: RaceEvent;
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
          <div
            className={css({
              flex: "4.4rem 0 0",
            })}
          >
            <FormulaCarIcon
              className={css({
                height: "4.4rem",
                transform: "translate(0.6rem) scale(1.3) rotate(36deg)",
              })}
            />
          </div>
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
              <th>Constructor</th>
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
