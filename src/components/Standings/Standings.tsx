import styled from "styled-components";

import { colors } from "../../common/colors";
import { IConstructorStanding, IDriverStanding } from "../../types/api";
import { IRaceEvent, RaceType } from "../../types/app";
import { SectionHeader } from "../common/SectionHeader";
import { ConstructorStandings } from "./ConstructorStandings";
import { DriverStandings } from "./DriverStandings";

const StandingsSection = styled.section``;

const RoundInfo = styled.div`
  background-color: ${colors.lightGray};
  padding: 0.2rem 0.5rem;
  margin-bottom: 0.4rem;

  h3 {
    font-size: 1rem;
    font-weight: normal;
  }
`;

type Props = {
  driverStandings: IDriverStanding[];
  constructorStandings: IConstructorStanding[];
  raceSchedule: IRaceEvent[];
  lastRound: IRaceEvent;
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
    <StandingsSection>
      <SectionHeader active={true}>Calculated standings</SectionHeader>
      <div className="standings-container">
        <RoundInfo>
          <h3 className="last-round">Last Round: {lastRoundTitle}</h3>
        </RoundInfo>

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
    </StandingsSection>
  );
}
