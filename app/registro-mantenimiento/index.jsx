// Importa los componentes y módulos necesarios
import React from "react";
import SearchFilter from "../../components/mantenimiento/searchfilter";
import TextInputs from "../../components/mantenimiento/textinput";
import ModalComponent from "../../components/mantenimiento/modal";
import DocumentComponent from "../../components/mantenimiento/document";
import { soat, mantenimientos, placas } from "../../components/mantenimiento/dataDropdown";
import DropdownComponent from "../../components/mantenimiento/dropdown";
import TitleIcon from "../../components/mantenimiento/titleIcon";
import { Text, View, TouchableOpacity, StyleSheet, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Define el componente RegistroMantenimiento
const RegistroMantenimiento = () => {
  // Define el estado y las referencias necesarias
  const formikRef = React.useRef();
  const [images, setImage] = React.useState({ selectedImage: null, isImagePreviewVisible: false });

  // Define el esquema de validación para el formulario utilizando Yup
  const validationSchema = Yup.object().shape({
    tipoMantenimiento: Yup.string().required("Este campo es requerido."),
    placaIdentificacion: Yup.string().required("Este campo es requerido."),
    kmInicial: Yup.string().required("Este campo es requerido."),
    kmFinal: Yup.string().required("Este campo es requerido."),
    observaciones: Yup.string().required("Este campo es requerido."),
    documentos: Yup.array().min(1, "Debe subir al menos un documento."),
    soat: Yup.string().required("Este campo es requerido."),
    cantidad: Yup.array().min(1, "Debe seleccionar al menos un repuesto."),
  });
  
  // Renderiza el componente

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
            <Text style={styles.title}>Registrar Mantenimiento</Text>

            <Formik
              innerRef={formikRef}
              initialValues={{
                tipoMantenimiento: "",
                placaIdentificacion: "",
                kmInicial: "",
                kmFinal: "",
                soat: "",
                observaciones: "",
                cantidad: [],
                documentos: [],
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => console.log(values)}
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
                    onBlur={() => handleBlur("placaIdentificacion")}
                    placeholder="Seleccione una placa"
                    data={placas}
                    value={values.placaIdentificacion}
                    onChange={(item) =>
                      handleChange("placaIdentificacion")(item.value)
                    }
                  />

                  {errors.placaIdentificacion &&
                    touched.placaIdentificacion && (
                      <Text style={styles.error}>
                        {errors.placaIdentificacion}
                      </Text>
                    )}

                  <TitleIcon title="Kilometraje" icon="calendar" />

                  <TextInputs
                    placeholder="Km Inicial"
                    onChangeText={handleChange("kmInicial")}
                    onBlur={handleBlur("kmInicial")}
                    value={values.kmInicial}
                  />

                  {errors.kmInicial && touched.kmInicial && (
                    <Text style={styles.error}>{errors.kmInicial}</Text>
                  )}
                  <TextInputs
                    placeholder="Km Final"
                    onChangeText={handleChange("kmFinal")}
                    onBlur={handleBlur("kmFinal")}
                    value={values.kmFinal}
                  />

                  {errors.kmFinal && touched.kmFinal && (
                    <Text style={styles.error}>{errors.kmFinal}</Text>
                  )}

                  <TitleIcon title="SOAT" icon="id-card" />

                  <DropdownComponent
                    onBlur={() => handleBlur("soat")}
                    placeholder="Seleccione si dispone de soat"
                    data={soat}
                    value={values.soat}
                    onChange={(item) => handleChange("soat")(item.value)}
                  />

                  {errors.soat && touched.soat && (
                    <Text style={styles.error}>{errors.soat}</Text>
                  )}

                  <TitleIcon
                    title=" Diagnostico de Estado de la unidad"
                    icon="pencil"
                  />

                  <TextInputs
                    placeholder="Ingrese el diagnostico"
                    onChangeText={handleChange("observaciones")}
                    onBlur={handleBlur("observaciones")}
                    value={values.observaciones}
                  />

                  {errors.observaciones && touched.observaciones && (
                    <Text style={styles.error}>{errors.observaciones}</Text>
                  )}

                  <TitleIcon title="Solicitar Repuestos" icon="cog" />

                  <SearchFilter
                    value={values.cantidad}
                    onBlur={() => handleBlur("cantidad")}
                    onChange={(newCantidad) =>
                      setFieldValue("cantidad", newCantidad)
                    }
                  />
                  {errors.cantidad && touched.cantidad && (
                    <Text style={styles.error}>{errors.cantidad}</Text>
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
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <ModalComponent images={images} setImage={setImage} />
    </View>
  );
};

// Exporta el componente para que pueda ser utilizado en otros archivos
export default RegistroMantenimiento;

// Exporta el componente para que pueda ser utilizado en otros archivos
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
