import { StyleSheet, Pressable, Platform, Text, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { useHomeMantenimientosViewModel } from "../../viewmodels/mantenimientos/homeManteViewModel";
import CircularProgress from "react-native-circular-progress-indicator";


const nowFormatted = new Date().toISOString();
export default function HomeView() {
  const { data, loading, error } = useHomeMantenimientosViewModel(nowFormatted);

  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.blue3} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Primera columna de la página de inicio */}
      <View style={styles.column}>
        {/* Primera caja en la primera columna: muestra el número de mantenimientos realizados */}
        <View
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
        >
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
            key={1}
            value={data?.cantidadCompletada ?? 0}
            maxValue={data?.cantidadTotal ?? 0}
            duration={2000}
            progressValueColor="#ffffff"
            radius={62}
            inActiveStrokeOpacity={0.3}
            inActiveStrokeColor="#4dd180"
            valueSuffix={loading ? "/0" : `/${data?.cantidadTotal}` ?? "/0"}
            subtitle="Completos"
            subtitleStyle={{ color: "#ffffff" }}
            valueSuffixStyle={{ fontSize: 14 }}
          />
        </View>
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
            router.push("/tecnico/progrmantenimiento");
          }}
        >
          <Text
            style={[styles.title2, { color: COLORS.blue3, marginBottom: 5 }]}
          >
            Programar
          </Text>
          <Text
            style={[styles.title2, { color: COLORS.blue3, marginBottom: 35 }]}
          >
            Mantenimiento
          </Text>
          <Iconify icon="solar:calendar-bold" size={90} color={COLORS.blue3} />
        </Pressable>
      </View>
      {/* Segunda columna de la página de inicio */}
      <View style={styles.column}>
        {/* Primera caja en la segunda columna: muestra el número de revisiones pendientes */}
        <View
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
        >
          <View
            style={[styles.centeredContent, { backgroundColor: COLORS.wellow }]}
          >
            <Text
              style={[styles.title3, { color: COLORS.white, marginTop: 0 }]}
            >
              Revisiones
            </Text>
            <View style={[styles.row, { backgroundColor: COLORS.wellow }]}>
              <Text style={[styles.bigNumber, { color: COLORS.white }]}>
                {data?.cantidadRevision ?? 0}
              </Text>
              <Iconify
                icon="eva:alert-triangle-fill"
                size={57}
                color={COLORS.blue3}
              />
            </View>
            <Text style={[styles.title3, { color: COLORS.white }]}>
              Pendientes
            </Text>
          </View>
        </View>
        {/* Segunda caja en la segunda columna: proporciona una opción para contactar con el soporte */}
        <View
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
        </View>
        {/* Tercera caja en la segunda columna: proporciona una opción para reportar una emergencia */}
        <View
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
        </View>
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
