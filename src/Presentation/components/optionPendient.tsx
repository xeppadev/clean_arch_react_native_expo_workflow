import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Pressable,
  RefreshControl,
} from "react-native";
import { Iconify } from "react-native-iconify"; // Asegúrate de instalar esta librería
import { COLORS } from "@/constants/Colors";
import { format, parseISO } from "date-fns";
import { HomeMantDto } from "@/src/generated/graphql";
import { useRouter } from "expo-router";

// Define el tipo para los props de ConfirmadosPage
interface ConfirmadosPageProps {
  data: (HomeMantDto | null | undefined)[];
  refetch: () => Promise<any>; 
}

const PendientPage: React.FC<ConfirmadosPageProps> = ({ data, refetch }) => {
  const [showRepuestos, setShowRepuestos] = React.useState<number | null>(null);
  // Define refeching para el formulario.
  const [refreshing, setRefreshing] = React.useState(false);

  const router = useRouter();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Define la función para refrescar los datos.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);
  // Ordena los datos por fecha
  const sortedData = [...data].sort(
    (a, b) => new Date(b?.fecha).getTime() - new Date(a?.fecha).getTime()
  );
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
         
        />
      }
    >
      <View style={styles.line} />

      {sortedData.map((time, index) => {
        // Parse the date from ISO format
        const date = parseISO(time?.fecha);
        // Format the date
        const formattedDate = format(date, "dd MMM yyyy");

        // Format 12:00PM
        const formattedTime2 = format(date, "hh:mm a");

        // Text Color
        const textColor =
          time?.estado === "completado" || time?.estado === "expirado"
            ? COLORS.white
            : COLORS.blue2;
        // Numero de Repuestos
        const repuestos = time?.repuestos?.length;
        return (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.timeview}>
              <Text style={styles.timeText}>{formattedTime2}</Text>
            </View>

            <View
              style={[
                styles.textContainer,
                time?.estado === "completado" || time?.estado === "expirado"
                  ? { backgroundColor: COLORS.blue2 }
                  : { backgroundColor: "rgba(120, 157, 233, 0.1)" },
              ]}
            >
              <View style={styles.row2}>
                <Text style={[styles.text2, { color: textColor }]}>
                  {time?.tipo}
                </Text>
                <Iconify icon="bxs:car-mechanic" size={28} color={textColor} />
              </View>
              <Text style={[styles.plateText, { color: textColor }]}>
                {time?.placa}
              </Text>
              <View style={styles.row}>
                <Iconify
                  icon="lets-icons:date-fill"
                  size={20}
                  color={textColor}
                />
                <Text style={[styles.text, { color: textColor }]}>
                  {formattedDate}
                </Text>
              </View>
              <View style={styles.row}>
                <Iconify icon="mdi:user-box" size={20} color={textColor} />
                <Text style={[styles.text, { color: textColor }]}>
                  {time?.tecnico}
                </Text>
              </View>
              {time?.estado === "pendiente" ? (
                <View style={styles.row}>
                  <Iconify
                    icon="fluent:toolbox-20-filled"
                    size={20}
                    color={textColor}
                  />

                  <TouchableOpacity
                    onPress={() =>
                      setShowRepuestos(showRepuestos === index ? null : index)
                    }
                  >
                    <View style={[styles.repuestoRow]}>
                      {time?.estado === "pendiente" ? (
                        showRepuestos === index ? (
                          time.repuestos?.map((repuesto, index) => (
                            <Text
                              key={index}
                              style={[styles.text, { color: textColor }]}
                            >
                              {repuesto?.producto}
                            </Text>
                          ))
                        ) : (
                          <Text
                            style={[styles.text, { color: textColor }]}
                          >{`${repuestos} repuesto${
                            repuestos !== 1 ? "s" : ""
                          } seleccionado${repuestos !== 1 ? "s" : ""}`}</Text>
                        )
                      ) : null}
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={styles.row}>
                <Iconify
                  icon="ic:baseline-note-alt"
                  size={21}
                  color={textColor}
                />
                <Text style={[styles.text, { color: textColor }]}>
                  {time?.estado ? capitalizeFirstLetter(time?.estado) : ""}
                </Text>
              </View>
              {time?.estado === "pendiente" || time?.estado === "revision" ? (
                <View style={styles.viewbuttons}>
                  <Pressable
                    style={styles.buttons}
                    onPress={() => router.push("/admin/" + time?._id)}
                  >
                    <Text style={styles.textbutton}>Ver Detalles</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingLeft: 5,
    position: "relative",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeview: {
    flexDirection: "column",
    alignItems: "center",

    padding: 0,
    width: "25%",
  },
  timeText: {
    fontSize: Platform.OS === "ios" ? 14 : 15,
    color: COLORS.blue,
    marginRight: 10,
    fontFamily: "Inter_500Medium",
  },
  timeText2: {
    fontSize: 14,
    color: COLORS.gray,
    marginRight: 10,
    marginTop: 7,
    fontFamily: "Inter_500Medium",
  },
  line: {
    position: "absolute", // Posicionar la línea absolutamente
    top: 0, // Ajustar estas coordenadas para mover la línea
    left: Platform.OS === "ios" ? 80 : 85, // Ajustar estas coordenadas para mover la línea
    height: "100%",
    width: 1,
    backgroundColor: COLORS.gray3,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 13,
    marginLeft: 10,
    width: "75%",
    fontFamily: "Inter_500Medium",
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5, // Agrega margen inferior a cada fila
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5, // Agrega margen inferior a cada fila
  },
  text: {
    fontSize: 13,
    marginLeft: 5,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  text2: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  plateText: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  repuestoRow: {
    flexDirection: "column",
    marginBottom: 1, // Añade un poco de margen inferior si es necesario
  },
  viewbuttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttons: {
    backgroundColor: COLORS.blue,
    padding: 6,
    paddingVertical: 4,
    borderRadius: 7,
  },
  textbutton: {
    color: COLORS.white,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    fontSize: 13,
  },
});

export default PendientPage;
