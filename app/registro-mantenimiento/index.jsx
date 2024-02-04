// Importa los componentes y módulos necesarios
import React, { useCallback, useMemo } from "react";
import SearchFilter from "../../components/mantenimiento/searchfilter";
import TextInputs from "../../components/mantenimiento/textinput";
import ModalComponent from "../../components/mantenimiento/modal";
import DocumentComponent from "../../components/mantenimiento/document";
import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {
  soat,
  mantenimientos,
} from "../../components/mantenimiento/dataDropdown";
import DropdownComponent from "../../components/mantenimiento/dropdown";
import TitleIcon from "../../components/mantenimiento/titleIcon";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Fetchget from "../../hook/Fetch";
import Fetchpost from "../../hook/Fetch2";
import { parse, format } from "date-fns";

// Define el componente RegistroMantenimiento
const RegistroMantenimiento = () => {
  // Define el estado y las referencias necesarias
  const formikRef = React.useRef();
  const [newmantenimientos, setMantenimientos] = React.useState(false);
  const [refeshing, setRefreshing] = React.useState(false);
  const [images, setImage] = React.useState({
    selectedImage: null,
    isImagePreviewVisible: false,
  });

  const { data, refetch, error, isLoading } = Fetchget("tasks", "placas");
  const { data: data2, refetch: refetch2 } = Fetchget("tasks", "repuestos");

  const { data: data3, refetch: refetchPost } = Fetchpost(
    "tasks",
    "manprogramados"
  );
  const { refetch: refetchregistrar, redirect } = Fetchpost(
    "tasks",
    "registrar",
    "formData"
  );

  // Refeshing de datos :
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    refetch2();
    setRefreshing(false);
  }, []);
  // Define las placas de identificación
  const placas = useMemo(
    () =>
      data.map((item) => {
        return {
          label: item,
          value: item,
        };
      }),
    [data]
  );

  // Desestructura el objeto data3 para extraer el array mantenimientos
  let mantenimientosFormatted = [];
  let kmActual;
  let soat;
  if (data3 && data3.mantenimientos) {
    const { mantenimientos, datosCar } = data3;

    // Mapea el array mantenimientos para crear un nuevo array de objetos
    mantenimientosFormatted = mantenimientos.map((mantenimiento) => {
      // Formatea la fecha para que se muestre en el formato que necesitas

      const fecha = format(new Date(mantenimiento.fecha), "dd/MM/yyyy");

      // Crea un nuevo objeto con las propiedades label y value
      return {
        label: `${mantenimiento.tipoMantenimiento} - ${fecha}`,
        value: `${mantenimiento.tipoMantenimiento} - ${fecha}`,
        id: mantenimiento.idMant,
      };
    });

    // Obtencion del kmActual
    kmActual = datosCar.kmActual.toString();
    soat = format(new Date(datosCar.fechaSoat), "dd/MM/yyyy");
  }

  React.useEffect(() => {
    if (kmActual) {
      formikRef.current.setFieldValue("kmPrevio", kmActual);
      formikRef.current.setFieldValue("fechaSoat", soat);
    }
  }, [kmActual]);

  // Define el esquema de validación para el formulario utilizando Yup
  const validationSchema = Yup.object().shape({
    idMant: Yup.string().required("Este campo es requerido."),
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
    <>
      {isLoading ? (
        <View style={[styles.containerIndicator, styles.horizontalIndicator]}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      ) : error ? (
        <View style={[styles.containerIndicator, styles.horizontalIndicator]}>
        <Text>Error al cargar los datos</Text>
        </View>
      ) : data.length === 0 ? (
        <Text>No hay datos</Text>
      ) : (
        <View style={styles.container}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraScrollHeight={50}
            enableAutomaticScroll={Platform.OS === "ios"}
            refreshControl={
              <RefreshControl refreshing={refeshing} onRefresh={onRefresh} />
            }
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
                    idMant: "",
                    placa: "",
                    Mantenimientos: "",
                    tipoMantenimiento: "",
                    fecha: "",
                    fechaSoat: "",
                    diagnostico: "",
                    repuestos: [],
                    files: [],
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    const fechaDate = parse(
                      values.fecha,
                      "dd/MM/yyyy",
                      new Date()
                    );
                    const fechaUTC = format(
                      fechaDate,
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                    );

                    const fechaSoatDate = parse(
                      values.fechaSoat,
                      "dd/MM/yyyy",
                      new Date()
                    );
                    const fechaSoatUTC = format(
                      fechaSoatDate,
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                    );

                    const formData = new FormData();
                    formData.append("idMant", values.idMant);
                    formData.append("placa", values.placa);
                    formData.append(
                      "tipoMantenimiento",
                      values.tipoMantenimiento
                    );
                    formData.append("fecha", fechaUTC);
                    formData.append("diagnostico", values.diagnostico);
                    formData.append("fechaSoat", fechaSoatUTC);
                    formData.append("kmMedido", values.kmMedido);
                    formData.append("kmPrevio", values.kmPrevio);
                    formData.append(
                      `repuestos`,
                      JSON.stringify(values.repuestos)
                    );

                    // Si tienes archivos para subir, puedes hacerlo de la siguiente manera:
                    // Asegúrate de que 'selectedImage' es un objeto con las propiedades 'uri', 'name' y 'type'.

                    //Platforms
                    if (Platform.OS === "android") {
                      formData.append("files", {
                        uri: values.files[0].uri,
                        name: values.files[0].name,
                        type: values.files[0].mimeType,
                      });
                    } else {
                      formData.append("files", {
                        uri: values.files[0].uri,
                        name: values.files[0].name,
                        type: values.files[0].type,
                      });
                    }

                    refetchregistrar(formData);
                    redirect();
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
                          refetchPost({ placa: item.value });
                        }}
                      />
                      {errors.placa && touched.placa && (
                        <Text style={styles.error}>{errors.placa}</Text>
                      )}

                      <TitleIcon
                        title="Mantenimientos Programados"
                        icon="wrench"
                      />
                      <DropdownComponent
                        onBlur={() => handleBlur("Mantenimientos")}
                        placeholder="Seleccione una programacion"
                        data={mantenimientosFormatted}
                        value={values.Mantenimientos}
                        onChange={(item) => {
                          handleChange("Mantenimientos")(item.value);
                          setFieldValue("idMant", item.id);
                          setFieldValue(
                            "tipoMantenimiento",
                            item.value.split(" - ")[0]
                          );
                          setFieldValue("fecha", item.value.split(" - ")[1]);
                        }}
                      />
                      {errors.Mantenimientos && touched.Mantenimientos && (
                        <Text style={styles.error}>
                          {errors.Mantenimientos}
                        </Text>
                      )}

                      {newmantenimientos && (
                        <>
                          <TitleIcon
                            title="Tipo de mantenimiento"
                            icon="wrench"
                          />
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
                      {errors.placaIdentificacion &&
                        touched.placaIdentificacion && (
                          <Text style={styles.error}>
                            {errors.placaIdentificacion}
                          </Text>
                        )}

                      <TitleIcon title="Kilometraje" icon="calendar" />

                      <TextInputs
                        placeholder="Km Previo"
                        onChangeText={handleChange("kmPrevio")}
                        onBlur={handleBlur("kmPrevio")}
                        editable={false}
                        value={values.kmPrevio}
                        KeyboardType="numeric"
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
                        data={data2}
                        value={values.repuestos}
                        onBlur={() => handleBlur("repuestos")}
                        onChange={(newCantidad) =>
                          setFieldValue("repuestos", newCantidad)
                        }
                      />
                      {errors.repuestos && touched.repuestos && (
                        <Text style={styles.error}>{errors.repuestos}</Text>
                      )}

                      <TitleIcon title="Documentos" icon="file" />

                      <DocumentComponent
                        formikRef={formikRef}
                        setImage={setImage}
                      />

                      {errors.files && touched.files && (
                        <Text style={styles.error}>{errors.files}</Text>
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
      )}
    </>
  );
};

// Exporta el componente para que pueda ser utilizado en otros archivos
export default React.memo(RegistroMantenimiento);

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
