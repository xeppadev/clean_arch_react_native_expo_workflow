import { View, Text, ScrollView, StyleSheet, TouchableHighlight, Platform } from "react-native";
import { COLORS } from "../../constants/theme";
import StepIndicator from "react-native-step-indicator";
import React from "react";
import { Iconify } from "react-native-iconify"; // Asegúrate de instalar esta librería

// Etiquetas para los pasos del indicador
const labels = ["Programado", "Pendiente", "Aprobado", "Completo"];

// Estilos personalizados para el indicador de pasos
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#FDD543",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#FDD543",
  stepStrokeUnFinishedColor: "#3A4759",
  separatorFinishedColor: "#FDD543",
  separatorUnFinishedColor: "#3A4759",
  stepIndicatorFinishedColor: "#FDD543",
  stepIndicatorUnFinishedColor: COLORS.blue,
  stepIndicatorCurrentColor: COLORS.blue,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#FDD543",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#3A4759",
  labelColor: "#ffffff",
  labelSize: 13,
  currentStepLabelColor: "#FDD543",
};


/**
 * ProgramadosPage es un componente de React que renderiza la página de programados.
 * 
 * @returns {JSX.Element} El componente ProgramadosPage renderizado.
 */



const ProgramadosPage = () => {
  // Estado para la posición actual en el indicador de pasos
  const [currentPosition, setCurrentPosition] = React.useState(0);
  return (
    <ScrollView style={styles.container}>
      {[1, 2, 3, 4].map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.time}>12:00 PM</Text>
          <Text style={styles.title}>ID: QEF - 717</Text>
          <Text style={styles.date}>22 Diciembre 2023</Text>
          <View style={styles.stepContainer}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              stepCount={4} // Cantidad de pasos
              renderStepIndicator={({ position, stepStatus }) => {
                if (position === currentPosition) {
                  return (
                    <Iconify
                      icon="solar:clipboard-add-bold"
                      size={15}
                      color={COLORS.wellow}
                    />
                  ); // Icono para el paso actual
                } else if (stepStatus === "unfinished") {
                  return (
                    <Iconify
                      icon="solar:clipboard-bold"
                      size={15}
                      color={COLORS.gray4}
                    />
                  ); // Icono para los pasos no completados
                }
              }}
            />
          </View>
          <TouchableHighlight style={styles.button} underlayColor="#FDD543" onPress={() => {}}>
            <Text style={styles.buttonText}>Detalles</Text>
          </TouchableHighlight>
        </View>
      ))}
    </ScrollView>
  );
};

// Estilos para el componente utilizando StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
    paddingBottom: 15,
  },
  card: {
    flex: 1,
    padding: Platform.OS == "ios" ? 11 : 15,
    paddingBottom: 47,
    backgroundColor: COLORS.blue,
    marginTop: 4,
    marginBottom: 14,
    borderRadius: 15,
    position: "relative",
  },
  stepContainer: {
    marginTop: 7, // Ajusta este valor para mover el StepIndicator
  },
  time: {
    position: "absolute",
    top: 10,
    right: 10,
    color: COLORS.gray4,
    fontSize: 14,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  steps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    position: 'absolute',
    right: 10,
    bottom: 8,
    padding: 6,
    
    backgroundColor: COLORS.wellow,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.blue,
    fontWeight: "500",
    fontSize: 13,
  },
});

export default ProgramadosPage;
