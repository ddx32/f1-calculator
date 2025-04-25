import classNames from "classnames";

import { css } from "../../../styled-system/css";
import ChevronIcon from "../../svg/chevron.svg?react";

const rotated = css({
  transform: "rotate(90deg)",
});

export const Chevron = ({ expanded }: { expanded: boolean }) => (
  <div
    className={css({
      flex: "1.4rem 0 0",
      paddingRight: "0.5rem",
      minHeight: "2rem",
    })}
  >
    <ChevronIcon
      className={classNames(css({ transition: "transform 0.2s ease" }), {
        [rotated]: expanded,
      })}
    />
  </div>
);
