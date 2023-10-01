import "./App.css";

import { useEffect, useState } from "react";
import styled from "styled-components";

import { useConstructorStandings } from "./api/useConstructorStandings";
import { useDriverStandings } from "./api/useDriverStandings";
import { useRaceSchedule } from "./api/useRaceSchedule";
import { colors } from "./common/colors";
import { Footer } from "./components/Footer";
import { LoadingLayout } from "./components/LoadingLayout";
import { StandingsController } from "./components/StandingsController";
import { IRaceResult } from "./types/api";

const Header = styled.header`
  background-color: ${colors.darkGray};
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid ${colors.lightGray};
  text-align: center;
`;

const ContentContainer = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  max-width: 70rem;
  margin: auto;
`;

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
        }),
      );
      setRaceResults(raceResult);
    }
  }, [driverStandings]);

  return (
    <div className="app-container">
      <Header>
        <h1>F1 Championship Calculator</h1>
      </Header>

      <ContentContainer>
        {raceSchedule.length > 0 &&
        driverStandings?.DriverStandings &&
        constructorStandings?.ConstructorStandings &&
        raceResults.length > 0 ? (
          <StandingsController
            raceSchedule={raceSchedule}
            standingsList={driverStandings}
            driverStandings={driverStandings.DriverStandings}
            constructorStandings={constructorStandings.ConstructorStandings}
          />
        ) : (
          <LoadingLayout />
        )}
      </ContentContainer>

      <Footer />
    </div>
  );
}

export default App;
