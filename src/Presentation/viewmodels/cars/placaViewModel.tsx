// src/presentation/viewModels/PlacaViewModel.ts
import { useQuery } from "@apollo/client";
import { OBTENER_INFO_PLACAS } from "@/src/Data/repositories/cars/autorepositorio";

export function usePlacaViewModel() {
  const { data, loading, error, refetch } = useQuery(OBTENER_INFO_PLACAS, {
    fetchPolicy: "cache-and-network",
  });

  return { data: data?.obtener_info_placas, loading, error, refetch };
}
