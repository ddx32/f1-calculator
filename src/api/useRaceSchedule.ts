import { useQuery } from "@tanstack/react-query";

import { IRace, IRaceSchedule, ITime } from "../types/api";
import { RaceEvent, RaceTable, RaceType } from "../types/entities";
import { getRaceSchedule } from "./api";

function dateTimeToDate(dateTime: ITime): Date {
  return new Date(`${dateTime.date}T${dateTime.time}`);
}

function transformRaceSchedule(
  responseData: IRaceSchedule
): RaceTable | undefined {
  if (!Array.isArray(responseData?.MRData?.RaceTable?.Races)) {
    return;
  }

  const raceTable = responseData.MRData.RaceTable;

  return {
    ...raceTable,
    season: Number(raceTable.season),
    Races: raceTable.Races.map((race: IRace) => ({
      ...race,
      round: Number(race.round),
      FirstPractice: dateTimeToDate(race.FirstPractice),
      Qualifying: dateTimeToDate(race.Qualifying),
      SecondPractice: race.SecondPractice
        ? dateTimeToDate(race.SecondPractice)
        : undefined,
      ThirdPractice: race.ThirdPractice
        ? dateTimeToDate(race.ThirdPractice)
        : undefined,
      Sprint: race.Sprint ? dateTimeToDate(race.Sprint) : undefined,
      Circuit: {
        ...race.Circuit,
        Location: {
          ...race.Circuit.Location,
          lat: Number(race.Circuit.Location.lat),
          long: Number(race.Circuit.Location.long),
        },
      },
    })),
  };
}

function getEventsSchedule(raceSchedule: RaceTable): RaceEvent[] {
  return raceSchedule.Races.reduce((eventList: RaceEvent[], current) => {
    const id = current.round.toString();

    if (current.Sprint) {
      eventList.push({
        Race: current,
        eventType: RaceType.SPRINT_RACE,
        id: id + "-s",
      });
    }

    eventList.push({
      Race: current,
      eventType: RaceType.GRAND_PRIX,
      id,
    });
    return eventList;
  }, []);
}

export function useRaceSchedule() {
  const { data, isLoading } = useQuery<IRaceSchedule>({
    queryKey: ["raceSchedule"],
    queryFn: getRaceSchedule,
  });

  const raceScheduleObject = data ? transformRaceSchedule(data) : undefined;

  const eventSchedule = raceScheduleObject
    ? getEventsSchedule(raceScheduleObject)
    : [];

  return {
    raceSchedule: raceScheduleObject,
    eventSchedule,
    isLoading,
  };
}
