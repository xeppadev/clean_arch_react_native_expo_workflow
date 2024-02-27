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
import { differenceInDays, parseISO, parse } from "date-fns";

const data = [
  {
    id: "12313123",
    cliente: "Minera Yanacocha",
    placas: [
      {
        name: "IDH-123",
        vigencia: "02/03/2024",
        tipecontrato: "Contrato 1",
      },
      {
        name: "IDH-161",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 2",
      },
    ],
    status: "Mal estado",
    contrato: "Contrato 1",
  },
  {
    id: "1f365223",
    cliente: "Minera Antamina",
    placas: [
      {
        name: "IDH-126",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 1",
      },
      {
        name: "IDH-1891",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 2",
      },
    ],
    status: "Buen estado",
    contrato: "Contrato 2",
  },
  {
    id: "145erq41",
    cliente: "Minera Las Bambas",
    placas: [
      {
        name: "IDH-127",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 1",
      },
      {
        name: "IDH-161",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 2",
      },
    ],
    status: "Mal estado",
    contrato: "Contrato 3",
  },
  {
    id: "14134df3",
    cliente: "Minera Cerro Verde",
    placas: [
      {
        name: "IDH-453",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 1",
      },
      {
        name: "IDH-161",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 2",
      },
    ],
    status: "Revision",
    contrato: "Contrato 4",
  },
  {
    id: "234324f3",
    cliente: "Minera Apumayo",
    placas: [
      {
        name: "IDH-734",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 1",
      },
      {
        name: "IDH-161",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 2",
      },
    ],
    status: "Buen estado",
    contrato: "Contrato 5",
  },
  {
    id: "14332das1",
    cliente: "Minera  Brocal",
    placas: [
      {
        name: "IDH-234",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 1",
      },
      {
        name: "IDH-161",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 2",
      },
    ],
    status: "Buen estado",
    contrato: "Contrato 6",
  },
  {
    id: "1134df3",
    cliente: "Minera Las Bambas",
    placas: [
      {
        name: "IDH-754",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 1",
      },
      {
        name: "IDH-161",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 2",
      },
    ],
    status: "Revision",
    contrato: "Contrato 7",
  },
  {
    id: "213432f3",
    cliente: "Minera Apumayo",
    placas: [
      {
        name: "IDH-8456",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 1",
      },
      {
        name: "IDH-161",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 2",
      },
    ],
    status: "Mal estado",
    contrato: "Contrato 8",
  },
  {
    id: "24336ff3",
    cliente: "Minera Yanacocha",
    placas: [
      {
        name: "IDH-423",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 1",
      },
      {
        name: "IDH-161",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 2",
      },
    ],
    status: "Revision",
    contrato: "Contrato 9",
  },
  {
    id: "634gf123",
    cliente: "Minera Cerro Verde",
    placas: [
      {
        name: "IDH-634",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 1",
      },
      {
        name: "IDH-856",
        vigencia: "12/01/2024",
        tipecontrato: "Contrato 2",
      },
    ],
    status: "Revision",
    contrato: "Contrato 10",
  },
];

export default function clientid() {
  const { id } = useLocalSearchParams();

  const cliente = data.find((item) => item.id === id);
  

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: COLORS.bg2 }}
    >
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={[styles.row, { marginBottom: 10 }]}>
            <Iconify icon="solar:shop-2-bold" size={40} color={COLORS.blue2} />
            <Text style={styles.title} numberOfLines={2}>
              Minera Barrick{"\n"}Peru S.A.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Numero de RUC:</Text>
              <Text style={styles.title2}>20100123456</Text>
            </View>
            <View style={[styles.column2, { marginLeft: 20 }]}>
              <Text style={styles.title2}>Nombre de Contacto:</Text>
              <Text style={styles.title2}>Angelica Suarez</Text>
            </View>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Direccion:</Text>
            <Text style={styles.title2}>
              Av. Manuel Olguin 853, Piso 12- Surco
            </Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Telefono de Contacto:</Text>
            <Text style={styles.title2}>+51 987654321</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Correo de Contacto:</Text>
            <Text style={styles.title2}>Angelica.Suarez@barrick.com</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Fecha de Registro:</Text>
            <Text style={styles.title2}>10/01/2023</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Contratos Actuales</Text>
        <FlatList
          style={{ paddingTop: 8 }}
          data={cliente ? cliente.placas : []}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const vigenciaDate = parse(item.vigencia, 'dd/MM/yyyy', new Date());
            const today = new Date();
            const daysUntilVigencia = differenceInDays(vigenciaDate, today);

            let textColor;
            if (daysUntilVigencia >= 5) {
              textColor = {
                color: COLORS.green,
                backgroundColor: COLORS.green2,
              };
            } else if (daysUntilVigencia <= 5 && daysUntilVigencia > 0) {
              textColor = {
                color: COLORS.wellow,
                backgroundColor: COLORS.wellowlg,
              };
            } else {
              textColor = {
                color: COLORS.red2,
                backgroundColor: COLORS.red,
              };
            }
            return (
              <View style={styles.listItem}>
                <View style={styles.icon}>
                  <Iconify icon="bxs:car" size={23} color={COLORS.blue2} />
                </View>
                <View style={styles.dates}>
                  <Text style={styles.listItemTitle}>{item.tipecontrato}</Text>
                  <Text style={styles.listItemTitle}>{item.name}</Text>
                </View>
                <View
                  style={[
                    styles.contentstatus,
                    { backgroundColor: textColor.backgroundColor },
                  ]}
                >
                  <Text
                    style={[styles.listItemStatus, { color: textColor.color }]}
                  >
                    {item.vigencia}
                  </Text>
                </View>
              </View>
            );
          }}
        />
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
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    marginLeft: 10,
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
});
