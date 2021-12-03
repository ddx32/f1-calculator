import React, { useState } from "react";
import CurrentStandings from "./components/currentStandings";
import RaceResults from "./components/raceResults";
import driverData from "./data/driverData";
import { getDriverStandings } from "./utils/getStandings";
import AfterRaceStandings from "./components/afterRaceStandings";
import HelpText from "./components/helpText";
import "./App.css";

const driverList = getDriverStandings(driverData).map((driver, index) => ({
  ...driver,
  fastestLap: index === 0,
}));

function App() {
  const [raceResults, setRaceResults] = useState(driverList);

  return (
    <>
      <div className="app-container">
        <CurrentStandings />
        <RaceResults driverList={raceResults} setRaceResults={setRaceResults} />
        <AfterRaceStandings raceResults={raceResults} />
      </div>
      <HelpText />
    </>
  );
}

export default App;
