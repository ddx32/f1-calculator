import { IUpcomingRaceResult } from "../src/types/app";

export const upcomingRaceResults: IUpcomingRaceResult[] = [
  {
    RaceEvent: {
      Race: {
        season: "2022",
        round: 17,
        url: "http://en.wikipedia.org/wiki/2022_Singapore_Grand_Prix",
        raceName: "Singapore Grand Prix",
        Circuit: {
          circuitId: "marina_bay",
          url: "http://en.wikipedia.org/wiki/Marina_Bay_Street_Circuit",
          circuitName: "Marina Bay Street Circuit",
          Location: {
            lat: 1.2914,
            long: 103.864,
            locality: "Marina Bay",
            country: "Singapore",
          },
        },
        date: "2022-10-02",
        time: "12:00:00Z",
        FirstPractice: { date: "2022-09-30", time: "10:00:00Z" },
        SecondPractice: { date: "2022-09-30", time: "13:00:00Z" },
        ThirdPractice: { date: "2022-10-01", time: "10:00:00Z" },
        Qualifying: { date: "2022-10-01", time: "13:00:00Z" },
      },
      eventType: 0,
      id: "17",
    },
    results: [
      {
        Driver: {
          driverId: "max_verstappen",
          permanentNumber: 33,
          code: "VER",
          url: "http://en.wikipedia.org/wiki/Max_Verstappen",
          givenName: "Max",
          familyName: "Verstappen",
          dateOfBirth: "1997-09-30",
          nationality: "Dutch",
        },
        Constructors: [
          {
            constructorId: "red_bull",
            url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
            name: "Red Bull",
            nationality: "Austrian",
          },
        ],
        fastestLap: true,
      },
      {
        Driver: {
          driverId: "leclerc",
          permanentNumber: 16,
          code: "LEC",
          url: "http://en.wikipedia.org/wiki/Charles_Leclerc",
          givenName: "Charles",
          familyName: "Leclerc",
          dateOfBirth: "1997-10-16",
          nationality: "Monegasque",
        },
        Constructors: [
          {
            constructorId: "ferrari",
            url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
            name: "Ferrari",
            nationality: "Italian",
          },
        ],
        fastestLap: false,
      },
      {
        Driver: {
          driverId: "perez",
          permanentNumber: 11,
          code: "PER",
          url: "http://en.wikipedia.org/wiki/Sergio_P%C3%A9rez",
          givenName: "Sergio",
          familyName: "Pérez",
          dateOfBirth: "1990-01-26",
          nationality: "Mexican",
        },
        Constructors: [
          {
            constructorId: "red_bull",
            url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
            name: "Red Bull",
            nationality: "Austrian",
          },
        ],
        fastestLap: false,
      },
      {
        Driver: {
          driverId: "russell",
          permanentNumber: 63,
          code: "RUS",
          url: "http://en.wikipedia.org/wiki/George_Russell_%28racing_driver%29",
          givenName: "George",
          familyName: "Russell",
          dateOfBirth: "1998-02-15",
          nationality: "British",
        },
        Constructors: [
          {
            constructorId: "mercedes",
            url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
            name: "Mercedes",
            nationality: "German",
          },
        ],
        fastestLap: false,
      },
      {
        Driver: {
          driverId: "sainz",
          permanentNumber: 55,
          code: "SAI",
          url: "http://en.wikipedia.org/wiki/Carlos_Sainz_Jr.",
          givenName: "Carlos",
          familyName: "Sainz",
          dateOfBirth: "1994-09-01",
          nationality: "Spanish",
        },
        Constructors: [
          {
            constructorId: "ferrari",
            url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
            name: "Ferrari",
            nationality: "Italian",
          },
        ],
        fastestLap: false,
      },
    ],
  },
  {
    RaceEvent: {
      Race: {
        season: "2022",
        round: 18,
        url: "http://en.wikipedia.org/wiki/2022_Japanese_Grand_Prix",
        raceName: "Japanese Grand Prix",
        Circuit: {
          circuitId: "suzuka",
          url: "http://en.wikipedia.org/wiki/Suzuka_Circuit",
          circuitName: "Suzuka Circuit",
          Location: {
            lat: 34.8431,
            long: 136.541,
            locality: "Suzuka",
            country: "Japan",
          },
        },
        date: "2022-10-09",
        time: "05:00:00Z",
        FirstPractice: { date: "2022-10-07", time: "03:00:00Z" },
        SecondPractice: { date: "2022-10-07", time: "06:00:00Z" },
        ThirdPractice: { date: "2022-10-08", time: "03:00:00Z" },
        Qualifying: { date: "2022-10-08", time: "06:00:00Z" },
      },
      eventType: 0,
      id: "18",
    },
    results: [
      {
        Driver: {
          driverId: "max_verstappen",
          permanentNumber: 33,
          code: "VER",
          url: "http://en.wikipedia.org/wiki/Max_Verstappen",
          givenName: "Max",
          familyName: "Verstappen",
          dateOfBirth: "1997-09-30",
          nationality: "Dutch",
        },
        Constructors: [
          {
            constructorId: "red_bull",
            url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
            name: "Red Bull",
            nationality: "Austrian",
          },
        ],
        fastestLap: true,
      },
      {
        Driver: {
          driverId: "leclerc",
          permanentNumber: 16,
          code: "LEC",
          url: "http://en.wikipedia.org/wiki/Charles_Leclerc",
          givenName: "Charles",
          familyName: "Leclerc",
          dateOfBirth: "1997-10-16",
          nationality: "Monegasque",
        },
        Constructors: [
          {
            constructorId: "ferrari",
            url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
            name: "Ferrari",
            nationality: "Italian",
          },
        ],
        fastestLap: false,
      },
      {
        Driver: {
          driverId: "perez",
          permanentNumber: 11,
          code: "PER",
          url: "http://en.wikipedia.org/wiki/Sergio_P%C3%A9rez",
          givenName: "Sergio",
          familyName: "Pérez",
          dateOfBirth: "1990-01-26",
          nationality: "Mexican",
        },
        Constructors: [
          {
            constructorId: "red_bull",
            url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
            name: "Red Bull",
            nationality: "Austrian",
          },
        ],
        fastestLap: false,
      },
      {
        Driver: {
          driverId: "russell",
          permanentNumber: 63,
          code: "RUS",
          url: "http://en.wikipedia.org/wiki/George_Russell_%28racing_driver%29",
          givenName: "George",
          familyName: "Russell",
          dateOfBirth: "1998-02-15",
          nationality: "British",
        },
        Constructors: [
          {
            constructorId: "mercedes",
            url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
            name: "Mercedes",
            nationality: "German",
          },
        ],
        fastestLap: false,
      },
      {
        Driver: {
          driverId: "sainz",
          permanentNumber: 55,
          code: "SAI",
          url: "http://en.wikipedia.org/wiki/Carlos_Sainz_Jr.",
          givenName: "Carlos",
          familyName: "Sainz",
          dateOfBirth: "1994-09-01",
          nationality: "Spanish",
        },
        Constructors: [
          {
            constructorId: "ferrari",
            url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
            name: "Ferrari",
            nationality: "Italian",
          },
        ],
        fastestLap: false,
      },
    ],
  },
  {
    RaceEvent: {
      Race: {
        season: "2022",
        round: 19,
        url: "http://en.wikipedia.org/wiki/2022_United_States_Grand_Prix",
        raceName: "United States Grand Prix",
        Circuit: {
          circuitId: "americas",
          url: "http://en.wikipedia.org/wiki/Circuit_of_the_Americas",
          circuitName: "Circuit of the Americas",
          Location: {
            lat: 30.1328,
            long: -97.6411,
            locality: "Austin",
            country: "USA",
          },
        },
        date: "2022-10-23",
        time: "19:00:00Z",
        FirstPractice: { date: "2022-10-21", time: "19:00:00Z" },
        SecondPractice: { date: "2022-10-21", time: "22:00:00Z" },
        ThirdPractice: { date: "2022-10-22", time: "19:00:00Z" },
        Qualifying: { date: "2022-10-22", time: "22:00:00Z" },
      },
      eventType: 0,
      id: "19",
    },
    results: [
      {
        Driver: {
          driverId: "max_verstappen",
          permanentNumber: 33,
          code: "VER",
          url: "http://en.wikipedia.org/wiki/Max_Verstappen",
          givenName: "Max",
          familyName: "Verstappen",
          dateOfBirth: "1997-09-30",
          nationality: "Dutch",
        },
        Constructors: [
          {
            constructorId: "red_bull",
            url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
            name: "Red Bull",
            nationality: "Austrian",
          },
        ],
        fastestLap: true,
      },
      {
        Driver: {
          driverId: "leclerc",
          permanentNumber: 16,
          code: "LEC",
          url: "http://en.wikipedia.org/wiki/Charles_Leclerc",
          givenName: "Charles",
          familyName: "Leclerc",
          dateOfBirth: "1997-10-16",
          nationality: "Monegasque",
        },
        Constructors: [
          {
            constructorId: "ferrari",
            url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
            name: "Ferrari",
            nationality: "Italian",
          },
        ],
        fastestLap: false,
      },
      {
        Driver: {
          driverId: "perez",
          permanentNumber: 11,
          code: "PER",
          url: "http://en.wikipedia.org/wiki/Sergio_P%C3%A9rez",
          givenName: "Sergio",
          familyName: "Pérez",
          dateOfBirth: "1990-01-26",
          nationality: "Mexican",
        },
        Constructors: [
          {
            constructorId: "red_bull",
            url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
            name: "Red Bull",
            nationality: "Austrian",
          },
        ],
        fastestLap: false,
      },
      {
        Driver: {
          driverId: "russell",
          permanentNumber: 63,
          code: "RUS",
          url: "http://en.wikipedia.org/wiki/George_Russell_%28racing_driver%29",
          givenName: "George",
          familyName: "Russell",
          dateOfBirth: "1998-02-15",
          nationality: "British",
        },
        Constructors: [
          {
            constructorId: "mercedes",
            url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
            name: "Mercedes",
            nationality: "German",
          },
        ],
        fastestLap: false,
      },
      {
        Driver: {
          driverId: "sainz",
          permanentNumber: 55,
          code: "SAI",
          url: "http://en.wikipedia.org/wiki/Carlos_Sainz_Jr.",
          givenName: "Carlos",
          familyName: "Sainz",
          dateOfBirth: "1994-09-01",
          nationality: "Spanish",
        },
        Constructors: [
          {
            constructorId: "ferrari",
            url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
            name: "Ferrari",
            nationality: "Italian",
          },
        ],
        fastestLap: false,
      },
    ],
  },
];
