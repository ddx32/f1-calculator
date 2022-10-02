import { useState } from "react";

import { getStandingsAfterRounds } from "../services/standings";
import {
  IConstructorStanding,
  IDriverStanding,
  IStandingsList,
} from "../types/api";
import { IRaceEvent, IUpcomingRaceResult, RaceType } from "../types/app";
import { Standings } from "./Standings/Standings";
import { UpcomingRaceResultList } from "./UpcomingRaceResults/UpcomingRaceResultList";

type Props = {
  standingsList: IStandingsList;
  driverStandings: IDriverStanding[];
  constructorStandings: IConstructorStanding[];
  raceSchedule: IRaceEvent[];
};

export function StandingsController(props: Props) {
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
    <>
      <UpcomingRaceResultList
        raceSchedule={props.raceSchedule}
        lastRound={lastRound}
        driverStandings={props.driverStandings}
        upcomingRaceResultList={upcomingRaceResultList}
        setUpcomingRaceResultList={setUpcomingRaceResultList}
      />

      <Standings
        lastRound={lastCalculatedRound || lastRound}
        raceSchedule={props.raceSchedule}
        driverStandings={calculatedResults.drivers}
        constructorStandings={calculatedResults.constructors}
      />
    </>
  );
}
