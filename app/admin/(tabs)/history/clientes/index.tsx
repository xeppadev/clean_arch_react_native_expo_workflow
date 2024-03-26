import {
  StyleSheet,
  Pressable,
  FlatList,
  Platform,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import * as React from "react";
import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { useClientesViewModel } from "@/src/Presentation/viewmodels/clientes/clientesViewModel";
import { differenceInDays, parseISO, parse } from "date-fns";


export default function ClientScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, loading, error, refetch } = useClientesViewModel();
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
  if (data?.length === 0) {
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
        <View style={styles.row}>
          <Text style={styles.dataLengthText}>
            {data?.length} Clientes encontrados
          </Text>
        </View>
        <FlatList
          style={{ paddingTop: 8 }}
          data={data}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            let closestContract = null;
            let closestDaysUntilVigencia = Infinity;
            if (item.contratos) {
              item.contratos.forEach((contrato) => {
                const vigenciaDate = parseISO(contrato?.fechaFin);
                const today = new Date();
                const daysUntilVigencia = differenceInDays(vigenciaDate, today);
                if (daysUntilVigencia < closestDaysUntilVigencia) {
                  closestContract = contrato;
                  closestDaysUntilVigencia = daysUntilVigencia;
                }
              });
            }
          
            let statusText;
            let color;
            let backgroundColor;
            if (closestDaysUntilVigencia < 0) {
              statusText = "Vencido";
              color = COLORS.red2;
              backgroundColor = COLORS.red;
            } else if (closestDaysUntilVigencia < 5) {
              statusText = "Por Vencer";
              color = COLORS.wellow;
              backgroundColor = COLORS.wellowlg;
            } else {
              statusText = "Activo";
              color = COLORS.green;
              backgroundColor = COLORS.green2;
            }
            return (
              <Pressable
                style={styles.listItem}
                onPress={() =>
                  router.push("/admin/history/clientes/" + item._id)
                }
              >
                <View style={styles.icon}>
                  <Iconify
                    icon="solar:shop-2-bold"
                    size={23}
                    color={COLORS.blue2}
                  />
                </View>
                <View style={styles.dates}>
                  <Text style={styles.listItemTitle}>{item.nombreCliente}</Text>
                  <Text style={styles.listItemStatus}>{item.nombre}</Text>
                </View>
                <View
                  style={[
                    styles.contentstatus,
                    { backgroundColor: backgroundColor },
                  ]}
                >
                  <Text
                    style={[styles.listItemStatus, { color: color }]}
                  >
                    {statusText}
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
    backgroundColor: COLORS.bg2,
    paddingHorizontal: 18,
    paddingTop: 9,
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Platform.OS === "ios" ? 12 : 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: "99%",
    shadowColor: "#e5e5e5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
    fontSize: 14,
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
  row: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignContent: "center",
    alignItems: "center",
  },
  actividades: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 15,
  },
  title2: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
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
    // Cambia esto al color que quieras para el texto
    fontWeight: "600",
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  contentstatus: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 7,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
