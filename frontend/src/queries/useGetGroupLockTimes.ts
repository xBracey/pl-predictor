import { useQuery } from "react-query";
import { apiRequest } from "./utils";

export interface LockTime {
  roundNumber: number;
  predictionLockTime: number;
}

export const getGroupLockTimes = async () => {
  return apiRequest<LockTime[]>(`/fixtures/group-locks`, {
    method: "GET",
  });
};

export const useGetGroupLockTimes = () => {
  const query = useQuery(["getGroupLockTimes"], () => getGroupLockTimes(), {
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
    keepPreviousData: true,
  });

  return { ...query, data: query.data || [] };
};
