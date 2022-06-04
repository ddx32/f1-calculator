import { useEffect, useState } from "react";
import { IConstructorStanding, IStandingsList } from "../constants/types";
import { BASE_URL, PATH } from "../constants/apiPaths";

function getConstructorStandings(
  responseData: any
): IStandingsList | undefined {
  if (responseData?.MRData?.StandingsTable?.StandingsLists.length <= 0) {
    return;
  }

  const [standingsList] = responseData.MRData.StandingsTable.StandingsLists;

  return {
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
}

export function useConstructorStandings() {
  const [constructorStandings, setConstructorStandings] = useState<
    IStandingsList | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const constructorStandingsResponse = await fetch(
        `${BASE_URL}/${PATH.constructorStandings}`
      );
      const constructorStandingsData =
        await constructorStandingsResponse.json();
      const constructorStandingsObject = getConstructorStandings(
        constructorStandingsData
      );
      setConstructorStandings(constructorStandingsObject);
    };

    fetchData();
  }, []);

  return constructorStandings;
}
