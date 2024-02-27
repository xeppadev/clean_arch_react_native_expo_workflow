import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TimeHeader from "@/src/Presentation/components/timeHeader";
import { Link, Tabs } from "expo-router";
import { Pressable, Platform, View } from "react-native";
import ScreenHeader from "@/src/Presentation/components/screenHeader";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import DateHeader from "@/src/Presentation/components/screenDay";

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: { backgroundColor:"#f7f7f9" },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          
          headerTitle: '',
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
                    marginRight: 13,
                    marginBottom: 10,
                    opacity: pressed ? 0.5 : 1,
                  }}
                />
                  
                
                )}
              </Pressable>
            </Link>

          ),
          headerLeft: () => <TimeHeader />,
          
          
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          headerTitle: 'Calendar',
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" size={22} color={color} />
          ),
          headerLeft: () => <TimeHeader />,
          
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
          headerTitle: '',
          title: 'add',
          
          tabBarIcon: ({ focused }) => {
            return (
              <Link href="/tecnico/modal"  asChild>
              <Pressable
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0e2572",
                  width: Platform.OS === "ios" ? 50 : 50,
                  height: Platform.OS === "ios" ? 50 : 50,
                  top: Platform.OS === "ios" ? -22 : -22,
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
              </ Pressable>
              </Link>
            )
          },
          
          tabBarLabel: () => {return null},
        }}
       
      />


      <Tabs.Screen

        name="tasks"
        options={{
          headerTitle: 'Tareas',
          title: "Tareas",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="tasks" size={23} color={color} />
          ),
          headerLeft: () => <TimeHeader />,
          headerRight: () => <DateHeader />,
        }}
      />
      <Tabs.Screen
        name="inventary"
        options={{
          headerTitle: 'Inventario',
          title: "Inventario",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="inbox" size={27} color={color} />
          ),
          headerLeft: () => <TimeHeader />,
          headerRight: () => <DateHeader />,
        }}
      />
    </Tabs>
  );
}
