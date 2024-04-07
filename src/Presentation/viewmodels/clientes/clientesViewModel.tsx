import { useQuery } from "@apollo/client";
import { OBTENER_INFO_CLIENTES } from "@/src/Data/repositories/clientes/clientesrepositorio";

export function useClientesViewModel() {
  const { data, loading, error, refetch } = useQuery(OBTENER_INFO_CLIENTES, {
    fetchPolicy: "cache-and-network",
  });

  return { data: data?.obtener_Todos_Clientes, loading, error, refetch };
}
