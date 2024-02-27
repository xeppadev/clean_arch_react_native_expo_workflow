import React from "react"
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native"
import { Iconify } from "react-native-iconify" // Asegúrate de instalar esta librería
import { COLORS } from "@/constants/Colors"
import { format, addHours, parseISO } from "date-fns"

const ConfirmadosPage = () => {

    const data = [
        {
          fecha: '2022-03-01T10:00:00Z',
          estadoActual: 'programado',
          tipoMantenimiento: 'Mantenimiento Correctivo',
          placa: 'ABC-123',
          repuestos: ['filtro de aire', 'aceite de motor'],
        },
        {
          fecha: '2022-03-02T14:00:00Z',
          estadoActual: 'completado',
          tipoMantenimiento: 'Mantenimiento Preventivo',
          placa: 'DEF-456',
          repuestos: ['aceite de motor'],
        },
        {
            fecha: '2022-03-02T14:00:00Z',
            estadoActual: 'completado',
            tipoMantenimiento: 'Mantenimiento Preventivo',
            placa: 'DEF-456',
            repuestos: ['aceite de motor'],
          },
        // Agrega más objetos aquí según sea necesario
      ];

  // Ordena los datos por fecha
  const sortedData = [...data].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
  )
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.line} />

      {(sortedData || []).map((time, index) => {
        // Parse the date from ISO format
        const date = parseISO(time.fecha)
        // Format the date
        const formattedDate = format(date, "dd MMM yyyy")

        // Format 12:00PM
        const formattedTime2 = format(date, "hh:mm a")

        // Add 2 hours to the date
        const newDate = addHours(date, 2)

        // Format the new time
        const newFormattedTime = format(newDate, "hh:mm a")

        // Text Color
        const textColor =
          time.estadoActual !== "programado" ? COLORS.white : COLORS.blue2
        // Numero de Repuestos
        const repuestos = time.repuestos.length
        return (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.timeview}>
              <Text style={styles.timeText}>{formattedTime2}</Text>
              <Text style={styles.timeText2}>{newFormattedTime}</Text>
            </View>

            <View
              style={[
                styles.textContainer,
                time.estadoActual !== "programado"
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
                <Iconify
                  icon="solar:clock-square-bold"
                  size={20}
                  color={textColor}
                />
                <Text style={[styles.text, { color: textColor }]}>
                  {formattedTime2}
                </Text>
              </View>
              <View style={styles.row}>
                {time.estadoActual === "programado" ? (
                  <Iconify
                    icon="lets-icons:date-fill"
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

                <Text style={[styles.text, { color: textColor }]}>
                  {time.estadoActual === "programado"
                    ? formattedDate
                    : `${repuestos} repuestos seleccionados`}
                </Text>
              </View>
              {time.estadoActual !== "programado" ? (
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
              ) : null}
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

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
  },
  timeText2: {
    fontSize: 14,
    color: COLORS.gray,
    marginRight: 10,
    marginTop: 7,
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
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "500",
  },
  text2: {
    fontSize: 16,
    fontWeight: "500",
  },
  plateText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },
})

export default ConfirmadosPage
