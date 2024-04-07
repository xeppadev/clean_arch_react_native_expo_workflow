// src/presentation/viewModels/soloplacasViewModel.ts
import { useQuery } from "@apollo/client";
import { OBTENER_PLACAS } from "@/src/Data/repositories/cars/autorepositorio";
export function useSoloPlacasViewModel() {
  const { data, loading, error, refetch } = useQuery(OBTENER_PLACAS, {
    fetchPolicy: "cache-and-network",
  });

  const placas = data?.obtener_info_placas.map((item) => {
    return {
      label: item.placa,
      value: item.placa,
    };
  });
  return { placas, loading, error, refetch };
}
