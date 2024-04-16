// Importa los componentes y módulos necesarios
import React from "react";
import TextInputs from "@/src/Presentation/components/textInput";
import ModalComponent from "@/src/Presentation/components/modalFiles";
import DocumentComponent from "@/src/Presentation/components/document";
import { validationSchemarRegis } from "../../viewmodels/validation/formularioregisman";
import DocumentViewComponent from "../../components/documentView";
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
  ActivityIndicator,
  RefreshControl,
  FlatList,
  TextInput,
} from "react-native";
import { Formik, FormikProps } from "formik";
import { COLORS } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { format, parseISO } from "date-fns";
import { RegistrarCalendarSolicitud } from "../../viewmodels/suscripciones/onSubmit";
import StateInput from "../../components/inputState";

// Define el componente RegistroMantenimiento
const DetallesComponent = () => {
  // Obtiene el id de la ruta
  const { detalles } = useLocalSearchParams();

  // Define refeching para el formulario.
  const [refreshing, setRefreshing] = React.useState(false);
  // Define las mutaciones de Apollo Client para programar un mantenimiento.
  const viewModelDetalles = new RegistrarCalendarSolicitud();

  //Trae los mantenimientos por ID
  const { data, repuestosFormulario, loading, error, refetch } =
    viewModelDetalles.getMantenimientosforId(detalles as string);

  //Funcion mayuscula
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  // Define el estado y las referencias necesarias
  const formikRef = React.useRef<
    FormikProps<{
      _id: string;
      solicitud: string;
      correciones: string;
      repuestos: any[];
      denegado: boolean;
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
    refetch().then(() => {
      setRefreshing(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.blue2} />
      </View>
    );
  }
  if (data === undefined || data === null) {
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
                _id: detalles as string,
                solicitud: "No",
                correciones: "",
                denegado: false,
                repuestos: repuestosFormulario || [],
              }}
              onSubmit={viewModelDetalles.onSubmit.bind(viewModelDetalles)}
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
                    value={
                      data?.fechaSoat
                        ? format(parseISO(data.fechaSoat), "dd/MM/yyyy")
                        : ""
                    }
                    editable={false}
                  />

                  <TitleIcon
                    title="Fecha de Inicio de Mantenimiento"
                    icon="calendar"
                  />

                  <TextInputs
                    value={
                      data?.fechaInicio
                        ? format(
                            parseISO(data.fechaInicio),
                            "dd/MM/yyyy HH:mm "
                          )
                        : ""
                    }
                    editable={false}
                  />
                  <TitleIcon
                    title=" Diagnostico de Estado de la unidad"
                    icon="pencil"
                  />

                  <TextInputs
                    value={data?.diagnostico || ""}
                    editable={false}
                  />
                  <TitleIcon title="Anotaciones" icon="pencil" />
                  <TextInputs
                    value={data?.anotaciones || ""}
                    editable={false}
                  />

                  <TitleIcon title="Solicitar Correciones" icon="wrench" />
                  <DropdownComponent
                    onBlur={() => handleBlur("solicitud")}
                    placeholder="Seleccione un mantenimiento"
                    data={viewModelDetalles.getConfirmacion()}
                    value={values.solicitud}
                    onChange={(item) => handleChange("solicitud")(item.value)}
                  />

                  {values.solicitud === "Si" && (
                    <>
                      <TitleIcon
                        title="Correciones Solicitadas"
                        icon="wrench"
                      />

                      <TextInputs
                        placeholder="Ingrese las correciones solicitadas"
                        onChangeText={handleChange("correciones")}
                        onBlur={handleBlur("correciones")}
                        value={values.correciones}
                      />
                    </>
                  )}

                  {errors.correciones && touched.correciones && (
                    <Text style={styles.error}>{errors.correciones}</Text>
                  )}
                  <TitleIcon
                    title="Ajustar Costos de Repuestos"
                    icon="wrench"
                  />
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
                        <>
                          <Text style={styles.title2}>
                            {" "}
                            Repuesto {index + 1}
                          </Text>
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
                          <Text style={styles.title2}> Precio ($) </Text>
                          <TextInput
                            placeholder="Ingrese el precio actual"
                            style={styles.listItem2}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                              const newRepuestos = [...values.repuestos];
                              newRepuestos[index].precio = parseFloat(text);
                              setFieldValue("repuestos", newRepuestos);
                            }}
                          >
                            <Text style={styles.listItemTitle}>
                              {item.precio}
                            </Text>
                          </TextInput>
                        </>
                      );
                    }}
                  />

                  <TitleIcon title="Documentos" icon="file" />

                  <DocumentViewComponent documents={data.documentos} />
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <View style={styles.viewButton}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.green }]}
          onPress={() => formikRef.current?.handleSubmit()}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.red3 }]}
          onPress={() => {
            // Cambia el estado de denegado a true
            formikRef.current?.setFieldValue("denegado", true);
            // Luego envía el formulario
            formikRef.current?.handleSubmit();
          }}
        >
          <Text style={styles.buttonText}>Denegar</Text>
        </TouchableOpacity>
      </View>

      <ModalComponent images={images} setImage={setImage} />
    </View>
  );
};

// Exporta el componente para que pueda ser utilizado en otros archivos
export default DetallesComponent;

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
    padding: 17,
    width: "50%",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 2,
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
    backgroundColor: COLORS.white,
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
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: COLORS.bg,
  },
  dates: {
    alignItems: "flex-start",
    marginRight: "auto",

    width: "80%",
    backgroundColor: COLORS.bg,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
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
    padding: Platform.OS === "ios" ? 15 : 11,
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
