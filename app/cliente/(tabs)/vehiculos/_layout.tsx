import { Stack, Link } from "expo-router";
import { Pressable, Platform } from "react-native";
import ScreenHeader from "@/src/Presentation/components/screenHeader";
import TimeHeader from "@/src/Presentation/components/timeHeader";
import { COLORS } from "@/constants/Colors";
import { useSession } from "@/src/Presentation/hooks/useSession";
export default function AppLayout() {
  const { session, userType } = useSession();
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
            <Link href="/cliente/perfil" asChild>
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
        name="mantenimientos"
        options={{
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? COLORS.bg2 : "transparent",
          },
          headerTitle: "Detalles",
         headerTitleAlign: "center",
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerBlurEffect: "regular",
          headerBackTitle: "Vehiculo",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="unidades"
        options={{
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? COLORS.bg2 : "transparent",
          },
          headerTitle: "",
          headerShown: false,

          headerTransparent: Platform.OS === "ios" ? true : false,
          headerBlurEffect: "regular",
          headerBackTitle: "Vehiculo",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
