import { useState } from "react";

import { useConstructorStandings } from "../api/useConstructorStandings";
import { useDriverStandings } from "../api/useDriverStandings";
import { useRaceSchedule } from "../api/useRaceSchedule";
import { getStandingsAfterRounds } from "../services/standings";
import { RaceType, UpcomingRaceResult } from "../types/entities";
import { LoadingLayout } from "./LoadingLayout";
import { Standings } from "./Standings/Standings";
import { UpcomingRaceResultList } from "./UpcomingRaceResults/UpcomingRaceResultList";

export function StandingsController() {
  const {
    raceSchedule,
    eventSchedule,
    isLoading: isRaceScheduleLoading,
  } = useRaceSchedule();
  const { driverStandings, isLoading: isDriverStandingsLoading } =
    useDriverStandings();
  const { constructorStandings, isLoading: isConstructorStandingsLoading } =
    useConstructorStandings();

  const [upcomingRaceResultList, setUpcomingRaceResultList] = useState<
    UpcomingRaceResult[]
  >([]);

  // Check if any data is loading or if required data is missing
  const isLoading =
    isRaceScheduleLoading ||
    isDriverStandingsLoading ||
    isConstructorStandingsLoading;
  const hasRequiredData =
    raceSchedule &&
    driverStandings?.DriverStandings &&
    constructorStandings?.ConstructorStandings;

  if (isLoading || !hasRequiredData) {
    return <LoadingLayout />;
  }

  const reversedSchedule = eventSchedule.toReversed();

  const lastRoundIndex = reversedSchedule.findIndex((event) => {
    return (
      event.Race.round <= (driverStandings?.round || 0) &&
      event.eventType === RaceType.GRAND_PRIX
    );
  });

  const lastRound = reversedSchedule[lastRoundIndex];
  const lastCalculatedRound = upcomingRaceResultList.at(-1)?.RaceEvent;
  const calculatedResults = {
    drivers: getStandingsAfterRounds(
      driverStandings.DriverStandings || [],
      upcomingRaceResultList
    ),
    constructors: getStandingsAfterRounds(
      constructorStandings.ConstructorStandings || [],
      upcomingRaceResultList
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
