import { css } from "../../../styled-system/css";

export function NoUpcomingRaces() {
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      })}
    >
      No upcoming race events left in this season. Enjoy the break!
    </div>
  );
}
