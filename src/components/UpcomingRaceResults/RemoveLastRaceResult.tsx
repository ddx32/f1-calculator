import React from "react";

import { css } from "../../../styled-system/css";
import minusButtonSrc from "../../svg/minus-button.svg";

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

        "& > img": {
          width: "1.7rem",
        },
      })}
      onClick={onClick}
    >
      <img src={minusButtonSrc} alt="" />
      <strong>Remove last race results</strong>
    </div>
  );
}
