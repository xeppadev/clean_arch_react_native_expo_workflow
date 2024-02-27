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
    plate: "IDH-123",
    status: "Mal estado",
  },
  {
    id: "1f365223",
    cliente: "Minera Antamina",
    plate: "IDH-124",
    status: "Buen estado",
  },
  {
    id: "145erq41",
    cliente: "Minera Las Bambas",
    plate: "IDH-125",
    status: "Mal estado",
  },
  {
    id: "14134df3",
    cliente: "Minera Cerro Verde",
    plate: "IDH-126",
    status: "Revision",
  },
  {
    id: "234324f3",
    cliente: "Minera Apumayo",
    plate: "IDH-127",
    status: "Buen estado",
  },
  {
    id: "14332das1",
    cliente: "Minera  Brocal",
    plate: "IDH-127",
    status: "Buen estado",
  },
  {
    id: "1134df3",
    cliente: "Minera Las Bambas",
    plate: "IDH-128",
    status: "Revision",
  },
  {
    id: "213432f3",
    cliente: "Minera Apumayo",
    plate: "IDH-129",
    status: "Mal estado",
  },
  {
    id: "24336ff3",
    cliente: "Minera Yanacocha",
    plate: "IDH-130",
    status: "Revision",
  },
  {
    id: "634gf123",
    cliente: "Minera Cerro Verde",
    plate: "IDH-131",
    status: "Revision",
  },
];
export default function VehiculosScreen() {
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
            {data.length} unidades encontradas
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
              item.status === "Completado"
                ? COLORS.green
                : item.status === "Pendiente"
                ? COLORS.wellow
                : item.status === "Programado"
                ? COLORS.blue2
                : COLORS.red2;
            return (
              <Pressable
                style={styles.listItem}
                onPress={() =>
                  router.push("/admin/history/vehiculos/" + item.id)
                }
              >
                <View style={styles.icon}>
                  <Iconify icon="bxs:car" size={25} color={COLORS.blue2} />
                </View>
                <View style={styles.dates}>
                  <Text style={styles.listItemTitle}>PLACA: {item.plate}</Text>
                  <Text style={styles.listItemStatus}>{item.cliente}</Text>
                </View>
                {item.status === "Buen estado" ? (
                  <Iconify
                    icon="icon-park-solid:check-one"
                    size={30}
                    color={COLORS.green}
                  />
                ) : item.status === "Revision" ? (
                  <Iconify
                    icon="solar:clock-circle-bold"
                    size={33}
                    color={COLORS.wellow}
                  />
                ) : item.status === "Mal estado" ? (
                  <Iconify
                    icon="solar:close-circle-bold"
                    size={33}
                    color={COLORS.red2}
                  />
                ) : null}
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
    
    fontWeight: "600",
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
});
