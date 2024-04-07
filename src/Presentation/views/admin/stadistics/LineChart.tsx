import { Skeleton } from "moti/skeleton";
import { LineChart } from "react-native-gifted-charts";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";

type LinechartProps = {
  ingresosData:
    | {
        value: number;
        dataPointText: string;
        label: string;
      }[]
    | undefined;
  egresosData:
    | {
        value: number;
        dataPointText: string;
        label: string;
      }[]
    | undefined;
  loading: boolean;
  error: any;
};

export default function Linechart({
  ingresosData,
  egresosData,
  loading,
  error,
}: LinechartProps) {
  if (error) {
    return (
      <View style={styles.contentchart}>
        <Text>Error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <Skeleton.Group show={loading}>
      <View style={styles.contentchart}>
        <View style={styles.Viewtitle}>
          <Skeleton colorMode="light">
            <Text style={styles.title}>
              Ingresos vs Egresos(miles de soles)
            </Text>
          </Skeleton>
        </View>
        <Skeleton colorMode="light">
          <LineChart
            data={egresosData}
            data2={ingresosData}
            
            height={260}
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
            textShiftY={1}
            textShiftX={0}
            textFontSize={11}
            curved={true}
            yAxisThickness={0}
            yAxisLabelSuffix={"k"}
            xAxisColor={COLORS.bg}
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
