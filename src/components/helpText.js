export default function HelpText() {
  return (
    <div className="help-text">
      <h2>Usage tips</h2>
      <p>
        Use drag and drop to rearrange the next race results in the middle
        column to simulate race results' impact on the championship in the third
        column. Click into the left margin to set a fastest lap of the race.
      </p>
      <p>
        A "🏆" icon signifies a mathematical chance of winning the championship
        title. If only one driver has this icon, the title is secured. This
        currently only works for the WDC and the final calculation only takes
        into account the amount of points and the amount of wins.
      </p>
      <p>
        Source code is{" "}
        <a href="https://github.com/ddx32/f1-calculator">available on GitHub</a>
        . Suggestions, bug reports and pull requests are welcome.
      </p>
      <p>
        This website is not associated by any means with Formula One World
        Championship Limited, Liberty Media, nor FIA. No copyright infringements
        are intended whatsoever.
      </p>
      <p>
        Made by <a href="https://filipruzicka.com/">Filip Růžička</a>.
      </p>
    </div>
  );
}
