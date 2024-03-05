import { useQuery } from "@apollo/client";
import { OBTENER_TODO_REPUESTOS } from "@/src/Data/repositories/repuestos/repuestosrepositorio";

export function useRepuestoViewModel() {
  const { data, loading, error, refetch } = useQuery(OBTENER_TODO_REPUESTOS);

  return { data: data?.obtener_todos_los_repuestos, loading, error, refetch };
}
