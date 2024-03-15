import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import CalendarHeatmap from "../../components/calendarHeatmap";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "@/constants/Colors";
import Barchart from "./stadistics/Barchart";
import Linechart from "./stadistics/LineChart";
import Piechart from "./stadistics/Piechart";
export default function StadisticsScreen() {


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Barchart />
      <Linechart />
      <Piechart />
      
      <View style={styles.contentchart}>
        <Text style={styles.title}>Mantenimientos Realizados</Text>
        <CalendarHeatmap />

        <View style={styles.legend}>
          <Text style={styles.subtitle}>Numero de{"\n"}Mantenimientos</Text>
          <View style={styles.legendrow}>
            <View style={[styles.legendItem, { flexDirection: "column" }]}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: COLORS.bluelg3, width: 20, height: 20 },
                ]}
              />
              <Text style={styles.legendText}>1</Text>
            </View>
            <View style={[styles.legendItem, { flexDirection: "column" }]}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: COLORS.bluelg4, width: 20, height: 20 },
                ]}
              />
              <Text style={styles.legendText}></Text>
            </View>
            <View style={[styles.legendItem, { flexDirection: "column" }]}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: COLORS.bluelg, width: 20, height: 20 },
                ]}
              />
              <Text style={styles.legendText}></Text>
            </View>
            <View style={[styles.legendItem, { flexDirection: "column" }]}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: COLORS.blue, width: 20, height: 20 },
                ]}
              />
              <Text style={styles.legendText}>6</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.bg,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "Inter_500Medium",
  },
  contentchart: {
    backgroundColor: COLORS.white,
    marginHorizontal: 18,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    width: "91%",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 5,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 16,
  },
  chart: {
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
  },
  titlemain: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  legend2: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 10,
  },
  row: { flexDirection: "row", alignItems: "center" },
  legendrow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: "auto",
  },
});
