import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TimeHeader from "@/src/Presentation/components/timeHeader";
import {  Tabs, useRouter } from "expo-router";
import { Pressable, Platform, View } from "react-native";
import ScreenHeader from "@/src/Presentation/components/screenHeader";
import  { COLORS } from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
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
  const router = useRouter();

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
              <Pressable>
                {({ pressed }) => (
                  <ScreenHeader
                    role={userType === "cliente" ? "Cliente" : ""}
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
          name="mapa"
          options={{
            headerTitle: "",
            title: "Mapa",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="map" size={22} color={color} />
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

            headerRight: () => (
              <Pressable>
                {({ pressed }) => (
                  <ScreenHeader
                    role={userType === "cliente" ? "Cliente" : ""}
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
            ),
          }}
        />

        <Tabs.Screen
          name="vehiculos"
          options={{
            headerTitle: "",
            title: "Vehiculos",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="car" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="configuracion"
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              // Do something with the event
            },
          }}
          options={{
            headerTitle: "",
            title: "Configuracion",
            tabBarIcon: ({ focused, color }) => {
              return (
                <Pressable
                  onPress={() => {
                    router.push("/cliente/perfil");
                  }}
                >
                  <TabBarIcon name="gear" size={25} color={color} />
                </Pressable>
              );
            },
          }}
        />
      </Tabs>
    </View>
  );
}

// Path: app/admin/%28tabs%29/_layout.tsx
