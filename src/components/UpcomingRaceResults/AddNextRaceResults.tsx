import React from "react";

import { css } from "../../../styled-system/css";
import PlusButtonIcon from "../../svg/plus-button.svg?react";

export function AddNextRaceResults({
  raceName,
  onClick,
}: {
  raceName: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}) {
  return (
    <div
      className={css({
        backgroundColor: "lightGray",
        display: "flex",
        padding: "0.8rem",
        gap: "0.8rem",
        alignContent: "center",
        cursor: "pointer",

        "& > svg": {
          width: "2.5rem",
        },
      })}
      onClick={onClick}
    >
      <PlusButtonIcon />
      <div className="add-next-race-text">
        <strong
          className={css({
            display: "block",
            fontSize: "1.1rem",
          })}
        >
          Add next race results
        </strong>
        {raceName}
      </div>
    </div>
  );
}
