// Importamos los componentes necesarios
import TabBarCustomButton from "../../components/common/navbar/TabBarCustomButton";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Platform,
  TouchableHighlight,
  StyleSheet,
  Modal,
  Text,
  
} from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Iconify } from "react-native-iconify";
import React, { useState } from "react";
import { BlurView } from "expo-blur";



// Definimos el componente principal
/**
 * @fileoverview Pantalla principal de la aplicación.
 * @module pages/%28tabs%29/_layout
 * @requires react-native
 * @requires react-native-vector-icons/FontAwesome
 * @requires react-native-element-dropdown
 * @returns {JSX.Element} The rendered component.
 */



export default () => {
  // useRouter nos permite acceder a las funciones de navegación
  const router = useRouter();
  const route = useRoute();
  // useState nos permite manejar el estado del modal
  const [modalVisible, setModalVisible] = useState(false);

  // Renderizamos el componente
  return (
    <View style={{ flex: 1 }}>
       {/* Definimos las pestañas de navegación */}
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#D2DEF8",
            height: Platform.OS == "ios" ? 72 : 60,
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTopWidth: 0,
            borderTopColor: "#fff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            
          },
        }}
      >
        {/* Definimos cada pestaña individualmente */}
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ marginTop: 20 }}>
                 {/* Aquí definimos el icono de la pestaña, que cambia dependiendo de si la pestaña está seleccionada o no */}
                {focused ? (
                  <Iconify
                    icon="solar:home-angle-bold"
                    size={32}
                    color="#0C2049"
                  />
                ) : Platform.OS == "ios" ? (
                  <Iconify
                    icon="solar:home-angle-bold-duotone"
                    size={32}
                    color="#1C49A8"
                  />
                ) : (
                  <Iconify
                    icon="solar:home-angle-bold"
                    size={31}
                    color="#7286AF"
                  />
                )}
              </View>
            ),
            tabBarLabel: "",
          }}
        />
         {/* Repetimos el proceso para cada pestaña */}
        <Tabs.Screen
          name="calendar"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ marginTop: 20 }}>
                {focused ? (
                  <Iconify
                    icon="solar:calendar-bold"
                    size={32}
                    color="#0C2049"
                  />
                ) : Platform.OS == "ios" ? (
                  <Iconify
                    icon="solar:calendar-bold-duotone"
                    size={32}
                    color="#1C49A8"
                  />
                ) : (
                  <Iconify
                    icon="solar:calendar-bold"
                    size={31}
                    color="#7286AF"
                  />
                )}
              </View>
            ),
            tabBarLabel: "",
          }}
        />
          <Tabs.Screen
          name="add"
          options={{
            headerShown: false,

            tabBarButton: (props) => (
              <TouchableHighlight
                {...props}
                underlayColor="transparent"
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0C2049",
                    width: Platform.OS == "ios" ? 50 : 50,
                    height: Platform.OS == "ios" ? 50 : 50,
                    top: Platform.OS == "ios" ? -10 : -25,
                    borderRadius: Platform.OS == "ios" ? 25 : 30,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <Iconify icon="mingcute:add-fill" size={26} color="#fff" />
                </View>
              );
            },
            tabBarLabel: "",
          }}
        />

        
        <Tabs.Screen
          name="tasks"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ marginTop: 20 }}>
                {focused ? (
                  <Iconify
                    icon="solar:document-add-bold"
                    size={32}
                    color="#14367B"
                  />
                ) : Platform.OS == "ios" ? (
                  <Iconify
                    icon="solar:document-add-bold-duotone"
                    size={32}
                    color="#1C49A8"
                  />
                ) : (
                  <Iconify
                    icon="solar:document-add-bold"
                    size={31}
                    color="#7286AF"
                  />
                )}
              </View>
            ),
            tabBarLabel: "",
          }}
        />
        <Tabs.Screen
          name="inventory"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ marginTop: 20 }}>
                {focused ? (
                  <Iconify icon="solar:clipboard-bold" size={32} color="#14367B" />
                ) : Platform.OS == "ios" ? (
                  <Iconify
                    icon="solar:clipboard-bold-duotone"
                    size={32}
                    color="#1C49A8"
                  />
                ) : (
                  <Iconify icon="solar:clipboard-bold" size={31} color="#7286AF" />
                )}
              </View>
            ),
            tabBarLabel: "",
          }}
        />
      </Tabs>
       {/* Definimos el modal que se abre al presionar el botón personalizado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <BlurView
          style={{ flex: 1, justifyContent: "flex-end" }}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        >
          <View style={styles.modalView}>
             {/* Aquí definimos las opciones del modal */}
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#D2DEF8", marginBottom: 10  }}
              onPress={() => {
                setModalVisible(false);
                router.push("/registro-mantenimiento");
              }}
            >
               {/* Aquí definimos el contenido de cada opción */}
              <View style={styles.buttonContent} >
              <Iconify icon="mingcute:tool-fill" size={30} color="#14367B" />
              <Text style={styles.optionText}>Registrar Mantenimiento</Text>
              </View>
            </TouchableHighlight>
            {/* Repetimos el proceso para cada opción */}

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#D2DEF8", marginBottom: 10  }}
              onPress={() => {
                setModalVisible(false);
                router.push("/programar-mantenimiento");
              }}
            >
              <View style={styles.buttonContent} >
              <Iconify icon="solar:calendar-bold" size={30} color="#14367B" />
              <Text style={styles.optionText}>Programar Mantenimiento</Text>
              </View>
            </TouchableHighlight>
             {/* Aquí definimos el botón para cerrar el modal */}

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#14367B" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableHighlight>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilo para el contenedor principal del modal
  centeredView: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: "flex-end", // Alinea el contenido al final del contenedor (abajo)
  },
  // Estilo para el contenedor interno del modal
  modalView: {
    padding: 20, // Espacio interior alrededor del contenido
    justifyContent: 'flex-end', // Alinea el contenido al final del contenedor (abajo)
    flexDirection: 'column', // Organiza el contenido en una columna (verticalmente)
  },
  // Estilo para los botones del modal
  openButton: {
    backgroundColor: "#F194FF", // Color de fondo del botón
    borderRadius: 20, // Redondea las esquinas del botón
    padding: 14, // Espacio interior alrededor del contenido del botón
    elevation: 2, // Crea una sombra alrededor del botón para darle un efecto "elevado"
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
  // Estilo para los botones de opciones en el modal
  optionButton: {
    backgroundColor: "#D2DEF8", // Color de fondo del botón
    borderRadius: 20, // Redondea las esquinas del botón
    padding: 14, // Espacio interior alrededor del contenido del botón
    elevation: 2, // Crea una sombra alrededor del botón para darle un efecto "elevado"
  },
  // Estilo para el texto dentro de los botones de opciones
  optionText: {
    marginLeft: 10, // Espacio a la izquierda del texto
    fontSize: 20, // Tamaño del texto
    color: "#14367B", // Color del texto
    fontWeight: "600", // Grosor del texto
    textAlign: "center", // Alinea el texto al centro del contenedor
  },
  // Estilo para el contenedor del contenido de los botones
  buttonContent: {
    flexDirection: 'row', // Organiza el contenido en una fila (horizontalmente)
    alignItems: 'center', // Alinea verticalmente los elementos en el centro
  },
});
