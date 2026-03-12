import { afterEach, describe, expect, test, vi } from "vitest";

import {
  grandPrixEvent,
  sprintRaceEvent,
  sprintWeekendSchedule,
} from "../../fixtures/sprintWeekend";
import { RaceEvent, RaceType } from "../types/entities";
import { getEventDate } from "./getEventDate";

describe("getEventDate", () => {
  test("returns Sprint date for a sprint race event", () => {
    const result = getEventDate(sprintRaceEvent);
    expect(result).toEqual(new Date("2022-04-23T14:30:00Z"));
  });

  test("returns race date+time for a grand prix event", () => {
    const result = getEventDate(grandPrixEvent);
    expect(result).toEqual(new Date("2022-04-24T13:00:00Z"));
  });

  test("returns undefined for a sprint race event without Sprint date", () => {
    const event: RaceEvent = {
      ...sprintRaceEvent,
      Race: { ...sprintRaceEvent.Race, Sprint: undefined },
    };
    const result = getEventDate(event);
    expect(result).toBeUndefined();
  });

  test("returns undefined for a GP event without date", () => {
    const event: RaceEvent = {
      ...grandPrixEvent,
      Race: { ...grandPrixEvent.Race, date: "" },
    };
    const result = getEventDate(event);
    expect(result).toBeUndefined();
  });

  test("returns undefined for a GP event without time", () => {
    const event: RaceEvent = {
      ...grandPrixEvent,
      Race: { ...grandPrixEvent.Race, time: "" },
    };
    const result = getEventDate(event);
    expect(result).toBeUndefined();
  });
});

describe("lastRoundIndex logic during sprint weekend", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function findLastRound(
    eventSchedule: RaceEvent[],
    standingsRound: number,
    now: Date,
  ) {
    const reversedSchedule = eventSchedule.toReversed();
    const lastRoundIndex = reversedSchedule.findIndex((event) => {
      const eventDate = getEventDate(event);
      return (
        event.Race.round <= standingsRound &&
        eventDate !== undefined &&
        eventDate <= now
      );
    });
    return reversedSchedule[lastRoundIndex];
  }

  test("after sprint only: lastRound is the sprint, not the GP", () => {
    // Between sprint (Apr 23 14:30Z) and GP (Apr 24 13:00Z)
    const now = new Date("2022-04-23T18:00:00Z");
    const lastRound = findLastRound(sprintWeekendSchedule, 4, now);

    expect(lastRound).toBeDefined();
    expect(lastRound.eventType).toBe(RaceType.SPRINT_RACE);
    expect(lastRound.id).toBe("4-s");
  });

  test("after both sprint and GP: lastRound is the GP", () => {
    // After GP (Apr 24 13:00Z)
    const now = new Date("2022-04-24T16:00:00Z");
    const lastRound = findLastRound(sprintWeekendSchedule, 4, now);

    expect(lastRound).toBeDefined();
    expect(lastRound.eventType).toBe(RaceType.GRAND_PRIX);
    expect(lastRound.id).toBe("4");
  });

  test("before any events in the round: no match", () => {
    // Before sprint (Apr 23 14:30Z), standings still at round 3
    const now = new Date("2022-04-22T10:00:00Z");
    const lastRound = findLastRound(sprintWeekendSchedule, 3, now);

    // Round 3 (Australian GP on Apr 10) is in the past, so it should match
    expect(lastRound).toBeDefined();
    expect(lastRound.Race.round).toBe(3);
  });

  test("normal weekend after GP: lastRound is the GP", () => {
    // After Australian GP (Apr 10 05:00Z)
    const now = new Date("2022-04-10T08:00:00Z");
    const lastRound = findLastRound(sprintWeekendSchedule, 3, now);

    expect(lastRound).toBeDefined();
    expect(lastRound.eventType).toBe(RaceType.GRAND_PRIX);
    expect(lastRound.Race.round).toBe(3);
  });

  test("no races yet: returns undefined", () => {
    const now = new Date("2022-01-01T00:00:00Z");
    const lastRound = findLastRound(sprintWeekendSchedule, 0, now);

    expect(lastRound).toBeUndefined();
  });
});
