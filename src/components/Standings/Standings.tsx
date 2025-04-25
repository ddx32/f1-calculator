import { css } from "../../../styled-system/css";
import {
  ConstructorStanding,
  DriverStanding,
  RaceEvent,
  RaceType,
} from "../../types/entities";
import { SectionHeader } from "../common/SectionHeader";
import { ConstructorStandings } from "./ConstructorStandings";
import { DriverStandings } from "./DriverStandings";

type Props = {
  driverStandings: DriverStanding[];
  constructorStandings: ConstructorStanding[];
  raceSchedule: RaceEvent[];
  lastRound: RaceEvent;
};

export function Standings({
  lastRound,
  raceSchedule,
  driverStandings,
  constructorStandings,
}: Props) {
  const lastRoundTitle = `${lastRound.Race.season} ${lastRound.Race.raceName}${
    lastRound.eventType === RaceType.SPRINT_RACE ? " (Sprint race)" : ""
  }`;

  return (
    <section>
      <SectionHeader active={true}>Calculated standings</SectionHeader>
      <div className="standings-container">
        <div
          className={css({
            backgroundColor: "lightGray",
            padding: "0.2rem 0.5rem",
            marginBottom: "0.4rem",
          })}
        >
          <h3 className={css({ fontSize: "1rem", fontWeight: "normal" })}>
            Last Round: {lastRoundTitle}
          </h3>
        </div>

        <DriverStandings
          driverStandings={driverStandings}
          raceSchedule={raceSchedule}
          lastRound={lastRound}
        />

        <ConstructorStandings
          constructorStandings={constructorStandings}
          raceSchedule={raceSchedule}
          lastRound={lastRound}
        />
      </div>
    </section>
  );
}
