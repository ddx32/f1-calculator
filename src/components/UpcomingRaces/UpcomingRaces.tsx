import { useState } from "react";

import { IDriverStanding, IRaceTable } from "../../types/api";
import { IRaceEvent, IUpcomingRaceResults } from "../../types/app";
import { SectionHeader } from "../common/SectionHeader";
import { AddNextRaceResults } from "./AddNextRaceResults";
import { UpcomingRace } from "./UpcomingRace";

type Props = {
  round: number;
  raceSchedule: IRaceTable;
  driverStandings: IDriverStanding[];
};

export function UpcomingRaces({ round, raceSchedule, driverStandings }: Props) {
  const [upcomingRaces, setUpcomingRaces] = useState<IUpcomingRaceResults[]>(
    []
  );
  const upcomingEventsSchedule = raceSchedule.Races.filter(
    (race) => race.round > round
  ).reduce((acc: IRaceEvent[], current) => {
    if (current.Sprint) {
      acc.push({
        Race: current,
        isSprintRace: true,
      });
    }

    acc.push({
      Race: current,
      isSprintRace: false,
    });
    return acc;
  }, []);

  const getNextRaceName = () => {
    const raceEvent = upcomingEventsSchedule[upcomingRaces.length];
    return `${raceEvent.Race.season} ${raceEvent.Race.raceName}${
      raceEvent.isSprintRace ? " (Sprint)" : ""
    }`;
  };

  const getRaceResult = (raceEvent: IRaceEvent): IUpcomingRaceResults => {
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
    const nextRaceEvent = upcomingEventsSchedule[upcomingRaces.length];
    const nextRaceResult = getRaceResult(nextRaceEvent);
    setUpcomingRaces((prevState) => [...prevState, nextRaceResult]);
  };

  return (
    <div>
      <SectionHeader active={true}>Upcoming Races:</SectionHeader>
      {upcomingRaces.length > 0 &&
        upcomingRaces.map((raceResult) => (
          <UpcomingRace raceResult={raceResult} />
        ))}
      {upcomingRaces.length < upcomingEventsSchedule.length && (
        <AddNextRaceResults
          raceName={getNextRaceName()}
          onClick={addNextRace}
        />
      )}
    </div>
  );
}
