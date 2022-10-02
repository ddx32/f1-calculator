import { useEffect, useState } from "react";

import { BASE_URL, PATH } from "../constants/apiPaths";
import { IRaceTable } from "../types/api";
import { IRaceEvent, RaceType } from "../types/app";

function getRaceSchedule(responseData: any): IRaceTable | undefined {
  if (!Array.isArray(responseData?.MRData?.RaceTable?.Races)) {
    return;
  }

  const raceTable = responseData.MRData.RaceTable;

  return {
    ...raceTable,
    season: Number(raceTable.season),
    Races: raceTable.Races.map((race: any) => ({
      ...race,
      round: Number(race.round),
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

function getEventsSchedule(raceSchedule: IRaceTable): IRaceEvent[] {
  return raceSchedule.Races.reduce((eventList: IRaceEvent[], current) => {
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
  const [raceSchedule, setRaceSchedule] = useState<IRaceEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const raceScheduleResponse = await fetch(
        `${BASE_URL}/${PATH.raceSchedule}`
      );
      const raceScheduleData = await raceScheduleResponse.json();
      const raceScheduleObject = getRaceSchedule(raceScheduleData);
      const eventSchedule = raceScheduleObject
        ? getEventsSchedule(raceScheduleObject)
        : [];
      setRaceSchedule(eventSchedule);
    };

    fetchData();
  }, []);

  return raceSchedule;
}
