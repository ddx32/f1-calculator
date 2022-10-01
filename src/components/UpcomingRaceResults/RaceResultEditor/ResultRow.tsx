import { Draggable } from "react-beautiful-dnd";

import { getPointsPerRace } from "../../../services/pointsCalculations";
import { IRaceResult } from "../../../types/api";
import { RaceType } from "../../../types/app";

export function ResultRow({
  result,
  index,
  raceType,
  setFastestLap,
}: {
  result: IRaceResult;
  index: number;
  raceType: RaceType;
  setFastestLap: () => void;
}) {
  const position = index + 1;
  const pointsGained = getPointsPerRace(index, result.fastestLap, raceType);

  return (
    <Draggable draggableId={result.Driver.driverId} index={index}>
      {(provided) => (
        <div
          className="result-row"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="fastest-lap">
            <label className="fastestLapContainer">
              <input
                type="checkbox"
                checked={result.fastestLap}
                onChange={setFastestLap}
              />
              <span className="checkmark" />
            </label>
          </div>
          <div className="position">{position.toString()}</div>
          <div className="driver">
            {result.Driver.givenName} {result.Driver.familyName}
          </div>
          <div className="points-gained">
            {pointsGained > 0 && `+ ${pointsGained.toString()}`}
          </div>
        </div>
      )}
    </Draggable>
  );
}
