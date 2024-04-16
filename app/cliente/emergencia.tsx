import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import React from "react";


import { Formik, FormikProps } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "@/constants/Colors";
import TitleIcon from "@/src/Presentation/components/titleIcon";

import { EnviarEmergenciaViewModel } from "@/src/Presentation/viewmodels/emergencia/onSubmitEmergencia";

export default function SessionScreen() {
  const formikRef = React.useRef<
    FormikProps<{
      textoEmergencia: string;
    }>
  >(null);

  // Define las mutaciones de Apollo Client para programar un perfil.
  const viewModelperfil = new EnviarEmergenciaViewModel();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container3}
        scrollEnabled
        contentInsetAdjustmentBehavior="automatic"
        enableOnAndroid
        style={styles.container3}
        enableAutomaticScroll={Platform.OS === "ios"}
        extraScrollHeight={50}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container2}>
            <Formik
              innerRef={formikRef}
              initialValues={{
                textoEmergencia: "",
              }}
              onSubmit={viewModelperfil.onSubmit.bind(viewModelperfil)}
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
                  <TitleIcon title="Descripcion de la emergencia" icon="pencil" />

                  <TextInput
                    multiline   
                    numberOfLines={4}                                    
                    onChangeText={handleChange("textoEmergencia")}
                    onBlur={handleBlur("textoEmergencia")}
                    value={values.textoEmergencia}
                    style={[styles.multilineText, styles.textInput]}
                  />

                  {errors.textoEmergencia && touched.textoEmergencia && (
                    <Text style={styles.error}>{errors.textoEmergencia}</Text>
                  )}
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => formikRef.current?.handleSubmit()}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container3: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  container2: {
    backgroundColor: COLORS.white,
    position: "relative",
  },

  error: {
    color: "red",
    marginHorizontal: 25,
  },

  button: {
    backgroundColor: COLORS.redst,
    padding: 20,
    alignItems: "center",
    borderRadius: 25,
    width: "90%",
    position: "absolute",
    bottom: Platform.OS === "ios" ? 15 : 0,
    left: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  multilineText: {
    minHeight: 200,
    textAlignVertical: "top",
  },
  textInput: {
    backgroundColor: COLORS.bg, // El fondo es el color de fondo definido en COLORS
    paddingHorizontal: 15, // Padding horizontal de 15
    borderRadius: 12, // Borde redondeado con radio de 14
    fontSize: 14, // Tamaño de fuente de 14
    marginHorizontal: 24, // Margen horizontal de 24
    marginVertical: 6, // Margen vertical de 6
    paddingVertical: Platform.OS === "ios" ? 16 : 10,
  },
});
