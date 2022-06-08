import { useEffect, useState } from "react";

import { BASE_URL, PATH } from "../constants/apiPaths";
import { IRaceTable } from "../types/api";

export function getRaceSchedule(responseData: any): IRaceTable | undefined {
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

export function useRaceSchedule() {
  const [raceSchedule, setRaceSchedule] = useState<IRaceTable | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const raceScheduleResponse = await fetch(
        `${BASE_URL}/${PATH.raceSchedule}`
      );
      const raceScheduleData = await raceScheduleResponse.json();
      const raceScheduleObject = getRaceSchedule(raceScheduleData);
      setRaceSchedule(raceScheduleObject);
    };

    fetchData();
  }, []);

  return raceSchedule;
}
