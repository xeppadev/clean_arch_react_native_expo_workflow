import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../../constants/theme";
import { data } from '../../../components/mantenimiento/example';

/**
 * InventoryPage es un componente de React que muestra una lista de productos en un inventario.
 * 
 * Este componente utiliza el estado de React para manejar el texto de búsqueda ingresado por el usuario.
 * 
 * Los productos se filtran basándose en el texto de búsqueda, y sólo se muestran los productos cuyo nombre incluye el texto de búsqueda.
 * 
 * Cada producto se muestra con su nombre y cantidad. El color del contenedor del producto varía dependiendo de la cantidad de producto:
 * - Si la cantidad es menor a 5, el color del contenedor es '#D9AA02'.
 * - Si la cantidad es 5 o más, el color del contenedor es COLORS.blue.
 * 
 * El componente InventoryPage también incluye un campo de entrada para el texto de búsqueda y un icono de búsqueda.
 * 
 * @returns {JSX.Element} El componente InventoryPage renderizado.
 */
const InventoryPage = () => {
  
  // Define el estado para el texto de búsqueda.
  const [searchText, setSearchText] = useState('');
  
  // Filtra los datos basándose en el texto de búsqueda.
  const filteredData = data.filter(item =>
    item.producto.toLowerCase().includes(searchText.toLowerCase())
  );

  // Define cómo se debe renderizar cada elemento de la lista.
  const renderItem = ({ item }) => {
    // Define el color del contenedor basándose en la cantidad de producto.
    const containerColor = item.cantidad < 5 ? '#D9AA02' : COLORS.blue;
    return (
      <View style={styles.itemContainer} >
        <View style={styles.contentitem}>
          <Text style={styles.itemText}>{item.producto}</Text>
        </View>
        <View style={[styles.numberContainer, {backgroundColor:containerColor}]}>
          <Text style={styles.numberText}>{item.cantidad}</Text>
        </View>
      </View>
    )
  }

  // Renderiza el componente.
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Inventario de Repuestos</Text>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Buscar Repuesto"
            cursorColor={COLORS.blue}
            placeholderTextColor={COLORS.blue}
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
          <Icon
            style={styles.searchIcon}
            name="search"
            size={20}
            color={COLORS.blue}
          />
        </View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

// Exporta el componente InventoryPage para que pueda ser utilizado en otros archivos.
export default InventoryPage;

// Define los estilos del componente. 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container2: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 18,
    marginTop: Platform.OS == "ios" ? 15 : 7,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 10,
    paddingBottom: Platform.OS === "ios" ? 90 : 95,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C8C8C8",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: "#242424",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginHorizontal: 14,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "500",
  },
  contentitem: {
    flex: 1, // Agrega esta línea
    backgroundColor: "#EDEDED",
    marginRight: 10, // Agrega esta línea para añadir un pequeño espacio entre los contenedores
    justifyContent: "flex-start",
    padding: 10, // Agrega esta línea si quieres un poco de padding alrededor del texto
    borderRadius: 10,
  },
  numberContainer: {
    padding: 10,
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
