import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Iconify } from "react-native-iconify"; // Asegúrate de instalar esta librería
import { COLORS } from "../../../constants/theme";

const ConfirmadosPage = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       <View style={styles.line} />
      {["12:00", "13:00", "14:00"].map((time, index) => {
        // Convertir la hora a un objeto Date
        let date = new Date();
        const [hours, minutes] = time.split(":");
        date.setHours(hours);
        date.setMinutes(minutes);

        // Agregar 2 horas
        date.setHours(date.getHours() + 2);

        // Convertir la hora de nuevo a una cadena
        const newTime = `${date.getHours()}:${
          date.getMinutes() < 10 ? "0" : ""
        }${date.getMinutes()}`;
        return (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.timeview}>
              <Text style={styles.timeText}>{time}</Text>
              <Text style={styles.timeText2}>{newTime}</Text>
            </View>
           
            <View style={styles.textContainer}>
              <View style={styles.row2}>
                <Text style={styles.text2}>Mantenimiento Preventivo</Text>
                <Iconify
                  icon="bxs:car-mechanic"
                  size={28}
                  color={COLORS.blue2}
                />
              </View>
              <Text style={styles.plateText}>AEF-717</Text>
              <View style={styles.row}>
                <Iconify
                  icon="solar:clock-square-bold"
                  size={20}
                  color={COLORS.blue2}
                />
                <Text style={styles.text}>12:00PM</Text>
              </View>
              <View style={styles.row}>
                <Iconify
                  icon="solar:box-minimalistic-bold"
                  size={20}
                  color={COLORS.blue2}
                />
                <Text style={styles.text}>5 repuestos seleccionados</Text>
              </View>
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
  },
  timeText: {
    fontSize: 16,
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
    position: 'absolute', // Posicionar la línea absolutamente
    top: 0, // Ajustar estas coordenadas para mover la línea
    left: 50,
    height: '100%',
    width: 1,
    backgroundColor: COLORS.gray3,
    
  },
  textContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 13,
    backgroundColor: COLORS.gray3,
    marginLeft: 10,
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
    color: COLORS.blue2,
    marginLeft: 5,
    fontWeight: "500",
  },
  text2: {
    fontSize: 16,
    color: COLORS.blue2,
    marginLeft: 5,
    fontWeight: "500",
  },
  plateText: {
    fontSize: 16,
    color: COLORS.blue2,
    marginBottom: 10,
    fontWeight: "500",
  },
});

export default ConfirmadosPage;
