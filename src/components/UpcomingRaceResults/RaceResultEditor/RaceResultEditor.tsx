import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = raceResult.results.findIndex(
        (result) => result.Driver.driverId === active.id,
      );
      const newIndex = raceResult.results.findIndex(
        (result) => result.Driver.driverId === over.id,
      );

      const updatedOrder = arrayMove(raceResult.results, oldIndex, newIndex);

      setRaceResult({
        ...raceResult,
        results: updatedOrder,
      });
    }
  };

  const items = raceResult.results.map((result) => result.Driver.driverId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
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
      </SortableContext>
    </DndContext>
  );
}
