import React, { useState } from "react";
import { getGainedPoints } from "../data/pointsCalculations";

const initialDnDState = {
  draggedFrom: 0,
  draggedTo: 0,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

export default function RaceResults({ driverList, setRaceResults }) {
  function setFastestLap(index) {
    const updatedDriverList = driverList.map((driver, currentIndex) => ({
      ...driver,
      fastestLap: index === currentIndex,
    }));
    setRaceResults(updatedDriverList);
  }

  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  function onDragStart(event) {
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: driverList,
    });
  }

  function onDragOver(event) {
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(event.currentTarget.dataset.position);
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

  return (
    <div>
      <h2>Next race results</h2>
      <table>
        {driverList.map((driver, index) => (
          <tr
            key={index}
            draggable="true"
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            data-position={index}
          >
            <td>
              <input
                type="checkbox"
                checked={driver.fastestLap}
                onChange={() => setFastestLap(index)}
              />{" "}
              FL
            </td>
            <td>{index + 1}</td>
            <td>{driver.name}</td>
            <td>{getGainedPoints(index, driver.fastestLap)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
