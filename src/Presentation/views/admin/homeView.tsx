import {
  StyleSheet,
  Pressable,
  FlatList,
  Platform,
  ScrollView,
  View,
  Text,
} from "react-native";

import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";

import CircularProgress from "react-native-circular-progress-indicator";

const data = [
  { title: "Mantenimiento Correctivo", plate: "IDH-123", status: "Programado" },
  { title: "Mantenimiento Preventivo", plate: "IDH-124", status: "Pendiente" },
  { title: "Mantenimiento Correctivo", plate: "IDH-125", status: "Completado" },
  { title: "Mantenimiento Preventivo", plate: "IDH-126", status: "Programado" },
  { title: "Mantenimiento Correctivo", plate: "IDH-127", status: "Expirado" },
  { title: "Mantenimiento Correctivo", plate: "IDH-127", status: "Pendiente" },
  { title: "Mantenimiento Preventivo", plate: "IDH-128", status: "Completado" },
  { title: "Mantenimiento Correctivo", plate: "IDH-129", status: "Programado" },
  { title: "Mantenimiento Preventivo", plate: "IDH-130", status: "Pendiente" },
  { title: "Mantenimiento Correctivo", plate: "IDH-131", status: "Expirado" },
];

export default function HomeView() {
  return (
    <View style={styles.container} >
      {/* Primera caja en la primera columna: muestra el número de mantenimientos realizados */}

      <View
        style={[
          styles.box,
          {
            backgroundColor: COLORS.blue,
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: { height: 2, width: 0 },
            elevation: 2,
          },
        ]}
      >
        <View style={styles.column}>
          <Text
            style={[
              styles.title2,
              {
                color: COLORS.white,
                marginBottom: 5,
              },
            ]}
          >
            Actividades Completadas Actualmente
          </Text>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                alignSelf: "flex-start",
              },
              { backgroundColor: COLORS.white, borderRadius: 8, padding: 6 },
            ]}
          >
            <Text
              style={{
                color: COLORS.blue,
                fontSize: 14,
                fontWeight: "500",
                fontFamily: "Inter_500Medium",
              }}
            >
              Ver Actividades
            </Text>
          </Pressable>
        </View>
        <View style={styles.progress}>
          <CircularProgress
            key={1}
            value={85}
            maxValue={100}
            duration={2000}
            progressValueColor="#ffffff"
            radius={55}
            inActiveStrokeOpacity={0.3}
            inActiveStrokeColor="#ffffff"
            activeStrokeColor="#ffffff"
            valueSuffix={"%"}
            subtitle=""
            subtitleStyle={{ color: "#ffffff" }}
            valueSuffixStyle={{ fontSize: 14 }}
            
          />
        </View>
      </View>

      {/* Segunda caja en la primera columna: muestra el número de mantenimientos pendientes */}
      <View style={styles.actividades}>
        <View style={styles.row}>
          <Text style={styles.title2}>En Progreso </Text>
          {/* <View style={styles.dataLengthContainer}>
            <Text style={styles.dataLengthText}>{data.length}</Text>
          </View> */}
        </View>
        <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{ paddingBottom: 160}}
        >
          {data.map((item, index) => {
            const texColor =
              item.status === "Completado"
                ? { color: COLORS.green, backgroundColor: COLORS.green2 }
                : item.status === "Pendiente"
                ? { color: COLORS.wellow, backgroundColor: COLORS.wellowlg }
                : item.status === "Programado"
                ? { color: COLORS.blue2, backgroundColor: COLORS.bluelg2 }
                : { color: COLORS.red2, backgroundColor: COLORS.red };

            return (
              <View key={index} style={styles.listItem}>
                <View style={styles.icon}>
                  <Iconify
                    icon="bxs:car-mechanic"
                    size={25}
                    color={COLORS.blue2}
                  />
                </View>
                <View style={styles.dates}>
                  <Text style={styles.listItemTitle}>PLACA: {item.plate}</Text>
                  <Text style={styles.listItemStatus}>{item.title}</Text>
                </View>
                <View
                  style={[
                    styles.contentstatus,
                    { backgroundColor: texColor.backgroundColor },
                  ]}
                >
                  <Text
                    style={[styles.listItemStatus, { color: texColor.color }]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

// Define los estilos utilizados en este componente.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: COLORS.bg,

    padding: 10,
  },
  column: {
    flexDirection: "column",
    backgroundColor: "transparent",
    width: "66%",
    justifyContent: "space-between",
  },
  box: {
    borderRadius: 15,
    marginHorizontal: 10,
    
    flexDirection: "row",

    padding: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",

    alignSelf: "center",
    marginBottom: 35,
  },
  title2: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  progress: {
    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  actividades: {
    padding: 10,
    backgroundColor: COLORS.bg,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 5,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: "100%",
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
    marginVertical: 2,
    color: COLORS.bluef,
  },
  listItemPlate: {
    fontSize: 14,
    color: COLORS.graymodal,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  listItemStatus: {
    fontSize: 13,
    color: COLORS.bluef,
    fontFamily: "Inter_500Medium",
    
  },
  dates: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: "auto",
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "rgba(11, 29, 91, 0.1)",
    borderRadius: 40,
  },
  dataLengthContainer: {
    backgroundColor: "rgba(11, 29, 91, 0.1)", // Cambia esto al color que quieras
    borderRadius: 50, // Esto hará que el fondo sea circular
    width: 26, // Ajusta esto según el tamaño que quieras
    height: 26, // Asegúrate de que el ancho y el alto sean iguales para un círculo perfecto
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5, // Añade un poco de margen si es necesario
  },
  dataLengthText: {
    color: COLORS.blue, // Cambia esto al color que quieras para el texto
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  contentstatus: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 7,
  },
});
