import "./App.css";

import { css } from "../styled-system/css";
import { Footer } from "./components/Footer";
import { StandingsController } from "./components/StandingsController";

const header = css({
  backgroundColor: "darkGray",
  padding: "0.8rem",
  marginBottom: "0.5rem",
  borderBottom: "2px solid lightGray",
  textAlign: "center",
});

const contentContainer = css({
  padding: "1rem",
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
  maxWidth: "70rem",
  margin: "auto",
});

function Main() {
  return (
    <div className="app-container">
      <header className={header}>
        <h1>F1 Championship Calculator</h1>
      </header>

      <div className={contentContainer}>
        <StandingsController />
      </div>

      <Footer />
    </div>
  );
}

export default Main;
