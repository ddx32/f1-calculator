import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: result.Driver.driverId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={resultRow}
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
  );
}
