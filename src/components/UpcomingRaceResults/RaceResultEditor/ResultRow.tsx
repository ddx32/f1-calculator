import { Draggable } from "@hello-pangea/dnd";

import { css } from "../../../../styled-system/css";
import fastestLap from "../../../images/fastestLap.png";
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

const fastestLapContainer = css({
  position: "relative",
  padding: "0 !important",
  width: "1.3rem",
  height: "1.3rem",
  display: "block",
  cursor: "pointer",

  "& > input": {
    position: "absolute",
    opacity: "0",
    cursor: "pointer",
    width: "0",
    height: "0",
  },

  "& > input:checked ~ span": {
    backgroundPositionX: "0",
  },
});

const checkmark = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "-100px",

  "&:hover": {
    backgroundPositionX: "0",
  },
});

export function ResultRow({
  result,
  index,
  raceType,
  setFastestLap,
}: {
  result: RaceResult;
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
          className={resultRow}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={css({ flex: "auto 0 0" })}>
            <label className={fastestLapContainer}>
              <input
                type="checkbox"
                checked={result.fastestLap}
                onChange={setFastestLap}
              />
              <span
                className={checkmark}
                style={{ backgroundImage: `url(${fastestLap})` }}
              />
            </label>
          </div>
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
