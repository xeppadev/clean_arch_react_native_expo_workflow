import { useQuery } from "@apollo/client";
import { OBTENER_SOLO_CLIENTES } from "@/src/Data/repositories/clientes/clientesrepositorio";

export function useSoloClientesViewModel() {
  const { data, loading, error, refetch } = useQuery(OBTENER_SOLO_CLIENTES);

  const clientes = data?.obtener_Todos_Clientes.map((item) => {
    return {
      label: item.nombreCliente,
      value: item.nombreCliente,
    };
  })
    return { clientes, loading, error, refetch };
}
