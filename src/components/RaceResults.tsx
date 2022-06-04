import React, { useState } from "react";
import { getGainedPoints } from "../services/pointsCalculations";
import CONSTRUCTOR_DATA from "../constants/constructorsData";

import type { IRaceResult, IRaceTable } from "../constants/types";

const initialDnDState: {
  draggedFrom: number;
  draggedTo: number;
  isDragging: boolean;
  originalOrder: IRaceResult[];
  updatedOrder: IRaceResult[];
} = {
  draggedFrom: 0,
  draggedTo: 0,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

export default function RaceResults({
  raceResults,
  setRaceResults,
  raceSchedule,
  currentRound,
}: {
  raceResults: IRaceResult[];
  setRaceResults(results: IRaceResult[]): void;
  raceSchedule: IRaceTable;
  currentRound: number;
}) {
  function setFastestLap(index: number) {
    const updatedRaceResults = raceResults.map((raceResult, currentIndex) => ({
      ...raceResult,
      fastestLap: index === currentIndex,
    }));
    setRaceResults(updatedRaceResults);
  }

  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  function onDragStart(event: React.DragEvent) {
    const initialPosition = Number(
      (event?.currentTarget as HTMLTableRowElement)?.dataset.position
    );
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: raceResults,
    });
  }

  function onDragOver(event: React.DragEvent) {
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(
      (event?.currentTarget as HTMLTableRowElement)?.dataset.position
    );
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  }

  function onDrop() {
    setRaceResults(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: 0,
      draggedTo: 0,
      isDragging: false,
    });
  }

  function getConstructorColor(raceResult: IRaceResult) {
    const constructorMeta = CONSTRUCTOR_DATA.find(
      (constructorData) =>
        constructorData.constructorId ===
        raceResult.Constructors[0].constructorId
    );
    return constructorMeta?.color || "#fff";
  }

  const nextRound = raceSchedule.Races[currentRound];

  return (
    <div>
      <h2>Next race results</h2>
      <p style={{ color: "white" }}>
        Next round: #{nextRound.round} {nextRound.raceName}
      </p>
      <table className="race-results">
        <tbody>
          {raceResults.map((raceResult, index) => (
            <tr
              key={index}
              draggable="true"
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              data-position={index}
              style={{
                backgroundColor: `${getConstructorColor(raceResult)}50`,
                border: `2px solid ${getConstructorColor(raceResult)}`,
              }}
            >
              <td>
                <label className="fastestLapContainer">
                  <input
                    type="checkbox"
                    checked={raceResult.fastestLap}
                    onChange={() => setFastestLap(index)}
                  />
                  <span className="checkmark" />
                </label>
              </td>
              <td>P{index + 1}</td>
              <td className="driver-name">
                {raceResult.Driver.givenName} {raceResult.Driver.familyName}
              </td>
              <td>{getGainedPoints(index, raceResult.fastestLap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
