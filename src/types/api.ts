interface IMRData {
  xmlns: "";
  series: "f1";
  url: string;
  limit: string;
  offset: string;
  total: string;
}

interface IBase<T = object> {
  MRData: IMRData & T;
}

export interface IDriver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface IConstructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

interface ILocation {
  lat: number;
  long: number;
  locality: string;
  country: string;
}

interface ICircuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: ILocation;
}

export interface ITime {
  date: string;
  time: string;
}

export interface IRace {
  season: string;
  round: string;
  raceName: string;
  Circuit: ICircuit;
  date: string;
  time: string;
  FirstPractice: ITime;
  Qualifying: ITime;
  SecondPractice?: ITime;
  ThirdPractice?: ITime;
  Sprint?: ITime;
  SprintQualifying?: ITime;
}

export interface IDriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: IDriver;
  Constructors: IConstructor[];
}

export interface IConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: IConstructor;
}

interface IDriverStandingsData {
  StandingsTable: {
    season: string;
    round: string;
    StandingsLists: {
      season: string;
      round: string;
      DriverStandings: IDriverStanding[];
    }[];
  };
}

interface IConstructorStandingsData {
  StandingsTable: {
    season: string;
    round: string;
    StandingsLists: {
      season: string;
      round: string;
      ConstructorStandings: IConstructorStanding[];
    }[];
  };
}

interface IRaceScheduleData {
  RaceTable: {
    season: string;
    Races: IRace[];
  };
}

export type IDriverStandings = IBase<IDriverStandingsData>;
export type IConstructorStandings = IBase<IConstructorStandingsData>;
export type IRaceSchedule = IBase<IRaceScheduleData>;
