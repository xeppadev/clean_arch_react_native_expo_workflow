import { useQuery } from "@apollo/client";
import { OBTENER_CLIENTE_ID } from "@/src/Data/repositories/clientes/clientesrepositorio";

type clienteId = string;

export function useClientePorIdViewModel(clienteId: clienteId) {
  const { data, loading, error, refetch } = useQuery(OBTENER_CLIENTE_ID, {
    variables: { obtenerClienteIdId: clienteId },
    fetchPolicy: "cache-and-network"
  });

  return { data: data?.obtener_Cliente_ID, loading, error, refetch };
}