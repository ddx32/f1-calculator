import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import { getRemainingEventList } from "../../common/getRemainingEvents";
import {
  DriverStanding,
  RaceEvent,
  RaceType,
  UpcomingRaceResult,
} from "../../types/entities";
import { SectionHeader } from "../common/SectionHeader";
import { AddNextRaceResults } from "./AddNextRaceResults";
import { NoUpcomingRaces } from "./NoUpcomingRaces";
import { RemoveLastRaceResult } from "./RemoveLastRaceResult";
import { UpcomingRaceResult as UpcomingRaceResultComponent } from "./UpcomingRaceResult";

const ResultsSection = styled.section``;

type Props = {
  lastRound: RaceEvent;
  raceSchedule: RaceEvent[];
  driverStandings: DriverStanding[];
  upcomingRaceResultList: UpcomingRaceResult[];
  setUpcomingRaceResultList: Dispatch<SetStateAction<UpcomingRaceResult[]>>;
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
  const [currentExpanded, setCurrentExpanded] = useState<number | null>(null);

  const getNextRaceName = () => {
    return `${upcomingRaceEvent.Race.season} ${
      upcomingRaceEvent.Race.raceName
    }${
      upcomingRaceEvent.eventType === RaceType.SPRINT_RACE ? " (Sprint)" : ""
    }`;
  };

  const getRaceResult = (raceEvent: RaceEvent): UpcomingRaceResult => {
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
    setCurrentExpanded(upcomingRaceResultList.length);
  };

  const removeLastRace = () => {
    setUpcomingRaceResultList((prevState) => {
      const updatedList = [...prevState];
      updatedList.pop();
      return updatedList;
    });
  };

  const toggleExpanded = (index: number) => () => {
    const expanded = index === currentExpanded ? null : index;
    setCurrentExpanded(expanded);
  };

  const createSetRaceResultFn =
    (index: number) => (result: UpcomingRaceResult) => {
      const updatedResults = [...upcomingRaceResultList].map(
        (currentResult, currentIndex) => {
          return index === currentIndex ? result : currentResult;
        }
      );
      setUpcomingRaceResultList(updatedResults);
    };

  return (
    <ResultsSection>
      <SectionHeader active={true}>Upcoming Races:</SectionHeader>
      {upcomingRaceResultList.length > 0 &&
        upcomingRaceResultList.map((raceResult, index) => (
          <UpcomingRaceResultComponent
            key={raceResult.RaceEvent.id}
            raceResult={raceResult}
            setRaceResult={createSetRaceResultFn(index)}
            expanded={index === currentExpanded}
            toggleExpanded={toggleExpanded(index)}
          />
        ))}

      {upcomingRaceEvent && (
        <AddNextRaceResults
          raceName={getNextRaceName()}
          onClick={addNextRace}
        />
      )}

      {upcomingRaceResultList.length > 0 && (
        <RemoveLastRaceResult onClick={removeLastRace} />
      )}

      {upcomingRaceResultList.length <= 0 && <NoUpcomingRaces />}
    </ResultsSection>
  );
}
