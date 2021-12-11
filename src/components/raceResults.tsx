import React, { useState } from "react";
import { getGainedPoints } from "../services/pointsCalculations";
import CONSTRUCTOR_DATA from "../constants/constructorsData";
import DRIVER_DATA from "../constants/driverData";

import type { DriverResult } from "../constants/types";

const initialDnDState: {
  draggedFrom: number;
  draggedTo: number;
  isDragging: boolean;
  originalOrder: DriverResult[];
  updatedOrder: DriverResult[];
} = {
  draggedFrom: 0,
  draggedTo: 0,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

export default function RaceResults({
  driverList,
  setRaceResults,
}: {
  driverList: DriverResult[];
  setRaceResults(results: DriverResult[]): void;
}) {
  function setFastestLap(index: number) {
    const updatedDriverList = driverList.map((driver, currentIndex) => ({
      ...driver,
      fastestLap: index === currentIndex,
    }));
    setRaceResults(updatedDriverList);
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
      originalOrder: driverList,
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

  function getConstructorColor(driver: DriverResult) {
    const driverData = DRIVER_DATA.find(
      (driverData) => driver.name === driverData.name
    );
    const teamName = driverData?.team || "";
    const constructor = CONSTRUCTOR_DATA.find(
      (constructorData) => constructorData.name === teamName
    );
    return constructor?.color || "#fff";
  }

  return (
    <div>
      <h2>Next race results</h2>
      <table className="race-results">
        <tbody>
          {driverList.map((driver, index) => (
            <tr
              key={index}
              draggable="true"
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              data-position={index}
              style={{
                backgroundColor: `${getConstructorColor(driver)}50`,
                border: `2px solid ${getConstructorColor(driver)}`,
              }}
            >
              <td>
                <label className="fastestLapContainer">
                  <input
                    type="checkbox"
                    checked={driver.fastestLap}
                    onChange={() => setFastestLap(index)}
                  />
                  <span className="checkmark" />
                </label>
              </td>
              <td>P{index + 1}</td>
              <td className="driver-name">{driver.name}</td>
              <td>{getGainedPoints(index, driver.fastestLap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
