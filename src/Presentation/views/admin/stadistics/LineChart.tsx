import { Skeleton } from "moti/skeleton";
import { LineChart } from "react-native-gifted-charts";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import { useLineChartViewModel } from "@/src/Presentation/viewmodels/estadisticas/lineChartViewModel";
import { format } from "date-fns";



const nowFormatted = format(new Date(), "yyyy-MM-dd");

export default function Linechart() {
    const { ingresosData, egresosData, loading, error } = useLineChartViewModel(
        nowFormatted
    );

  return (
    <Skeleton.Group show={loading}>
      <View style={styles.contentchart}>
        <View style={styles.Viewtitle}>
          <Skeleton colorMode="light">
            <Text style={styles.title}>
              Ingresos vs Egresos(miles de dolares)
            </Text>
          </Skeleton>
        </View>
        <Skeleton colorMode="light">
          <LineChart
            data={egresosData}
            data2={ingresosData}
            height={250}
            noOfSections={6}
            spacing={44}
            initialSpacing={13}
            color1={COLORS.bluelg}
            color2="#F69009"
            textColor1={COLORS.bluelg}
            textColor2="#F69009"
            dataPointsHeight={6}
            dataPointsWidth={6}
            dataPointsColor1={COLORS.bluelg}
            dataPointsColor2="#F69009"
            textShiftY={-2}
            textShiftX={-5}
            textFontSize={12}
            curved={true}
            yAxisThickness={0}
            yAxisLabelSuffix={"k"}
            xAxisColor={COLORS.bg}
            isAnimated={true}
            rulesType="solid"
            rulesColor={COLORS.bg}
          />
        </Skeleton>
        <View style={styles.legend}>
          <Skeleton colorMode="light">
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#F69009" }]}
              />
              <Text style={styles.legendText}>Ingresos</Text>
            </View>
          </Skeleton>
          <Skeleton colorMode="light">
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: COLORS.bluelg }]}
            />
            <Text style={styles.legendText}>Egresos</Text>
          </View>
          </Skeleton>
        </View>
      </View>
    </Skeleton.Group>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",

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
  barchart: {
    marginTop: 10,
  },
  Viewtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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
});
