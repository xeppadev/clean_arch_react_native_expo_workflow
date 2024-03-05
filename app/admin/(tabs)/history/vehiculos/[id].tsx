import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  ActivityIndicator,

} from "react-native";
import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMantenimientoViewModel } from "@/src/Presentation/viewmodels/cars/vehiculosViewModel";
import { format, parse, parseISO } from "date-fns";



export default function Vehiculoid() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, loading, error, refetch } = useMantenimientoViewModel(id as string);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
         <ActivityIndicator size="large" color={COLORS.blue2} />
      </View>
    );
  }
    if (!data) {
    return (
      <View style={styles.center}>
        <Text>Sin datos</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: COLORS.bg2 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.subtitle}>Detalles</Text>
        <View style={styles.column}>
          <View style={[styles.row, { marginBottom: 10 }]}>
            <View style={{ flexDirection: "row" }}>
              <Iconify icon="bxs:car" size={35} color={COLORS.blue2} />
              <Text style={styles.title}>PLACA: {data.placa}</Text>
            </View>
            <View style={styles.row2}>
              <Iconify
                icon="iconoir:star-solid"
                size={25}
                color={COLORS.wellow2}
              />
              <Text style={styles.title}>
                {" "}
                {Number.isInteger(data.Puntaje)
                  ? data.Puntaje + ".0"
                  : data.Puntaje}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Vigencia de SOAT:</Text>
              <Text style={styles.title2}>
                {format(parseISO(data.fechaSoat), "dd/MM/yyyy")}
              </Text>
            </View>
            <View style={[styles.column2, { marginLeft: 20 }]}>
              <Text style={styles.title2}>Vigencia de Contrato:</Text>
              <Text style={styles.title2}>
                {format(parseISO(data.vigenciaContrato), "dd/MM/yyyy")}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Revisión Técnica:</Text>
              <Text style={styles.title2}>
                {
                  data.Mantenimientos?.slice()
                    .sort(
                      (a: { fecha: string }, b: { fecha: string }) =>
                        parseISO(b.fecha).getTime() -
                        parseISO(a.fecha).getTime()
                    )
                    .map((item: { fecha: string }) =>
                      format(parseISO(item.fecha), "dd/MM/yyyy")
                    )[0]
                }
              </Text>
            </View>
            <View style={[styles.column2, { marginLeft: 20 }]}>
              <Text style={styles.title2}>Kilometraje Actual:</Text>
              <Text style={styles.title2}>{data.kmActual}.00 km</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Propietario:</Text>
              <Text style={styles.title2}>{data.propietario}</Text>
            </View>
            <View style={[styles.column2, { marginLeft: 20 }]}>
              <Text style={styles.title2}>Cliente:</Text>
              <Text style={styles.title2}>{data.cliente}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.subtitle}>Historial de Mantenimientos</Text>
        <FlatList
          style={{ paddingTop: 8 }}
          data={data?.Mantenimientos}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={styles.listItem}
                onPress={() =>
                  router.push("/admin/history/mantenimientos/"+item.id)
                }
              >
                <View style={styles.icon}>
                  <Iconify
                    icon="bxs:car-mechanic"
                    size={23}
                    color={COLORS.blue2}
                  />
                </View>
                <View style={styles.dates}>
                  <Text style={styles.listItemTitle}>
                     {item.tipo}
                  </Text>
                  <Text style={styles.listItemTitle}>
                    {item.repuestosUsados} repuestos cambiados
                  </Text>
                </View>
                <View
                  style={[
                    styles.contentstatus,
                    { backgroundColor: COLORS.green2 },
                  ]}
                >
                  <Text
                    style={[styles.listItemStatus, { color: COLORS.green }]}
                  >
                    {format(parseISO(item.fecha), "dd/MM/yyyy")}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    backgroundColor: COLORS.bg2,
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    shadowColor: "#e5e5e5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    marginLeft: 5,
    color: COLORS.bluef,
  },
  title2: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.bluef,
  },
  column2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 10,
  },
  icon: {
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "rgba(11, 29, 91, 0.1)",
    borderRadius: 100,
  },
  dataLengthText: {
    color: COLORS.blue, // Cambia esto al color que quieras para el texto
    fontWeight: "600",
    fontSize: 15,
  },
  dates: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: "auto",
    marginLeft: 5,
  },
  listItemStatus: {
    fontSize: 14,
    color: COLORS.blue,
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
    marginVertical: 2,
    color: COLORS.bluef,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Platform.OS === "ios" ? 12 : 8,
    marginVertical: 5,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: "100%",
  },
  contentstatus: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 7,
  },
  row2: {
    flexDirection: "row",
    marginLeft: Platform.OS === "ios" ? 75 : 80,
    backgroundColor: COLORS.wellowlg,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 9,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
