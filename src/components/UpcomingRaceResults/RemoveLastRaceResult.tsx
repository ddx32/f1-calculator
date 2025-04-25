import React from "react";

import { css } from "../../../styled-system/css";
import MinusButton from "../../svg/minus-button.svg?react";

export function RemoveLastRaceResult({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLElement>;
}) {
  return (
    <div
      className={css({
        backgroundColor: "darkGray",
        display: "flex",
        padding: "0.8rem",
        gap: "0.8rem",
        alignContent: "center",
        cursor: "pointer",

        "& > svg": {
          width: "1.7rem",
        },
      })}
      onClick={onClick}
    >
      <MinusButton />
      <strong>Remove last race results</strong>
    </div>
  );
}
