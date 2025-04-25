import { ReactNode } from "react";

import { css } from "../../../styled-system/css";

export function StandingsContainer({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        backgroundColor: "darkGray",
        color: "white",
        padding: "0.4rem",
        marginBottom: "0.4rem",
      })}
    >
      {children}
    </div>
  );
}

export function StandingsHeader({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",

        "& > .summary-container": {
          flex: "auto 0 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },

        "& > h2": {
          marginBottom: "0.3rem",
        },
      })}
    >
      {children}
    </div>
  );
}

export function ResultsTable({ children }: { children: ReactNode }) {
  return (
    <table
      className={css({
        width: "100%",
        "& th": {
          textAlign: "left",
        },
      })}
    >
      {children}
    </table>
  );
}

export function ShortList({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        display: "flex",
        marginBottom: "0.3rem",
      })}
    >
      {children}
    </div>
  );
}
