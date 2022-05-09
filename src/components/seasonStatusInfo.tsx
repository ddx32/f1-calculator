export default function seasonStatusInfo({
  currentSeason,
  remainingDriverPoints,
  remainingConstructorPoints,
  roundsLeft,
  sprintsLeft,
}: {
  currentSeason: number;
  remainingDriverPoints: number;
  remainingConstructorPoints: number;
  roundsLeft: number;
  sprintsLeft: number;
}) {
  return (
    <div style={{ color: "white" }}>
      <h3>Season stats</h3>
      <ul>
        <li>
          The current season is <strong>{currentSeason}</strong>
        </li>
        <li>
          There are {roundsLeft} Grands Prix left and {sprintsLeft} sprint races
          left in the season
        </li>
        <li>
          There is a maximum of <strong>{remainingDriverPoints}</strong> WDC
          points and <strong>{remainingConstructorPoints}</strong> WCC points
          available in the rest of this season
        </li>
      </ul>
    </div>
  );
}
