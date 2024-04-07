import { useQuery } from "@apollo/client";
import { OBTENER_PROPIETARIOS } from "@/src/Data/repositories/cars/autorepositorio";

export function usePropietariosViewModel() {
  const { data, loading, error, refetch } = useQuery(OBTENER_PROPIETARIOS, {
    fetchPolicy: "cache-and-network",
  });

  const propietarios = data?.obtener_info_placas.map((item) => {
    return {
      label: item.propietario,
      value: item.propietario,
    };
  });
  return { propietarios, loading, error, refetch };
}
