// Importa los componentes y módulos necesarios
import React from "react";
import SearchFilter from "@/src/Presentation/components/searchFilter";
import TextInputs from "@/src/Presentation/components/textInput";
import ModalComponent from "@/src/Presentation/components/modalFiles";
import DocumentComponent from "@/src/Presentation/components/document";

// Importa los estilos
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropdownComponent from "@/src/Presentation/components/dropdown";
import TitleIcon from "@/src/Presentation/components/titleIcon";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { COLORS } from "@/constants/Colors";

import { parse, format } from "date-fns";

const placas = [
  { label: "FPG-636", value: "FPG-636" },
  { label: "FRE-633", value: "FRE-633" },
  { label: "IRE-634", value: "IRE-634" },
];

const mantenimientos = [
  { label: "Mantenimiento Preventivo", value: "Mantenimiento Preventivo" },
  { label: "Mantenimiento Predictivo", value: "Mantenimiento Predictivo" },
  { label: "Mantenimiento Correctivo", value: "Mantenimiento Correctivo" },
];

const data = [
  { producto: "Aceite", cantidad: "1", marca: "Castrol", id: "1" },
  { producto: "Filtro de Aceite", cantidad: "1", marca: "Fram", id: "2" },
  { producto: "Filtro de Aire", cantidad: "1", marca: "Fram", id: "3" },
  { producto: "Filtro de Gasolina", cantidad: "1", marca: "Fram", id: "4" },
  { producto: "Filtro de Aire", cantidad: "1", marca: "Fram", id: "5" },
];

