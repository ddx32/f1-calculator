import { Dispatch, SetStateAction } from "react";

import { getRemainingEventList } from "../../common/getRemainingEvents";
import { IDriverStanding } from "../../types/api";
import { IRaceEvent, IUpcomingRaceResult, RaceType } from "../../types/app";
import { SectionHeader } from "../common/SectionHeader";
import { AddNextRaceResults } from "./AddNextRaceResults";
import { UpcomingRaceResult } from "./UpcomingRaceResult";

type Props = {
  lastRound: IRaceEvent;
  raceSchedule: IRaceEvent[];
  driverStandings: IDriverStanding[];
  upcomingRaceResultList: IUpcomingRaceResult[];
  setUpcomingRaceResultList: Dispatch<SetStateAction<IUpcomingRaceResult[]>>;
};

export function UpcomingRaceResultList({
  lastRound,
  raceSchedule,
  driverStandings,
  upcomingRaceResultList,
  setUpcomingRaceResultList,
}: Props) {
  const previousEvent = upcomingRaceResultList.at(-1)?.RaceEvent || lastRound;
  const upcomingRaceEvent = getRemainingEventList(
    raceSchedule,
    previousEvent
  )[0];

  const getNextRaceName = () => {
    return `${upcomingRaceEvent.Race.season} ${
      upcomingRaceEvent.Race.raceName
    }${
      upcomingRaceEvent.eventType === RaceType.SPRINT_RACE ? " (Sprint)" : ""
    }`;
  };

  const getRaceResult = (raceEvent: IRaceEvent): IUpcomingRaceResult => {
    return {
      RaceEvent: raceEvent,
      results: driverStandings.map((standing, index) => ({
        Driver: standing.Driver,
        Constructors: standing.Constructors,
        fastestLap: index === 0,
      })),
    };
  };

  const addNextRace = () => {
    const nextRaceResult = getRaceResult(upcomingRaceEvent);
    setUpcomingRaceResultList((prevState) => [...prevState, nextRaceResult]);
  };

  return (
    <div>
      <SectionHeader active={true}>Upcoming Races:</SectionHeader>
      {upcomingRaceResultList.length > 0 &&
        upcomingRaceResultList.map((raceResult) => (
          <UpcomingRaceResult
            key={raceResult.RaceEvent.id}
            raceResult={raceResult}
          />
        ))}
      {upcomingRaceEvent && (
        <AddNextRaceResults
          raceName={getNextRaceName()}
          onClick={addNextRace}
        />
      )}
    </div>
  );
}