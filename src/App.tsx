import React, { useEffect, useState } from "react";
import CurrentStandings from "./components/CurrentStandings";
import RaceResults from "./components/RaceResults";
import SeasonStatusInfo from "./components/SeasonStatusInfo";
import AfterRaceStandings from "./components/AfterRaceStandings";
import HelpText from "./components/HelpText";
import "./App.css";
import { useRaceSchedule } from "./api/useRaceSchedule";
import {
  getRemainingDriverPoints,
  getRemainingConstructorsPoints,
} from "./services/pointsCalculations";
import { useDriverStandings } from "./api/useDriverStandings";
import { IRaceResult } from "./constants/types";
import { getRemainingRaces } from "./services/getRemainingRaces";
import { useConstructorStandings } from "./api/useConstructorStandings";

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

  return (
    <>
      {raceSchedule &&
        driverStandings?.DriverStandings &&
        constructorStandings?.ConstructorStandings &&
        raceResults.length > 0 && (
          <div>
            <div className="app-container">
              <CurrentStandings
                standingsList={driverStandings}
                driverStandings={driverStandings.DriverStandings}
                constructorStandings={constructorStandings.ConstructorStandings}
                raceSchedule={raceSchedule}
              />
              <RaceResults
                raceResults={raceResults}
                setRaceResults={setRaceResults}
                raceSchedule={raceSchedule}
                currentRound={driverStandings.round}
              />
              <AfterRaceStandings
                raceResults={raceResults}
                currentDriverStandings={driverStandings.DriverStandings}
                currentConstructorStandings={
                  constructorStandings.ConstructorStandings
                }
                raceSchedule={raceSchedule}
              />
            </div>
            <div style={{ maxWidth: "1400px", margin: "auto" }}>
              <SeasonStatusInfo
                currentSeason={raceSchedule.season}
                remainingDriverPoints={getRemainingDriverPoints(
                  raceSchedule,
                  driverStandings.round
                )}
                remainingConstructorPoints={getRemainingConstructorsPoints(
                  raceSchedule,
                  driverStandings.round
                )}
                roundsLeft={
                  getRemainingRaces(raceSchedule, driverStandings.round)
                    .grandsPrix
                }
                sprintsLeft={
                  getRemainingRaces(raceSchedule, driverStandings.round)
                    .sprintRaces
                }
              />
              <HelpText />
            </div>
          </div>
        )}
    </>
  );
}

export default App;
