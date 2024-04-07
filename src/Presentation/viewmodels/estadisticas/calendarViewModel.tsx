import { useQuery } from "@apollo/client";
import { GRAFICA_CALENDARIO } from "@/src/Data/repositories/estadisticas/estadisticasrepositorio";

export function useCalendarViewModel() {
  const { data, loading, refetch, error } = useQuery(GRAFICA_CALENDARIO, {
    fetchPolicy: "cache-and-network",
  });

  const transformedData = data?.calendar_grafica.map((item) => ({
    value: Number(item.cantidad) || 0,
    day: item.fecha,
  }));

  return { transformedData, loading, refetch, error };
}