// Define el componente RegistroMantenimiento
const RegistroMantenimiento = () => {
  // Define el estado y las referencias necesarias
  const formikRef = React.useRef<
    FormikProps<{
      _id: string;
      placa: string;
      Mantenimientos: string;
      tipoMantenimiento: string;
      kmPrevio: string;
      kmMedido: string;
      fecha: string;
      fechaSoat: string;
      diagnostico: string;
      diagnosticoInitial: string;
      repuestos: any[];
      files: any[];
    }>
  >(null);

  const [newmantenimientos, setMantenimientos] = React.useState(false);

  const [images, setImage] = React.useState<{
    selectedImage: string | null;
    isImagePreviewVisible: boolean;
  }>({
    selectedImage: null,
    isImagePreviewVisible: false,
  });

  // Define el esquema de validación para el formulario utilizando Yup
  const validationSchema = Yup.object().shape({
    _id: Yup.string().required("Este campo es requerido."),
    tipoMantenimiento: Yup.string().required("Este campo es requerido."),
    Mantenimientos: Yup.string().required("Este campo es requerido."),
    fecha: Yup.string().required("Este campo es requerido."),
    placa: Yup.string().required("Este campo es requerido."),
    kmPrevio: Yup.string().required("Este campo es requerido."),
    kmMedido: Yup.string().required("Este campo es requerido."),
    diagnostico: Yup.string().required("Este campo es requerido."),
    documentos: Yup.array().min(1, "Debe subir al menos un documento."),
    fechaSoat: Yup.string().required("Este campo es requerido."),
    repuestos: Yup.array().min(1, "Debe seleccionar al menos un repuesto."),
  });

  // Renderiza el componente

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
                _id: "",
                placa: "",
                Mantenimientos: "",
                tipoMantenimiento: "",
                diagnosticoInitial: "",
                kmPrevio: "",
                kmMedido: "",
                fecha: "",
                fechaSoat: "",
                diagnostico: "",
                repuestos: [],
                files: [],
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                console.log(values);
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
                  <TitleIcon title="Placa de Identificación" icon="car" />

                  <DropdownComponent
                    onBlur={() => handleBlur("placa")}
                    placeholder="Seleccione una placa"
                    data={placas}
                    value={values.placa}
                    onChange={(item) => {
                      handleChange("placa")(item.value);
                      //   refetchPost({ placa: item.value })
                    }}
                  />
                  {errors.placa && touched.placa && (
                    <Text style={styles.error}>{errors.placa}</Text>
                  )}

                  <TitleIcon title="Mantenimientos Programados" icon="wrench" />
                  <DropdownComponent
                    onBlur={() => handleBlur("Mantenimientos")}
                    placeholder="Seleccione una programacion"
                    data={mantenimientos}
                    value={values.Mantenimientos}
                    onChange={(item) => {
                      handleChange("Mantenimientos")(item.value);
                      setFieldValue("_id", item.id);
                      setFieldValue(
                        "tipoMantenimiento",
                        item.value.split(" - ")[0]
                      );
                      setFieldValue("fecha", item.value.split(" - ")[1]);
                    }}
                  />
                  {errors.Mantenimientos && touched.Mantenimientos && (
                    <Text style={styles.error}>{errors.Mantenimientos}</Text>
                  )}

                  {newmantenimientos && (
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

                      {errors.tipoMantenimiento &&
                        touched.tipoMantenimiento && (
                          <Text style={styles.error}>
                            {errors.tipoMantenimiento}
                          </Text>
                        )}
                    </>
                  )}
                  {errors.placa && touched.placa && (
                    <Text style={styles.error}>{errors.placa}</Text>
                  )}

                  <TitleIcon title="Kilometraje" icon="tachometer" />

                  <TextInputs
                    placeholder="Km Previo"
                    onChangeText={handleChange("kmPrevio")}
                    onBlur={handleBlur("kmPrevio")}
                    editable={false}
                    value={values.kmPrevio}
                    keyboardType="numeric"
                  />
                  {errors.kmPrevio && touched.kmPrevio && (
                    <Text style={styles.error}>{errors.kmPrevio}</Text>
                  )}
                  <TextInputs
                    placeholder="Km Medido"
                    onChangeText={handleChange("kmMedido")}
                    onBlur={handleBlur("kmMedido")}
                    value={values.kmMedido}
                    keyboardType={
                      Platform.OS === "ios" ? "number-pad" : "numeric"
                    }
                  />

                  {errors.kmMedido && touched.kmMedido && (
                    <Text style={styles.error}>{errors.kmMedido}</Text>
                  )}

                  <TitleIcon title="Vigencia SOAT" icon="id-card" />

                  <TextInputs
                    placeholder="fecha de vencimiento SOAT"
                    onChangeText={handleChange("fechaSoat")}
                    onBlur={() => handleBlur("fechaSoat")}
                    value={values.fechaSoat}
                    editable={false}
                  />

                  {errors.fechaSoat && touched.fechaSoat && (
                    <Text style={styles.error}>{errors.fechaSoat}</Text>
                  )}
                  <TitleIcon title=" Diagnostico Previo" icon="pencil" />

                  <TextInputs
                    placeholder="Ingrese el diagnostico"
                    onChangeText={handleChange("diagnosticoInitial")}
                    onBlur={handleBlur("diagnosticoInitial")}
                    value={values.diagnosticoInitial}
                    editable={false}
                  />

                  {errors.diagnosticoInitial && touched.diagnosticoInitial && (
                    <Text style={styles.error}>
                      {errors.diagnosticoInitial}
                    </Text>
                  )}

                  <TitleIcon
                    title=" Diagnostico de Estado de la unidad"
                    icon="pencil"
                  />

                  <TextInputs
                    placeholder="Ingrese el diagnostico"
                    onChangeText={handleChange("diagnostico")}
                    onBlur={handleBlur("diagnostico")}
                    value={values.diagnostico}
                  />

                  {errors.diagnostico && touched.diagnostico && (
                    <Text style={styles.error}>{errors.diagnostico}</Text>
                  )}

                  <TitleIcon title="Solicitar Repuestos" icon="cog" />

                  <SearchFilter
                    data={data}
                    value={values.repuestos}
                    onBlur={() => handleBlur("repuestos")}
                    onChange={(newCantidad) =>
                      setFieldValue("repuestos", newCantidad)
                    }
                  />
                  {errors.repuestos && touched.repuestos && (
                    <Text style={styles.error}>
                      {JSON.stringify(errors.repuestos)}
                    </Text>
                  )}

                  <TitleIcon title="Documentos" icon="file" />

                  <DocumentComponent
                    formikRef={formikRef}
                    setImage={setImage}
                  />

                  {errors.files && touched.files && (
                    <Text style={styles.error}>{"Sin datos"}</Text>
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

// Exporta el componente para que pueda ser utilizado en otros archivos
export default RegistroMantenimiento;

// Exporta el componente para que pueda ser utilizado en otros archivos
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
    bottom: 15,
    left: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  containerIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalIndicator: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
