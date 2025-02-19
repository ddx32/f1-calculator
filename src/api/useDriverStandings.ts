import { useQuery } from "@tanstack/react-query";

import { IDriverStanding, IDriverStandings } from "../types/api";
import { StandingsList } from "../types/entities";
import { getDriverStandings } from "./api";

function transformDriverStandings(data: IDriverStandings) {
  if (!data?.MRData?.StandingsTable?.StandingsLists?.length) {
    return;
  }

  const [standingsList] = data.MRData.StandingsTable.StandingsLists;

  const driverStandings: StandingsList = {
    ...standingsList,
    round: Number(standingsList?.round),
    DriverStandings: standingsList.DriverStandings.map(
      (standing: IDriverStanding) => ({
        ...standing,
        points: Number(standing.points),
        position: Number(standing.position),
        wins: Number(standing.wins),
        Driver: {
          ...standing.Driver,
          permanentNumber: Number(standing.Driver.permanentNumber),
        },
      })
    ),
  };

  return driverStandings;
}

export function useDriverStandings() {
  const { data, isLoading, isError } = useQuery<IDriverStandings>({
    queryKey: ["driverStandings"],
    queryFn: getDriverStandings,
  });

  const driverStandings = data ? transformDriverStandings(data) : undefined;

  return { driverStandings, isLoading, isError };
}

export function useDefaultRaceResult() {
  const { driverStandings } = useDriverStandings();

  if (!driverStandings?.DriverStandings) {
    return [];
  }

  const raceResult = driverStandings.DriverStandings.map(
    (driverStanding, index) => ({
      Driver: driverStanding.Driver,
      Constructors: driverStanding.Constructors,
      fastestLap: index === 0 || false,
    })
  );

  return raceResult;
}
