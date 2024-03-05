import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { useLocalSearchParams } from "expo-router";
import { differenceInDays, parseISO, format } from "date-fns";
import { useClientePorIdViewModel } from "@/src/Presentation/viewmodels/clientes/clienteporIdViewModel";
import { sl } from "date-fns/locale";

export default function clientid() {
  const { id } = useLocalSearchParams();
  const {
    data: cliente,
    loading,
    error,
    refetch,
  } = useClientePorIdViewModel(id as string);
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
  if (!cliente) {
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
        <View style={styles.column}>
          <View style={[styles.row, { marginBottom: 10 }]}>
            <Iconify icon="solar:shop-2-bold" size={40} color={COLORS.blue2} />
            <Text style={styles.title} numberOfLines={2}>
              {cliente?.nombreCliente}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Numero de RUC:</Text>
              <Text style={styles.title2}>{cliente.ruc}</Text>
            </View>
            <View style={[styles.column2, { marginLeft: 20 }]}>
              <Text style={styles.title2}>Nombre de Contacto:</Text>
              <Text style={styles.title2}>{cliente.nombre}</Text>
            </View>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Direccion del Cliente:</Text>
            <Text style={styles.title2}>
              {cliente.direccion ? cliente.direccion : "Sin direccion"}
            </Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Telefono de Contacto:</Text>
            <Text style={styles.title2}>{cliente.numeroContacto}</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Correo de Contacto:</Text>
            <Text style={styles.title2}>{cliente.email}</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Fecha de Registro:</Text>
            <Text style={styles.title2}>
              {
                cliente.contratos
                  ?.filter((contrato) => contrato !== null)
                  .sort(
                    (a, b) =>
                      parseISO(a!.fechaInicio).getTime() -
                      parseISO(b!.fechaInicio).getTime()
                  )
                  .map((item) =>
                    format(parseISO(item!.fechaInicio), "dd/MM/yyyy")
                  )[0]
              }
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Contratos Actuales</Text>
        <FlatList
          style={{ paddingTop: 8 }}
          data={cliente ? cliente.contratos : []}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const fechaFinFormatted = format(
              parseISO(item?.fechaFin),
              "dd/MM/yyyy"
            );
            const vigenciaDate = parseISO(item?.fechaFin);
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
                  <Text style={styles.listItemTitle}>{item?.__typename}</Text>
                  <Text style={styles.listItemTitle}>
                    {item?.numeroContrato}
                  </Text>
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
                    {fechaFinFormatted}
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
