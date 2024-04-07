import React from "react";
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
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Formik } from "formik";

import { COLORS } from "@/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { validationSchemaFact } from "../viewmodels/validation/formulafactura";
import { RegistrarFacturaViewModel } from "../viewmodels/factura/onSubmit";

/**
 * RegistroMantenimiento es un componente de React que renderiza un formulario para registrar un mantenimiento.
 *
 * @returns {JSX.Element} El componente RegistroMantenimiento renderizado.
 */

const RegistrarFactura = ({ tipouser }: { tipouser: string }) => {
  // Define refeching para el formulario.
  const [refreshing, setRefreshing] = React.useState(false);
  // Define el estado para las imágenes y el modal de vista previa de la imagen.
  const formikRef = React.useRef<
    FormikProps<{
      tipoFactura: string;
      dateInput: string;
      fecha: string | Date;
      montoParcial: string;
      igv: string;
      numeroFactura: string;
      detraccion: string;
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

  //Crea un nuevo objeto de la clase FacturaViewModel
  const facturaViewModel = new RegistrarFacturaViewModel();

  // Define el estado para los tipos de mantenimiento.
  const tipofactura = facturaViewModel.tipoFactura;

  //Define los clientes para el select
  const {
    refetch: refetchClientes,
    loading: loadingClientes,
    error: errorClientes,
    clientes,
  } = facturaViewModel.clientes;
  //Define los propietarios para el select
  const {
    refetch: refetchPropietarios,
    loading: loadingPropietarios,
    error: errorPropietarios,
    propietarios,
  } = facturaViewModel.propietarios;

  //Define la función de refetch para refrescar los datos.
  const onRefetch = React.useCallback(() => {
    setRefreshing(true);
    refetchClientes().then(() => setRefreshing(false));
    refetchPropietarios().then(() => setRefreshing(false));
  }, []);

  if (loadingClientes || loadingPropietarios) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.blue2} />
      </View>
    );
  }
  if (!clientes || !propietarios) {
    return (
      <View style={styles.center}>
        <Text>Sin datos</Text>
      </View>
    );
  }
  if (errorClientes || errorPropietarios) {
    return (
      <View style={styles.center}>
        <Text>
          Error: {errorClientes?.message || errorPropietarios?.message}
        </Text>
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
                tipoFactura: "",
                dateInput: "",
                fecha: "",
                montoParcial: "",
                igv: "",
                numeroFactura: "",
                detraccion: "",
                files: [],
              }}
              validationSchema={validationSchemaFact}
              onSubmit={facturaViewModel.onSubmit.bind(facturaViewModel)}
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
                  <TitleIcon title="Tipo de Documento" icon="file" />
                  <DropdownComponent
                    onBlur={() => handleBlur("tipoFactura")}
                    placeholder="Seleccione un mantenimiento"
                    data={tipofactura}
                    value={values.tipoFactura}
                    onChange={(item) => handleChange("tipoFactura")(item.value)}
                  />

                  {errors.tipoFactura && touched.tipoFactura && (
                    <Text style={styles.error}>{errors.tipoFactura}</Text>
                  )}

                  {values.tipoFactura === "Factura a Propietario Vehicular" ? (
                    <>
                      <TitleIcon title="Propietario del Vehiculo" icon="user" />
                      <DropdownComponent
                        onBlur={() => handleBlur("dateInput")}
                        placeholder="Seleccione una placa"
                        data={propietarios || []}
                        value={values.dateInput}
                        onChange={(item) =>
                          handleChange("dateInput")(item.value)
                        }
                      />
                    </>
                  ) : values.tipoFactura === "Factura a Cliente" ? (
                    <>
                      <TitleIcon title="Cliente" icon="user" />
                      <DropdownComponent
                        onBlur={() => handleBlur("dateInput")}
                        placeholder="Seleccione una Cliente"
                        data={clientes || []}
                        value={values.dateInput}
                        onChange={(item) =>
                          handleChange("dateInput")(item.value)
                        }
                      />
                    </>
                  ) : null}

                  {errors.dateInput && touched.dateInput && (
                    <Text style={styles.error}>{errors.dateInput}</Text>
                  )}

                  <TitleIcon title="Fecha" icon="calendar" />

                  <CalendarComponent
                    values={values.fecha}
                    setFieldValue={setFieldValue}
                    onBlur={() => handleBlur("fecha")}
                    state="fecha"
                  />
                  {errors.fecha && touched.fecha && (
                    <Text style={styles.error}>{errors.fecha}</Text>
                  )}

                  <TitleIcon title="Monto Parcial (S/.)" icon="money" />

                  <TextInputs
                    placeholder="Ingrese el monto parcial"
                    onChangeText={handleChange("montoParcial")}
                    onBlur={handleBlur("montoParcial")}
                    value={values.montoParcial.toString()}
                    keyboardType="numeric"
                  />
                  {errors.montoParcial && touched.montoParcial && (
                    <Text style={styles.error}>{errors.montoParcial}</Text>
                  )}

                  <TitleIcon title="IGV" />
                  <TextInputs
                    placeholder="Ingrese el IGV"
                    onChangeText={handleChange("igv")}
                    onBlur={handleBlur("igv")}
                    value={values.igv.toString()}
                    keyboardType="numeric"
                  />

                  {errors.igv && touched.igv && (
                    <Text style={styles.error}>{errors.igv}</Text>
                  )}
                  {values.tipoFactura === "Factura a Propietario Vehicular" ||
                  values.tipoFactura === "Factura a Cliente" ? (
                    <>
                      <TitleIcon title="Numero de Factura" />
                      <TextInputs
                        placeholder="Ingrese un numero de factura"
                        onChangeText={handleChange("numeroFactura")}
                        onBlur={handleBlur("numeroFactura")}
                        value={values.numeroFactura}
                      />
                    </>
                  ) : null}
                  {values.tipoFactura === "Factura a Propietario Vehicular" ? (
                    <>
                      <TitleIcon title="Detraccion" />
                      <TextInputs
                        placeholder="Ingrese la detraccion"
                        onChangeText={handleChange("detraccion")}
                        onBlur={handleBlur("detraccion")}
                        value={values.detraccion.toString()}
                        keyboardType="numeric"
                      />
                    </>
                  ) : null}

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

export default RegistrarFactura;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  container2: {
    backgroundColor: COLORS.white,
    position: "relative",
    flex:1
  },
  container3: {
    flexGrow: 1,
   
    backgroundColor: COLORS.white,
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
    marginHorizontal: 20,
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