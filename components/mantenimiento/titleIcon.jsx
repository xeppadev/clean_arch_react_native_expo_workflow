import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * TitleIcon es un componente que muestra un título con un ícono.
 *
 * @component
 * @param {string} title - El título que se mostrará.
 * @param {string} icon - El nombre del ícono que se mostrará.
 * @returns {JSX.Element} El componente TitleIcon renderizado.
 */
const TitleIcon = ({ title, icon }) => {
  return (
    <View style={styles.viewtitle2}>
      <Text style={styles.title2}>{title}</Text>
      <Icon name={icon} size={19} color="gray" style={styles.icon} />
    </View>
  );
};

export default TitleIcon;

// Estilos del componente
export const styles = StyleSheet.create({
    title2: {
        fontSize: 16, // Tamaño de fuente de 16
        fontWeight: "500", // Peso de fuente de 500
        marginRight: 5, // Margen derecho de 5
        paddingRight: 5, // Padding derecho de 5
      },
      viewtitle2: {
        flexDirection: "row", // Los hijos se disponen en fila
        alignItems: "center", // Los hijos se alinean en el centro verticalmente
        marginTop: 10, // Margen superior de 10
        marginBottom: 10, // Margen inferior de 10
        marginHorizontal: 25, // Margen horizontal de 25
      },
      icon: {
        marginRight: 5, // Margen derecho de 5
      },
});