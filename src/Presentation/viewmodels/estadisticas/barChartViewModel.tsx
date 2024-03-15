import { useQuery } from "@apollo/client";
import { OBTENER_INFO_BARCHART } from "@/src/Data/repositories/estadisticas/estadisticasrepositorio";
import { COLORS } from "@/constants/Colors";

export function useBarChartViewModel(inputDate: string) {
  const { data, loading, error, refetch } = useQuery(OBTENER_INFO_BARCHART, {
    variables: { inputDate },
  });

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const transformedData = data?.grafica_gastos_generales.flatMap((item) => {
    const monthNumber = parseInt(item.mesYear.split('/')[0]) - 1; // Resta 1 porque los arrays en JavaScript empiezan en 0
    const monthName = monthNames[monthNumber];

    return [
      {
        value: item.fact,
        label: monthName,
        spacing: 0,
        labelWidth: 40,
        labelTextStyle: { color: "gray" },
        frontColor: "#E5E7EB",
      },
      {
        value: item.personalTotal,
        spacing: 0,
        frontColor: "#F69009",
      },
      {
        value: item.otros,
        frontColor: COLORS.bluelg,
      },
    ];
  });

  return { data: transformedData, loading, error, refetch }
}