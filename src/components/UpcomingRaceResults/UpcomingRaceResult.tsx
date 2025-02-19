import React from "react";
import styled from "styled-components";

import { colors } from "../../common/colors";
import {
  RaceType,
  UpcomingRaceResult as UpcomingRaceResultType,
} from "../../types/entities";
import { DriverPill } from "../common/DriverPill";
import { Chevron } from "../Standings/StandingsSection";
import { RaceResultEditor } from "./RaceResultEditor/RaceResultEditor";

const UpcomingRaceContainer = styled.div`
  background-color: ${colors.darkGray};
  margin-bottom: 0.5rem;

  .race-event-summary {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    cursor: pointer;
  }

  .race-event-round {
    font-size: 1.5rem;
    text-align: center;
    flex: 3rem 0 0;

    &.expanded {
      font-size: 1.2rem;
    }
  }

  .race-event-details {
    flex: auto 1 0;
  }

  .race-event-short-results {
    display: flex;
    margin-top: 0.3rem;
  }

  .chevron {
    flex: 1.4rem 0 0;
    text-align: right;
  }
`;

export function UpcomingRaceResult({
  raceResult,
  setRaceResult,
  expanded,
  toggleExpanded,
}: {
  raceResult: UpcomingRaceResultType;
  setRaceResult: (result: UpcomingRaceResultType) => void;
  expanded: boolean;
  toggleExpanded: React.MouseEventHandler<HTMLElement>;
}) {
  const { RaceEvent } = raceResult;
  return (
    <UpcomingRaceContainer>
      <div className="race-event-summary" onClick={toggleExpanded}>
        <div className={`race-event-round ${expanded ? "expanded" : ""}`}>
          {RaceEvent.eventType === RaceType.SPRINT_RACE
            ? "S"
            : `#${RaceEvent.Race.round}`}
        </div>
        <div className="race-event-details">
          <div className="race-event-name">
            {RaceEvent.Race.raceName}
            {RaceEvent.eventType === RaceType.SPRINT_RACE
              ? " (Sprint race)"
              : ""}
          </div>
          {!expanded && (
            <div className="race-event-short-results">
              {raceResult.results.slice(0, 3).map((result, index) => (
                <DriverPill
                  key={result.Driver.code}
                  driverCode={result.Driver.code}
                  position={index + 1}
                />
              ))}
            </div>
          )}
        </div>
        <div className="chevron">
          <Chevron expanded={expanded} />
        </div>
      </div>

      {expanded && (
        <RaceResultEditor
          raceResult={raceResult}
          setRaceResult={setRaceResult}
        />
      )}
    </UpcomingRaceContainer>
  );
}
