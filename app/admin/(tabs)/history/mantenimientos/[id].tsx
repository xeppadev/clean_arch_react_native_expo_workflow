import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { useLocalSearchParams } from "expo-router";

const data = [
  {
    id: "fdswe34234",
    cliente: "Minera Yanacocha",
    repuestos: [
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "323214",

        cantidad: 1,
      },
      {
        repuesto: "Luz de Freno",
        marca: "marca",
        codigo: "5424324",

        cantidad: 1,
      },
      {
        repuesto: "Pastillas de Frenos",
        marca: "marca",
        codigo: "9080935",

        cantidad: 2,
      },
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "4754654",
        cantidad: 3,
      },
    ],
    status: "Mal estado",
    contrato: "Contrato 1",
  },
  {
    id: "1f365223",
    cliente: "Minera Antamina",
    repuestos: [
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "323214",

        cantidad: 2,
      },
      {
        repuesto: "Luz de Freno",
        marca: "marca",
        codigo: "5424324",

        cantidad: 7,
      },
      {
        repuesto: "Pastillas de Frenos",
        marca: "marca",
        codigo: "9080935",

        cantidad: 9,
      },
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "4754654",
        cantidad: 12,
      },
    ],
    status: "Buen estado",
    contrato: "Contrato 2",
  },
  {
    id: "145erq41",
    cliente: "Minera Las Bambas",
    repuestos: [
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "323214",

        cantidad: 2,
      },
      {
        repuesto: "Luz de Freno",
        marca: "marca",
        codigo: "5424324",

        cantidad: 7,
      },
      {
        repuesto: "Pastillas de Frenos",
        marca: "marca",
        codigo: "9080935",

        cantidad: 9,
      },
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "4754654",
        cantidad: 12,
      },
    ],
    status: "Mal estado",
    contrato: "Contrato 3",
  },
  {
    id: "14134df3",
    cliente: "Minera Cerro Verde",
    repuestos: [
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "323214",

        cantidad: 2,
      },
      {
        repuesto: "Luz de Freno",
        marca: "marca",
        codigo: "5424324",

        cantidad: 7,
      },
      {
        repuesto: "Pastillas de Frenos",
        marca: "marca",
        codigo: "9080935",

        cantidad: 9,
      },
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "4754654",
        cantidad: 12,
      },
    ],
    status: "Revision",
    contrato: "Contrato 4",
  },
  {
    id: "234324f3",
    cliente: "Minera Apumayo",
    repuestos: [
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "323214",

        cantidad: 2,
      },
      {
        repuesto: "Luz de Freno",
        marca: "marca",
        codigo: "5424324",

        cantidad: 7,
      },
      {
        repuesto: "Pastillas de Frenos",
        marca: "marca",
        codigo: "9080935",

        cantidad: 9,
      },
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "4754654",
        cantidad: 12,
      },
    ],
    status: "Buen estado",
    contrato: "Contrato 5",
  },
  {
    id: "14332das1",
    cliente: "Minera  Brocal",
    repuestos: [
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "323214",

        cantidad: 2,
      },
      {
        repuesto: "Luz de Freno",
        marca: "marca",
        codigo: "5424324",

        cantidad: 7,
      },
      {
        repuesto: "Pastillas de Frenos",
        marca: "marca",
        codigo: "9080935",

        cantidad: 9,
      },
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "4754654",
        cantidad: 12,
      },
    ],
    status: "Buen estado",
    contrato: "Contrato 6",
  },
  {
    id: "1134df3",
    cliente: "Minera Las Bambas",
    repuestos: [
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "323214",

        cantidad: 2,
      },
      {
        repuesto: "Luz de Freno",
        marca: "marca",
        codigo: "5424324",

        cantidad: 7,
      },
      {
        repuesto: "Pastillas de Frenos",
        marca: "marca",
        codigo: "9080935",

        cantidad: 9,
      },
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "4754654",
        cantidad: 12,
      },
    ],
    status: "Revision",
    contrato: "Contrato 7",
  },
  {
    id: "213432f3",
    cliente: "Minera Apumayo",
    repuestos: [
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "323214",

        cantidad: 2,
      },
      {
        repuesto: "Luz de Freno",
        marca: "marca",
        codigo: "5424324",

        cantidad: 7,
      },
      {
        repuesto: "Pastillas de Frenos",
        marca: "marca",
        codigo: "9080935",

        cantidad: 9,
      },
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "4754654",
        cantidad: 12,
      },
    ],
    status: "Mal estado",
    contrato: "Contrato 8",
  },
  {
    id: "24336ff3",
    cliente: "Minera Yanacocha",
    repuestos: [
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "323214",

        cantidad: 2,
      },
      {
        repuesto: "Luz de Freno",
        marca: "marca",
        codigo: "5424324",

        cantidad: 7,
      },
      {
        repuesto: "Pastillas de Frenos",
        marca: "marca",
        codigo: "9080935",

        cantidad: 9,
      },
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "4754654",
        cantidad: 12,
      },
    ],
    status: "Revision",
    contrato: "Contrato 9",
  },
  {
    id: "634gf123",
    cliente: "Minera Cerro Verde",
    repuestos: [
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "323214",

        cantidad: 2,
      },
      {
        repuesto: "Luz de Freno",
        marca: "marca",
        codigo: "5424324",

        cantidad: 7,
      },
      {
        repuesto: "Pastillas de Frenos",
        marca: "marca",
        codigo: "9080935",

        cantidad: 9,
      },
      {
        repuesto: "Refrigerante",
        marca: "marca",
        codigo: "4754654",
        cantidad: 12,
      },
    ],
    status: "Revision",
    contrato: "Contrato 10",
  },
];

