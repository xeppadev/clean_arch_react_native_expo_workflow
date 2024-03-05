import { useQuery } from "@apollo/client";
import { MANTEN_INFO_ID } from "@/src/Data/repositories/mantenimientos/mantenimientorepositorio";

type mantenimientoInfoPorIdId = string


export function useMantenimientoInfoPorIdViewModel(mantenimientoInfoPorIdId: mantenimientoInfoPorIdId) {
  const { data, loading, error, refetch } = useQuery(MANTEN_INFO_ID, {
    variables: { mantenimientoInfoPorIdId },
  });

  return { data: data?.Mantenimiento_Info_por_ID, loading, error, refetch };
} 