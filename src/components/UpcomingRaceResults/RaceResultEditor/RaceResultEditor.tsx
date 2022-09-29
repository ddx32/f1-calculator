import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { IUpcomingRaceResult } from "../../../types/app";
import { ResultEditorContainer } from "./RaceResultEditor.styled";
import { ResultRow } from "./ResultRow";

export function RaceResultEditor({
  raceResult,
  setRaceResult,
}: {
  raceResult: IUpcomingRaceResult;
  setRaceResult: (result: IUpcomingRaceResult) => void;
}) {
  const setFastestLap = (index: number) => {
    const updatedResults = raceResult.results.map((result, currentIndex) => {
      return {
        ...result,
        fastestLap: currentIndex === index,
      };
    });

    return () =>
      setRaceResult({
        ...raceResult,
        results: updatedResults,
      });
  };

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
          <ResultEditorContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {raceResult.results.map((result, index) => (
              <ResultRow
                key={result.Driver.driverId}
                result={result}
                index={index}
                raceType={raceResult.RaceEvent.eventType}
                setFastestLap={setFastestLap(index)}
              />
            ))}
            {provided.placeholder}
          </ResultEditorContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}
