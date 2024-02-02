import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import { useEffect } from "react";
import * as Yup from "yup";
import { COLORS } from "../../constants/theme";
import { Formik } from "formik";
import axios from "axios";
import TextInputs from "../../components/mantenimiento/textinput";

import * as SecureStore from 'expo-secure-store';

import { useRouter } from 'expo-router';
const LoginScreen = () => {
  const formikRef = React.useRef();
    const router = useRouter();

  const validationSchema = Yup.object().shape({
    identifier: Yup.string()
      .email("Debe ser un correo electrónico válido.")
      .required("Este campo es requerido.")
      ,
    password: Yup.string()
      .min(5, "La contraseña debe tener al menos 8 caracteres.")
      .required("Este campo es requerido."),
  });

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const token =  await SecureStore.getItemAsync('token');
        if (token) {
          router.replace("/home");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginState();
  }, []);

  const handleLogin = () => {
    const user = {
      identifier: formikRef.current.values.identifier,
      password: formikRef.current.values.password,
    };
   

    axios
      .post("http://192.168.18.204:4000/api/auth/login", user)
      .then((res) => {
        
        const token = res.data.token;
        SecureStore.setItemAsync('token', token);
        router.replace("/home");
      })
      .catch((err) => {
        console.log(err); // Imprime el error completo
        if (err.response) {
          // El servidor respondió con un estado fuera del rango de 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // La solicitud se hizo pero no se recibió ninguna respuesta
          console.log(err.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que provocó un error
          console.log('Error', err.message);
        }
        Alert.alert("Error", "Usuario o contraseña incorrectos");
      });
  };

  return (
    <View style={styles.container}>
      <Formik
        innerRef={formikRef}
        initialValues={{
          identifier: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, errors, touched, values }) => (
          <>
            <Image
              style={styles.image}
              source={require("../../assets/images/LogoWorkflow.png")}
              resizeMode="contain"
            />

            <TextInputs
              style={styles.input}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              onChangeText={handleChange("identifier")}
              onBlur={handleBlur("identifier")}
            />
            {errors.identifier && touched.identifier && (
              <Text style={styles.error}>{errors.identifier}</Text>
            )}
            <TextInputs
              style={styles.input}
              placeholder="Contraseña"
              segurity={true}
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => formikRef.current.handleSubmit()}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image2}
          source={require("../../assets/images/logoespejo.png")}
        />
      </View>
    </View>
  );
};

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
    backgroundColor: COLORS.blue,
    padding: 17,
    alignItems: "center",
    borderRadius: 18,
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
    backgroundColor: "rgba(237, 237, 237, 0.1)", // El fondo es el color de fondo definido en COLORS
    paddingHorizontal: 15, // Padding horizontal de 15
    borderRadius: 14, // Borde redondeado con radio de 14
    fontSize: 14, // Tamaño de fuente de 14
    color: "white", // El color del texto es el color de texto definido en COLORS
    paddingVertical: Platform.OS === "ios" ? 16 : 10,
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

export default LoginScreen;
