import { useState } from "react";
import styled from "styled-components";

import { getStandingsAfterRounds } from "../services/standings";
import {
  IConstructorStanding,
  IDriverStanding,
  IStandingsList,
} from "../types/api";
import {
  IRaceEvent,
  IUpcomingRaceResult,
  RaceType,
  StandingsType,
} from "../types/app";
import { Footer } from "./Footer";
import { Standings } from "./Standings/Standings";
import { UpcomingRaceResultList } from "./UpcomingRaceResults/UpcomingRaceResultList";

const ContentContainer = styled.div`
  padding: 1rem;
`;

const Header = styled.header`
  background-color: var(--dark-gray);
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid var(--light-gray);
  text-align: center;
`;

type Props = {
  standingsList: IStandingsList;
  driverStandings: IDriverStanding[];
  constructorStandings: IConstructorStanding[];
  raceSchedule: IRaceEvent[];
};

export function LayoutContainer(props: Props) {
  const [upcomingRaceResultList, setUpcomingRaceResultList] = useState<
    IUpcomingRaceResult[]
  >([]);

  const reversedSchedule = [...props.raceSchedule].reverse();

  const lastRoundIndex = reversedSchedule.findIndex((event) => {
    return (
      event.Race.round <= props.standingsList.round &&
      event.eventType === RaceType.GRAND_PRIX
    );
  });

  const lastRound = reversedSchedule[lastRoundIndex];
  const lastCalculatedRound = upcomingRaceResultList.at(-1)?.RaceEvent;
  const calculatedResults = {
    drivers: getStandingsAfterRounds(
      props.driverStandings,
      upcomingRaceResultList
    ),
    constructors: getStandingsAfterRounds(
      props.constructorStandings,
      upcomingRaceResultList
    ),
  };

  return (
    <div className="app-container">
      <Header>
        <h1>F1 Championship Calculator</h1>
      </Header>
      <ContentContainer>
        {lastRound && (
          <Standings
            lastRound={lastRound}
            raceSchedule={props.raceSchedule}
            driverStandings={props.driverStandings}
            constructorStandings={props.constructorStandings}
            standingsType={StandingsType.CURRENT}
          />
        )}

        <UpcomingRaceResultList
          raceSchedule={props.raceSchedule}
          lastRound={lastRound}
          driverStandings={props.driverStandings}
          upcomingRaceResultList={upcomingRaceResultList}
          setUpcomingRaceResultList={setUpcomingRaceResultList}
        />

        {lastCalculatedRound && (
          <Standings
            standingsType={StandingsType.CALCULATED}
            lastRound={lastCalculatedRound}
            raceSchedule={props.raceSchedule}
            driverStandings={calculatedResults.drivers}
            constructorStandings={calculatedResults.constructors}
          />
        )}
      </ContentContainer>

      <Footer />
    </div>
  );
}
