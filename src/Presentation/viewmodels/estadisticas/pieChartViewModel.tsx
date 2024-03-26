import { useQuery } from "@apollo/client";
import { OBTENER_INFO_PIECHART } from "@/src/Data/repositories/estadisticas/estadisticasrepositorio";
import { COLORS } from "@/constants/Colors";

export function usePieChartViewModel(startDate: string, months: number) {
  const { data, loading, error, refetch } = useQuery(OBTENER_INFO_PIECHART, {
    variables: { startDate, months },
  });

  const pieData = data?.grafica_repuesto_xmeses.map((item) => {
    return [
    {
      value: item.prod1?.cantidadConsumida ?? 0,
      color: COLORS.bluelg,
      text: `${item.prod1?.cantidadConsumida ?? 0}`,
      product: item.prod1?.producto ?? "",
    },
    {
      value: item.prod2?.cantidadConsumida ?? 0,
      color: "#06AED4",
      text: `${item.prod2?.cantidadConsumida ?? 0}`,
      product: item.prod2?.producto ?? "",
    },
    {
      value: item.prod3?.cantidadConsumida ?? 0,
      color: "#F69009",
      text: `${item.prod3?.cantidadConsumida ?? 0}`,
        product: item.prod3?.producto ?? "",
    },
    {
      value: item.prod4?.cantidadConsumida ?? 0,
      color: "#D93D32",
      text: `${item.prod4?.cantidadConsumida ?? 0}`,
        product: item.prod4?.producto ?? "",
    },
    {
      value: item.prod5?.cantidadConsumida ?? 0,
      color: "#E5E7EB",
      text: `${item.prod5?.cantidadConsumida ?? 0}`,
        product: item.prod5?.producto ?? "",
    },
    {
      value: item.otros?.cantidadConsumida ?? 0,
      color: "#5954F0",
      text: `${item.otros?.cantidadConsumida ?? 0}`,
        product: item.otros?.producto ?? "",
    }
    ];
    
  });

  
  return { pieData, loading, error, refetch };
}