import { Skeleton } from "moti/skeleton";
import { BarChart } from "react-native-gifted-charts";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import { useBarChartViewModel } from "@/src/Presentation/viewmodels/estadisticas/barChartViewModel";
import { format } from "date-fns";


const nowFormatted = format(new Date(), "yyyy-MM-dd")

export default function Barchart() {
    const { data, loading, error } = useBarChartViewModel(nowFormatted);
 


  return (
    <Skeleton.Group show={loading}>
      <View style={styles.contentchart}>
        <View style={styles.Viewtitle}>
        <Skeleton colorMode="light" >
          <Text style={styles.title}>Gastos Generales</Text>
        </Skeleton>
        </View>
        <Skeleton colorMode="light">
          <View style={styles.barchart}>
            <BarChart
              dashGap={5}
              initialSpacing={3}
              data={data}
              barWidth={14}
              noOfSections={4}
              barBorderTopLeftRadius={3}
              barBorderTopRightRadius={3}
              yAxisThickness={0}
              rulesType="solid"
              rulesColor={COLORS.bg}
              xAxisColor={COLORS.bg}
              isAnimated={true}
            />
          </View>
        </Skeleton>

        <View style={styles.legend}>
          <Skeleton colorMode="light">
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#E5E7EB" }]}
              />

              <Text style={styles.legendText}>Facturacion </Text>
            </View>
          </Skeleton>
          <Skeleton colorMode="light">
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#F69009" }]}
              />
              <Text style={styles.legendText}>Personal</Text>
            </View>
          </Skeleton>
          <Skeleton colorMode="light">
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: COLORS.bluelg }]}
              />
              <Text style={styles.legendText}>Otros</Text>
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
