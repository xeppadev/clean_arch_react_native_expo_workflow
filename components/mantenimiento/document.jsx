import React from "react";
import { COLORS } from "../../constants/theme";
import { TouchableOpacity, View, Text,  StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Iconify } from "react-native-iconify";
import * as MediaLibrary from "expo-media-library";
/**
 * DocumentComponent es un componente de React que permite seleccionar y mostrar documentos.
 *
 * @param {Object} props Las propiedades del componente.
 * @param {Object} props.formikRef La referencia al formulario que contiene el componente.
 * @param {Function} props.setImage La función para establecer la imagen seleccionada.
 * @returns {JSX.Element} El componente DocumentComponent renderizado.
 */
const DocumentComponent= ({ formikRef, setImage }) => {

    const [documents, setDocuments] = React.useState([]);

    const pickDocument = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result) {

          console.log(result);
          let newDocuments = [...documents, result.assets[0]];
          setDocuments(newDocuments);
          formikRef.current.setFieldValue("files", newDocuments);
        }
      } else {
        alert("Permission to access media library is required.");
      }
    };
      
      const removeDocument = (uri) => {
        let newDocuments = documents.filter((document) => document.uri !== uri);
        setDocuments(newDocuments);
        formikRef.current.setFieldValue("files", newDocuments);
      };

  return (
    <>
      <TouchableOpacity
        onPress={pickDocument}
        style={[
          styles.input,
          { paddingVertical: Platform.OS === "ios" ? 14 : 12.4 },
        ]}
      >
        <Text style={styles.placeholderStyle}>Subir documento</Text>
      </TouchableOpacity>
      <View style={styles.viewtitle2}>
        <Text
          style={styles.title2}
        >{`${documents.length} archivos subidos`}</Text>
      </View>
      {documents.map((document, index) => (
        <View key={index} style={styles.document}>
          <TouchableOpacity
            onPress={() => {
              setImage((prevState) => ({
                ...prevState,
                selectedImage: document.uri,
                isImagePreviewVisible: true,
              }));
            }}
            style={[
              styles.input,
              {
                flexDirection: "row",
                maxWidth: Platform.OS === "ios" ? 275 : 260,
                paddingVertical: Platform.OS === "ios" ? 14 : 12.4,
              },
            ]}
          >
            <Icon
              name="file-text-o"
              size={18}
              color="gray"
              style={styles.icon}
            />
            <Text style={styles.title2} numberOfLines={1} ellipsizeMode="tail">
              {document.name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => removeDocument(document.uri)}
            style={styles.eliiminardocumento}
          >
            <Iconify
              icon="solar:trash-bin-minimalistic-bold"
              size={25}
              color="#B50F0F"
            />
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

export default DocumentComponent;

export const styles = StyleSheet.create({
    title2: {
        fontSize: 16,
        fontWeight: "500",
        marginRight: 5,
        paddingRight: 5,
      },
      viewtitle2: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 25,
      },
      input: {
        marginHorizontal: 24,
        marginVertical: 6,
        backgroundColor: COLORS.bg,
        paddingHorizontal: 15,
        borderRadius: 14,
        fontSize: 14,
      },
      placeholderStyle: {
        color: COLORS.gray,
        fontWeight: "400",
        fontSize: 14,
      },
      document: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    
        marginRight: 22,
        backgroundColor: COLORS.white,
        borderRadius: 14,
      },
      eliiminardocumento: {
        padding: 10,
        borderRadius: 14,
        backgroundColor: COLORS.red,
      },
        icon: {
            marginRight: 5,
        },
});