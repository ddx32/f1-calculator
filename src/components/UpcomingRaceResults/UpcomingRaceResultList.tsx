import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import { getRemainingEventList } from "../../common/getRemainingEvents";
import { IDriverStanding } from "../../types/api";
import { IRaceEvent, IUpcomingRaceResult, RaceType } from "../../types/app";
import { SectionHeader } from "../common/SectionHeader";
import { AddNextRaceResults } from "./AddNextRaceResults";
import { RemoveLastRaceResult } from "./RemoveLastRaceResult";
import { UpcomingRaceResult } from "./UpcomingRaceResult";

const UpcomingRaceResultListContainer = styled.section`
  margin-bottom: 1rem;
`;

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
  const [currentExpanded, setCurrentExpanded] = useState<number | null>(null);

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
    (index: number) => (result: IUpcomingRaceResult) => {
      const updatedResults = [...upcomingRaceResultList].map(
        (currentResult, currentIndex) => {
          return index === currentIndex ? result : currentResult;
        }
      );
      setUpcomingRaceResultList(updatedResults);
    };

  return (
    <UpcomingRaceResultListContainer>
      <SectionHeader active={true}>Upcoming Races:</SectionHeader>
      {upcomingRaceResultList.length > 0 &&
        upcomingRaceResultList.map((raceResult, index) => (
          <UpcomingRaceResult
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
    </UpcomingRaceResultListContainer>
  );
}
