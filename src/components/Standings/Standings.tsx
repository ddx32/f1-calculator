import styled from "styled-components";

import { colors } from "../../common/colors";
import { IConstructorStanding, IDriverStanding } from "../../types/api";
import { IRaceEvent, StandingsType } from "../../types/app";
import { SectionHeader } from "../common/SectionHeader";
import { ConstructorStandings } from "./ConstructorStandings";
import { DriverStandings } from "./DriverStandings";

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
  standingsType: StandingsType;
};

export function Standings({
  lastRound,
  standingsType,
  raceSchedule,
  driverStandings,
  constructorStandings,
}: Props) {
  return (
    <section className="standings">
      <SectionHeader active={true}>
        {standingsType === StandingsType.CURRENT && "Current standings"}
        {standingsType === StandingsType.CALCULATED && "Calculated standings"}
      </SectionHeader>
      <div className="standings-container">
        <RoundInfo>
          <h3 className="last-round">
            Last Round: {lastRound.Race.season} {lastRound.Race.raceName}
          </h3>
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
    </section>
  );
}
