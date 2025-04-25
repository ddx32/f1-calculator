import React from "react";

import { css } from "../../../styled-system/css";
import {
  RaceType,
  UpcomingRaceResult as UpcomingRaceResultType,
} from "../../types/entities";
import { Chevron } from "../common/Chevron";
import { DriverPill } from "../common/DriverPill";
import { RaceResultEditor } from "./RaceResultEditor/RaceResultEditor";

const upcomingRaceContainer = css({
  backgroundColor: "darkGray",
  marginBottom: "0.5rem",
});

const raceEventSummary = css({
  padding: "0.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  justifyContent: "center",
  cursor: "pointer",
});

const raceEventRound = css({
  fontSize: "1.5rem",
  textAlign: "center",
  flex: "3rem 0 0",

  "&.expanded": {
    fontSize: "1.2rem",
  },
});

const raceEventDetails = css({
  flex: "auto 1 0",
});

const raceEventShortResults = css({
  display: "flex",
  marginTop: "0.3rem",
});

const chevron = css({
  flex: "1.4rem 0 0",
  textAlign: "right",
});

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
    <div className={upcomingRaceContainer}>
      <div className={raceEventSummary} onClick={toggleExpanded}>
        <div className={`${raceEventRound} ${expanded ? "expanded" : ""}`}>
          {RaceEvent.eventType === RaceType.SPRINT_RACE
            ? "S"
            : `#${RaceEvent.Race.round}`}
        </div>
        <div className={raceEventDetails}>
          <div>
            {RaceEvent.Race.raceName}
            {RaceEvent.eventType === RaceType.SPRINT_RACE
              ? " (Sprint race)"
              : ""}
          </div>
          {!expanded && (
            <div className={raceEventShortResults}>
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
        <div className={chevron}>
          <Chevron expanded={expanded} />
        </div>
      </div>

      {expanded && (
        <RaceResultEditor
          raceResult={raceResult}
          setRaceResult={setRaceResult}
        />
      )}
    </div>
  );
}
