import { IConstructorStanding, IDriverStanding } from "../src/types/api";

export const driverStandings: IDriverStanding[] = [
  {
    position: 1,
    positionText: "1",
    points: 125,
    wins: 4,
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
  },
  {
    position: 2,
    positionText: "2",
    points: 116,
    wins: 2,
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
  },
  {
    position: 3,
    positionText: "3",
    points: 110,
    wins: 1,
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
  },
  {
    position: 4,
    positionText: "4",
    points: 84,
    wins: 0,
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
  },
  {
    position: 5,
    positionText: "5",
    points: 83,
    wins: 0,
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
  },
];

export const constructorStandings: IConstructorStanding[] = [
  {
    position: 1,
    positionText: "1",
    points: 235,
    wins: 5,
    Constructor: {
      constructorId: "red_bull",
      url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
      name: "Red Bull",
      nationality: "Austrian",
    },
  },
  {
    position: 2,
    positionText: "2",
    points: 199,
    wins: 2,
    Constructor: {
      constructorId: "ferrari",
      url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
      name: "Ferrari",
      nationality: "Italian",
    },
  },
  {
    position: 3,
    positionText: "3",
    points: 134,
    wins: 0,
    Constructor: {
      constructorId: "mercedes",
      url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
      name: "Mercedes",
      nationality: "German",
    },
  },
  {
    position: 4,
    positionText: "4",
    points: 59,
    wins: 0,
    Constructor: {
      constructorId: "mclaren",
      url: "http://en.wikipedia.org/wiki/McLaren",
      name: "McLaren",
      nationality: "British",
    },
  },
  {
    position: 5,
    positionText: "5",
    points: 41,
    wins: 0,
    Constructor: {
      constructorId: "alfa",
      url: "http://en.wikipedia.org/wiki/Alfa_Romeo_in_Formula_One",
      name: "Alfa Romeo",
      nationality: "Swiss",
    },
  },
];
