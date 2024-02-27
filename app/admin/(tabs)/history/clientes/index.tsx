import {
  StyleSheet,
  Pressable,
  FlatList,
  Platform,
  ScrollView,
} from "react-native";

import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";

const data = [
  {
    id: "12313123",
    cliente: "Minera Yanacocha",
    contacto: "Pedro vasquez",
    status: "Vencido",
  },
  {
    id: "1f365223",
    cliente: "Minera Antamina",
    contacto: "Jose Rodriguez",
    status: "Activo",
  },
  {
    id: "145erq41",
    cliente: "Minera Las Bambas",
    contacto: "Pedro vasquez",
    status: "Activo",
  },
  {
    id: "14134df3",
    cliente: "Minera Cerro Verde",
    contacto: "Pedro vasquez",
    status: "Activo",
  },
  {
    id: "234324f3",
    cliente: "Minera Apumayo",
    contacto: "Jose Martinez",
    status: "Activo",
  },
  {
    id: "14332das1",
    cliente: "Minera  Brocal",
    contacto: "Enrique Gutierrez",
    status: "Por Vencer",
  },
  {
    id: "1134df3",
    cliente: "Minera Las Bambas",
    contacto: "Pedro vasquez",
    status: "Activo",
  },
  {
    id: "213432f3",
    cliente: "Minera Apumayo",
    contacto: "Pedro vasquez",
    status: "Activo",
  },
  {
    id: "24336ff3",
    cliente: "Minera Yanacocha",
    contacto: "Pedro vasquez",
    status: "Vencido",
  },
  {
    id: "634gf123",
    cliente: "Minera Cerro Verde",
    contacto: "Pedro vasquez",
    status: "Por Vencer",
  },
];

export default function ClientScreen() {
  const router = useRouter();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: COLORS.bg2 }}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.dataLengthText}>
            {data.length} clientes encontradas
          </Text>
        </View>
        <FlatList
          style={{ paddingTop: 8 }}
          data={data}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const texColor =
              item.status === "Activo"
                ? { color: COLORS.green, backgroundColor: COLORS.green2 }
                : item.status === "Por Vencer"
                ? { color: COLORS.wellow, backgroundColor: COLORS.wellowlg }
                : item.status === "Vencido"
                ? { color: COLORS.red2, backgroundColor: COLORS.red }
                : { color: COLORS.red2, backgroundColor: COLORS.blue };
            return (
              <Pressable
                style={styles.listItem}
                onPress={() =>
                  router.push("/admin/history/clientes/" + item.id)
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
                  <Text style={styles.listItemTitle}>{item.cliente}</Text>
                  <Text style={styles.listItemStatus}>{item.contacto}</Text>
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
});
