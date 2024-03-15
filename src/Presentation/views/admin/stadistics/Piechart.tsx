import { Skeleton } from "moti/skeleton";
import { PieChart } from "react-native-gifted-charts";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import { usePieChartViewModel } from "@/src/Presentation/viewmodels/estadisticas/pieChartViewModel";
import { format } from "date-fns";

const nowFormatted = format(new Date(), "yyyy-MM-dd");

export default function Piechart() {
  const { pieData, loading, error } = usePieChartViewModel(
    nowFormatted,
    1
  );
 
  const data = pieData ? pieData.flat() : [];
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <Skeleton.Group show={loading}>
      <View style={styles.contentchart}>
        <View style={styles.Viewtitle}>
          <Skeleton colorMode="light">
            <Text style={styles.title}>Repuestos Consumidos</Text>
          </Skeleton>
        </View>
        <Skeleton colorMode="light">
          <View style={styles.chart}>
            <PieChart
              radius={110}
              textSize={14}
              textBackgroundRadius={40}
              data={data}
              strokeWidth={1}
              strokeColor={COLORS.white}
              textColor="white"
            />
          </View>
        </Skeleton>

        <View style={styles.titlemain}>
          <Skeleton colorMode="light" width={180}>
            <Text style={[styles.subtitle, { color: COLORS.gray2 }]}>
              TOTAL BALANCE
            </Text>
          </Skeleton>
          <Skeleton colorMode="light" width={140}>
            <Text style={styles.subtitle}> {totalValue} repuestos</Text>
          </Skeleton>
        </View>

        <View style={styles.legend2}>
          {data.map((item, index) => (
            <View
              style={[
                styles.legendItem,
                { justifyContent: "space-between", width: "100%" },
              ]}
                key={index}
            >
              <Skeleton colorMode="light">
                <View style={styles.row} >
                  <View
                    style={[styles.legendColor, { backgroundColor: item.color }]}
                  />
                  <Text style={styles.legendText}>{item.product}</Text>
                </View>
              </Skeleton>
              <Skeleton colorMode="light">
                <Text style={styles.legendText}>{item.text} repuestos</Text>
              </Skeleton>
            </View>
          ))}
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
  chart: {
    alignItems: "center",
    justifyContent: "center",
  },
});
