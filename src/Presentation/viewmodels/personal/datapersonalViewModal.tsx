import { useQuery } from "@apollo/client";
import { OBTENER_TODO_PERSONAL } from "@/src/Data/repositories/personal/repuestosrepositorio";

export function usePersonalViewModel() {
  const { data, loading, error, refetch } = useQuery(OBTENER_TODO_PERSONAL, {
    fetchPolicy: "cache-and-network",
  });

  return { data: data?.obtener_Todo_Personal, loading, error, refetch };
}
