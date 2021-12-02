import React, { useState } from "react";
import CurrentStandings from "./components/currentStandings";
import RaceResults from "./components/raceResults";
import driverData from "./data/driverData";
import { getDriverStandings } from "./data/getStandings";
import AfterRaceStandings from "./components/afterRaceStandings";

const driverList = getDriverStandings(driverData).map((driver, index) => ({
  ...driver,
  fastestLap: index === 0,
}));

function App() {
  const [raceResults, setRaceResults] = useState(driverList);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
      <CurrentStandings />
      <RaceResults driverList={raceResults} setRaceResults={setRaceResults} />
      <AfterRaceStandings raceResults={raceResults} />
    </div>
  );
}

export default App;
