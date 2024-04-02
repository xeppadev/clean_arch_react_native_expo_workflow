import React from "react";
import { COLORS } from "@/constants/Colors";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { Iconify } from "react-native-iconify";
import { TabBarIcon } from "@/app/tecnico/(tabs)/_layout";
import { DowloandFile } from "@/src/Data/api/upfiles";
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
  marginHorizontal?: number;
  marginRight?: number;
  backgroundColor?: string;
};

const DocumentViewComponent = ({
  documents,
  marginHorizontal = 24,
  marginRight = 22,
  backgroundColor = COLORS.bg,
}: DocumentComponentProps) => {
  return (
    <View style={styles.content}>
      {documents?.map((document, index) => {
        const ruta = document.replace(/[\\/]/g, "/").replace(/ /g, "%20");
        const filename = ruta.split("/").pop() || "";
      

        return (
          <View
            key={index}
            style={[styles.document, { marginRight: marginRight }]}
          >
            <View
              key={index}
              style={[
                styles.input,
                {
                  marginHorizontal: marginHorizontal,
                  flexDirection: "row",
                  width: "75%",
                  paddingVertical: 14,
                  backgroundColor: backgroundColor,
                },
              ]}
            >
              <TabBarIcon name="file-text-o" size={18} color="gray" />
              <Text
                style={styles.title2}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {filename}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => DowloandFile(ruta, filename)}
              style={styles.eliiminardocumento}
            >
              <Iconify
                icon="humbleicons:download-alt"
                size={25}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
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

  input: {
    marginHorizontal: 24,
    marginVertical: 5,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 14,
    shadowColor: "#e5e5e5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
    
    borderRadius: 14,
  },
  eliiminardocumento: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: COLORS.blue2,
  },

  content: {
    marginBottom: Platform.OS === "ios" ? 45 : 65,
    backgroundColor: "transparent",
  },
});
