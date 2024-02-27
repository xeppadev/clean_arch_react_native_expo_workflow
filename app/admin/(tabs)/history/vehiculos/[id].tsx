import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Platform,
  Pressable
} from "react-native";
import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { useLocalSearchParams, useRouter } from "expo-router";

const data = [
  {
    id: "12313123",
    cliente: "Minera Yanacocha",
    mantenimientos: [
      {
        id: "fdswe34234",
        tipo: "Mantenimiento Preventivo",
        fecha: "02/03/2024",
        reparaciones: "2",
      },
      {
        id: "fe23424324",
        tipo: "Mantenimiento Correctivo",
        fecha: "12/01/2024",
        reparaciones: "1",
      },
    ],
    status: "Mal estado",
    contrato: "Contrato 1",
  },
  {
    id: "1f365223",
    cliente: "Minera Antamina",
    mantenimientos: [
      {
        id: "7363tfdf2",
        tipo: "Mantenimiento Preventivo",
        fecha: "02/03/2024",
        reparaciones: "2",
      },
      {
        id: "872343",
        tipo: "Mantenimiento Correctivo",
        fecha: "12/01/2024",
        reparaciones: "1",
      },
    ],
    status: "Buen estado",
    contrato: "Contrato 2",
  },
  {
    id: "145erq41",
    cliente: "Minera Las Bambas",
    mantenimientos: [
      {
        id: "876e424a1",
        tipo: "Mantenimiento Preventivo",
        fecha: "02/03/2024",
        reparaciones: "2",
      },
      {
        id: "876ehrr2",
        tipo: "Mantenimiento Correctivo",
        fecha: "12/01/2024",
        reparaciones: "1",
      },
    ],
    status: "Mal estado",
    contrato: "Contrato 3",
  },
  {

    id: "14134df3",
    cliente: "Minera Cerro Verde",
    mantenimientos: [
      {
        id: "876vas24a1",
        tipo: "Mantenimiento Preventivo",
        fecha: "02/03/2024",
        reparaciones: "2",
      },
      {
        id: "9567ehrr2",
        tipo: "Mantenimiento Correctivo",
        fecha: "12/01/2024",
        reparaciones: "1",
      },
    ],
    status: "Revision",
    contrato: "Contrato 4",
  },
  {
    id: "234324f3",
    cliente: "Minera Apumayo",
    mantenimientos: [
      {
        id: "bsfddf4a1",
        tipo: "Mantenimiento Preventivo",
        fecha: "02/03/2024",
        reparaciones: "2",
      },
      {
        id: "765farr2",
        tipo: "Mantenimiento Correctivo",
        fecha: "12/01/2024",
        reparaciones: "1",
      },
    ],
    status: "Buen estado",
    contrato: "Contrato 5",
  },
  {
    id: "14332das1",
    cliente: "Minera  Brocal",
    mantenimientos: [
      {
        id: "876v0jgfhga1",
        tipo: "Mantenimiento Preventivo",
        fecha: "02/03/2024",
        reparaciones: "2",
      },
      {
        id: "9234hrr2",
        tipo: "Mantenimiento Correctivo",
        fecha: "12/01/2024",
        reparaciones: "1",
      },
    ],
    status: "Buen estado",
    contrato: "Contrato 6",
  },
  {
    id: "1134df3",
    cliente: "Minera Las Bambas",
    mantenimientos: [
      {
        id: "876v32x1",
        tipo: "Mantenimiento Preventivo",
        fecha: "02/03/2024",
        reparaciones: "2",
      },
      {
        id: "867df2x1",
        tipo: "Mantenimiento Correctivo",
        fecha: "12/01/2024",
        reparaciones: "1",
      },
    ],
    status: "Revision",
    contrato: "Contrato 7",
  },
  {
    id: "213432f3",
    cliente: "Minera Apumayo",
    mantenimientos: [
      {
        id: "863432423d1",
        tipo: "Mantenimiento Preventivo",
        fecha: "02/03/2024",
        reparaciones: "2",
      },
      {
        id: "86364566fd1",
        tipo: "Mantenimiento Correctivo",
        fecha: "12/01/2024",
        reparaciones: "1",
      },
    ],
    status: "Mal estado",
    contrato: "Contrato 8",
  },
  {
    id: "24336ff3",
    cliente: "Minera Yanacocha",
    mantenimientos: [
      {
        id: "84gs56fd1",
        tipo: "Mantenimiento Preventivo",
        fecha: "02/03/2024",
        reparaciones: "2",
      },
      {
        id: "863w4131",
        tipo: "Mantenimiento Correctivo",
        fecha: "12/01/2024",
        reparaciones: "1",
      },
    ],
    status: "Revision",
    contrato: "Contrato 9",
  },
  {
    id: "634gf123",
    cliente: "Minera Cerro Verde",
    mantenimientos: [
      {
        id: "863456fd1",
        tipo: "Mantenimiento Preventivo",
        fecha: "02/03/2024",
        reparaciones: "2",
      },
      {
        id: "876as24a1",
        tipo: "Mantenimiento Correctivo",
        fecha: "12/01/2024",
        reparaciones: "1",
      },
    ],
    status: "Revision",
    contrato: "Contrato 10",
  },
];

