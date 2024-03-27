import {
  StyleSheet,
  FlatList,
  Platform,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";

import { useRepuestoViewModel } from "@/src/Presentation/viewmodels/repuestos/repuestoViewModel";

export default function InventoryPage() {
  const [searchText, setSearchText] = React.useState("");
  const { data, loading, error, refetch } = useRepuestoViewModel();
  const [refreshing, setRefreshing] = React.useState(false);
  // Función para refrescar los datos.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.blue2} />
      </View>
    );
  }
  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Sin datos</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  // Filtra los datos basándose en el texto de búsqueda.
  const filteredData = data.filter((item) =>
    item.producto?.toLowerCase().includes(searchText.toLowerCase())
  );
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Iconify
          icon="prime:search"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          cursorColor={COLORS.blue}
          placeholderTextColor="gray"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>
      <FlatList
        style={{ paddingTop: 8 }}
        data={filteredData}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const containerColor =
            item.cantidad > 5
              ? COLORS.blue
              : item.cantidad > 0
              ? "#D9AA02"
              : "#910C0C";
          const backgroundColor =
            item.cantidad > 5
              ? COLORS.bluelg2
              : item.cantidad > 0
              ? COLORS.wellowlg
              : COLORS.red;
          const cantidad =
            item.cantidad < 10 ? `0${item.cantidad}` : item.cantidad;
          return (
            <View style={styles.listItem}>
              <View style={styles.icon}>
                <Iconify
                  icon="mingcute:tool-fill"
                  size={25}
                  color={COLORS.blue2}
                />
              </View>
              <View style={styles.dates}>
                <Text style={styles.listItemTitle}>{`${capitalizeFirstLetter(
                  item.producto || ""
                )} (${item.marca})`}</Text>
                <Text style={styles.listItemStatus}>ID:{item.id}</Text>
              </View>
              <View
                style={[
                  styles.icon,
                  { backgroundColor: backgroundColor, paddingVertical: 3 },
                ]}
              >
                <Text
                  style={[styles.dataLengthText, { color: containerColor }]}
                >
                  {cantidad}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg,
    paddingHorizontal: 18,

    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 7,
    paddingHorizontal: 10,
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
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "rgba(11, 29, 91, 0.1)",
    borderRadius: 50,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignContent: "center",
    alignItems: "center",
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
    color: COLORS.blue, // Cambia esto al color que quieras para el texto
    fontWeight: "600",
    fontSize: 15,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,

    borderRadius: 12,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 10 : 5,
    paddingLeft: 5,
    paddingBottom: 10,
    color: "#393939",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 10,
  },
});
