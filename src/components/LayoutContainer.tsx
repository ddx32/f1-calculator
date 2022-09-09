import { useState } from "react";

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
import { Standings } from "./Standings/Standings";
import { UpcomingRaceResultList } from "./UpcomingRaceResults/UpcomingRaceResultList";

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
      <header>
        <h1>F1 Championship Calculator</h1>
      </header>
      <div className="content-container">
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
      </div>
    </div>
  );
}
