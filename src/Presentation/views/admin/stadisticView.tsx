import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { COLORS } from "@/constants/Colors";
import Barchart from "./stadistics/Barchart";
import Linechart from "./stadistics/LineChart";
import Piechart from "./stadistics/Piechart";
import CalendarGrafica from "./stadistics/Calendar";
import React from "react";
import { useCalendarViewModel } from "@/src/Presentation/viewmodels/estadisticas/calendarViewModel";
import { useBarChartViewModel } from "@/src/Presentation/viewmodels/estadisticas/barChartViewModel";
import { useLineChartViewModel } from "@/src/Presentation/viewmodels/estadisticas/lineChartViewModel";
import { usePieChartViewModel } from "@/src/Presentation/viewmodels/estadisticas/pieChartViewModel";
import { format } from "date-fns";
export default function StadisticsScreen() {
  // Define refeching para las graficas calendar
  const [refreshing, setRefreshing] = React.useState(false);
  //Define el estado de la grafica Barchart
  const nowFormatted = format(new Date(), "yyyy-MM-dd");
  const {
    data: dataBarchart,
    loading: loadingBar,
    refetch: refetchBar,
    error: errorBar,
  } = useBarChartViewModel(nowFormatted);
  //Define el estado de la grafica Linechart
  const {
    ingresosData,
    egresosData,
    loading: loadingLinechart,
    error: errorLinechart,
    refetch: refetchLinechart,
  } = useLineChartViewModel(nowFormatted);
  //Define el estado de la grafica Piechart
  const {
    pieData,
    loading: loadingPieChart,
    error: errorPieChart,
    refetch: refetchPieChart,
  } = usePieChartViewModel(nowFormatted, 1);

  const { transformedData, loading, refetch, error } = useCalendarViewModel();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Promise.all([
      refetch(),
      refetchBar(),
      refetchLinechart(),
      refetchPieChart,
    ]).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Barchart data={dataBarchart} loading={loadingBar} error={errorBar} />
      <Linechart
        ingresosData={ingresosData}
        egresosData={egresosData}
        loading={loadingLinechart}
        error={errorLinechart}
      />
      <Piechart
        pieData={pieData}
        loading={loadingPieChart}
        error={errorPieChart}
      />
      <CalendarGrafica data={transformedData} loading={loading} error={error} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.bg,
  },
});
