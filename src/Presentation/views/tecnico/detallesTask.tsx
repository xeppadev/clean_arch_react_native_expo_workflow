// Importa los componentes y módulos necesarios
import React from "react";
import TextInputs from "@/src/Presentation/components/textInput";
import ModalComponent from "@/src/Presentation/components/modalFiles";
import DocumentComponent from "../../components/document";
import SearchFilter from "../../components/searchFilter";
import { validationSchemaCompletado } from "../../viewmodels/validation/formulaCompletado";
import CalendarComponent from "../../components/calendar";
// Importa los estilos
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  FlatList,
  TextInput,
} from "react-native";
import { Formik, FormikProps } from "formik";
import { COLORS } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { format, parseISO } from "date-fns";
import { RegistrarConfirmarMantenimiento } from "../../viewmodels/mantenimientos/onSubmitConfimViewModel";
import StateInput from "../../components/inputState";
// Define el componente RegistroMantenimiento
const DetallesTask = () => {
  // Obtiene el id de la ruta
  const { detalles } = useLocalSearchParams();

  // Define refeching para el formulario.
  const [refreshing, setRefreshing] = React.useState(false);
  // Define las mutaciones de Apollo Client para programar un mantenimiento.
  const viewModelDetalles = new RegistrarConfirmarMantenimiento();

  //Trae los mantenimientos por ID
  const { data, loading, error, refetch } = viewModelDetalles.getMantenimientosforId(
    detalles as string
  );
  // Trae la funcion de de refetch para repuestos
  const {
    refetch: refetchrepuestos,
    loading: loadingRepuestos,
    error: errorRepuestos,
    repuestos,
  } = viewModelDetalles.repuestos;

  //Funcion mayuscula
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  // Define el estado y las referencias necesarias
  const formikRef = React.useRef<
    FormikProps<{
      _id: string;
      diagnosticoFinal: string;
      diagnosticoActualizado: string;
      kmPrevio: number | null | undefined;
      kmMedido: number | null | undefined;
      fechaInicio: string;
      fechaSoat: string;
      fechaFin: string;
      fecha: string;
      cliente: string | null | undefined;
      files: any[];
      repuestos: any[];
    }>
  >(null);

  const [images, setImage] = React.useState<{
    selectedImage: string | null;
    isImagePreviewVisible: boolean;
  }>({
    selectedImage: null,
    isImagePreviewVisible: false,
  });

  //define la funcion de refetch para refrescar los datos
  const onRefetch = React.useCallback(() => {
    setRefreshing(true);
    Promise.all([refetch(), refetchrepuestos()]).then(() =>
      setRefreshing(false)
    );
  }, []);

  if (loading || loadingRepuestos) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.blue2} />
      </View>
    );
  }
  if (!data || !repuestos) {
    return (
      <View style={styles.center}>
        <Text>Sin datos</Text>
      </View>
    );
  }
  if (error || errorRepuestos) {
    return (
      <View style={styles.center}>
        <Text>Error: {error?.message || errorRepuestos?.message}</Text>
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
                _id: detalles as string,
                diagnosticoFinal: "",
                diagnosticoActualizado: "",
                kmPrevio: data?.kmPrevio,
                kmMedido: data?.kmMedido,
                fechaInicio: data?.fechaInicio,
                fechaFin: "",
                fechaSoat: data?.fechaSoat,
                fecha: data?.fecha,
                cliente: data?.cliente,
                files: [],
                repuestos: [],
                estado: data?.estado,
              }}
              onSubmit={viewModelDetalles.onSubmit.bind(viewModelDetalles)}
              validationSchema={validationSchemaCompletado}
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
                  <TitleIcon title="Estado Actual" icon="info-circle" />
                  <StateInput value={data?.estado} />
                  <TitleIcon title="Placa de Identificación" icon="car" />

                  <TextInputs editable={false} value={data?.placa} />

                  <TitleIcon
                    title="Kilometraje Previo (km)"
                    icon="tachometer"
                  />
                  <TextInputs
                    editable={false}
                    value={data?.kmPrevio?.toString()}
                  />

                  <TitleIcon
                    title="Kilometraje Medido (km)"
                    icon="tachometer"
                  />
                  <TextInputs
                    editable={false}
                    value={data?.kmMedido?.toString()}
                  />

                  <TitleIcon title="Vigencia SOAT" icon="id-card" />

                  <TextInputs
                    value={format(parseISO(data?.fechaSoat), "dd/MM/yyyy")}
                    editable={false}
                  />

                  <TitleIcon
                    title="Fecha de Inicio de Mantenimiento"
                    icon="calendar"
                  />

                  <TextInputs
                    value={format(
                      parseISO(data?.fechaInicio),
                      "dd/MM/yyyy HH:mm "
                    )}
                    editable={false}
                  />
                  {data?.estado === "aprobado" && (
                    <>
                      <TitleIcon title="Fecha Terminado" icon="calendar" />
                      <CalendarComponent
                        values={values.fechaFin}
                        setFieldValue={setFieldValue}
                        onBlur={() => handleBlur("fechaFin")}
                        state="fechaFin"
                      />
                      {errors.fechaFin && touched.fechaFin && (
                        <Text style={styles.error}>{errors.fechaFin}</Text>
                      )}
                    </>
                  )}
                  <TitleIcon title="Anotaciones" icon="pencil" />
                  <TextInputs
                    value={data?.anotaciones || ""}
                    editable={false}
                  />
                  <TitleIcon title="Diagnostico Inicial " icon="pencil" />

                  <TextInputs
                    value={data?.diagnostico || ""}
                    editable={false}
                  />
                  {data?.estado === "revision" && (
                    <>
                      <TitleIcon
                        title="Correcciones Solicitadas "
                        icon="pencil"
                      />

                      <TextInputs
                        value={data?.cambiosSolicitados || ""}
                        editable={false}
                      />
                    </>
                  )}

                  {data?.estado === "aprobado" && (
                    <>
                      <TitleIcon title="Diagnostico Final" icon="pencil" />
                      <TextInputs
                        placeholder="Diagnostico Final"
                        onChangeText={handleChange("diagnosticoFinal")}
                        onBlur={handleBlur("diagnosticoFinal")}
                        value={values.diagnosticoFinal}
                      />
                    </>
                  )}
                  {errors.diagnosticoFinal && touched.diagnosticoFinal && (
                    <Text style={styles.error}>{errors.diagnosticoFinal}</Text>
                  )}
                  {data?.estado === "revision" && (
                    <>
                      <TitleIcon
                        title="Diagnostico Actualizado"
                        icon="pencil"
                      />
                      <TextInputs
                        placeholder="Diagnostico Actualizado"
                        onChangeText={handleChange("diagnosticoActualizado")}
                        onBlur={handleBlur("diagnosticoActualizado")}
                        value={values.diagnosticoActualizado}
                      />
                    </>
                  )}
                  {errors.diagnosticoActualizado &&
                    touched.diagnosticoActualizado && (
                      <Text style={styles.error}>
                        {errors.diagnosticoActualizado}
                      </Text>
                    )}
                  <TitleIcon title="Repuestos Usados" icon="wrench" />
                  <FlatList
                    data={data.repuestos} // hacerlo aca la data
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id || ""}
                    style={{ marginHorizontal: 23, marginTop: 4 }}
                    renderItem={({ item, index }) => {
                      const cantidad =
                        item.cantidad < 10
                          ? `0${item.cantidad}`
                          : item.cantidad;
                      return (
                        <View style={styles.listItem}>
                          <View style={styles.dates}>
                            <Text style={styles.listItemTitle}>
                              {`${capitalizeFirstLetter(
                                item.producto || ""
                              )} (${item.marca})`}
                            </Text>
                          </View>

                          <View style={styles.icon}>
                            <Text style={[styles.dataLengthText]}>
                              {cantidad}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                  {data?.estado === "revision" && (
                    <>
                      <TitleIcon
                        title="Actualizacion de Repuestos"
                        icon="cog"
                      />
                      <SearchFilter
                        data={repuestos || []}
                        value={values.repuestos}
                        onBlur={() => handleBlur("repuestos")}
                        onChange={(newCantidad) => {
                          setFieldValue("repuestos", newCantidad);
                        }}
                      />
                    </>
                  )}
                  {errors.repuestos && touched.repuestos && (
                    <Text style={styles.error}>
                      {JSON.stringify(errors.repuestos)}
                    </Text>
                  )}

                  {data?.estado !== "denegado" && (
                    <>
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
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      {data?.estado === "aprobado" && (
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.green }]}
            onPress={() => formikRef.current?.handleSubmit()}
          >
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      )}
      {data?.estado === "revision" && (
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.wellow }]}
            onPress={() => formikRef.current?.handleSubmit()}
          >
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
        </View>
      )}
      <ModalComponent images={images} setImage={setImage} />
    </View>
  );
};

