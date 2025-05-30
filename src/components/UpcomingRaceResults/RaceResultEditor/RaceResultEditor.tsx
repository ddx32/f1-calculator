import { useEffect } from "react";

import { css } from "../../../../styled-system/css";
import { UpcomingRaceResult } from "../../../types/entities";
import { ResultRow } from "./ResultRow";

export function RaceResultEditor({
  raceResult,
  setRaceResult,
}: {
  raceResult: UpcomingRaceResult;
  setRaceResult: (result: UpcomingRaceResult) => void;
}) {
  useEffect(() => {
    setRaceResult(raceResult);
  }, [raceResult, setRaceResult]);

  return (
    <div
      className={css({
        padding: "0 1rem 1rem 1rem",
      })}
    >
      <div
        className={css({
          color: "thinGray",
          paddingBottom: "0.3rem",
          fontSize: "0.9rem",
        })}
      >
        Drag and drop to rearrange
      </div>
      {raceResult.results.map((result, index) => (
        <ResultRow
          key={result.Driver.driverId}
          result={result}
          index={index}
          raceType={raceResult.RaceEvent.eventType}
        />
      ))}
    </div>
  );
}
