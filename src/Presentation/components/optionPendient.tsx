import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Iconify } from "react-native-iconify"; // Asegúrate de instalar esta librería
import { COLORS } from "@/constants/Colors";
import { format, addHours, parseISO } from "date-fns";

const data = [
  {
    fecha: "2022-03-01T10:00:00Z",
    estadoActual: "Pendiente",
    tipoMantenimiento: "Mantenimiento Correctivo",
    tecnico: "Juan Perez",
    placa: "ABC-234",
    repuestos: ["filtro de aire", "aceite de motor", "batería de motor"],
    observaciones: "Problemas con el motor",
  },
  {
    fecha: "2022-03-01T10:00:00Z",
    estadoActual: "Pendiente",
    tecnico: "Pedro Sanchez",
    tipoMantenimiento: "Mantenimiento Correctivo",
    placa: "ADS-123",
    repuestos: ["filtro de aire", "aceite de motor"],
    observaciones: "Problemas con los frenos",
  },
  {
    fecha: "2022-03-02T14:00:00Z",
    estadoActual: "completado",
    tecnico: "Juan Alvarez",
    tipoMantenimiento: "Mantenimiento Preventivo",
    placa: "REF-416",
    repuestos: ["aceite de motor"],
    observaciones: "Problemas con los neumáticos",
  },
  {
    fecha: "2022-03-02T14:00:00Z",
    estadoActual: "completado",
    tecnico: "Pedro Rodriguez",
    tipoMantenimiento: "Mantenimiento Preventivo",
    placa: "ITE-456",
    repuestos: ["aceite de motor"],
    observaciones: "Problemas con la transmisión",
  },
  // Agrega más objetos aquí según sea necesario
];

const PendientPage = () => {
  const [showRepuestos, setShowRepuestos] = React.useState<number | null>(null);
  const [showButton, setShowButton] = React.useState<number | null>(null);

  // Ordena los datos por fecha
  const sortedData = [...data].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.line} />

      {(sortedData || []).map((time, index) => {
        // Parse the date from ISO format
        const date = parseISO(time.fecha);
        // Format the date
        const formattedDate = format(date, "dd MMM yyyy");

        // Format 12:00PM
        const formattedTime2 = format(date, "hh:mm a");

        // Add 2 hours to the date
        const newDate = addHours(date, 2);

        // Format the new time
        const newFormattedTime = format(newDate, "hh:mm a");

        // Text Color
        const textColor =
          time.estadoActual !== "Pendiente" ? COLORS.white : COLORS.blue2;
        // Numero de Repuestos
        const repuestos = time.repuestos.length;
        return (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.timeview}>
              <Text style={styles.timeText}>{formattedTime2}</Text>
            </View>

            <View
              style={[
                styles.textContainer,
                time.estadoActual !== "Pendiente"
                  ? { backgroundColor: COLORS.blue2 }
                  : { backgroundColor: "rgba(120, 157, 233, 0.1)" },
              ]}
            >
              <View style={styles.row2}>
                <Text style={[styles.text2, { color: textColor }]}>
                  {time.tipoMantenimiento}
                </Text>
                <Iconify icon="bxs:car-mechanic" size={28} color={textColor} />
              </View>
              <Text style={[styles.plateText, { color: textColor }]}>
                {time.placa}
              </Text>
              <View style={styles.row}>
                <Iconify icon="mdi:user-box" size={20} color={textColor} />
                <Text style={[styles.text, { color: textColor }]}>
                  {time.tecnico}
                </Text>
              </View>
              <View style={styles.row}>
                {time.estadoActual === "Pendiente" ? (
                  <Iconify
                    icon="fluent:toolbox-20-filled"
                    size={20}
                    color={textColor}
                  />
                ) : (
                  <Iconify
                    icon="solar:box-minimalistic-bold"
                    size={20}
                    color={textColor}
                  />
                )}

                <TouchableOpacity
                  onPress={() =>
                    setShowRepuestos(showRepuestos === index ? null : index)
                  }
                >
                  <View style={[styles.repuestoRow]}>
                    {time.estadoActual === "Pendiente" ? (
                      showRepuestos === index ? (
                        time.repuestos.map((repuesto, index) => (
                          <Text
                            key={index}
                            style={[styles.text, { color: textColor }]}
                          >
                            {repuesto}
                          </Text>
                        ))
                      ) : (
                        <Text
                          style={[styles.text, { color: textColor }]}
                        >{`${repuestos} repuestos seleccionados`}</Text>
                      )
                    ) : (
                      <Text
                        style={[styles.text, { color: textColor }]}
                      >{`${repuestos} repuestos seleccionados`}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              {time.estadoActual === "Pendiente" ? (
                <View style={styles.row}>
                  <Iconify
                    icon="mingcute:clipboard-fill"
                    size={21}
                    color={textColor}
                  />
                  <Text style={[styles.text, { color: textColor }]}>
                    {time.observaciones}
                  </Text>
                </View>
              ) : null}

              {time.estadoActual !== "programado" ? (
                <TouchableOpacity
                  onPress={() =>
                    time.estadoActual === "Pendiente" &&
                    setShowButton(showButton === index ? null : index)
                  }
                >
                  <View style={styles.row}>
                    <Iconify
                      icon="ic:baseline-note-alt"
                      size={21}
                      color={textColor}
                    />
                    <Text style={[styles.text, { color: textColor }]}>
                      {time.estadoActual}
                    </Text>
                  </View>
                  {showButton === index ? (
                    <View style={styles.viewbuttons}>
                      <Pressable style={styles.buttons}>
                        <Text style={styles.textbutton}>Cancelar</Text>
                      </Pressable>
                      <Pressable style={[styles.buttons, { marginLeft: 3 }]}>
                        <Text style={styles.textbutton}>Confirmar</Text>
                      </Pressable>
                    </View>
                  ) : null}
                </TouchableOpacity>
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
