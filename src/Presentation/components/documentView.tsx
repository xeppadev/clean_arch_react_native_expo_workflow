import React from "react";
import { COLORS } from "@/constants/Colors";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

import { TabBarIcon } from "@/app/tecnico/(tabs)/_layout";

/**
 * DocumentComponent es un componente de React que permite seleccionar y mostrar documentos.
 *
 * @param {Object} props Las propiedades del componente.
 * @param {Object} props.formikRef La referencia al formulario que contiene el componente.
 * @param {Function} props.setImage La función para establecer la imagen seleccionada.
 * @returns {JSX.Element} El componente DocumentComponent renderizado.
 */

type DocumentComponentProps = {
  documents: string[] | undefined | null;
};

const DocumentViewComponent = ({ documents }: DocumentComponentProps) => {
  return (
    <>
      {documents?.map((document, index) => (
        
          <View
            key={index}
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
              {document}
            </Text>
          </View>
        
      ))}
    </>
  );
};

export default DocumentViewComponent;

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
    marginBottom: 20,
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
