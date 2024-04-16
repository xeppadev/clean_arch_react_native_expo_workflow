import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Text,
  View,
} from "react-native";
import React from "react";


import { useSession } from "@/src/Presentation/hooks/useSession";
import { Formik, FormikProps } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "@/constants/Colors";
import TitleIcon from "@/src/Presentation/components/titleIcon";
import TextInputs from "@/src/Presentation/components/textInput";
import { ActualizarDatosPerfil } from "@/src/Presentation/viewmodels/perfil/onSubmit";

export default function SessionScreen() {
  // Define refeching para el formulario.
  const [refreshing, setRefreshing] = React.useState(false);

  const formikRef = React.useRef<
    FormikProps<{
      nombre: string;
      username: string;
      email: string;
      password: string;
    }>
  >(null);
  const { signOut } = useSession();
// Define las mutaciones de Apollo Client para programar un perfil.
const viewModelperfil = new ActualizarDatosPerfil();
//Trae los datos del perfil
const perfil = viewModelperfil.queryPerfil;
// Define la función de refetch para refrescar los datos.
const {  loading, error, data , refetch } = perfil;
 //onrefetch
  const onRefresh = React.useCallback(() => {
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
  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error al cargar los datos</Text>
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container2}>
            <Formik
              innerRef={formikRef}
              initialValues={{
                nombre: data?.name || "",
                username: data?.username || "",
                email: data?.email || "",
                password: "",
              }}
              onSubmit={viewModelperfil.onSubmit.bind(viewModelperfil)}
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
                  <TitleIcon title=" Nombres" icon="pencil" />

                  <TextInputs
                    placeholder="Ingrese el nombre"
                    onChangeText={handleChange("nombre")}
                    onBlur={handleBlur("nombre")}
                    value={values.nombre}
                  />

                  {errors.nombre && touched.nombre && (
                    <Text style={styles.error}>{errors.nombre}</Text>
                  )}

                  <TitleIcon title=" Username" icon="user" />

                  <TextInputs
                    placeholder="Ingrese el username"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />

                  {errors.username && touched.username && (
                    <Text style={styles.error}>{errors.username}</Text>
                  )}

                  <TitleIcon title=" Emails" icon="pencil" />

                  <TextInputs
                    placeholder="Ingrese el email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />

                  {errors.email && touched.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  <TitleIcon title=" Paswords" icon="pencil" />

                  <TextInputs
                    placeholder="**********"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />

                  {errors.password && touched.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <TouchableOpacity
        style={styles.buttonSave}
        onPress={() => formikRef.current?.handleSubmit()}
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonSave,
          { backgroundColor: COLORS.white, marginTop: 10 },
        ]}
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        <Text style={[styles.buttonText, { color: COLORS.blue2 }]}>
          Cerrar Sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
  buttonSave: {
    backgroundColor: COLORS.blue2,
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 25,
    marginTop: 20,
  },

  button: {
    backgroundColor: COLORS.white,
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
