import React, { useEffect, useMemo } from "react";
import TextInputs from "@/src/Presentation/components/textInput";
import ModalComponent from "@/src/Presentation/components/modalFiles";
import DocumentComponent from "@/src/Presentation/components/document";
import CalendarComponent from "@/src/Presentation/components/calendar";
import DropdownComponent from "@/src/Presentation/components/dropdown";
import TitleIcon from "@/src/Presentation/components/titleIcon";
import { validationSchemaregis } from "../viewmodels/validation/formularioregis";
import { FormikProps } from "formik";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";

import { COLORS } from "@/constants/Colors";

import { ProgramarMantenimientoViewModel } from "../viewmodels/mantenimientos/onSubmitprogram";
/**
 * RegistroMantenimiento es un componente de React que renderiza un formulario para registrar un mantenimiento.
 *
 * @returns {JSX.Element} El componente RegistroMantenimiento renderizado.
 */

const ProgramarMantenimiento = () => {
  // Define refeching para el formulario.
  const [refreshing, setRefreshing] = React.useState(false);

  // Define el estado para las imágenes y el modal de vista previa de la imagen.
  const [images, setImage] = React.useState<{
    selectedImage: string | null;
    isImagePreviewVisible: boolean;
  }>({
    selectedImage: null,
    isImagePreviewVisible: false,
  });

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
  // Define las mutaciones de Apollo Client para programar un mantenimiento.
  const viewModelregistrar = new ProgramarMantenimientoViewModel();
  // Trae los tipos de mantenimiento
  const mantenimientos = viewModelregistrar.getMantenimientos();
  // Trae las placas para el select
  const placasModel = viewModelregistrar.placas;
  // Define la función de refetch para refrescar los datos.
  const { refetch, loading, error, placas } = placasModel;

  //onrefetch
  const onRefetch = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.blue2} />
      </View>
    );
  }
  if (!placas) {
    return (
      <View style={styles.center}>
        <Text>Sin datos</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
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
                tipoMantenimiento: "",
                placa: "",
                fecha: "",
                anotaciones: "",
                files: [],
              }}
              validationSchema={validationSchemaregis}
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
                    data={placas || []}
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
      </KeyboardAwareScrollView>

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