import "./App.css";

import { css } from "../styled-system/css";
import { Changelog } from "./changelog/Changelog";
import { Footer } from "./components/Footer";
import { PromoBanner } from "./components/PromoBanner";
import { StandingsController } from "./components/StandingsController";
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
      <div className={contentContainer}>
        <StandingsController />
      </div>

      <PromoBanner />

      <Changelog />

      <Footer />
    </div>
  );
}

export default Main;
