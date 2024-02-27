import {
  StyleSheet,
  Pressable,
  FlatList,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { Text, View } from "@/components/Themed";

const data = [
  {
    repuesto: "Refrigerante",
    marca: "marca",
    codigo: "323214",
    status: "Mal estado",
    cantidad: 2,
  },
  {
    repuesto: "Luz de Freno",
    marca: "marca",
    codigo: "5424324",
    status: "Buen estado",
    cantidad: 7,
  },
  {
    repuesto: "Pastillas de Frenos",
    marca: "marca",
    codigo: "9080935",
    status: "Mal estado",
    cantidad: 9,
  },
  {
    repuesto: "Refrigerante",
    marca: "marca",
    codigo: "4754654",
    status: "Revision",
    cantidad: 12,
  },
  {
    repuesto: "Tambor",
    marca: "marca",
    codigo: "645656",
    status: "Buen estado",
    cantidad: 5,
  },
  {
    repuesto: "Repuesto 1",
    marca: "marca",
    codigo: "53456",
    status: "Buen estado",
    cantidad: 12,
  },
  {
    repuesto: "Repuesto 2",
    marca: "marca",
    codigo: "234523",
    status: "Revision",
    cantidad: 5,
  },
  {
    repuesto: "Repuesto 3",
    marca: "marca",
    codigo: "121434",
    status: "Mal estado",
    cantidad: 4,
  },
  {
    repuesto: "Repuesto 4",
    marca: "marca",
    codigo: "652542",
    status: "Revision",
    cantidad: 1,
  },
  {
    repuesto: "Repuesto 5",
    marca: "marca",
    codigo: "1234354",
    status: "Revision",
    cantidad: 0,
  },
];
export default function RepuestosScreen() {
  const [searchText, setSearchText] = React.useState("");

  // Filtra los datos basándose en el texto de búsqueda.
  const filteredData = data.filter((item) =>
    item.repuesto.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: COLORS.bg2 }}
    >
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
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
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
                  <Text
                    style={styles.listItemTitle}
                  >{`${item.repuesto} (${item.marca})`}</Text>
                  <Text style={styles.listItemStatus}>ID:{item.codigo}</Text>
                </View>
                <View
                  style={[
                    styles.icon,
                    { backgroundColor: backgroundColor, width: 30, height: 30 },
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg2,
    paddingHorizontal: 15,
    paddingTop: 8,
    flex: 1,
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
    padding: 5,
    backgroundColor: "rgba(11, 29, 91, 0.1)",
    borderRadius: 100,
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
    paddingVertical: Platform.OS === "ios" ? 10 : 7,
    paddingLeft: 5,
    
    color: "#393939",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 10,
  },
});
