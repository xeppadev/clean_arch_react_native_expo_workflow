import React from "react";
import TextInputs from "../../components/mantenimiento/textinput";
import ModalComponent from "../../components/mantenimiento/modal";
import DocumentComponent from "../../components/mantenimiento/document";
import CalendarComponent from "../../components/mantenimiento/DateTimePicker";
import {
  mantenimientos,
  
} from "../../components/mantenimiento/dataDropdown";
import DropdownComponent from "../../components/mantenimiento/dropdown";
import TitleIcon from "../../components/mantenimiento/titleIcon";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Fetchget from "../../hook/Fetch";
import Fetchpost from "../../hook/Fetch2";


/**
 * RegistroMantenimiento es un componente de React que renderiza un formulario para registrar un mantenimiento.
 *
 * @returns {JSX.Element} El componente RegistroMantenimiento renderizado.
 */
const ProgramarMantenimiento = () => {
  // Define el estado para los tipos de mantenimiento.

  const [refreshing, setRefreshing] = useState(false);

  // Define la actualización de estado para los tipos de mantenimiento.
  const { data, isLoading, error, refetch } = Fetchget("tasks", "placas"); 
 
  
    // Mueve la llamada al hook Fetchpost al nivel superior
    const { refetch: refetchPost, redirect } = Fetchpost("tasks", "programar");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    
    setRefreshing(false)
  }, []);
 
   console.log(data)
   
  const placas = data.map((item) => {
    return {
      label: item,
      value: item,
    }
  })
  // Define el valor actual de las placas.

  // Define el estado para las imágenes y el modal de vista previa de la imagen.
  const formikRef = React.useRef();
  const [images, setImage] = React.useState({
    selectedImage: null,
    isImagePreviewVisible: false,
  });

  // Define el esquema de validación para el formulario utilizando Yup.
  const validationSchema = Yup.object().shape({
    tipoMantenimiento: Yup.string().required("Este campo es requerido."),
    placa: Yup.string().required("Este campo es requerido."),
    fecha: Yup.date()
      .nullable(true)
      .required("Este campo es requerido."),
    anotaciones: Yup.string().required("Este campo es requerido."),
    documentos: Yup.array().min(1, "Debe subir al menos un documento."),
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={50}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        enableAutomaticScroll={Platform.OS === "ios"}
        style={styles.container3}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container3}
        scrollEnabled={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container2}>
            <Text style={styles.title}>Programar Mantenimiento</Text>

            <Formik
              innerRef={formikRef}
              initialValues={{
                tipoMantenimiento: "",
                placa: "",
                fecha: null,
                anotaciones: "",
                documentos: [],
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const dataToSend = {
                  tipoMantenimiento: values.tipoMantenimiento,
                  placa: values.placa,
                  fecha: values.fecha ? values.fecha.toISOString() : null,
                  anotaciones: values.anotaciones,
                };
                console.log(dataToSend);
                refetchPost(dataToSend);
                redirect();
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
                  <TitleIcon title="Tipo de mantenimiento" icon="wrench" />
                  <DropdownComponent
                     onRefresh={onRefresh}
                      refreshing={refreshing}
                    onBlur={() => handleBlur("tipoMantenimiento")}
                    placeholder="Seleccione un mantenimiento"
                    data={mantenimientos}
                    value={values.tipoMantenimiento}
                    onChange={(item) =>
                      handleChange("tipoMantenimiento")(item.value)
                    }
                  />

                  {errors.tipoMantenimiento && touched.tipoMantenimiento && (
                    <Text style={styles.error}>{errors.tipoMantenimiento}</Text>
                  )}

                  <TitleIcon title="Placa de Identificación" icon="car" />

                  <DropdownComponent
                    onBlur={() => handleBlur("placa")}
                    placeholder="Seleccione una placa"
                    data={ placas }
                    value={values.placa}
                    onChange={(item) =>
                      handleChange("placa")(item.value)
                    }
                  />

                  {errors.placa &&
                    touched.placa && (
                      <Text style={styles.error}>
                        {errors.placa}
                      </Text>
                    )}

                  <TitleIcon title="Fecha de Mantenimiento" icon="calendar" />

                  <CalendarComponent
                    values={values}
                    setFieldValue={setFieldValue}
                    onBlur={() => handleBlur("fecha")}
                  />

                  <TitleIcon title=" Observaciones" icon="pencil" />

                  <TextInputs
                    placeholder="Ingrese el diagnostico"
                    onChangeText={handleChange("anotaciones")}
                    onBlur={handleBlur("anotaciones")}
                    value={values.anotaciones}
                  />

                  {errors.anotaciones && touched.anotaciones && (
                    <Text style={styles.error}>{errors.anotaciones}</Text>
                  )}

                  <TitleIcon title="Documentos" icon="file" />

                  <DocumentComponent
                    formikRef={formikRef}
                    setImage={setImage}
                  />

                  {errors.documentos && touched.documentos && (
                    <Text style={styles.error}>{errors.documentos}</Text>
                  )}
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => formikRef.current.handleSubmit()}
      >
        <Text style={styles.buttonText}>Programar</Text>
      </TouchableOpacity>

      <ModalComponent images={images} setImage={setImage} />
    </View>
  );
};

export default ProgramarMantenimiento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container2: {
    marginBottom: Platform === "ios" ? 8 : 13,
    backgroundColor: COLORS.white,
    position: "relative",
  },
  container3: {
    flexGrow: 1,
    marginBottom: 70,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 10,
    marginHorizontal: 25,
  },

  error: {
    color: "red",
    marginHorizontal: 25,
  },

  button: {
    backgroundColor: COLORS.blue2,
    padding: 20,

    alignItems: "center",
    borderRadius: 25,
    width: "90%",
    position: "absolute",
    bottom: 15,
    left: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
