import React, { useEffect, useMemo } from "react";
import TextInputs from "@/src/Presentation/components/textInput";
import ModalComponent from "@/src/Presentation/components/modalFiles";
import DocumentComponent from "@/src/Presentation/components/document";
import CalendarComponent from "@/src/Presentation/components/calendar";
import DropdownComponent from "@/src/Presentation/components/dropdown";
import TitleIcon from "@/src/Presentation/components/titleIcon";
import { FormikProps } from "formik";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  RefreshControl,
  ScrollView,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS } from "@/constants/Colors";

import { format } from "date-fns";

const mantenimientos = [
  { label: "Mantenimiento Preventivo", value: "Mantenimiento Preventivo" },
  { label: "Mantenimiento Predictivo", value: "Mantenimiento Predictivo" },
  { label: "Mantenimiento Correctivo", value: "Mantenimiento Correctivo" },
];

const placas = [
  { label: "FPG-636", value: "FPG-636" },
  { label: "FRE-633", value: "FRE-633" },
  { label: "IRE-634", value: "IRE-634" },
];

/**
 * RegistroMantenimiento es un componente de React que renderiza un formulario para registrar un mantenimiento.
 *
 * @returns {JSX.Element} El componente RegistroMantenimiento renderizado.
 */

const ProgramarMantenimiento = () => {
  // Define el estado para los tipos de mantenimiento.
  // Define el estado para las imágenes y el modal de vista previa de la imagen.
  const formikRef = React.useRef<
    FormikProps<{
      tipoMantenimiento: string;
      placa: string;
      fecha: string | Date;
      anotaciones: string;
      files: any[];
    }>
  >(null);

  const [images, setImage] = React.useState<{
    selectedImage: string | null;
    isImagePreviewVisible: boolean;
  }>({
    selectedImage: null,
    isImagePreviewVisible: false,
  });
  //   const [refreshing, setRefreshing] = React.useState(false)
  //   const [placasstate, setPlacas] = React.useState([])

  //   // Define la actualización de estado para los tipos de mantenimiento.
  //   const { data, refetch } = Fetchget("tasks", "placas");

  //   // Mueve la llamada al hook Fetchpost al nivel superior
  //   const { refetch: refetchPost, redirect } = Fetchpost(
  //     "tasks",
  //     "programar",
  //     "formData"
  //   );

  //   const onRefresh = React.useCallback(() => {
  //     setRefreshing(true)
  //     refetch()

  //     setRefreshing(false)
  //   }, [])
  //   useEffect(() => {
  //     console.log("placas", data)

  //     // Define las placas de identificación
  //     const placas = () =>
  //       data.map(item => {
  //         return {
  //           label: item,
  //           value: item,
  //         }
  //       })
  //     setPlacas(placas)
  //   }, [data])

  // Define el valor actual de las placas.

  // Define el esquema de validación para el formulario utilizando Yup.
  const validationSchema = Yup.object().shape({
    tipoMantenimiento: Yup.string().required("Este campo es requerido."),
    placa: Yup.string().required("Este campo es requerido."),
    fecha: Yup.date().nullable().required("Este campo es requerido."),
    anotaciones: Yup.string().required("Este campo es requerido."),
    files: Yup.array().min(1, "Debe subir al menos un documento."),
  });

  return (
    <View style={{backgroundColor:COLORS.white, flex:1}}>
      <ScrollView
        style={styles.container}
        scrollEnabled
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container2}>
            <Formik
              innerRef={formikRef}
              initialValues={{
                tipoMantenimiento: "",
                placa: "",
                fecha: "",
                anotaciones: "",
                files: [],
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const fecha = format(
                  values.fecha,
                  "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00"
                );

                const formData = new FormData();
                formData.append("tipoMantenimiento", values.tipoMantenimiento);
                formData.append("placa", values.placa);
                formData.append("fecha", fecha);
                formData.append("anotaciones", values.anotaciones);

                //Platforms
                if (Platform.OS === "android") {
                  formData.append(
                    "files",
                    new Blob([values.files[0]], {
                      type: values.files[0].mimeType,
                    })
                  );
                } else {
                  formData.append(
                    "files",
                    new Blob([values.files[0]], { type: values.files[0].type })
                  );
                }
                console.log("formdata", formData);
                // refetchPost(formData);
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
                    onBlur={() => handleBlur("placa")}
                    placeholder="Seleccione una placa"
                    data={placas}
                    value={values.placa}
                    onChange={(item) => handleChange("placa")(item.value)}
                  />

                  {errors.placa && touched.placa && (
                    <Text style={styles.error}>{errors.placa}</Text>
                  )}

                  <TitleIcon title="Fecha de Mantenimiento" icon="calendar" />

                  <CalendarComponent
                    values={values.fecha}
                    setFieldValue={setFieldValue}
                    onBlur={() => handleBlur("fecha")}
                    state="fecha"
                  />
                  {errors.fecha && touched.fecha && (
                    <Text style={styles.error}>{errors.fecha}</Text>
                  )}

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

                  {errors.files && touched.files && (
                    <Text style={styles.error}>
                      {Array.isArray(errors.files)
                        ? errors.files.join(", ")
                        : errors.files}
                    </Text>
                  )}
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => formikRef.current?.handleSubmit()}
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
    flexGrow: 1,
    marginBottom:Platform.OS === "ios" ? 70 : 60,
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
    backgroundColor: COLORS.blue2,
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
});
