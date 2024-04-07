import { useQuery } from "@apollo/client";
import { OBTENER_PERSONAL_ID } from "@/src/Data/repositories/personal/repuestosrepositorio";

export function usePersonalIDViewModel(id: string) {
  const { data, loading, error, refetch } = useQuery(OBTENER_PERSONAL_ID, {
    variables: { obtenerPersonalPorIdId: id },
    fetchPolicy: "cache-and-network",
  });

  return { data: data?.obtener_Personal_Por_Id, loading, error, refetch };
}

