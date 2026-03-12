import { RaceEvent, RaceType } from "../src/types/entities";

const imolaRace = {
  season: "2022",
  round: 4,
  raceName: "Emilia Romagna Grand Prix",
  Circuit: {
    circuitId: "imola",
    url: "http://en.wikipedia.org/wiki/Autodromo_Enzo_e_Dino_Ferrari",
    circuitName: "Autodromo Enzo e Dino Ferrari",
    Location: {
      lat: 44.3439,
      long: 11.7167,
      locality: "Imola",
      country: "Italy",
    },
  },
  date: "2022-04-24",
  time: "13:00:00Z",
  FirstPractice: new Date("2022-04-22T11:30:00Z"),
  Qualifying: new Date("2022-04-22T15:00:00Z"),
  SecondPractice: new Date("2022-04-23T10:30:00Z"),
  Sprint: new Date("2022-04-23T14:30:00Z"),
};

export const sprintRaceEvent: RaceEvent = {
  Race: imolaRace,
  eventType: RaceType.SPRINT_RACE,
  id: "4-s",
};

export const grandPrixEvent: RaceEvent = {
  Race: imolaRace,
  eventType: RaceType.GRAND_PRIX,
  id: "4",
};

/**
 * A schedule with rounds 1-5, where round 4 (Imola) is a sprint weekend.
 * Events are in chronological order (sprint before GP for round 4).
 */
export const sprintWeekendSchedule: RaceEvent[] = [
  {
    Race: {
      season: "2022",
      round: 1,
      raceName: "Bahrain Grand Prix",
      Circuit: {
        circuitId: "bahrain",
        url: "http://en.wikipedia.org/wiki/Bahrain_International_Circuit",
        circuitName: "Bahrain International Circuit",
        Location: {
          lat: 26.0325,
          long: 50.5106,
          locality: "Sakhir",
          country: "Bahrain",
        },
      },
      date: "2022-03-20",
      time: "15:00:00Z",
      FirstPractice: new Date("2022-03-18T12:00:00Z"),
      SecondPractice: new Date("2022-03-18T15:00:00Z"),
      ThirdPractice: new Date("2022-03-19T12:00:00Z"),
      Qualifying: new Date("2022-03-19T15:00:00Z"),
    },
    eventType: RaceType.GRAND_PRIX,
    id: "1",
  },
  {
    Race: {
      season: "2022",
      round: 2,
      raceName: "Saudi Arabian Grand Prix",
      Circuit: {
        circuitId: "jeddah",
        url: "http://en.wikipedia.org/wiki/Jeddah_Street_Circuit",
        circuitName: "Jeddah Corniche Circuit",
        Location: {
          lat: 21.6319,
          long: 39.1044,
          locality: "Jeddah",
          country: "Saudi Arabia",
        },
      },
      date: "2022-03-27",
      time: "17:00:00Z",
      FirstPractice: new Date("2022-03-25T14:00:00Z"),
      SecondPractice: new Date("2022-03-25T17:00:00Z"),
      ThirdPractice: new Date("2022-03-26T14:00:00Z"),
      Qualifying: new Date("2022-03-26T17:00:00Z"),
    },
    eventType: RaceType.GRAND_PRIX,
    id: "2",
  },
  {
    Race: {
      season: "2022",
      round: 3,
      raceName: "Australian Grand Prix",
      Circuit: {
        circuitId: "albert_park",
        url: "http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit",
        circuitName: "Albert Park Grand Prix Circuit",
        Location: {
          lat: -37.8497,
          long: 144.968,
          locality: "Melbourne",
          country: "Australia",
        },
      },
      date: "2022-04-10",
      time: "05:00:00Z",
      FirstPractice: new Date("2022-04-08T03:00:00Z"),
      SecondPractice: new Date("2022-04-08T06:00:00Z"),
      ThirdPractice: new Date("2022-04-09T03:00:00Z"),
      Qualifying: new Date("2022-04-09T06:00:00Z"),
    },
    eventType: RaceType.GRAND_PRIX,
    id: "3",
  },
  sprintRaceEvent,
  grandPrixEvent,
  {
    Race: {
      season: "2022",
      round: 5,
      raceName: "Miami Grand Prix",
      Circuit: {
        circuitId: "miami",
        url: "http://en.wikipedia.org/wiki/Miami_International_Autodrome",
        circuitName: "Miami International Autodrome",
        Location: {
          lat: 25.9581,
          long: -80.2389,
          locality: "Miami",
          country: "USA",
        },
      },
      date: "2022-05-08",
      time: "19:30:00Z",
      FirstPractice: new Date("2022-05-06T18:30:00Z"),
      SecondPractice: new Date("2022-05-06T21:30:00Z"),
      ThirdPractice: new Date("2022-05-07T17:00:00Z"),
      Qualifying: new Date("2022-05-07T20:00:00Z"),
    },
    eventType: RaceType.GRAND_PRIX,
    id: "5",
  },
];
