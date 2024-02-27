import { Stack,Link } from "expo-router";
import { Pressable, Platform } from "react-native";
import ScreenHeader from "@/src/Presentation/components/screenHeader";
import TimeHeader from "@/src/Presentation/components/timeHeader";
import { COLORS } from "@/constants/Colors";

export default function AppLayout() {
 
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: COLORS.bg,
          },
          headerRight: () => (
            <Link href="/admin/perfil" asChild>
              <Pressable>
                {({ pressed }) => (
                  <ScreenHeader
                  role="Admin"
                  profileName="Jesus Suarez"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
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
      <Stack.Screen
        name="personal"
        options={{
          headerShown: false,
          
        }}
      />
      <Stack.Screen
        name="repuestos"
        options={{
          headerStyle: {
            backgroundColor:Platform.OS === "android" ? COLORS.bg2 : "transparent",
          },
          headerTitle: "Repuestos",
          headerLargeTitle: true,
          headerTransparent: Platform.OS === "ios"? true : false,
          headerBlurEffect: 'regular',
          headerBackTitle : "Historial",
          headerShadowVisible: false,
        }}
      />
       <Stack.Screen
        name="vehiculos"
        options={{
          headerShown: false,
          
         
          
          
          
        }}
      />
       <Stack.Screen
        name="clientes"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="mantenimientos"
        options={{
          headerStyle: {
            backgroundColor:Platform.OS === "android" ? COLORS.bg2 : "transparent",
          },
          headerTitle: "",
         
          
          headerTransparent: Platform.OS === "ios"? true : false,
          headerBlurEffect: 'regular',
          headerBackTitle : "Vehiculo",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}

