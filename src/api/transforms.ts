import {
  IConstructorStanding,
  IConstructorStandings,
  IDriverStanding,
  IDriverStandings,
  IRace,
  IRaceSchedule,
  ITime,
} from "../types/api";
import {
  RaceEvent,
  RaceTable,
  RaceType,
  StandingsList,
} from "../types/entities";

export function transformDriverStandings(data: IDriverStandings) {
  if (!data?.MRData?.StandingsTable?.StandingsLists?.length) {
    return;
  }

  const [standingsList] = data.MRData.StandingsTable.StandingsLists;

  const driverStandings: StandingsList = {
    ...standingsList,
    round: Number(standingsList?.round),
    DriverStandings: standingsList.DriverStandings.map(
      (standing: IDriverStanding) => ({
        ...standing,
        points: Number(standing.points),
        position: Number(standing.position),
        wins: Number(standing.wins),
        Driver: {
          ...standing.Driver,
          permanentNumber: Number(standing.Driver.permanentNumber),
        },
      }),
    ),
  };

  return driverStandings;
}

export function transformConstructorStandings(data?: IConstructorStandings) {
  if (!data?.MRData?.StandingsTable?.StandingsLists?.length) {
    return;
  }

  const [standingsList] = data.MRData.StandingsTable.StandingsLists;

  const constructorStandings: StandingsList = {
    ...standingsList,
    round: Number(standingsList.round),
    ConstructorStandings: standingsList.ConstructorStandings.map(
      (standing: IConstructorStanding) => ({
        ...standing,
        position: Number(standing.position),
        points: Number(standing.points),
        wins: Number(standing.wins),
      }),
    ),
  };

  return constructorStandings;
}

function dateTimeToDate(dateTime: ITime): Date {
  return new Date(`${dateTime.date}T${dateTime.time}`);
}

export function transformRaceSchedule(
  responseData: IRaceSchedule,
): RaceTable | undefined {
  if (!Array.isArray(responseData?.MRData?.RaceTable?.Races)) {
    return;
  }

  const raceTable = responseData.MRData.RaceTable;

  return {
    ...raceTable,
    season: Number(raceTable.season),
    Races: raceTable.Races.map((race: IRace) => ({
      ...race,
      round: Number(race.round),
      FirstPractice: dateTimeToDate(race.FirstPractice),
      Qualifying: dateTimeToDate(race.Qualifying),
      SecondPractice: race.SecondPractice
        ? dateTimeToDate(race.SecondPractice)
        : undefined,
      ThirdPractice: race.ThirdPractice
        ? dateTimeToDate(race.ThirdPractice)
        : undefined,
      Sprint: race.Sprint ? dateTimeToDate(race.Sprint) : undefined,
      Circuit: {
        ...race.Circuit,
        Location: {
          ...race.Circuit.Location,
          lat: Number(race.Circuit.Location.lat),
          long: Number(race.Circuit.Location.long),
        },
      },
    })),
  };
}

export function getEventsSchedule(raceSchedule: RaceTable): RaceEvent[] {
  return raceSchedule.Races.reduce((eventList: RaceEvent[], current) => {
    const id = current.round.toString();

    if (current.Sprint) {
      eventList.push({
        Race: current,
        eventType: RaceType.SPRINT_RACE,
        id: id + "-s",
      });
    }

    eventList.push({
      Race: current,
      eventType: RaceType.GRAND_PRIX,
      id,
    });
    return eventList;
  }, []);
}
