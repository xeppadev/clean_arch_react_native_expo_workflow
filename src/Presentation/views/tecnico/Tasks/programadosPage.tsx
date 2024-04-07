import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Platform,
  Modal,
} from "react-native";
import { COLORS } from "@/constants/Colors";
import React from "react";
import { Iconify } from "react-native-iconify"; // Asegúrate de instalar esta librería
import { HomeMantDto } from "@/src/generated/graphql";
import StepIndicator from "@fcxlabs/react-native-step-indicator";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "expo-router";
// Define el tipo para los props de ProgramadosPage
interface ProgramadosPageProps {
  data: (HomeMantDto | null | undefined)[];
}

/**
 * ProgramadosPage es un componente de React que renderiza la página de programados.
 *
 * @returns {JSX.Element} El componente ProgramadosPage renderizado.
 */

const ProgramadosPage: React.FC<ProgramadosPageProps> = ({
  data,
}): JSX.Element => {
  // Define el hook para el enrutador
  const router = useRouter();
  // Ordena los datos por fecha
   const sortedData = [...data].sort(
      (a, b) => new Date(b?.fecha).getTime() - new Date(a?.fecha).getTime()
    );
  // Renderiza el componente

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {sortedData.map((item, index) => {
        // Parse the date from ISO format
        const data = parseISO(item?.fecha);
        // Format the date
        const formattedDate = format(data, "dd MMMM yyyy", { locale: es });
        // Format 12:00PM
        const formattedTime = format(data, "hh:mm a");
        // Estado para la posición actual en el indicador de pasos

        let currentPosition = 0;

        switch (item?.estado) {
          case "programado":
            currentPosition = 0;
            break;
          case "revision":
          case "pendiente":
            currentPosition = 1;
            break;
          case "aprobado":
          case "denegado":
            currentPosition = 2;
            break;
          case "completado":
            currentPosition = 3;
            break;
          default:
            currentPosition = 0;
        }
        const label =
          item?.estado === "revision"
            ? ["Programado", "Revision", "Aprobado", "Completado"]
            : item?.estado === "denegado"
            ? ["Programado", "Pendiente", "Denegado", "Completado"]
            : ["Programado", "Pendiente", "Aprobado", "Completado"];

        const colorcurrent =
          item?.estado === "completado" || item?.estado === "aprobado"
            ? COLORS.green
            : COLORS.wellow;

        // Estilos personalizados para el indicador de pasos
        const customStyles = {
          stepIndicatorSize: 25,
          currentStepIndicatorSize: 30,
          separatorStrokeWidth: 3,
          currentStepStrokeWidth: 3,
          stepStrokeCurrentColor: colorcurrent,
          stepStrokeWidth: 3,
          stepStrokeFinishedColor: colorcurrent,
          stepStrokeUnFinishedColor: "#3A4759",
          separatorFinishedColor: colorcurrent,
          separatorUnFinishedColor: "#3A4759",
          stepIndicatorFinishedColor: colorcurrent,
          stepIndicatorUnFinishedColor: COLORS.blue3,
          stepIndicatorCurrentColor: COLORS.blue3,
          stepIndicatorLabelFontSize: 13,
          currentStepIndicatorLabelFontSize: 13,
          stepIndicatorLabelCurrentColor: "#FDD543",
          stepIndicatorLabelFinishedColor: colorcurrent,
          stepIndicatorLabelUnFinishedColor: "#e4e4e4",
          labelColor: "#e4e4e4",
          labelSize: 13,
          currentStepLabelColor: colorcurrent,
        };

        return (
          <View key={index} style={styles.card}>
            <Text style={styles.time}>{formattedTime}</Text>
            <Text style={styles.title}>{item?.placa}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            <View style={styles.stepContainer}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={label} // Etiquetas para los pasos
                stepCount={4} // Cantidad de pasos
                renderStepIndicator={({ position, stepStatus }) => {
                  if (stepStatus === "current" || stepStatus === "finished") {
                    if (label[position] === "Programado") {
                      return (
                        <Iconify
                          icon="ion:list-circle-sharp"
                          size={item?.estado === "programado" ? 30 : 18}
                          color={
                            item?.estado === "programado"
                              ? COLORS.wellow
                              : COLORS.blue3
                          }
                        />
                      ); // Icono para el paso actual
                    } else if (label[position] === "Revision") {
                      return (
                        <Iconify
                          icon="solar:danger-circle-bold"
                          size={item?.estado === "revision" ? 30 : 15}
                          color={
                            item?.estado === "revision"
                              ? COLORS.wellow
                              : COLORS.blue3
                          }
                        />
                      ); // Icono para el paso actual
                    } else if (label[position] === "Pendiente") {
                      return (
                        <Iconify
                          icon="solar:clock-circle-bold"
                          size={item?.estado === "pendiente" ? 30 : 15}
                          color={
                            item?.estado === "pendiente"
                              ? COLORS.wellow
                              : COLORS.blue3
                          }
                        />
                      ); // Icono para el paso actual
                    } else if (label[position] === "Aprobado") {
                      return (
                        <Iconify
                          icon="el:ok-sign"
                          size={item?.estado === "aprobado" ? 25 : 15}
                          color={item?.estado === "aprobado" ? COLORS.green : COLORS.blue3}
                        />
                      ); // Icono para el paso actual
                    } else if (label[position] === "Denegado") {
                      return (
                        <Iconify
                          icon="solar:close-circle-bold"
                          size={item?.estado === "denegado" ? 30 : 17}
                          color={COLORS.wellow}
                        />
                      ); // Icono para el paso actual
                    } else if (label[position] === "Completado") {
                      return (
                        <Iconify
                          icon="el:ok-sign"
                          size={item?.estado === "completado" ? 25 : 15}
                          color={item?.estado === "completado" ? COLORS.green : COLORS.blue3}
                        />
                      ); // Icono para el paso actual
                  }
                }
                  return null;
                }}
              />
            </View>

            {item?.estado === "aprobado" ||
            item?.estado === "revision" ||
            item?.estado === "denegado" ? (
              <TouchableHighlight
                style={[styles.button, { backgroundColor: colorcurrent }]}
                onPress={() => {
                  router.push("/tecnico/" + item?._id);
                }}
              >
                <Text style={styles.buttonText}>Detalles</Text>
              </TouchableHighlight>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

// Estilos para el componente utilizando StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.bg,
  },
  card: {
    flex: 1,
    padding: Platform.OS === "ios" ? 15 : 15,
    paddingBottom: 47,
    backgroundColor: COLORS.blue3,
    marginTop: 4,
    marginBottom: 12,
    borderRadius: 15,
    position: "relative",
  },
  stepContainer: {
    marginTop: 7, // Ajusta este valor para mover el StepIndicator
  },
  time: {
    position: "absolute",
    top: 15,
    right: 15,
    color: "#e4e4e4",
    fontSize: 14,
    fontWeight: "500",
  },
  title: {
    color: "#e4e4e4",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#e4e4e4",
    marginBottom: 10,
    fontWeight: "500",
  },
  steps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    position: "absolute",
    right: 15,
    bottom: 10,
    padding: 6,

    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.blue,
    fontWeight: "500",
    fontSize: 13,
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    marginBottom: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.blue3,
    borderTopRightRadius: 20,
    borderTopStartRadius: 20,
    padding: 20,
    paddingBottom: 10,

    shadowColor: COLORS.blue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  titlemodal: {
    fontSize: 20,
    fontWeight: "600",

    color: COLORS.graymodal,
  },
  container3: {
    flexGrow: 1,
    marginBottom: 10,
  },
});

export default React.memo(ProgramadosPage);
