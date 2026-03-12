import { create } from "zustand";

import { fetchApi } from "./api/api";
import {
  getEventsSchedule,
  transformConstructorStandings,
  transformDriverStandings,
  transformRaceSchedule,
} from "./api/transforms";
import {
  IConstructorStandings,
  IDriverStandings,
  IRaceSchedule,
} from "./types/api";
import { RaceEvent, RaceTable, StandingsList } from "./types/entities";

interface F1Store {
  driverStandings: StandingsList | undefined;
  constructorStandings: StandingsList | undefined;
  raceSchedule: RaceTable | undefined;
  eventSchedule: RaceEvent[];
  changelog: string | undefined;
  isLoading: boolean;
  isError: boolean;
  fetchAll: () => Promise<void>;
  fetchChangelog: () => Promise<void>;
}

export const useStore = create<F1Store>((set, get) => ({
  driverStandings: undefined,
  constructorStandings: undefined,
  raceSchedule: undefined,
  eventSchedule: [],
  changelog: undefined,
  isLoading: false,
  isError: false,

  fetchAll: async () => {
    if (get().isLoading || get().driverStandings) return;

    set({ isLoading: true, isError: false });

    try {
      const [driverData, constructorData, raceData] = await Promise.all([
        fetchApi<IDriverStandings>("driverStandings"),
        fetchApi<IConstructorStandings>("constructorStandings"),
        fetchApi<IRaceSchedule>("raceSchedule"),
      ]);

      const driverStandings = transformDriverStandings(driverData);
      const constructorStandings =
        transformConstructorStandings(constructorData);
      const raceSchedule = transformRaceSchedule(raceData);
      const eventSchedule = raceSchedule ? getEventsSchedule(raceSchedule) : [];

      set({
        driverStandings,
        constructorStandings,
        raceSchedule,
        eventSchedule,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false, isError: true });
    }
  },

  fetchChangelog: async () => {
    if (get().changelog) return;

    try {
      const response = await fetch("/changelog.md");
      const text = await response.text();
      set({ changelog: text });
    } catch {
      // Changelog is non-critical, silently fail
    }
  },
}));
