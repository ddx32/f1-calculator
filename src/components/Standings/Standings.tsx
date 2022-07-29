import styled from "styled-components";

import { colors } from "../../common/colors";
import {
  IConstructorStanding,
  IDriverStanding,
  IRaceTable,
} from "../../types/api";
import { StandingsType } from "../../types/app";
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
  round: number;
  driverStandings: IDriverStanding[];
  constructorStandings: IConstructorStanding[];
  raceSchedule: IRaceTable;
  standingsType: StandingsType;
};

export function Standings(props: Props) {
  const lastRound = props.raceSchedule.Races.find(
    (race) => race.round === props.round
  );

  return (
    <section className="standings">
      <SectionHeader active={true}>
        {props.standingsType === StandingsType.CURRENT && "Current standings"}
        {props.standingsType === StandingsType.CALCULATED &&
          "Calculated standings"}
      </SectionHeader>
      <div className="standings-container">
        <RoundInfo>
          <h3 className="last-round">
            Last Round: {lastRound?.season} {lastRound?.raceName} ({props.round}
            /{props.raceSchedule.Races.length})
          </h3>
        </RoundInfo>
        <DriverStandings
          driverStandings={props.driverStandings}
          raceSchedule={props.raceSchedule}
          round={props.round}
        />
        <ConstructorStandings
          constructorStandings={props.constructorStandings}
          raceSchedule={props.raceSchedule}
          round={props.round}
        />
      </div>
    </section>
  );
}
