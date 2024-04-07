import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants/Colors";
import { Dropdown } from "react-native-element-dropdown";
import { TabBarIcon } from "@/app/tecnico/(tabs)/_layout";

import { Iconify } from "react-native-iconify";

/**
 * SearchFilter es un componente que permite buscar y seleccionar repuestos.
 *
 * @component
 * @param {Object} value - El valor actual del filtro de búsqueda.
 * @param {function} onBlur - Función que se ejecuta cuando se deja de enfocar el componente.
 * @param {function} onChange - Función que se ejecuta cuando cambia el valor del filtro de búsqueda.
 * @returns {JSX.Element} El componente SearchFilter renderizado.
 */
interface Item {
  producto: string | null | undefined;
  cantidad: number;
  marca: string | null | undefined;
  id: string | null | undefined;
  precio: number | null | undefined;
}

interface SearchFilterProps {
  value: Item[];
  onBlur: () => void;
  onChange: (value: Item[]) => void;
  data: Item[];
  style?: StyleProp<ViewStyle>;
}

const SearchFilter = ({
  value,
  onBlur,
  onChange,
  data,
  style,
}: SearchFilterProps) => {
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [selectedItems, setSelectedItems] = useState<
      Item[]
  >([]);

  // Filtra los datos basándose en el texto de búsqueda
  const filteredData = searchText
    ? data.filter((item) =>
        item.producto?.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Buscar Repuesto"
          cursorColor={COLORS.blue}
          placeholderTextColor={COLORS.gray}
          onChangeText={(text) => setSearchText(text)} // Actualiza el texto de búsqueda
          value={searchText}
        />

        <Iconify
          icon="prime:search"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
      </View>
      <View style={styles.result}>
        {filteredData.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => {
                if (
                  !selectedItems.some(
                    (selectedItem) => selectedItem.producto === item.producto
                  )
                ) {
                  setSelectedItems([...selectedItems, item]); // Agrega el elemento seleccionado
                  // Agrega un nuevo objeto al array value para el nuevo elemento seleccionado
                  onChange([
                    ...value,
                    {
                      precio: item.precio,
                      producto: item.producto,
                      cantidad: item.cantidad,
                      marca: item.marca,
                      id: item.id,
                    },
                  ]);
                }
              }}
            >
              <Text
                style={styles.itemText}
              >{`${item.producto} (${item.marca}) `}</Text>
              {/*  */}
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.selectedItems}>
        {selectedItems.map((item, index) => {
          const cantidadArray = Array.from(
            { length: Number(item.cantidad) },
            (_, i) => ({
              label: (i + 1).toString(),
              value: (i + 1).toString(),
            })
          );

          return (
            <View key={index} style={styles.itemResult}>
              <View style={styles.product}>
                <Text>{item.producto}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItems([
                      ...selectedItems.filter(
                        (selectedItem) =>
                          selectedItem.producto !== item.producto
                      ),
                    ]);
                    onChange(
                      value.filter((val) => val.producto !== item.producto)
                    );
                  }}
                >
                  <TabBarIcon name="close" size={20} color={COLORS.blue} />
                </TouchableOpacity>
              </View>
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                data={cantidadArray}
                labelField="label"
                valueField="value"
                value={value[index] ? value[index].cantidad.toString() : null}
                placeholder=""
                activeColor="transparent"
                placeholderStyle={{ fontSize: 14 }}
                onBlur={onBlur}
                onChange={(item) => {
                  if (item) {
                    const newCantidad = [...value];
                    const productIndex = newCantidad.findIndex(
                      (prod) => prod.producto === selectedItems[index].producto
                    );
                    if (productIndex !== -1) {
                      newCantidad[productIndex].cantidad = Number(item.value);
                    }
                    onChange(newCantidad);
                  }
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SearchFilter;

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginHorizontal: 22,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    borderRadius: 14,
  },
  searchIcon: {
    padding: 10,
    paddingRight: 30,
  },
  input: {
    flex: 1,
    padding: Platform.OS === "ios" ? 16 : 10,
    paddingHorizontal: 17,
    color: "#424242",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 14,
  },
  itemText: {
    fontSize: 14,
    color: "gray",
  },
  dropdown: {
    alignItems: "flex-end",
    width: "20%",
    backgroundColor: COLORS.bg,
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 11,
  },
  result: {
    flex: 1,

    paddingHorizontal: 10,
    marginTop: 10,

    backgroundColor: COLORS.bg,
    borderRadius: 14,
  },
  selectedItems: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",

    backgroundColor: COLORS.white,
    borderRadius: 14,
  },
  itemResult: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingVertical: 5,
    marginTop: 5,

    borderRadius: 14,
  },
  product: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.bg,
    padding: 11,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: "60%",
  },
  dropdownContainer: {
    borderRadius: 10,
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
});
