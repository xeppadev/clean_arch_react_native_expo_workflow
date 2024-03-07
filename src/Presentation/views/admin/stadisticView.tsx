import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,

} from "react-native-gifted-charts";
import CalendarHeatmap from "../../components/calendarHeatmap";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "@/constants/Colors";

export default function StadisticsScreen() {
  const barData = [
    {
      value: 40,
      label: "Jan",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 50, spacing: 0, frontColor: "#F69009" },
    { value: 60, frontColor: COLORS.bluelg },

    {
      value: 50,
      label: "Feb",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 55, spacing: 0, frontColor: "#F69009" },
    { value: 90, frontColor: COLORS.bluelg },
    {
      value: 20,
      label: "Mar",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 40, spacing: 0, frontColor: "#F69009" },
    { value: 60, frontColor: COLORS.bluelg },
    {
      value: 30,
      label: "Apr",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 20, spacing: 0, frontColor: "#F69009" },
    { value: 60, frontColor: COLORS.bluelg },
    {
      value: 40,
      label: "May",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 60, spacing: 0, frontColor: "#F69009" },
    { value: 90, frontColor: COLORS.bluelg },
    {
      value: 65,
      label: "Jun",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 20, spacing: 0, frontColor: "#F69009" },
    { value: 60, frontColor: COLORS.bluelg },
    {
      value: 20,
      label: "Jul",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 20, spacing: 0, frontColor: "#F69009" },
    { value: 60, frontColor: COLORS.bluelg },
    {
      value: 30,
      label: "Aug",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 20, spacing: 0, frontColor: "#F69009" },
    { value: 60, frontColor: COLORS.bluelg },
    {
      value: 40,
      label: "Sep",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 20, spacing: 0, frontColor: "#F69009" },
    { value: 60, frontColor: COLORS.bluelg },
    {
      value: 60,
      label: "Oct",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 20, spacing: 0, frontColor: "#F69009" },
    { value: 60, frontColor: COLORS.bluelg },
    {
      value: 20,
      label: "Nov",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 20, spacing: 0, frontColor: "#F69009" },
    { value: 60, frontColor: COLORS.bluelg },
    {
      value: 30,
      label: "Dec",
      spacing: 0,
      labelWidth: 40,
      labelTextStyle: { color: "gray" },
      frontColor: "#E5E7EB",
    },
    { value: 20, spacing: 0, frontColor: "#F69009" },
    { value: 60, frontColor: COLORS.bluelg },
  ];
  const pieData = [
    { value: 54, color: COLORS.bluelg, text: "54" },
    { value: 40, color: "#06AED4", text: "30" },
    { value: 26, color: "#F69009", text: "26" },
    { value: 39, color: "#D93D32", text: "39" },
    { value: 30, color: "#E5E7EB", text: "30" },
    { value: 40, color: "#5954F0", text: "40" },
  ];
  const lineData = [
    { value: 2, dataPointText: '2k', label: 'Jan' },
    { value: 10, dataPointText: '10k', label: 'Feb' },
    { value: 8, dataPointText: '8k', label: 'Mar' },
    { value: 58, dataPointText: '58k', label: 'Abr' },
    { value: 5.6, dataPointText: '5.6k', label: 'May' },
    { value: 120, dataPointText: '78k', label: 'Jun' },
    { value: 90, dataPointText: '74k', label: 'Jul' },
    { value: 98, dataPointText: '98k', label: 'Ago' },
    { value: 100, dataPointText: '98k', label: 'Sep' },
    { value: 80, dataPointText: '80k', label: 'Oct' },
    { value: 60, dataPointText: '60k', label: 'Nov' },
    { value: 40, dataPointText: '40k', label: 'Dic' },
  ];

  const lineData2 = [
    { value: 8, dataPointText: '8k', label: 'Jan' },
    { value: 20, dataPointText: '20k', label: 'Feb' },
    { value: 18, dataPointText: '18k', label: 'Mar' },
    { value: 40, dataPointText: '40k', label: 'Abr' },
    { value: 36, dataPointText: '36k', label: 'May' },
    { value: 60, dataPointText: '60k', label: 'Jun' },
    { value: 54, dataPointText: '54k', label: 'Jul' },
    { value: 85, dataPointText: '85k', label: 'Ago' },
    { value: 90, dataPointText: '90k', label: 'Sep' },
    { value: 70, dataPointText: '70k', label: 'Oct' },
    { value: 50, dataPointText: '50k', label: 'Nov' },
    { value: 30, dataPointText: '30k', label: 'Dic' },
  ];





  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentchart}>
        <Text style={styles.title}>Gastos Generales</Text>
        <BarChart
          dashGap={5}
          initialSpacing={3}
          data={barData}
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
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#E5E7EB" }]}
            />
            <Text style={styles.legendText}>Facturacion </Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#F69009" }]}
            />
            <Text style={styles.legendText}>Personal</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: COLORS.bluelg }]}
            />
            <Text style={styles.legendText}>Otros</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentchart}>
        <Text style={styles.title}>Ingresos vs Egresos(miles de dolares)</Text>
        <LineChart
          data={lineData}
          data2={lineData2}
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
        <View style={styles.legend}>

          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#F69009" }]}
            />
            <Text style={styles.legendText}>Ingresos</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: COLORS.bluelg }]}
            />
            <Text style={styles.legendText}>Egresos</Text>
          </View>
        </View>
      </View>
      <View style={[styles.contentchart, {}]}>
        <Text style={styles.title}>Repuestos Consumidos</Text>
        <View style={styles.chart}>
          <PieChart
            radius={110}
            textSize={14}
            textBackgroundRadius={40}
            data={pieData}
            strokeWidth={1}
            strokeColor={COLORS.white}
            textColor="white"
          />
        </View>
        <View style={styles.titlemain}>
          <Text style={[styles.subtitle, { color: COLORS.gray2 }]}>
            TOTAL BALANCE
          </Text>
          <Text style={styles.subtitle}>45 Repuestos</Text>
        </View>
        <View style={styles.legend2}>
          <View
            style={[
              styles.legendItem,
              { justifyContent: "space-between", width: "100%" },
            ]}
          >
            <View style={styles.row}>
              <View
                style={[styles.legendColor, { backgroundColor: "#E5E7EB" }]}
              />
              <Text style={styles.legendText}>Pastilla de Freno</Text>
            </View>
            <Text style={styles.legendText}>15 repuestos</Text>
          </View>
          <View
            style={[
              styles.legendItem,
              { justifyContent: "space-between", width: "100%" },
            ]}
          >
            <View style={styles.row}>
              <View
                style={[styles.legendColor, { backgroundColor: "#F69009" }]}
              />
              <Text style={styles.legendText}>Bateria Bosh 42MP</Text>
            </View>
            <Text style={styles.legendText}>18 repuestos</Text>
          </View>
          <View
            style={[
              styles.legendItem,
              { justifyContent: "space-between", width: "100%" },
            ]}
          >
            <View style={styles.row}>
              <View
                style={[styles.legendColor, { backgroundColor: COLORS.bluelg }]}
              />
              <Text style={styles.legendText}>Refrigerante</Text>
            </View>
            <Text style={styles.legendText}>06 repuestos</Text>
          </View>
          <View
            style={[
              styles.legendItem,
              { justifyContent: "space-between", width: "100%" },
            ]}
          >
            <View style={styles.row}>
              <View
                style={[styles.legendColor, { backgroundColor: "#D93D32" }]}
              />
              <Text style={styles.legendText}>Gasolina</Text>
            </View>
            <Text style={styles.legendText}>15 repuestos</Text>
          </View>
          <View
            style={[
              styles.legendItem,
              { justifyContent: "space-between", width: "100%" },
            ]}
          >
            <View style={styles.row}>
              <View
                style={[styles.legendColor, { backgroundColor: "#06AED4" }]}
              />
              <Text style={styles.legendText}>Aceite 15W40</Text>
            </View>
            <Text style={styles.legendText}>10 repuestos</Text>
          </View>
          <View
            style={[
              styles.legendItem,
              { justifyContent: "space-between", width: "100%" },
            ]}
          >
            <View style={styles.row}>
              <View
                style={[styles.legendColor, { backgroundColor: "#5954F0" }]}
              />
              <Text style={styles.legendText}>Otros</Text>
            </View>
            <Text style={styles.legendText}>15 repuestos</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentchart}>
        <Text style={styles.title}>Mantenimientos Realizados</Text>
        <CalendarHeatmap />
       
        
        <View style={styles.legend}>
        <Text style={styles.subtitle}>Numero de{"\n"}Mantenimientos</Text>
         <View style={styles.legendrow}>
          <View style={[styles.legendItem, {flexDirection:"column"}]}>
            <View
              style={[styles.legendColor, { backgroundColor: COLORS.bluelg3, width: 20, height: 20 }]} 
            />
            <Text style={styles.legendText}>1</Text>
          </View>
          <View style={[styles.legendItem, {flexDirection:"column"}]}>
            <View
              style={[styles.legendColor, { backgroundColor: COLORS.bluelg4, width: 20, height: 20 }]}
            />
            <Text style={styles.legendText}></Text>
          </View>
          <View style={[styles.legendItem, {flexDirection:"column"}]}>
            <View
              style={[styles.legendColor, { backgroundColor: COLORS.bluelg ,width: 20, height: 20}]}
            />
            <Text style={styles.legendText}></Text>
          </View>
          <View style={[styles.legendItem, {flexDirection:"column"}]}>
            <View
              style={[styles.legendColor, { backgroundColor: COLORS.blue,width: 20, height: 20 }]}
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