// Exporta el componente para que pueda ser utilizado en otros archivos
export default DetallesTask;

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
    marginBottom: Platform.OS === "ios" ? 60 : 50,
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
    padding: 18,
    width: "100%",
    alignItems: "center",
    borderRadius: 20,
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
  titlemodal: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 24,
  },
  listItem: {
    flexDirection: "row",

    alignItems: "center",

    marginVertical: 7,

    width: "100%",
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Inter_500Medium",
    marginVertical: 2,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Platform.OS === "ios" ? 14 : 9,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: COLORS.bg,
  },
  dates: {
    alignItems: "flex-start",
    marginRight: "auto",

    width: "80%",
    backgroundColor: COLORS.bg,
    paddingVertical: Platform.OS === "ios" ? 14 : 8,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  listItemStatus: {
    fontSize: 14,
    color: COLORS.blue,
  },
  dataLengthText: {
    color: COLORS.blue, // Cambia esto al color que quieras para el texto
    fontWeight: "600",
    fontSize: 15,
  },
  title2: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  listItem2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Platform.OS === "ios" ? 13 : 7,
    paddingHorizontal: 13,
    marginVertical: 7,
    backgroundColor: COLORS.bg,

    borderRadius: 12,
    width: "100%",
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 15 : 0,
  },
});
