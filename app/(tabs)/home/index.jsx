import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { Iconify } from "react-native-iconify";
import CircularProgress from "react-native-circular-progress-indicator";
import { COLORS } from "../../../constants/theme";
import { useRouter } from "expo-router";
import useSocket from "../../../hook/socket_io";
import { SOCKET_URI } from "../../../hook/config";

/**
 * Renderiza la página de inicio de la aplicación.
 * @returns {JSX.Element} La página de inicio renderizada.
 */
const HomePage = () => {
  // Obtiene el objeto router de expo-router para la navegación entre páginas.
  const router = useRouter();
  const socket = useSocket(SOCKET_URI);
  // Obtiene el objeto socket de la conexión a socket.io.
   React.useEffect(() => {
    if (socket == null) return;

    socket.on("server:loadmantenimientos", (mantenimientos) => {
      console.log("Mantenimientos recibidos:", mantenimientos);
      // Puedes hacer lo que quieras con la información recibida aquí
    });

    // Cuando el componente se desmonta, elimina el listener
    return () => {
      socket.off("server:loadmantenimientos");
    };
  }, [socket]); // Dependencia en socket para que se ejecute cada vez que cambie

  return (
    <View style={styles.container}>
      {/* Primera columna de la página de inicio */}
      <View style={styles.column}>
        {/* Primera caja en la primera columna: muestra el número de mantenimientos realizados */}
        <View style={[styles.box, { backgroundColor: COLORS.blue }]}>
          <Text
            style={[styles.title2, { color: COLORS.white, marginBottom: 5 }]}
          >
            Mantenimientos
          </Text>
          <Text
            style={[styles.title2, { color: COLORS.white, marginBottom: 35 }]}
          >
            Realizados
          </Text>
          <CircularProgress
            value={4}
            maxValue={5}
            duration={2000}
            progressValueColor={"#ffffff"}
            radius={62}
            inActiveStrokeOpacity={0.3}
            inActiveStrokeColor={"#1DB65A"}
            valueSuffix={"/5"}
            subtitle="Completos"
            subtitleStyle={{ color: "#ffffff" }}
            valueSuffixStyle={{ fontSize: 14 }}
          />
        </View>
        {/* Segunda caja en la primera columna: navega a la página de programación de mantenimientos al hacer clic */}
        <TouchableOpacity
          style={[styles.box, { backgroundColor: COLORS.white }]}
          onPress={() => {
            router.push("/programar-mantenimiento");
          }}
        >
          <Text
            style={[styles.title2, { color: COLORS.blue, marginBottom: 5 }]}
          >
            Reprogramar
          </Text>
          <Text
            style={[styles.title2, { color: COLORS.blue, marginBottom: 35 }]}
          >
            Mantenimientos
          </Text>
          <Iconify icon="solar:calendar-bold" size={90} color="#0C2049" />
        </TouchableOpacity>
      </View>
      {/* Segunda columna de la página de inicio */}
      <View style={styles.column}>
        {/* Primera caja en la segunda columna: muestra el número de revisiones pendientes */}
        <View style={[styles.box, { backgroundColor: COLORS.wellow }]}>
          <View style={styles.centeredContent}>
            <Text
              style={[styles.title3, { color: COLORS.white, marginTop: 0 }]}
            >
              Revisiones
            </Text>
            <View style={styles.row}>
              <Text style={[styles.bigNumber, { color: COLORS.white }]}>2</Text>
              <Iconify
                icon="eva:alert-triangle-fill"
                size={57}
                color="#0C2049"
              />
            </View>
            <Text style={[styles.title3, { color: COLORS.white }]}>
              Pendientes
            </Text>
          </View>
        </View>
        {/* Segunda caja en la segunda columna: proporciona una opción para contactar con el soporte */}
        <View style={[styles.box, { backgroundColor: COLORS.blue }]}>
          <View style={styles.centeredContent}>
            <Text
              style={[styles.title4, { color: COLORS.white, marginTop: 0 }]}
            >
              Soporte
            </Text>
            <Iconify
              icon="solar:dialog-2-bold-duotone"
              size={76}
              color="#FFFFFF"
            />
            <Text style={[styles.title5, { color: COLORS.white }]}>
              Contáctanos
            </Text>
          </View>
        </View>
        {/* Tercera caja en la segunda columna: proporciona una opción para reportar una emergencia */}
        <View style={[styles.box, { backgroundColor: COLORS.red }]}>
          <View style={styles.centeredContent}>
            <Text
              style={[styles.title4, { color: COLORS.redst, marginTop: 0 }]}
            >
              Reportar Emergencia
            </Text>
            <Iconify icon="solar:danger-bold" size={76} color="#910C0C" />
          </View>
        </View>
      </View>
    </View>
  );
};

// Define los estilos utilizados en este componente.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: Platform.OS === "ios" ? 90 : 80,
    padding: 10,
    backgroundColor: COLORS.bg,
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
  },
  box: {
    flex: 1,
    borderRadius: 15,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",

    alignSelf: "center",
    marginBottom: 35,
  },
  title2: {
    fontSize: 18,
    fontWeight: "600",

    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
  },
  bigNumber: {
    marginLeft: 4,
    marginBottom: 4,
    fontSize: 50,
    fontWeight: "bold",
    marginRight: 44,
  },

  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  title3: {
    fontSize: 18,
    fontWeight: "600",

    alignSelf: "flex-start",
  },
  title4: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 25,

    alignSelf: "flex-start",
  },
  title5: {
    fontSize: 14,
    fontWeight: "500",

    alignSelf: "flex-start",
  },
});

// Exporta el componente HomePage para que pueda ser utilizado en otros archivos.
export default HomePage;
