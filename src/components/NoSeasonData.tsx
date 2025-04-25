import { css } from "../../styled-system/css";

export function NoSeasonData(props: { children: React.ReactNode }) {
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "1.5rem",
        fontWeight: "bold",
      })}
    >
      {props.children}
    </div>
  );
}
