import { z } from "zod";

// Base schemas

const MRDataBaseSchema = z.looseObject({
  xmlns: z.string(),
  series: z.string(),
  url: z.string(),
  limit: z.string(),
  offset: z.string(),
  total: z.string(),
});

export const DriverSchema = z.looseObject({
  driverId: z.string(),
  permanentNumber: z.string(),
  code: z.string(),
  url: z.string(),
  givenName: z.string(),
  familyName: z.string(),
  dateOfBirth: z.string(),
  nationality: z.string(),
});

export const ConstructorSchema = z.looseObject({
  constructorId: z.string(),
  url: z.string(),
  name: z.string(),
  nationality: z.string(),
});

const LocationSchema = z.looseObject({
  lat: z.coerce.number(),
  long: z.coerce.number(),
  locality: z.string(),
  country: z.string(),
});

const CircuitSchema = z.looseObject({
  circuitId: z.string(),
  url: z.string(),
  circuitName: z.string(),
  Location: LocationSchema,
});

export const TimeSchema = z.looseObject({
  date: z.string(),
  time: z.string(),
});

export const RaceSchema = z.looseObject({
  season: z.string(),
  round: z.string(),
  raceName: z.string(),
  Circuit: CircuitSchema,
  date: z.string(),
  time: z.string(),
  FirstPractice: TimeSchema,
  Qualifying: TimeSchema,
  SecondPractice: TimeSchema.optional(),
  ThirdPractice: TimeSchema.optional(),
  Sprint: TimeSchema.optional(),
  SprintQualifying: TimeSchema.optional(),
});

export const DriverStandingSchema = z.looseObject({
  position: z.string().optional(),
  positionText: z.string(),
  points: z.string(),
  wins: z.string(),
  Driver: DriverSchema,
  Constructors: z.array(ConstructorSchema),
});

export const ConstructorStandingSchema = z.looseObject({
  position: z.string().optional(),
  positionText: z.string(),
  points: z.string(),
  wins: z.string(),
  Constructor: ConstructorSchema,
});

// Response schemas

export const DriverStandingsResponseSchema = z.object({
  MRData: MRDataBaseSchema.extend({
    StandingsTable: z.looseObject({
      season: z.string(),
      round: z.string(),
      StandingsLists: z.array(
        z.looseObject({
          season: z.string(),
          round: z.string(),
          DriverStandings: z.array(DriverStandingSchema),
        }),
      ),
    }),
  }),
});

export const ConstructorStandingsResponseSchema = z.object({
  MRData: MRDataBaseSchema.extend({
    StandingsTable: z.looseObject({
      season: z.string(),
      round: z.string(),
      StandingsLists: z.array(
        z.looseObject({
          season: z.string(),
          round: z.string(),
          ConstructorStandings: z.array(ConstructorStandingSchema),
        }),
      ),
    }),
  }),
});

export const RaceScheduleResponseSchema = z.object({
  MRData: MRDataBaseSchema.extend({
    RaceTable: z.looseObject({
      season: z.string(),
      Races: z.array(RaceSchema),
    }),
  }),
});

// Inferred types
export type IDriver = z.infer<typeof DriverSchema>;
export type IConstructor = z.infer<typeof ConstructorSchema>;
export type ITime = z.infer<typeof TimeSchema>;
export type IRace = z.infer<typeof RaceSchema>;
export type IDriverStanding = z.infer<typeof DriverStandingSchema>;
export type IConstructorStanding = z.infer<typeof ConstructorStandingSchema>;
export type IDriverStandings = z.infer<typeof DriverStandingsResponseSchema>;
export type IConstructorStandings = z.infer<
  typeof ConstructorStandingsResponseSchema
>;
export type IRaceSchedule = z.infer<typeof RaceScheduleResponseSchema>;
