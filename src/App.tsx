import "./App.css";

import React, { useEffect, useState } from "react";

import { useConstructorStandings } from "./api/useConstructorStandings";
import { useDriverStandings } from "./api/useDriverStandings";
import { useRaceSchedule } from "./api/useRaceSchedule";
import { LayoutContainer } from "./components/LayoutContainer";
import { IRaceResult } from "./types/api";

function App() {
  const raceSchedule = useRaceSchedule();
  const driverStandings = useDriverStandings();
  const constructorStandings = useConstructorStandings();
  const [raceResults, setRaceResults] = useState<IRaceResult[]>([]);

  useEffect(() => {
    if (driverStandings?.DriverStandings) {
      const raceResult = driverStandings.DriverStandings.map(
        (driverStanding, index) => ({
          Driver: driverStanding.Driver,
          Constructors: driverStanding.Constructors,
          fastestLap: index === 0 || false,
        })
      );
      setRaceResults(raceResult);
    }
  }, [driverStandings]);

  return raceSchedule.length > 0 &&
    driverStandings?.DriverStandings &&
    constructorStandings?.ConstructorStandings &&
    raceResults.length > 0 ? (
    <LayoutContainer
      raceSchedule={raceSchedule}
      standingsList={driverStandings}
      driverStandings={driverStandings.DriverStandings}
      constructorStandings={constructorStandings.ConstructorStandings}
    />
  ) : (
    <div>Loading...</div>
  );
}

export default App;
