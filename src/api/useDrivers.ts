import { useQuery } from "@tanstack/react-query";

import { IDriver } from "../types/api";
import { getDrivers } from "./api";

export function useDrivers() {
  const {
    data: drivers,
    isLoading,
    isError,
  } = useQuery<IDriver[]>({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });

  return { drivers, isLoading, isError };
}
