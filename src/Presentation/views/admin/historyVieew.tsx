import { StyleSheet, Pressable, Platform } from "react-native";

import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function HistoryView() {
  return (
    <View style={styles.container} lightColor="#f7f7f9" darkColor="#f7f7f9">
      {/* Primera columna de la página de inicio */}
      <View style={styles.column} lightColor="#f7f7f9" darkColor="#f7f7f9">
        {/* Primera caja en la primera columna: muestra el número de mantenimientos realizados */}
        <Link
          href="/admin/history/vehiculos"
          style={[
            styles.box,
            {
              backgroundColor: COLORS.bluelg,
              shadowColor: "#d5d5d5",
              shadowOpacity: Platform.OS === "ios" ? 0.5 : 0.8,
              shadowRadius: 5,
              shadowOffset: { height: 2, width: 0 },
              elevation: 5,
            },
          ]}
          asChild
        >
        <Pressable>
          <Text
            style={[styles.title2, { color: COLORS.white, marginBottom: 5 }]}
          >
            Vehiculos
          </Text>
          <Iconify icon="bxs:car" size={90} color={COLORS.white} />
          </Pressable>
        </Link>

        <Link
          href="/admin/history/clientes"
          style={[
            styles.box,
            {
              backgroundColor: "#dfe8fa",
              shadowColor: "#d5d5d5",
              shadowOpacity: Platform.OS === "ios" ? 0.2 : 0.5,
              shadowRadius: 1,
              shadowOffset: { height: 2, width: 0 },
              elevation: 2,
            },
          ]}
          asChild
        >
          <Pressable>
            <Text
              style={[styles.title2, { color: COLORS.blue, marginBottom: 10 }]}
            >
              Clientes
            </Text>

            <Iconify icon="solar:shop-2-bold" size={90} color="#0e2572" />
          </Pressable>
        </Link>
      </View>
      {/* Segunda columna de la página de inicio */}
      <View style={styles.column} lightColor="#f7f7f9" darkColor="#f7f7f9">
        {/* Primera caja en la primera columna: muestra el número de mantenimientos realizados */}
        
         <Link
          href="/admin/history/repuestos"
          style={[
            styles.box,
            {
              backgroundColor: COLORS.blue,
              shadowColor: "#dfe8fa",
              shadowOpacity: Platform.OS === "ios" ? 0.3 : 0.8,
              shadowRadius: 5,
              shadowOffset: { height: 2, width: 0 },
              elevation: 5,
            },
          ]}
          asChild
        >
          <Pressable>
          <Text
            style={[styles.title2, { color: COLORS.white, marginBottom: 10 }]}
          >
            Repuestos
          </Text>
          <Iconify icon="mingcute:tool-fill" size={90} color={COLORS.white} />
          </Pressable>
        </Link>
        {/* Segunda caja en la primera columna: navega a la página de programación de mantenimientos al hacer clic */}
        <Link
          href="/admin/history/personal"
          style={[
            styles.box,
            {
              backgroundColor:COLORS.white,
              shadowColor: COLORS.gray3,
              shadowOpacity: Platform.OS === "ios" ? 0.3 : 0.8,
              shadowRadius: 2,
              shadowOffset: { height: 2, width: 0 },
              elevation: 2,
            },
          ]}
          asChild
        >
          <Pressable>
            <Text
              style={[styles.title2, { color: COLORS.blue, marginBottom: 10 }]}
            >
              Personal
            </Text>

            <Iconify
              icon="flowbite:users-solid"
              size={90}
              color={COLORS.blue}
            />
          </Pressable>

        </Link>
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
