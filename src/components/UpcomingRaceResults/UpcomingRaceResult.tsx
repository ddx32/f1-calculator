import styled from "styled-components";

import { colors } from "../../common/colors";
import { IUpcomingRaceResult, RaceType } from "../../types/app";
import { DriverPill } from "../common/DriverPill";

const UpcomingRaceContainer = styled.div`
  background-color: ${colors.darkGray};
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  display: flex;
  align-items: center;

  .race-event-round {
    font-size: 1.5rem;
    flex: 3.8rem 0;
    text-align: center;
    padding-right: 0.5rem;
  }

  .race-event-name {
    margin-bottom: 0.3rem;
  }

  .race-event-short-results {
    display: flex;
  }
`;

export function UpcomingRaceResult({
  raceResult,
}: {
  raceResult: IUpcomingRaceResult;
}) {
  const { RaceEvent } = raceResult;
  return (
    <UpcomingRaceContainer>
      <div className="race-event-round">
        {RaceEvent.eventType === RaceType.SPRINT_RACE
          ? "S"
          : `#${RaceEvent.Race.round}`}
      </div>
      <div className="race-event-details">
        <div className="race-event-name">
          {RaceEvent.Race.raceName}
          {RaceEvent.eventType === RaceType.SPRINT_RACE ? " (Sprint race)" : ""}
        </div>
        <div className="race-event-short-results">
          {raceResult.results.slice(0, 3).map((result, index) => (
            <DriverPill
              key={result.Driver.code}
              driverCode={result.Driver.code}
              position={index + 1}
            />
          ))}
        </div>
      </div>
    </UpcomingRaceContainer>
  );
}
