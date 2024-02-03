import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import TextInputs from "../../components/mantenimiento/textinput";
import TitleIcon from "../../components/mantenimiento/titleIcon";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
const OptionsPage = () => {
  const router = useRouter();
  const formikRef = React.useRef();

  const handleSave = () => {
    // Aquí puedes poner tu lógica para guardar los cambios
    console.log("Guardar cambios");
  };

  const handleLogout = async () => {
    try {
      // Borrar el token de autenticación
      await SecureStore.deleteItemAsync("token");
      router.replace("/login");
      console.log("Cerrar sesión");
    } catch (error) {
      // Error al borrar el token de autenticación
      console.error(error);
    }
  };

  // Define el esquema de validación para el formulario utilizando Yup.
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Este campo es requerido."),
    correo: Yup.string()
      .email("Correo inválido.")
      .required("Este campo es requerido."),
    contraseña: Yup.string().required("Este campo es requerido."),
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={50}
        enableAutomaticScroll={Platform.OS === "ios"}
        style={styles.container3}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container3}
        scrollEnabled={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container2}>
            <Text style={styles.title}>Datos del Perfil</Text>
            <Formik
              innerRef={formikRef}
              initialValues={{
                nombre: "",
                correo: "",
                contraseña: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const dataToSend = {
                  tipoMantenimiento: values.tipoMantenimiento,
                  placa: values.placa,
                  fecha: values.fecha ? values.fecha.toISOString() : null,
                  anotaciones: values.anotaciones,

                };
                console.log(values);
                // refetchPost(dataToSend);
                // redirect();
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <>
                  <TitleIcon title="Nombre y Apellidos" icon="user" />
                  <TextInputs
                    placeholder="Ingrese sus datos actuales"
                    onChangeText={handleChange("nombre")}
                    onBlur={handleBlur("nombre")}
                    value={values.nombre}
                  />
                  {errors.nombre && touched.nombre && (
                    <Text style={styles.error}>{errors.nombre}</Text>
                  )}
                  <TitleIcon title="Correo" icon="envelope" />
                  <TextInputs
                    placeholder="Ingrese su correo actual"
                    onChangeText={handleChange("correo")}
                    onBlur={handleBlur("correo")}
                    value={values.correo}
                  />
                  {errors.correo && touched.nombre && (
                    <Text style={styles.error}>{errors.correo}</Text>
                  )}

                  <TitleIcon title="Contraseña" icon="lock" />
                  <TextInputs
                    placeholder="Ingrese su contraseña actual"
                    onChangeText={handleChange("contraseña")}
                    onBlur={handleBlur("contraseña")}
                    value={values.contraseña}
                  />
                  {errors.contraseña && touched.contraseña && (
                    <Text style={styles.error}>{errors.contraseña}</Text>
                  )}

                  <Button title="Guardar" onPress={handleSave} />
                  <Button title="Cerrar sesión" onPress={handleLogout} />
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 10,
    marginHorizontal: 25,
  },

  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  container3: {
    flexGrow: 1,
    marginBottom: 70,
  },
  container2: {
    marginBottom: Platform === "ios" ? 8 : 13,
    backgroundColor: COLORS.white,
    position: "relative",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default OptionsPage;
