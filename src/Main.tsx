import "./App.css";

import styled from "styled-components";

import { colors } from "./common/colors";
import { Footer } from "./components/Footer";
import { StandingsController } from "./components/StandingsController";

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

function Main() {
  return (
    <div className="app-container">
      <Header>
        <h1>F1 Championship Calculator</h1>
      </Header>

      <ContentContainer>
        <StandingsController />
      </ContentContainer>

      <Footer />
    </div>
  );
}

export default Main;
