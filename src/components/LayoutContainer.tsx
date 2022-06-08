import {
  IConstructorStanding,
  IDriverStanding,
  IRaceTable,
  IStandingsList,
} from "../types/api";
import { StandingsType } from "../types/app";
import { Standings } from "./Standings/Standings";

type Props = {
  standingsList: IStandingsList;
  driverStandings: IDriverStanding[];
  constructorStandings: IConstructorStanding[];
  raceSchedule: IRaceTable;
};

export function LayoutContainer(props: Props) {
  return (
    <div className="app-container">
      <header>
        <h1>F1 Championship Calculator</h1>
      </header>
      <div className="content-container">
        <Standings
          round={props.standingsList.round}
          raceSchedule={props.raceSchedule}
          driverStandings={props.driverStandings}
          constructorStandings={props.constructorStandings}
          standingsType={StandingsType.CURRENT}
        />
      </div>
    </div>
  );
}
