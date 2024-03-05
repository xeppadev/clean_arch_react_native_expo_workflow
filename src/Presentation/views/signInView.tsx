import useSignInViewModel from "../viewmodels/login/signInViewModel";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import TextInputs from "@/src/Presentation/components/textInput";
import { COLORS } from "@/constants/Colors";

export default function SignIn() {
  const { handleSubmit, formikRef } = useSignInViewModel();

  return (
    <View style={styles.container}>
      <Formik
        innerRef={formikRef}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, errors, touched, values }) => (
          <>
            <Image
              style={styles.image}
              source={require("../../../assets/images/LogoWorkflow.png")}
              resizeMode="contain"
            />

            <TextInputs
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor={COLORS.white}
              keyboardType="email-address"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
            />
            {errors.username && touched.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <TextInputs
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={COLORS.white}
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
          </>
        )}
      </Formik>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => formikRef.current?.handleSubmit()}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image2}
          source={require("../../../assets/images/logoespejo.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingTop: 160,
    flexDirection: "column",
    backgroundColor: "#050E20",
  },

  buttonContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 40,
    marginHorizontal: 38,
  },
  image: {
    width: 128,
    height: 105,
    alignSelf: "center",
    marginTop: 100,
  },

  button: {
    backgroundColor: "#0B1C40",
    padding: 17,
    alignItems: "center",
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 14,
    alignSelf: "flex-end",
    marginRight: 40,
    marginTop: 10,
  },

  input: {
    marginHorizontal: 38, // Margen horizontal de 24
    marginVertical: 10, // Margen vertical de 6
    backgroundColor: "#d9d9d91c", // El fondo es el color de fondo definido en COLORS
    paddingHorizontal: 15, // Padding horizontal de 15
    borderRadius: 14, // Borde redondeado con radio de 14
    fontSize: 14, // Tamaño de fuente de 14
    color: "white", // El color del texto es el color de texto definido en COLORS
    paddingVertical: Platform.OS === "ios" ? 17 : 10,
  },
  image2: {
    width: 100,
    height: 10,
    alignSelf: "center",
    marginBottom: 20,
  },

  imageContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#050E20",
    justifyContent: "flex-end",
  },

  error: {
    color: "red",
    marginHorizontal: 38,
  },
});
