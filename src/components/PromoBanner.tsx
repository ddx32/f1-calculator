import { css } from "../../styled-system/css";

export function PromoBanner() {
  return (
    <div
      className={css({
        padding: "1rem",
        maxWidth: "70rem",
        margin: "auto",
      })}
    >
      <div
        className={css({
          backgroundColor: "darkGray",
          backgroundImage: "url(/cars.jpg)",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          padding: "8.5rem 1rem 1rem",
        })}
      >
        <h2
          className={css({
            fontSize: "1.5rem",
            fontWeight: "bold",
          })}
        >
          F1 Championship Calculator
        </h2>
        <p
          className={css({
            fontWeight: "bold",
            marginBottom: "1rem",
          })}
        >
          Calculate your own F1 championship points and standings.
        </p>

        <p>
          Let the rest of the Formula 1 championship simulation play out the way
          you imagine. Just what is the minimum result a driver needs to stay in
          contention? What is the needed combination of race results to win the
          constructors title? Are you in need of some stats to post on social
          media in the run up to the race weekend? Tinker with the results and
          see how the season might unfold.
        </p>
      </div>
    </div>
  );
}
