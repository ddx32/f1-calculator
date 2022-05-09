import React, { useState } from "react";
import CurrentStandings from "./components/currentStandings";
import RaceResults from "./components/raceResults";
import SeasonStatusInfo from "./components/seasonStatusInfo";
import { drivers } from "./services/standings";
import AfterRaceStandings from "./components/afterRaceStandings";
import HelpText from "./components/helpText";
import "./App.css";
import { DriverEntry } from "./constants/types";
import {
  CURRENT_SEASON,
  ROUNDS_TO_GO,
  SPRINT_RACES_TO_GO,
} from "./constants/championshipRoundsData";
import {
  getRemainingDriverPoints,
  getRemainingConstructorsPoints,
} from "./services/pointsCalculations";

const resultsList = drivers
  .getCurrentStandings()
  .map((driver: DriverEntry, index: number) => ({
    name: driver.name,
    fastestLap: index === 0,
  }));

function App() {
  const [raceResults, setRaceResults] = useState(resultsList);

  return (
    <>
      <div className="app-container">
        <CurrentStandings />
        <RaceResults driverList={raceResults} setRaceResults={setRaceResults} />
        <AfterRaceStandings raceResults={raceResults} />
      </div>
      <SeasonStatusInfo
        currentSeason={CURRENT_SEASON}
        remainingDriverPoints={getRemainingDriverPoints()}
        remainingConstructorPoints={getRemainingConstructorsPoints()}
        roundsLeft={ROUNDS_TO_GO}
        sprintsLeft={SPRINT_RACES_TO_GO}
      />
      <HelpText />
    </>
  );
}

export default App;
