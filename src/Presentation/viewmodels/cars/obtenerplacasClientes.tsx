import { useQuery } from "@apollo/client";
import { PLACAS_CLIENTES } from "@/src/Data/repositories/cars/autorepositorio";

export function usePlacasClientes() {
  const { data, loading, error, refetch } = useQuery(PLACAS_CLIENTES, {
    fetchPolicy: "cache-and-network",
  });

  return { data: data?.obtener_info_placas_clientes, loading, error, refetch };
}
