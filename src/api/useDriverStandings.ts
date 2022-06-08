import { useEffect, useState } from "react";

import { IStandingsList } from "../types/api";
import { fetchDriverStandings } from "./fetchDriverStandings";

export function useDriverStandings() {
  const [driverStandings, setDriverStandings] = useState<
    IStandingsList | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const driverStandings = await fetchDriverStandings();
      setDriverStandings(driverStandings);
    };

    fetchData();
  }, []);

  return driverStandings;
}