export default function Vehiculoid() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const cliente = data.find((item) => item.id === id);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: COLORS.bg2 }}
    >
     
      <View style={styles.container}>
      <Text style={styles.subtitle}>Detalles</Text>
        <View style={styles.column}>
          <View
            style={[
              styles.row,
              { marginBottom: 10,  },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <Iconify icon="bxs:car" size={35} color={COLORS.blue2} />
              <Text style={styles.title}>PLACA: ADH-123</Text>
            </View>
            <View style={styles.row2}>
              <Iconify
                icon="iconoir:star-solid"
                size={25}
                color={COLORS.wellow2}
              />
              <Text style={styles.title}>7.0</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Vigencia de SOAT:</Text>
              <Text style={styles.title2}>DD/MM/AAAA</Text>
            </View>
            <View style={[styles.column2, { marginLeft: 20 }]}>
              <Text style={styles.title2}>Vigencia de Contrato:</Text>
              <Text style={styles.title2}>DD/MM/AAAA</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Revisión Técnica:</Text>
              <Text style={styles.title2}>DD/MM/AAAA</Text>
            </View>
            <View style={[styles.column2, { marginLeft: 20 }]}>
              <Text style={styles.title2}>Kilometraje Inicial:</Text>
              <Text style={styles.title2}>12 000 Km</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Propietario:</Text>
              <Text style={styles.title2}>Luis Rojas Quispe</Text>
            </View>
            <View style={[styles.column2, { marginLeft: 20 }]}>
              <Text style={styles.title2}>Kilometraje Actual:</Text>
              <Text style={styles.title2}>25 000 Km</Text>
            </View>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Cliente:</Text>
            <Text style={styles.title2}>Minera Yanacocha</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Historial de Mantenimientos</Text>
        <FlatList
          style={{ paddingTop: 8 }}
          data={cliente ? cliente.mantenimientos : []}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
                      
            return (
              <Pressable style={styles.listItem}
               onPress={() => router.push("/admin/history/mantenimientos/" + item.id)}
              >
                <View style={styles.icon}>
                  <Iconify icon="bxs:car-mechanic" size={23} color={COLORS.blue2} />
                </View>
                <View style={styles.dates}>
                  <Text style={styles.listItemTitle}>{item.tipo}</Text>
                  <Text style={styles.listItemTitle}>{item.reparaciones} repuestos cambiados</Text>
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
                    {item.fecha}
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
    fontSize: 16,
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
    backgroundColor:COLORS.wellowlg,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 9,
  },
});
