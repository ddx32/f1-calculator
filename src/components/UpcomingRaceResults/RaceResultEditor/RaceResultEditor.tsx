import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import styled from "styled-components";

import { colors } from "../../../common/colors";
import { UpcomingRaceResult } from "../../../types/entities";
import { ResultEditorContainer } from "./RaceResultEditor.styled";
import { ResultRow } from "./ResultRow";
const Hint = styled.div`
  color: ${colors.thinGray};
  padding-bottom: 0.3rem;
  font-size: 0.9rem;
`;

export function RaceResultEditor({
  raceResult,
  setRaceResult,
}: {
  raceResult: UpcomingRaceResult;
  setRaceResult: (result: UpcomingRaceResult) => void;
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
            <Hint>Drag and drop to rearrange</Hint>
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
