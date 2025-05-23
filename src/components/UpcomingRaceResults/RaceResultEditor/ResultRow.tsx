import { Draggable } from "@hello-pangea/dnd";

import { css } from "../../../../styled-system/css";
import { getPointsPerRace } from "../../../services/pointsCalculations";
import { RaceResult, RaceType } from "../../../types/entities";

const resultRow = css({
  display: "flex",
  border: "1px solid token(colors.lightGray)",
  backgroundColor: "midGray",
  alignItems: "center",
  padding: "0.3rem",
  marginBottom: "0.2rem",
});

export function ResultRow({
  result,
  index,
  raceType,
}: {
  result: RaceResult;
  index: number;
  raceType: RaceType;
}) {
  const position = index + 1;
  const pointsGained = getPointsPerRace(index, raceType);

  return (
    <Draggable draggableId={result.Driver.driverId} index={index}>
      {(provided) => (
        <div
          className={resultRow}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={css({ flex: "1.4rem 0 0", textAlign: "right" })}>
            {position.toString()}
          </div>
          <div className={css({ flex: "auto 1 1", paddingLeft: "0.5rem" })}>
            {result.Driver.givenName} {result.Driver.familyName}
          </div>
          <div className={css({ alignSelf: "flex-end" })}>
            {pointsGained > 0 && `+ ${pointsGained.toString()}`}
          </div>
        </div>
      )}
    </Draggable>
  );
}
