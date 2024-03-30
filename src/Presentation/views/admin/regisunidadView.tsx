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
  ActivityIndicator,
} from "react-native";
import { validationSchemaPlacas } from "../../viewmodels/validation/formularplacas";
import { Formik } from "formik";

import { COLORS } from "@/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RegistrarAutoViewModel } from "../../viewmodels/cars/onSubmit";

/**
 * RegistroMantenimiento es un componente de React que renderiza un formulario para registrar un mantenimiento.
 *
 * @returns {JSX.Element} El componente RegistroMantenimiento renderizado.
 */

const RegistrarUnidad = () => {
  // Define refeching para el formulario.
  const [refreshing, setRefreshing] = React.useState(false);

  // Define el estado para los tipos de mantenimiento.
  const formikRef = React.useRef<
    FormikProps<{
      tipocontrato: string;
      placa: string;
      km: string;
      vigenciaSoat: string | Date;
      propietario: string;
      cliente: string;
      fechaRevision: string | Date;
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
  // Define las mutaciones de Apollo Client para programar un mantenimiento.
  const viewModelregistrar = new RegistrarAutoViewModel();
  // Trae los tipos de Contrato
  const mantenimientos = viewModelregistrar.getContratos();

  //Define los clientes para el select
  const {
    refetch: refetchClientes,
    loading: loadingClientes,
    error: errorClientes,
    clientes,
  } = viewModelregistrar.clientes;

  //Define la función de refetch para refrescar los datos.
  const onRefetch = React.useCallback(() => {
    setRefreshing(true);
    refetchClientes().then(() => setRefreshing(false));
  }, []);

  // Define ela carga de datos iniciales.

  if (loadingClientes) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.blue2} />
      </View>
    );
  }

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefetch} />
        }
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
                finalfecha: "",
                fechaRevision: "",
                cliente: "",
                propietario: "",
                average: "",
                estados: [],
                files: [],
              }}
              validationSchema={validationSchemaPlacas}
              onSubmit={viewModelregistrar.onSubmit.bind(viewModelregistrar)}
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

                  <TextInputs
                    placeholder="Ingrese la placa de la unidad"
                    onChangeText={handleChange("placa")}
                    onBlur={handleBlur("placa")}
                    editable
                    value={values.placa}
                  />

                  {errors.placa && touched.placa && (
                    <Text style={styles.error}>{errors.placa}</Text>
                  )}
                  <TitleIcon title="Kilometraje" icon="tachometer" />
                  <TextInputs
                    placeholder="Ingrese el kilometraje actual"
                    onChangeText={handleChange("km")}
                    onBlur={handleBlur("km")}
                    editable
                    value={values.km}
                    keyboardType="numeric"
                  />
                  {errors.km && touched.km && (
                    <Text style={styles.error}>{errors.km}</Text>
                  )}

                  <TitleIcon title="Fecha de Ultima Revisión" icon="calendar" />

                  <CalendarComponent
                    values={values.fechaRevision}
                    setFieldValue={setFieldValue}
                    onBlur={() => handleBlur("fechaRevision")}
                    state="fechaRevision"
                  />
                  {errors.fechaRevision && touched.fechaRevision && (
                    <Text style={styles.error}>{errors.fechaRevision}</Text>
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

                  <TitleIcon title="Cliente" icon="user" />
                  <DropdownComponent
                    onBlur={() => handleBlur("cliente")}
                    placeholder="Seleccione una Cliente"
                    data={clientes || []}
                    value={values.cliente}
                    onChange={(item) => handleChange("cliente")(item.value)}
                  />

                  {errors.cliente && touched.cliente && (
                    <Text style={styles.error}>{errors.cliente}</Text>
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

                  <TitleIcon title="Vigencia del Contrato" icon="calendar" />

                  <CalendarComponent
                    values={values.finalfecha}
                    setFieldValue={setFieldValue}
                    onBlur={() => handleBlur(" finalfecha")}
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
      </KeyboardAwareScrollView>

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
    justifyContent: "space-between",
  },
  container2: {
    backgroundColor: COLORS.white,
    position: "relative",
    flex: 1,
  },
  container3: {
    flexGrow: 1,
    marginBottom: Platform.OS === "ios" ? 70 : 60,
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
    bottom: Platform.OS === "ios" ? 15 : 0,
    left: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
});
