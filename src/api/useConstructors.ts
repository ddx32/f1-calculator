import { useQuery } from "@tanstack/react-query";

import { IConstructor } from "../types/api";
import { getConstructors } from "./api";

export function useConstructors() {
  const {
    data: constructors,
    isLoading,
    isError,
  } = useQuery<IConstructor[]>({
    queryKey: ["constructors"],
    queryFn: getConstructors,
  });

  return { constructors, isLoading, isError };
}
