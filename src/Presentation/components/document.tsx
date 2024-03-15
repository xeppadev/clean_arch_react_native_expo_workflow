import React from "react";
import { COLORS } from "@/constants/Colors";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { TabBarIcon } from "@/app/tecnico/(tabs)/_layout";
import { Iconify } from "react-native-iconify";
import * as MediaLibrary from "expo-media-library";
import { DocumentPickerAsset } from "expo-document-picker";
/**
 * DocumentComponent es un componente de React que permite seleccionar y mostrar documentos.
 *
 * @param {Object} props Las propiedades del componente.
 * @param {Object} props.formikRef La referencia al formulario que contiene el componente.
 * @param {Function} props.setImage La función para establecer la imagen seleccionada.
 * @returns {JSX.Element} El componente DocumentComponent renderizado.
 */
interface DocumentComponentProps {
  formikRef: React.MutableRefObject<any>;
  setImage: React.Dispatch<
    React.SetStateAction<{
      selectedImage: string | null;
      isImagePreviewVisible: boolean;
    }>
  >;
  style?: any;
}

const DocumentComponent = ({
  formikRef,
  setImage,
  style,
}: DocumentComponentProps) => {
  const [documents, setDocuments] = React.useState<DocumentPickerAsset[]>([]);

  const pickDocument = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result && result.assets && result.assets[0]) {
        
        const newDocuments = [...documents, result.assets[0]];
        setDocuments(newDocuments);
        formikRef.current.setFieldValue("files", newDocuments);
        
      }
    } else {
      alert("Permission to access media library is required.");
    }
  };

  const removeDocument = (uri: string) => {
    const newDocuments = documents.filter((document) => document.uri !== uri);
    setDocuments(newDocuments);
    formikRef.current.setFieldValue("files", newDocuments);
  };
  
  return (
    <>
      <TouchableOpacity
        onPress={pickDocument}
        style={[
          styles.input,
          { paddingVertical: Platform.OS === "ios" ? 16 : 13 },
          style,
        ]}
      >
        <Text style={styles.placeholderStyle}>Subir documento</Text>
      </TouchableOpacity>
      <View style={styles.viewtitle2}>
        <Text
          style={styles.title2}
        >{`${documents.length} archivos subidos`}</Text>
      </View>
      <View style={styles.content}>
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
            <TabBarIcon name="file-text-o" size={18} color="gray" />
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
        </View>
    </>
  );
};

export default DocumentComponent;

export const styles = StyleSheet.create({
  title2: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 5,
    paddingRight: 5,
  },
  viewtitle2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
    marginHorizontal: 25,
  },
  input: {
    marginHorizontal: 24,
    marginVertical: 5,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 15,
    borderRadius: 12,
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
  content: {
    marginBottom: Platform.OS === "ios" ? 45 : 65,
  },
});
