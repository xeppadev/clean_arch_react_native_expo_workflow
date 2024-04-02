import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/Colors";
import { Image } from "react-native";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/images/sistemademapeo.png")}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
        Solicitar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.bg,
  },
  image: {
    width: "80%",
    height: "90%",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  button: {
    backgroundColor: "#0B1C40",
    padding: 13,
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 60,
  },
});
