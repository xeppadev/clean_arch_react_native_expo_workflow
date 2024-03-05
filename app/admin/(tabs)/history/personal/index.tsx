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
import { usePersonalViewModel } from "@/src/Presentation/viewmodels/personal/datapersonalViewModal";
import { parseISO } from "date-fns";

export default function PesonalScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, loading, error, refetch } = usePersonalViewModel();
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
            {data?.length} usuarios encontrados
          </Text>
        </View>
        <FlatList
          style={{ paddingTop: 8 }}
          data={data}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
           
            return (
              <Pressable
                style={styles.listItem}
                onPress={() =>
                  router.push("/admin/history/personal/" + item._id)
                }
              >
                <View style={styles.icon}>
                  <Iconify
                    icon="fa6-solid:user"
                    size={21}
                    color={COLORS.blue2}
                  />
                </View>
                <View style={styles.dates}>
                  <Text style={styles.listItemTitle}>{item.nombre}</Text>
                  <Text style={styles.listItemStatus}>
                    salario: S/
                    {
                      item.salarioFecha
                        ?.slice()
                        .sort(
                          (a, b) =>
                            parseISO(b!.fecha).getTime() -
                            parseISO(a!.fecha).getTime()
                        )
                        .map((item) => item?.salario)[0]
                    }
                  </Text>
                </View>
                <View
                  style={[
                    styles.contentstatus,
                    { backgroundColor: COLORS.blue },
                  ]}
                >
                  <Text
                    style={[styles.listItemStatus, { color: COLORS.white }]}
                  >
                    {item.numero}
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
    width: "100%",
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
    marginVertical: 2,
  },
  listItemPlate: {
    fontSize: 14,
    color: COLORS.graymodal,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  listItemStatus: {
    fontSize: 14,
    color: COLORS.blue,
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
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "rgba(11, 29, 91, 0.1)",
    borderRadius: 70,
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
    fontFamily: "Inter_500Medium",
    fontSize: 15,
  },
  contentstatus: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 7,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
