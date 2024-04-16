import { StyleSheet, Pressable, Platform, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { DowloandReporte } from "@/src/Data/api/reporte";
import { useSession } from "@/src/Presentation/hooks/useSession";

const fechaDesde= "2022-01-01"
const fechaHasta= "3000-12-31"
export default function HomeView() {
  const router = useRouter();
  const { session, userType } = useSession();
  return (
    <View style={styles.container}>
      {/* Primera columna de la página de inicio */}
      <View style={styles.column}>
        {/* Primera caja en la primera columna: muestra el número de mantenimientos realizados */}
        <Pressable
          style={[
            styles.box,
            {
              backgroundColor: COLORS.blue3,
              shadowOpacity: 0.4,
              shadowRadius: 5,
              shadowOffset: { height: 2, width: 0 },
              elevation: 5,
            },
          ]}
          onPress={() => {
            router.push("/cliente/vehiculos");
          }}
        >
          <Text
            style={[styles.title2, { color: COLORS.white, marginBottom: 5 }]}
          >
            Unidades
          </Text>
          <Text
            style={[styles.title2, { color: COLORS.white, marginBottom: 35 }]}
          >
            Vehiculares
          </Text>
          <Iconify icon="bxs:car" size={90} color={COLORS.white} />
        </Pressable>
        {/* Segunda caja en la primera columna: navega a la página de programación de mantenimientos al hacer clic */}
        <Pressable
          style={[
            styles.box,
            {
              backgroundColor: COLORS.white,
              shadowColor: "#d5d5d5",
              shadowOpacity: Platform.OS === "ios" ? 0.5 : 0.8,
              shadowRadius: 5,
              shadowOffset: { height: 2, width: 0 },
              elevation: 5,
            },
          ]}
          onPress={() => {
            router.push("/cliente/mapa");
          }}
        >
          <Text
            style={[styles.title2, { color: COLORS.blue3, marginBottom: 5 }]}
          >
            Rastreo
          </Text>
          <Text
            style={[styles.title2, { color: COLORS.blue3, marginBottom: 35 }]}
          >
            GPS
          </Text>
          <Iconify icon="jam:gps-f" size={90} color={COLORS.blue3} />
        </Pressable>
      </View>
      {/* Segunda columna de la página de inicio */}
      <View style={styles.column}>
        {/* Primera caja en la segunda columna: muestra el número de revisiones pendientes */}
        <Pressable
          style={[
            styles.box,
            {
              backgroundColor: COLORS.wellow,
              shadowOpacity: 0.25,
              shadowRadius: 5,
              shadowOffset: { height: 2, width: 0 },
              elevation: 5,
            },
          ]}
          onPress={() => {
            DowloandReporte(session?.toString() ?? "", fechaDesde,fechaHasta, "reporte.pdf");
          }}
        >
          <View
            style={[styles.centeredContent, { backgroundColor: COLORS.wellow }]}
          >
            <Text
              style={[styles.title3, { color: COLORS.white, marginTop: 0 }]}
            >
              Generar
            </Text>
            <Text
              style={[styles.title3, { color: COLORS.white, marginTop: 0 }]}
            >
              Reporte
            </Text>
            <View style={[styles.row, { backgroundColor: COLORS.wellow }]}>
              <Iconify
                icon="solar:folder-bold"
                size={70}
                color={COLORS.white}
              />
            </View>
          </View>
        </Pressable>
        {/* Segunda caja en la segunda columna: proporciona una opción para contactar con el soporte */}
        <Pressable
          style={[
            styles.box,
            {
              backgroundColor: COLORS.blue3,
              shadowOpacity: 0.4,
              shadowRadius: 5,
              shadowOffset: { height: 2, width: 0 },
              elevation: 5,
            },
          ]}
          onPress={() => {
            router.push("https://api.whatsapp.com/send/?phone=%2B51933735851&text&type=phone_number&app_absent=0")
          }}
        >
          <View
            style={[styles.centeredContent, { backgroundColor: COLORS.blue3 }]}
          >
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
        </Pressable>
        {/* Tercera caja en la segunda columna: proporciona una opción para reportar una emergencia */}
        <Pressable
          style={[
            styles.box,
            {
              backgroundColor: COLORS.red,
              shadowColor: COLORS.red,
              shadowOpacity: 0.2,
              shadowRadius: 4,
              shadowOffset: { height: 2, width: 0 },
              elevation: 5,
            },
          ]}
          onPress={() => 
            router.push("/cliente/emergencia")
          }
        >
          <View
            style={[styles.centeredContent, { backgroundColor: COLORS.red }]}
          >
            <Text
              style={[styles.title4, { color: COLORS.redst, marginTop: 0 }]}
            >
              Reportar Emergencia
            </Text>
            <Iconify icon="solar:danger-bold" size={76} color="#910C0C" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

// Define los estilos utilizados en este componente.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  title2: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
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
    fontFamily: "Inter_600SemiBold",
  },

  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  title3: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    alignSelf: "flex-start",
  },
  title4: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 25,
    fontFamily: "Inter_600SemiBold",
    alignSelf: "flex-start",
  },
  title5: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter_600SemiBold",
    alignSelf: "flex-start",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});
