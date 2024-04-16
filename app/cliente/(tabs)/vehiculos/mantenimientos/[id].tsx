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
import { useMantenimientoInfoPorIdViewModel } from "@/src/Presentation/viewmodels/mantenimientos/mantenimientViewModel";
import { format, parse, parseISO } from "date-fns";
import DocumentViewComponent from "@/src/Presentation/components/documentView";

export default function Mantenimientoid() {
  const { id } = useLocalSearchParams();
  const { data, loading, error, refetch } = useMantenimientoInfoPorIdViewModel(
    id as string
  );

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
  if (!data) {
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

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const texColor =
    data.estado === "completado" || data.estado === "aprobado"
      ? { color: COLORS.green, backgroundColor: COLORS.green2 }
      : data.estado === "pendiente" || data.estado === "revision"
      ? { color: COLORS.wellow, backgroundColor: COLORS.wellowlg }
      : data.estado === "programado"
      ? { color: COLORS.blue2, backgroundColor: COLORS.bluelg2 }
      : { color: COLORS.red2, backgroundColor: COLORS.red };

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
            <Iconify icon="mingcute:tool-fill" size={40} color={COLORS.blue2} />
            <Text style={styles.title} numberOfLines={2}>
               {data.tipo}
              {"\n"}PLACA: {data.placa}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Fecha de Inicio:</Text>
              <Text style={styles.title2}>
                {data.fechaInicio
                  ? format(parseISO(data.fechaInicio), "dd/MM/yyyy")
                  : "DD/MM/YYYY"}
              </Text>
            </View>
            <View style={[styles.column2, { marginLeft: 20 }]}>
              <Text style={styles.title2}>Fecha de Termino:</Text>
              <Text style={styles.title2}>
                {data.fechaFin
                  ? format(parseISO(data.fechaFin), "dd/MM/yyyy")
                  : "DD/MM/YYYY"}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.title2}>Kilometraje Previo:</Text>
              <Text style={styles.title2}>
                {data.kmPrevio ? `${data.kmPrevio}km` : "sin datos"}
              </Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.title2}>Kilometraje Ultimo:</Text>
              <Text style={styles.title2}>
                {data.kmMedido ? `${data.kmMedido}km` : "sin datos"}
              </Text>
            </View>
          </View>
          
          <View style={styles.column2}>
            <Text style={styles.title2}>Estado:</Text>
            <View
              style={[
                styles.contentstatus,
                { backgroundColor: texColor.backgroundColor },
              ]}
            >
              <Text style={[styles.title2, { color: texColor.color }]}>
                {capitalizeFirstLetter(data.estado ?? "")}
              </Text>
            </View>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Programacion del Mantenimiento:</Text>
            <Text style={styles.title2}>
              {data.fecha
                ? format(parseISO(data.fecha), "dd/MM/yyyy")
                : "DD/MM/YYYY"}
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Repuestos usados</Text>
        <FlatList
          style={{ paddingTop: 2 }}
          data={data?.repuestos}
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
                  <Text style={styles.listItemTitle}>{`${capitalizeFirstLetter(
                    item.producto ?? ""
                  )} (${item.marca ?? ""})`}</Text>
                  <Text style={styles.listItemStatus}>ID:{item.id}</Text>
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
        <Text style={styles.subtitle}>Anotaciones </Text>
        <View style={styles.column}>
          <Text style={styles.parrafo}>
            {data.anotaciones ? data.anotaciones : "Sin anotaciones"}
          </Text>
        </View>
        <Text style={styles.subtitle}>Diagnostico </Text>
        <View style={styles.column}>
          <Text style={styles.parrafo}>
            {data.diagnostico ? data.diagnostico : "Sin diagnostico"}
          </Text>
        </View>
        <Text style={styles.subtitle}>Diagnostico Final </Text>
        <View style={styles.column}>
          <Text style={styles.parrafo}>
            {data.diagnosticoFinal
              ? data.diagnosticoFinal
              : "Sin recomendaciones"}
          </Text>
        </View>

        <Text style={styles.subtitle}>Documentos Adicionales</Text>
        <DocumentViewComponent
          documents={data.documentos}
          marginHorizontal={0}
          marginRight={0}
          backgroundColor={COLORS.white}
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
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.bluef,
    fontFamily: "Inter_500Medium",
  },
  column2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 8,
    marginRight: 4,
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
  center: { 
    flex: 1, 
    justifyContent: "center",
    alignItems: "center"
     },
});
