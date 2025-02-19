import { useQuery } from "@tanstack/react-query";

import { IConstructorStanding, IConstructorStandings } from "../types/api";
import { StandingsList } from "../types/entities";
import { getConstructorStandings } from "./api";

function transformConstructorStandings(data?: IConstructorStandings) {
  if (!data?.MRData?.StandingsTable?.StandingsLists?.length) {
    return;
  }

  const [standingsList] = data.MRData.StandingsTable.StandingsLists;

  const constructorStandings: StandingsList = {
    ...standingsList,
    round: Number(standingsList.round),
    ConstructorStandings: standingsList.ConstructorStandings.map(
      (standing: IConstructorStanding) => ({
        ...standing,
        position: Number(standing.position),
        points: Number(standing.points),
        wins: Number(standing.wins),
      })
    ),
  };

  return constructorStandings;
}

export function useConstructorStandings() {
  const { data, isLoading, isError } = useQuery<IConstructorStandings>({
    queryKey: ["constructorStandings"],
    queryFn: getConstructorStandings,
  });

  const constructorStandings = transformConstructorStandings(data);

  return { constructorStandings, isLoading, isError };
}
