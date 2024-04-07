import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import CalendarHeatmap from "@/src/Presentation/components/calendarHeatmap";
import { Skeleton } from "moti/skeleton";
type CalendarGraficaProps = {
  data:
    | {
        value: number;
        day: any;
      }[]
    | undefined;
  loading: boolean;
  error?: any;
};

export default function CalendarGrafica({
  data,
  loading,
  error,
}: CalendarGraficaProps) {
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
        <Skeleton colorMode="light" height={25}>
          <Text style={styles.title}>Mantenimientos Programados</Text>
        </Skeleton>
        <Skeleton colorMode="light">
          <View style={styles.chart}>
            <CalendarHeatmap data={data} />
          </View>
        </Skeleton>
        <View style={styles.legend}>
          <Skeleton colorMode="light">
            <Text style={styles.subtitle}>Numero de{"\n"}Mantenimientos</Text>
          </Skeleton>
          <View style={styles.legendrow}>
            <Skeleton colorMode="light">
              <View style={[styles.legendItem, { flexDirection: "column" }]}>
                <View
                  style={[
                    styles.legendColor,
                    { backgroundColor: COLORS.bluelg3, width: 20, height: 20 },
                  ]}
                />
                <Skeleton colorMode="light">
                  <Text style={styles.legendText}>1</Text>
                </Skeleton>
              </View>
            </Skeleton>
            <Skeleton>
              <View style={[styles.legendItem, { flexDirection: "column" }]}>
                <View
                  style={[
                    styles.legendColor,
                    { backgroundColor: COLORS.bluelg4, width: 20, height: 20 },
                  ]}
                />
                <Skeleton>
                  <Text style={styles.legendText}></Text>
                </Skeleton>
              </View>
            </Skeleton>
            <Skeleton>
              <View style={[styles.legendItem, { flexDirection: "column" }]}>
                <View
                  style={[
                    styles.legendColor,
                    { backgroundColor: COLORS.bluelg, width: 20, height: 20 },
                  ]}
                />
                <Skeleton>
                  <Text style={styles.legendText}></Text>
                </Skeleton>
              </View>
            </Skeleton>
            <Skeleton>
              <View style={[styles.legendItem, { flexDirection: "column" }]}>
                <View
                  style={[
                    styles.legendColor,
                    { backgroundColor: COLORS.blue, width: 20, height: 20 },
                  ]}
                />

                <Text style={styles.legendText}>6</Text>
              </View>
            </Skeleton>
          </View>
        </View>
      </View>
    </Skeleton.Group>
  );
}

const styles = StyleSheet.create({
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
  legendrow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: "auto",
  },
});
