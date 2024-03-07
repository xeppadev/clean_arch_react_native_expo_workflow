// Importa los componentes y módulos necesarios
import React from "react";
import SearchFilter from "@/src/Presentation/components/searchFilter";
import TextInputs from "@/src/Presentation/components/textInput";
import ModalComponent from "@/src/Presentation/components/modalFiles";
import DocumentComponent from "@/src/Presentation/components/document";
import { validationSchemarRegis } from "../../viewmodels/validation/formularioregisman";
// Importa los estilos
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropdownComponent from "@/src/Presentation/components/dropdown";
import CalendarComponent from "@/src/Presentation/components/calendar";
import TitleIcon from "@/src/Presentation/components/titleIcon";
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
import { RegistrarMantenimientoViewModel } from "../../viewmodels/mantenimientos/onSubmitRegist";
import { Formik, FormikProps } from "formik";
import { COLORS } from "@/constants/Colors";
import { format, parseISO } from "date-fns";
// Define el componente RegistroMantenimiento
const RegistroMantenimiento = () => {
  // Define refeching para el formulario.
  const [refreshing, setRefreshing] = React.useState(false);

  // Define el estado y las referencias necesarias
  const formikRef = React.useRef<
    FormikProps<{
      _id: string;
      placa: string;
      programacion: string;
      tipoMantenimiento: string;
      kmPrevio: string;
      kmMedido: string;
      fecha: string;
      fechaInicio: string;
      fechaSoat: string;
      diagnostico: string;
      repuestos: any[];
      files: any[];
      Cliente: string;
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
  const viewModelregistrar = new RegistrarMantenimientoViewModel();

  // Trae las placas para el select
  const {
    refetch: refetchplacas,
    loading: loandingplacas,
    error: errorplacas,
    placas,
  } = viewModelregistrar.placas;

  // Trae la funcion de de refetch para repuestos
  const {
    refetch: refetchrepuestos,
    loading: loadingRepuestos,
    error: errorRepuestos,
    repuestos,
  } = viewModelregistrar.repuestos;

  //Trae los tipos de mantenimiento
  const mantenimientos = viewModelregistrar.getMantenimientos();
  // trae el nuevo mantenimiento
  const nuevoMantenimiento = viewModelregistrar.getNuevoMantenimiento();

  // Actualiza la consulta de mantenimientosProgramados para usar la placa seleccionada
  const {
    get1InfoForPlaca: refetchMantenimientos,
    loading: loadingMantenimientos,
    error: errorMantenimientos,
    programacion: programacionData,
  } = viewModelregistrar.mantenimientosProgramados;

  //Trae la infosome de la placa

  const {
    data: infoSomePlaca,
    loading: loadingInfoPlaca,
    error: errorInfoPlaca,
    get2InfoForPlaca: refetchInfoPlaca,
  } = viewModelregistrar.someMantenimiento;

  //define la funcion de refetch para refrescar los datos
  const onRefetch = React.useCallback(() => {
    setRefreshing(true);
    refetchplacas().then(() => setRefreshing(false));
    refetchrepuestos().then(() => setRefreshing(false));
  }, []);

  if (loandingplacas || loadingRepuestos) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.blue2} />
      </View>
    );
  }
  if (!placas || !repuestos) {
    return (
      <View style={styles.center}>
        <Text>Sin datos</Text>
      </View>
    );
  }
  if (errorplacas || errorRepuestos) {
    return (
      <View style={styles.center}>
        <Text>Error: {errorplacas?.message || errorRepuestos?.message}</Text>
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
                _id: "",
                placa: "",
                programacion: "",
                tipoMantenimiento: "",
                kmPrevio: "",
                Cliente: "",
                fechaInicio: "",
                kmMedido: "",
                fecha: "",
                fechaSoat: "",
                diagnostico: "",
                repuestos: [],
                files: [],
              }}
              onSubmit={viewModelregistrar.onSubmit.bind(viewModelregistrar)}
              validationSchema={validationSchemarRegis}
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
                    data={placas || []}
                    value={values.placa}
                    onChange={async (item) => {
                      handleChange("placa")(item.value);
                      refetchMantenimientos({
                        variables: { placa: item.value },
                      });
                      const response2 = await refetchInfoPlaca({
                        variables: { placa: item.value },
                      });
                      setFieldValue(
                        "kmPrevio",
                        response2?.data?.obtener_info_for_placa?.kmActual.toString()
                      );
                      setFieldValue(
                        "fechaSoat",
                        format(
                          parseISO(
                            response2?.data?.obtener_info_for_placa?.fechaSoat
                          ),
                          "dd/MM/yyyy"
                        )
                      );
                      setFieldValue(
                        "Cliente",
                        response2?.data?.obtener_info_for_placa?.cliente
                      );
                    }}
                  />
                  {errors.placa && touched.placa && (
                    <Text style={styles.error}>{errors.placa}</Text>
                  )}

                  <TitleIcon title="Mantenimientos Programados" icon="wrench" />
                  <DropdownComponent
                    onBlur={() => handleBlur("programacion")}
                    placeholder="Seleccione una programacion"
                    data={
                      programacionData.length > 0
                        ? programacionData
                        : nuevoMantenimiento
                    }
                    value={values.programacion}
                    onChange={(item) => {
                      handleChange("programacion")(item.value);
                      setFieldValue("_id", item.id);
                      setFieldValue("fecha", item.value.split(" ")[2]);
                      console.log(item.value.split(" ")[2]);
                    }}
                  />
                  {errors.programacion && touched.programacion && (
                    <Text style={styles.error}>{errors.programacion}</Text>
                  )}
                  {values.programacion === "Nuevo Mantenimiento" && (
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

                  <TitleIcon title="Kilometraje (Km)" icon="tachometer" />

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

                  <TitleIcon
                    title="Fecha de Inicio de Mantenimiento"
                    icon="calendar"
                  />

                  <CalendarComponent
                    values={values.fechaInicio}
                    setFieldValue={setFieldValue}
                    onBlur={() => handleBlur("fechaInicio")}
                    state="fechaInicio"
                  />

                  {errors.fechaInicio && touched.fechaInicio && (
                    <Text style={styles.error}>{errors.fechaInicio}</Text>
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
                    data={repuestos || []}
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
