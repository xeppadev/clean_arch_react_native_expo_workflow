import { useQuery } from "@apollo/client";
import { HOME_MANTENIMIENTOS } from "@/src/Data/repositories/mantenimientos/mantenimientorepositorio";

export function useHomeMantenimientosViewModel(fecha: string) {
  const { data, loading, error, refetch } = useQuery(HOME_MANTENIMIENTOS, {
    variables: { fecha },
    fetchPolicy: "cache-and-network"
  });

  return { data: data?.home_admin, loading, error, refetch };
}
