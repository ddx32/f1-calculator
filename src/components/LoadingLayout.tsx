import { css } from "../../styled-system/css";

export function LoadingLayout() {
  return (
    <>
      <div>
        <div
          className={css({
            width: "30%",
            height: "1.4rem",
            backgroundColor: "thinGray",
            marginBottom: "0.5rem",
            animation: "pulse 1s infinite ease",
          })}
        />
        <div
          className={css({
            height: "4rem",
            backgroundColor: "lightGray",
            animation: "pulse 1s infinite ease",
          })}
        />
      </div>

      <div>
        <div
          className={css({
            width: "30%",
            height: "1.4rem",
            backgroundColor: "thinGray",
            marginBottom: "0.5rem",
            animation: "pulse 1s infinite ease",
          })}
        />
        <div
          className={css({
            height: "1.5rem",
            backgroundColor: "lightGray",
            marginBottom: "0.5rem",
            animation: "pulse 1s infinite ease",
          })}
        />
        <div
          className={css({
            height: "4rem",
            backgroundColor: "darkGray",
            marginBottom: "0.5rem",
            animation: "pulse 1s infinite ease",
          })}
        />
        <div
          className={css({
            height: "4rem",
            backgroundColor: "darkGray",
            marginBottom: "0.5rem",
            animation: "pulse 1s infinite ease",
          })}
        />
      </div>
    </>
  );
}
