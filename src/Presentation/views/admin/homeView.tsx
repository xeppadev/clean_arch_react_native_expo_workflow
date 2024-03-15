import {
  StyleSheet,
  Pressable,
  FlatList,
  Platform,
  ScrollView,
  View,
  Text,
  RefreshControl,
} from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { useHomeMantenimientosViewModel } from "../../viewmodels/mantenimientos/homeManteViewModel";
import CircularProgress from "react-native-circular-progress-indicator";
import { useRouter } from "expo-router";
const nowFormatted = new Date().toISOString();

export default function HomeView() {
   // Define el enrutador para navegar a otras vistas.
  const router = useRouter();
  // Define refeching para el formulario.
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, loading, error, refetch } =
    useHomeMantenimientosViewModel(nowFormatted);
  //onrefetch
  const onRefetch = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      {/* Primera caja en la primera columna: muestra el número de mantenimientos realizados */}
      <Skeleton.Group show={loading}>
        <View
          style={[
            styles.box,
            {
              backgroundColor: COLORS.blue3,
              shadowOpacity: 0.3,
              shadowRadius: 3,
              shadowOffset: { height: 2, width: 0 },
              elevation: 2,
            },
          ]}
        >
          <View style={styles.column}>
            <Skeleton colorMode="light" colors={[COLORS.blue, COLORS.bg]}>
              <Text
                style={[
                  styles.title2,
                  {
                    color: COLORS.white,
                    marginBottom: 5,
                  },
                ]}
              >
                Mantenimientos Completados Actualmente
              </Text>
            </Skeleton>
            <Skeleton colorMode="light" colors={[COLORS.blue, COLORS.bg]}>
              <Pressable
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    alignSelf: "flex-start",
                  },
                  {
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    padding: 6,
                  },
                ]}
                onPress={() => router.push("/admin/calendar")}
              >
                <Text
                  style={{
                    color: COLORS.blue3,
                    fontSize: 14,
                    fontWeight: "500",
                    fontFamily: "Inter_500Medium",
                  }}
                >
                  Ver Actividades
                </Text>
              </Pressable>
            </Skeleton>
          </View>
          <View style={styles.progress}>
            <Skeleton
              colorMode="light"
              colors={[COLORS.blue, COLORS.bg]}
              radius="round"
            >
              <CircularProgress
                key={data?.cantidadTotal}
                value={data?.cantidadCompletada ?? 0}
                maxValue={data?.cantidadTotal ?? 0}
                duration={2000}
                progressValueColor="#ffffff"
                radius={55}
                inActiveStrokeOpacity={0.3}
                inActiveStrokeColor="#ffffff"
                activeStrokeColor="#ffffff"
                valueSuffix={"/" + data?.cantidadTotal ?? 0}
                subtitle="Completos"
                subtitleStyle={{ color: "#ffffff" }}
                valueSuffixStyle={{ fontSize: 14 }}
              />
            </Skeleton>
          </View>
        </View>
      </Skeleton.Group>

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
          contentContainerStyle={{ paddingBottom: 160, flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefetch} />
          }
        >
          {data?.mantenimientos.length == 0 ? (
            <View style={styles.center}>
              <Text style={styles.title2}>No hay mantenimientos</Text>
            </View>
          ) : loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton.Group key={index} show={loading}>
                <View style={styles.listItem}>
                  <Skeleton colorMode="light" radius={50} boxHeight={35}>
                    <View style={styles.icon}>
                      <Iconify
                        icon="bxs:car-mechanic"
                        size={25}
                        color={COLORS.blue2}
                      />
                    </View>
                  </Skeleton>
                  <Skeleton colorMode="light">
                    <View style={styles.dates}>
                      <Text style={styles.listItemTitle}>PLACA:BSD-123</Text>
                      <Text style={styles.listItemStatus}>
                        Mantenimiento Preventivo
                      </Text>
                    </View>
                  </Skeleton>
                  <Skeleton colorMode="light" boxHeight={23}>
                    <View style={[styles.contentstatus]}>
                      <Text style={[styles.listItemStatus]}>Confirmado</Text>
                    </View>
                  </Skeleton>
                </View>
              </Skeleton.Group>
            ))
          ) : (
            data?.mantenimientos.map((item, index) => {
              const texColor =
                item.estado === "completado"|| item.estado === "aprobado"
                  ? { color: COLORS.green, backgroundColor: COLORS.green2 }
                  : item.estado === "pendiente" || item.estado === "revision"
                  ? { color: COLORS.wellow, backgroundColor: COLORS.wellowlg }
                  : item.estado === "programado"
                  ? { color: COLORS.blue2, backgroundColor: COLORS.bluelg2 }
                  : { color: COLORS.red2, backgroundColor: COLORS.red };

              return (
                <View style={styles.listItem} key={index}>
                  <View style={styles.icon}>
                    <Iconify
                      icon="bxs:car-mechanic"
                      size={25}
                      color={COLORS.blue2}
                    />
                  </View>

                  <View style={styles.dates}>
                    <Text style={styles.listItemTitle}>
                      PLACA: {item.placa}
                    </Text>
                    <Text style={styles.listItemStatus}>{item.tipo}</Text>
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
                      {item.estado}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
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
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 15 : 8,
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
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "rgba(11, 29, 91, 0.1)",
    borderRadius: 40,
    marginRight: 10,
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
  center: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
});
