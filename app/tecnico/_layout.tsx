import { Redirect, Stack } from "expo-router";
import { useSession } from "@/src/Presentation/hooks/useSession";
import { ActivityIndicator, View, StyleSheet, Platform } from "react-native";
import { COLORS } from "@/constants/Colors";

export default function AppLayout() {
  const { session, isLoading, userType } = useSession();
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );
  }

  // console.log(dataEnd);
  // // Comprueba si el token ha expirado
  // const currentTimestamp = Math.floor(Date.now() / 1000);
  // if (dataEnd && dataEnd < currentTimestamp) {
  //   return <Redirect href="/" />;
  // }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }
  // Check userType and redirect if necessary
  if (userType !== "tecnico") {
    return <Redirect href="/" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="modal"
        options={{ presentation: "transparentModal", headerShown: false }}
      />
      <Stack.Screen
        name="progrmantenimiento"
        options={{
          headerLargeTitle: true,
          headerTitle: "Programar Mantenimiento",
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerBlurEffect: "regular",

          headerLargeTitleStyle: {
            fontSize: 25,
          },
          headerShadowVisible: false,

          headerBackTitle: "Inicio",
        }}
      />

      <Stack.Screen
        name="regismantenimiento"
        options={{
          headerLargeTitle: true,
          headerTitle: "Registrar Mantenimiento",
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerBlurEffect: "regular",

          headerLargeTitleStyle: {
            fontSize: 25,
          },
          headerShadowVisible: false,

          headerBackTitle: "Inicio",
        }}
      />
      <Stack.Screen
        name="perfil"
        options={{
          headerTitle: "",
          headerBackTitleVisible: false, // Esto ocultará el título de la ruta a la que se regresa
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
