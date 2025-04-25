import { css } from "../../../styled-system/css";

const driverPill = css({
  backgroundColor: "white",
  border: "0.1rem token(colors.black) solid",
  color: "black",
  marginRight: "0.3rem",
  padding: 0,
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export function DriverPill({
  driverCode,
  position,
}: {
  driverCode: string;
  position: number;
}) {
  return (
    <div className={driverPill}>
      <div
        className={css({
          backgroundColor: "thinGray",
          border: "none",
          borderRight: "0.1rem token(colors.black) solid",
          color: "black",
          padding: "0.1rem 0.3rem",
        })}
      >
        {position}
      </div>
      <div
        className={css({
          padding: "0 0.3rem",
        })}
      >
        {driverCode}
      </div>
    </div>
  );
}
