import { TouchableOpacity ,StyleSheet } from "react-native";
import { Iconify } from "react-native-iconify";

/**
 * BackHeader es un componente de React que renderiza un botón de retroceso.
 * 
 * @param {Object} props Las propiedades del componente.
 * @param {Function} props.handlePress La función a ejecutar cuando se presiona el botón.
 * @returns {JSX.Element} El componente BackHeader renderizado.
 */
const BackHeader = ({handlePress}) => {
  return (
    <TouchableOpacity style={styles.back} onPress={handlePress}>
      <Iconify icon="mdi:arrow-left" size={24} color="#0F1217" />
    </TouchableOpacity>
  );
};

export default BackHeader;

// Define los estilos para el componente utilizando StyleSheet
const styles = StyleSheet.create({
    back: {
        marginLeft: 8,
        padding: 12,
        borderRadius: 14,
        backgroundColor: "#EDEDED",
    },
});