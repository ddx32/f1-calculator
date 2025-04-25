import { ReactNode } from "react";

import { css } from "../../../styled-system/css";

export function SectionHeader({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <h2 className={css({ marginBottom: "0.5rem" })}>
      {children}
      <span className={css({ fontSize: "1.4rem", paddingLeft: "0.5rem" })}>
        {active ? "▾" : "▸"}
      </span>
    </h2>
  );
}
