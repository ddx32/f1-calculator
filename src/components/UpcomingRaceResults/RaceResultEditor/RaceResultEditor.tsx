import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

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
  const setUpdatedOrder = (result: DropResult) => {
    const updatedOrder = [...raceResult.results];
    if (!result.destination) {
      return;
    }

    const itemToMove = updatedOrder[result.source.index];
    updatedOrder.splice(result.source.index, 1);
    updatedOrder.splice(result.destination.index, 0, itemToMove);

    setRaceResult({
      ...raceResult,
      results: updatedOrder,
    });
  };

  return (
    <DragDropContext onDragEnd={setUpdatedOrder}>
      <Droppable droppableId={raceResult.RaceEvent.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
