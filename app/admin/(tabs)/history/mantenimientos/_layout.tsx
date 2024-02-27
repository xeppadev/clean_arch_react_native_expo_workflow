import { Stack } from "expo-router";
import { Platform } from "react-native";
import { COLORS } from "@/constants/Colors";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
