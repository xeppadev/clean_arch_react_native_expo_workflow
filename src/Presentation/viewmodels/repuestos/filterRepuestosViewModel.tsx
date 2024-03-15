import { useQuery } from "@apollo/client";
import { OBTENER_TODO_REPUESTOS } from "@/src/Data/repositories/repuestos/repuestosrepositorio";

export function useSoloRepuestoViewModel() {
  const { data, loading, error, refetch } = useQuery(OBTENER_TODO_REPUESTOS);

  const repuestos = data?.obtener_todos_los_repuestos.map((item) => {
    return {
      cantidad: item.cantidad,
      id: item.id,
      marca: item.marca,
      producto: item.producto,
      precio : item.precio
    };
  });
  return { repuestos, loading, error, refetch };
}
