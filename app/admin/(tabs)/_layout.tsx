import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TimeHeader from "@/src/Presentation/components/timeHeader";
import { Link, Tabs } from "expo-router";
import { Pressable, Platform, View, Modal } from "react-native";
import ScreenHeader from "@/src/Presentation/components/screenHeader";
import Colors, { COLORS } from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import DateHeader from "@/src/Presentation/components/screenDay";
import ModalScreen from "@/src/Presentation/views/admin/modal";
import { useSession } from "@/src/Presentation/hooks/useSession";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { session, userType } = useSession();

  // useState nos permite manejar el estado del modal
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.blue3,

          headerShown: useClientOnlyValue(false, true),
          headerStyle: { backgroundColor: "#f7f7f9" },
          headerShadowVisible: false,
          tabBarStyle: {
            height: Platform.OS === "android" ? 55 : 80, // Aumenta la altura para Android
          },
          tabBarLabelStyle: {
            marginBottom: Platform.OS === "android" ? 6 : 0, // Reduce el margen inferior para Android
          },
          tabBarIconStyle: {
            marginTop: Platform.OS === "android" ? 6 : 0, // Reduce el margen superior para Android
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
              <Link href="/admin/perfil" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <ScreenHeader
                      role={userType === "admin" ? "Admin" : ""}
                      profileName={session?.toString() ?? "Usuario"}
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
            headerTitle: "",
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
                    backgroundColor: COLORS.blue3,
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
          name="history"
          options={{
            headerTitle: "",
            title: "History",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="list-alt" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            headerTitle: "Estadísticas",
            title: "Statistics",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="bar-chart-o" size={25} color={color} />
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
  );
}

// Path: app/admin/%28tabs%29/_layout.tsx
