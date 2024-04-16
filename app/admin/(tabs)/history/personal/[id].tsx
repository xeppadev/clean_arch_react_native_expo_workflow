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
import {  parseISO,  format } from "date-fns";
import { usePersonalIDViewModel } from "@/src/Presentation/viewmodels/personal/data_id_personalViewModal";
import DocumentViewComponent from "@/src/Presentation/components/documentView";
export default function Personalid() {
  const { id } = useLocalSearchParams();
  const {
    data: personal,
    loading,
    error,
    refetch,
  } = usePersonalIDViewModel(id as string);
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
  if (!personal) {
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
            <Iconify icon="fa6-solid:user" size={38} color={COLORS.blue2} />
            <Text style={styles.title} numberOfLines={2}>
              {personal?.nombre}
            </Text>
          </View>

          <View style={[styles.column2]}>
            <Text style={styles.title2}>Numero de Telefono:</Text>
            <Text style={styles.title2}>{personal?.numero}</Text>
          </View>

            <View style={styles.column2}>
            <Text style={styles.title2}>Correo de Contacto:</Text>
            <Text style={styles.title2}>{personal?.email}</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.title2}>Fecha de Ingreso:</Text>
            <Text style={styles.title2}>
              {format(parseISO(personal?.fechaIngreso), "dd/MM/yyyy")}
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Salarios </Text>
        <FlatList
          style={{ paddingTop: 8 }}
          data={personal?.salarioFecha}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item,index }) => {
            const salariosOrdenados = personal?.salarioFecha
              ?.slice()
              .sort(
                (a, b) =>
                  parseISO(b!.fecha).getTime() - parseISO(a!.fecha).getTime()
              );
            let color;
            let backgroundColor;
            item?.fecha === salariosOrdenados?.[0]?.fecha
              ? ((color = COLORS.green), (backgroundColor = COLORS.green2))
              : ((color = COLORS.red2), (backgroundColor = COLORS.red));

              const idConsecutivo = `SALARIO-${personal?._id?.slice(-3)}${String(index + 1).padStart(4, '0')}`;

            return (
              <View style={styles.listItem}>
                <View style={styles.icon}>
                  <Iconify
                    icon="basil:document-solid"
                    size={23}
                    color={COLORS.blue2}
                  />
                </View>
                <View style={styles.dates}>
                  <Text style={styles.listItemTitle}>{idConsecutivo}</Text>
                  <Text style={styles.listItemTitle}>
                    Salario: $ {item?.salario}
                  </Text>
                </View>
                <View
                  style={[
                    styles.contentstatus,
                    { backgroundColor: backgroundColor },
                  ]}
                >
                  <Text style={[styles.listItemStatus, { color: color }]}>
                    {format(parseISO(item?.fecha), "dd/MM/yyyy")}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <Text style={styles.subtitle}>Documentos Adicionales</Text>
        <DocumentViewComponent
          documents={personal.documentos?.filter((doc): doc is string => doc !== null)}
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
    backgroundColor: COLORS.bg2,
  },
});