export default function Mantenimientoid() {
  const { id } = useLocalSearchParams();

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
          <View style={[styles.row, { marginBottom: 10 }]}>
            <Iconify icon="mingcute:tool-fill" size={40} color={COLORS.blue2} />
            <Text style={styles.title} numberOfLines={2}>
              Mantenimiento Preventivo{"\n"}PLACA: ID-123
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Hora de Inicio:</Text>
              <Text style={styles.title2}>4:00 PM</Text>
            </View>
            <View style={[styles.column2, { marginLeft: 20 }]}>
              <Text style={styles.title2}>Hora de Termino:</Text>
              <Text style={styles.title2}>6:00 PM</Text>
            </View>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>KIlometraje Registrado:</Text>
            <Text style={styles.title2}>30 000km</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Mecanico:</Text>
            <Text style={styles.title2}>Miguel Gonzales Sanchez</Text>
          </View>

          <View style={styles.column2}>
            <Text style={styles.title2}>Fecha de Mantenimiento:</Text>
            <Text style={styles.title2}>10/01/2023</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Repuestos usados</Text>
        <FlatList
          style={{ paddingTop: 2 }}
          data={cliente ? cliente.repuestos : []}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
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
                    { backgroundColor: COLORS.bluelg2, width: 30, height: 30 },
                  ]}
                >
                  <Text style={[styles.dataLengthText, { color: COLORS.blue }]}>
                    {item.cantidad < 10 ? `0${item.cantidad}` : item.cantidad}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <Text style={styles.subtitle}>Diagnostico de la Unidad</Text>
        <View style={styles.column}>
          <Text style={styles.parrafo}>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <Text style={styles.subtitle}>Documentos Adicionales</Text>
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
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "center",
    marginLeft: 10,
    color: COLORS.bluef,
    fontFamily: "Inter_500Medium",
  },
  title2: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.bluef,
    fontFamily: "Inter_500Medium",
  },
  column2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "500",
    marginVertical: 10,
    fontFamily: "Inter_500Medium",
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
    fontFamily: "Inter_500Medium",
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
    fontFamily: "Inter_500Medium",
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
  parrafo: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.bluef,
    fontFamily: "Inter_500Medium",
  },
});
