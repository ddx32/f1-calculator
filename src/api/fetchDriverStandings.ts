import { BASE_URL, PATH } from "../constants/apiPaths";
import { IDriverStanding, IStandingsList } from "../types/api";

export function getDriverStandings(
  responseData: any
): IStandingsList | undefined {
  if (responseData?.MRData?.StandingsTable?.StandingsLists?.length <= 0) {
    return;
  }

  const [standingsList] = responseData.MRData.StandingsTable.StandingsLists;
  return {
    ...standingsList,
    round: Number(standingsList.round),
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
}

export async function fetchDriverStandings() {
  const driverStandingsResponse = await fetch(
    `${BASE_URL}/${PATH.driverStandings}`
  );
  const driverStandingsData = await driverStandingsResponse.json();
  return getDriverStandings(driverStandingsData);
}
