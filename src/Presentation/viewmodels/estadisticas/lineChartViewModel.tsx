import { useQuery } from "@apollo/client";
import { OBTENER_INFO_LINECHART } from "@/src/Data/repositories/estadisticas/estadisticasrepositorio";

export function useLineChartViewModel(inputDate: string) {
  const { data, loading, error, refetch } = useQuery(OBTENER_INFO_LINECHART, {
    variables: { inputDate },
    fetchPolicy: "cache-and-network",
  });
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const ingresosData = data?.grafica_ingresos_egresos.map((item) => {
    const monthNumber = item.mesYear
      ? parseInt(item.mesYear.split("/")[0]) - 1
      : 0;
    const monthName = monthNames[monthNumber];

    return {
      value: (item.ingresoFact ?? 0) / 1000,
      dataPointText: `${(item.ingresoFact ?? 0) / 1000}k`,
      label: monthName,
    };
  });

  const egresosData = data?.grafica_ingresos_egresos.map((item) => {
    const monthNumber = item.mesYear
      ? parseInt(item.mesYear.split("/")[0]) - 1
      : 0;
    const monthName = monthNames[monthNumber];

    return {
      value: (item.egresosTotalFact ?? 0) / 1000, // Asume que el campo para egresos es egresoFact
      dataPointText: `${(item.egresosTotalFact ?? 0) / 1000}k`, // Asume que el campo para egresos es egresoFact
      label: monthName,
    };
  });

  return { ingresosData, egresosData, loading, error, refetch };
}
