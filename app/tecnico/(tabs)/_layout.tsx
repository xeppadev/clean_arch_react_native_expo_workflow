import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TimeHeader from "@/src/Presentation/components/timeHeader";
import { Link, Tabs } from "expo-router";
import { Pressable, Platform, View, Modal, KeyboardAvoidingView } from "react-native";
import ScreenHeader from "@/src/Presentation/components/screenHeader";
import Colors, { COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import DateHeader from "@/src/Presentation/components/screenDay";
import ModalScreen from "@/src/Presentation/views/tecnico/modal";


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // useState nos permite manejar el estado del modal
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          headerStyle: { backgroundColor: "#f7f7f9" },
          headerShadowVisible: false,
        
          tabBarStyle: {
            height: Platform.OS === 'android' ? 55 : 80, // Aumenta la altura para Android
            position: "absolute",
          },
          tabBarLabelStyle: {
            marginBottom: Platform.OS === 'android' ? 6 : 0, // Reduce el margen inferior para Android
          },
          tabBarIconStyle: {
            marginTop: Platform.OS === 'android' ? 6 : 0, // Reduce el margen superior para Android
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerTitle: "",
            title: "Home",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="home" size={28} color={color} />
            ),
            headerRight: () => (
              <Link href="/tecnico/perfil" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <ScreenHeader
                      role="Técnico"
                      profileName="Pedro Suarez"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 20,
                      }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
            headerLeft: () => (
              <TimeHeader
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            headerTitle: "Calendar",
            title: "Calendar",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="calendar" size={22} color={color} />
            ),
            headerLeft: () => (
              <TimeHeader
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              />
            ),

            headerRight: () => <DateHeader />,
          }}
        />
        <Tabs.Screen
          name="add"
          listeners={{
            tabPress: (e) => {
              // Evita la navegación predeterminada
              e.preventDefault();
            },
          }}
          options={{
            headerTitle: "",
            title: "add",

            tabBarIcon: ({ focused }) => {
              return (
                <Pressable
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:COLORS.blue3,
                  width: Platform.OS === "ios" ? 50 : 50,
                  height: Platform.OS === "ios" ? 50 : 50,
                  top: Platform.OS === "ios" ? -22 : -30,
                  borderRadius: Platform.OS === "ios" ? 25 : 30,
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
                <TabBarIcon name="plus" size={26} color={"white"} />
              </Pressable>
              );
            },

            tabBarLabel: () => {
              return null;
            },
          }}
        />

        <Tabs.Screen
          name="tasks"
          options={{
            headerTitle: "Tareas",
            title: "Tareas",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="tasks" size={23} color={color} />
            ),
            headerLeft: () => (
              <TimeHeader
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              />
            ),
            headerRight: () => <DateHeader />,
          }}
        />
        <Tabs.Screen
          name="inventary"
          options={{
            headerTitle: "Inventario",
            title: "Inventario",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="inbox" size={27} color={color} />
            ),
          
          }}
        />
      </Tabs>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalScreen setModalVisible={setModalVisible} />
      </Modal>
    </View>
    </KeyboardAvoidingView>
  );
}
