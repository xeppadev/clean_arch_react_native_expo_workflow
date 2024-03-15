import { useQuery } from "@apollo/client";
import { OBTENER_INFO_LINECHART } from "@/src/Data/repositories/estadisticas/estadisticasrepositorio";


export function useLineChartViewModel(inputDate: string) {
  const { data, loading, error, refetch } = useQuery(OBTENER_INFO_LINECHART, {
    variables: { inputDate },
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
    const monthNumber = parseInt(item.mesYear.split("/")[0]) - 1; // Resta 1 porque los arrays en JavaScript empiezan en 0
    const monthName = monthNames[monthNumber];

    return {
      value: item.ingresoFact / 1000,
      dataPointText: `${item.ingresoFact / 1000}k`,
      label: monthName,
    };
  });

  const egresosData = data?.grafica_ingresos_egresos.map((item) => {
    const monthNumber = parseInt(item.mesYear.split("/")[0]) - 1;
    const monthName = monthNames[monthNumber];

    return {
      value: item.egresosTotalFact / 1000, // Asume que el campo para egresos es egresoFact
      dataPointText: `${item.egresosTotalFact / 1000}k`, // Asume que el campo para egresos es egresoFact
      label: monthName,
    };
  });

  return { ingresosData, egresosData, loading, error, refetch };
}