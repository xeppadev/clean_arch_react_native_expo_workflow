import * as React from "react";
import { Platform, StyleSheet, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Iconify } from "react-native-iconify";
import { COLORS } from "@/constants/Colors";

type ModalScreenProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalScreen: React.FC<ModalScreenProps> = ({ setModalVisible }) => {
  const router = useRouter();
  return (
    <BlurView
      style={styles.container}
      tint="light"
      intensity={Platform.OS === "ios" ? 20 : 90}
    >
      <View style={styles.modalView}>
        {/* Aquí definimos las opciones del modal */}

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "rgba(147, 176, 237, 0.8)" // Color cuando el botón está presionado
                : Platform.OS === "ios"
                ? "rgba(147, 176, 237, 0.85)"
                : "rgba(147, 176, 237, 1)", // Color normal
            },

            styles.openButton,
            {
              justifyContent: "flex-start",
              marginTop: 25,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
           
            },
          ]}
          onPress={() => {
            setModalVisible(false);
            router.push("/admin/progrmantenimiento");
          }}
        >
          <Iconify icon="solar:calendar-bold" size={25} color={COLORS.blue} />
          <Text style={styles.optionText}>Programar Mantenimiento</Text>
        </Pressable>
        {/* Aquí definimos el botón para cerrar el modal */}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "rgba(147, 176, 237, 0.8)" // Color cuando el botón está presionado
                : Platform.OS === "ios"
                ? "rgba(147, 176, 237, 0.85)"
                : "rgba(147, 176, 237, 1)", // Color normal
            },
            styles.openButton,
            {
              justifyContent: "flex-start",
              
            },
          ]}
          onPress={() => {
            setModalVisible(false);
            router.push("/admin/regisunidad");
          }}
        >
          {/* Aquí definimos el contenido de cada opción */}

          <Iconify
            icon="solar:clipboard-text-bold"
            size={25}
            color={COLORS.blue}
          />
          <Text style={styles.optionText}>Registrar Unidad</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "rgba(147, 176, 237, 0.8)" // Color cuando el botón está presionado
                : Platform.OS === "ios"
                ? "rgba(147, 176, 237, 0.85)"
                : "rgba(147, 176, 237, 1)", // Color normal
            },
            styles.openButton,
            {
              justifyContent: "flex-start",
              marginBottom: 15,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
          ]}
          onPress={() => {
            setModalVisible(false);
            router.push("/admin/registrarfactura");
          }}
        >
          {/* Aquí definimos el contenido de cada opción */}

          <Iconify icon="solar:file-text-bold" size={25} color={COLORS.blue} />
          <Text style={styles.optionText}>Registrar Facturacion</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.openButton,
            {
              backgroundColor: pressed
                ? "rgba(6, 15, 66, 0.9)" // Color cuando el botón está presionado
                : "rgba(6, 15, 66, 1)", // Color normal
            },
            { borderRadius: 18 },
          ]}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text style={styles.textStyle}>Cancelar</Text>
        </Pressable>
        {/* Repetimos el proceso para cada opción */}
      </View>
    </BlurView>
  );
};
export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Toma todo el espacio disponible
    alignItems: "center", // Alinea el contenido al centro horizontalmente
    justifyContent: "flex-end", // Alinea el contenido al centro verticalmente
  },
  modalView: {
    flexDirection: "column", // Organiza el contenido en una columna (verticalmente)
    backgroundColor: "transparent", // Color de fondo del modal
    width: "100%", // Ancho del modal
    paddingHorizontal: 20, // Espacio interior a los lados del contenido

    paddingBottom: 25, // Espacio inferior del contenido
    paddingTop: 25, // Espacio superior del contenido
  },
  openButton: {
    padding: 18, // Espacio interior alrededor del contenido del botón
    
    flexDirection: "row", // Organiza el contenido en una fila (horizontalmente)
    alignItems: "center", // Alinea verticalmente los elementos en el centro
    justifyContent: "center", // Alinea horizontalmente los elementos en el centro
  },
  // Estilo para el texto dentro de los botones
  textStyle: {
    fontSize: 20, // Tamaño del texto
    color: "white", // Color del texto
    fontWeight: "bold", // Grosor del texto
    textAlign: "center", // Alinea el texto al centro del contenedor
  },
  // Estilo para el texto dentro del modal
  modalText: {
    marginBottom: 15, // Espacio debajo del texto
    textAlign: "center", // Alinea el texto al centro del contenedor
  },
  // Estilo para el texto dentro de los botones de opciones
  optionText: {
    paddingLeft: 7, // Espacio a la izquierda del texto
    fontSize: 20, // Tamaño del texto
    color: COLORS.blue, // Color del texto
    fontWeight: "600", // Grosor del texto
    textAlign: "center", // Alinea el texto al centro del contenedor
  },
  titlemodal: {
    justifyContent: "flex-start", // Alinea el contenido al centro horizontalmente
    fontSize: 20, // Tamaño del texto
    color: COLORS.blue, // Color del texto
    fontWeight: "600", // Grosor del texto
    textAlign: "center", // Alinea el texto al centro del contenedor
  },
});