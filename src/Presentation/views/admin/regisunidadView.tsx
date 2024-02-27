import React, { useEffect, useMemo } from "react";
import TextInputs from "@/src/Presentation/components/textInput";
import ModalComponent from "@/src/Presentation/components/modalFiles";
import DocumentComponent from "@/src/Presentation/components/document";
import CalendarComponent from "@/src/Presentation/components/calendar";
import DropdownComponent from "@/src/Presentation/components/dropdown";
import TitleIcon from "@/src/Presentation/components/titleIcon";
import { FormikProps } from "formik";
import Rating from "../../components/rating";
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
  { label: "Pago Mantenimiento Parcial", value: "Pago Mantenimiento Parcial" },
  { label: "Pago Mantenimiento 2", value: "Pago Mantenimiento 2" },
  { label: "Pago Mantenimiento 3", value: "Pago Mantenimiento 3" },
];

const placas = [
  { label: "FPG-636", value: "FPG-636" },
  { label: "FRE-633", value: "FRE-633" },
  { label: "IRE-634", value: "IRE-634" },
];
const elementos = [
  "Elemento 1",
  "Elemento 2",
  "Elemento 3",
  "Elemento 4",
  "Elemento 5",
];

/**
 * RegistroMantenimiento es un componente de React que renderiza un formulario para registrar un mantenimiento.
 *
 * @returns {JSX.Element} El componente RegistroMantenimiento renderizado.
 */

const RegistrarUnidad = () => {
  // Define el estado para los tipos de mantenimiento.
  // Define el estado para las imágenes y el modal de vista previa de la imagen.
  const formikRef = React.useRef<
    FormikProps<{
      tipocontrato: string;
      placa: string;
      km: string;
      vigenciaSoat: string | Date;
      propietario: string;
      anotaciones: string;
      iniciofecha: string | Date;
      finalfecha: string | Date;
      estados: any[];
      average: string;
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
    tipocontrato: Yup.string().required("Este campo es requerido."),
    placa: Yup.string().required("Este campo es requerido."),
    vigenciaSoat: Yup.date().nullable().required("Este campo es requerido."),
    iniciofecha: Yup.date().nullable().required("Este campo es requerido."),
    finalfecha: Yup.date().nullable().required("Este campo es requerido."),
    km: Yup.string().required("Este campo es requerido."),
    anotaciones: Yup.string().required("Este campo es requerido."),
    propietario: Yup.string().required("Este campo es requerido."),
    average: Yup.number().required("Este campo es requerido."),
    files: Yup.array().min(1, "Debe subir al menos un documento."),
    estados: Yup.array()
      .of(Yup.string().required("Este campo es requerido."))
      .required("Debe seleccionar al menos un elemento.")
      .test(
        "todos-llenados",
        "Todos los campos deben estar llenos",
        (value) =>
          value &&
          value.length === elementos.length &&
          value.every((v) => v !== "")
      ),
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container3}
        scrollEnabled
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container2}>
            <Formik
              innerRef={formikRef}
              initialValues={{
                tipocontrato: "",
                placa: "",
                km: "",
                vigenciaSoat: "",
                iniciofecha: "",
                finalfecha: "",
                anotaciones: "",
                propietario: "",
                average: "",
                estados: [],
                files: [],
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const fecha = format(
                  values.vigenciaSoat,
                  "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00"
                );

                const formData = new FormData();
                formData.append("tipocontrato", values.tipocontrato);
                formData.append("placa", values.placa);
                formData.append("km", values.km);
                formData.append("vigenciaSoat", fecha);
                formData.append(
                  "iniciofecha",
                  format(values.iniciofecha, "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00")
                );
                formData.append(
                  "finalfecha",
                  format(values.finalfecha, "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00")
                );
                formData.append("anotaciones", values.anotaciones);
                formData.append("propietario", values.propietario);
                formData.append("average", values.average);

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
                  <TitleIcon title="Tipo de Contrato" icon="wrench" />
                  <DropdownComponent
                    onBlur={() => handleBlur("tipocontrato")}
                    placeholder="Seleccione un tipo de contrato"
                    data={mantenimientos}
                    value={values.tipocontrato}
                    onChange={(item) =>
                      handleChange("tipocontrato")(item.value)
                    }
                  />

                  {errors.tipocontrato && touched.tipocontrato && (
                    <Text style={styles.error}>{errors.tipocontrato}</Text>
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
                  <TitleIcon title="Kilometraje" icon="tachometer" />
                  <TextInputs
                    placeholder="kilometraje actual"
                    onChangeText={handleChange("km")}
                    onBlur={handleBlur("km")}
                    editable
                    value={values.km}
                    keyboardType="numeric"
                  />
                  {errors.km && touched.km && (
                    <Text style={styles.error}>{errors.km}</Text>
                  )}

                  <TitleIcon title="Vigencia Soat" icon="calendar" />

                  <CalendarComponent
                    values={values.vigenciaSoat}
                    setFieldValue={setFieldValue}
                    onBlur={() => handleBlur("vigenciaSoat")}
                    state="vigenciaSoat"
                  />
                  {errors.vigenciaSoat && touched.vigenciaSoat && (
                    <Text style={styles.error}>{errors.vigenciaSoat}</Text>
                  )}

                  <TitleIcon title="Descripcion de la unidad" icon="pencil" />

                  <TextInputs
                    placeholder="Ingrese el diagnostico"
                    onChangeText={handleChange("anotaciones")}
                    onBlur={handleBlur("anotaciones")}
                    value={values.anotaciones}
                  />

                  {errors.anotaciones && touched.anotaciones && (
                    <Text style={styles.error}>{errors.anotaciones}</Text>
                  )}

                  <TitleIcon title="Propietario" icon="user" />
                  <TextInputs
                    placeholder="Ingrese el nombre del propietario"
                    onChangeText={handleChange("propietario")}
                    onBlur={handleBlur("propietario")}
                    value={values.propietario}
                  />
                  {errors.propietario && touched.propietario && (
                    <Text style={styles.error}>{errors.propietario}</Text>
                  )}

                  <TitleIcon title="Duración del contrato" icon="calendar" />

                  <CalendarComponent
                    values={values.iniciofecha}
                    setFieldValue={setFieldValue}
                    onBlur={() => handleBlur("iniciofecha")}
                    state="iniciofecha"
                  />
                  {errors.iniciofecha && touched.iniciofecha && (
                    <Text style={styles.error}>{errors.iniciofecha}</Text>
                  )}

                  <CalendarComponent
                    values={values.finalfecha}
                    setFieldValue={setFieldValue}
                    onBlur={() => handleBlur("finalfecha")}
                    state="finalfecha"
                  />
                  {errors.finalfecha && touched.finalfecha && (
                    <Text style={styles.error}>{errors.finalfecha}</Text>
                  )}
                  
                  <Rating
                    values={values}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                  />

                  {errors.estados && touched.estados && (
                    <Text style={styles.error}>
                      {Array.isArray(errors.estados)
                        ? errors.estados.join(", ")
                        : errors.estados}
                    </Text>
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
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <ModalComponent images={images} setImage={setImage} />
    </View>
  );
};

export default RegistrarUnidad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container2: {
    
    backgroundColor: COLORS.white,
    position: "relative",
  },
  container3: {
    flexGrow: 1,
    marginBottom:Platform.OS === "ios" ? 70 : 60,
    backgroundColor: COLORS.white,
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
