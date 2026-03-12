import { useState } from "react";

import { getEventDate } from "../common/getEventDate";
import { getStandingsAfterRounds } from "../services/standings";
import { useStore } from "../store";
import { UpcomingRaceResult } from "../types/entities";
import { LoadingLayout } from "./LoadingLayout";
import { NoSeasonData } from "./NoSeasonData";
import { Standings } from "./Standings/Standings";
import { UpcomingRaceResultList } from "./UpcomingRaceResults/UpcomingRaceResultList";

export function StandingsController() {
  const raceSchedule = useStore((s) => s.raceSchedule);
  const eventSchedule = useStore((s) => s.eventSchedule);
  const driverStandings = useStore((s) => s.driverStandings);
  const constructorStandings = useStore((s) => s.constructorStandings);
  const isLoading = useStore((s) => s.isLoading);

  const [upcomingRaceResultList, setUpcomingRaceResultList] = useState<
    UpcomingRaceResult[]
  >([]);
  const hasRequiredData =
    raceSchedule &&
    driverStandings?.DriverStandings &&
    constructorStandings?.ConstructorStandings;

  if (isLoading) {
    return <LoadingLayout />;
  }

  if (!hasRequiredData) {
    return (
      <NoSeasonData>
        There is no data available or the season has not started yet!
      </NoSeasonData>
    );
  }

  const reversedSchedule = eventSchedule.toReversed();

  const now = new Date();
  const lastRoundIndex = reversedSchedule.findIndex((event) => {
    const eventDate = getEventDate(event);
    return (
      event.Race.round <= (driverStandings?.round || 0) &&
      eventDate !== undefined &&
      eventDate <= now
    );
  });

  const lastRound = reversedSchedule[lastRoundIndex];
  const lastCalculatedRound = upcomingRaceResultList.at(-1)?.RaceEvent;
  const calculatedResults = {
    drivers: getStandingsAfterRounds(
      driverStandings.DriverStandings || [],
      upcomingRaceResultList,
    ),
    constructors: getStandingsAfterRounds(
      constructorStandings.ConstructorStandings || [],
      upcomingRaceResultList,
    ),
  };

  return (
    <>
      <UpcomingRaceResultList
        raceSchedule={eventSchedule}
        lastRound={lastRound}
        driverStandings={driverStandings.DriverStandings || []}
        upcomingRaceResultList={upcomingRaceResultList}
        setUpcomingRaceResultList={setUpcomingRaceResultList}
      />

      <Standings
        lastRound={lastCalculatedRound || lastRound}
        raceSchedule={eventSchedule}
        driverStandings={calculatedResults.drivers}
        constructorStandings={calculatedResults.constructors}
      />
    </>
  );
}
