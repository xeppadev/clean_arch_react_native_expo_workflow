import { StyleSheet, TextInput} from "react-native";
import { COLORS } from "../../constants/theme";

/**
 * TextInputs es un componente que renderiza un campo de texto.
 *
 * @component
 * @param {Object} style - Los estilos que se aplicarán al campo de texto.
 * @param {string} placeholder - El texto de marcador de posición que se mostrará cuando el campo de texto esté vacío.
 * @param {function} onChangeText - Función que se ejecuta cuando cambia el texto del campo de texto.
 * @param {function} onBlur - Función que se ejecuta cuando se deja de enfocar el campo de texto.
 * @param {string} value - El valor actual del campo de texto.
 * @param {function} onPressOut - Función que se ejecuta cuando se deja de presionar el campo de texto.
 * @param {boolean} editable - Indica si el campo de texto es editable.
 * @returns {JSX.Element} El componente TextInputs renderizado.
 */
const TextInputs = ({ style, placeholder,onChangeText, onBlur,value, onPressOut, editable }) => {
  return (
    <TextInput
      placeholderTextColor={COLORS.gray} // El color del marcador de posición es gris
      style={[
        styles.input,
        { paddingVertical: Platform.OS === "ios" ? 14 : 10 }, // El padding vertical depende del sistema operativo
      ]}
      placeholder={placeholder} // El marcador de posición
      onPressOut={onPressOut} // Función que se ejecuta al dejar de presionar
      onChangeText={onChangeText} // Función que se ejecuta al cambiar el texto
      onBlur={onBlur} // Función que se ejecuta al dejar de enfocar
      value={value} // El valor actual
      editable={editable} // Si es editable
    />
  );
};

export default TextInputs;

// Estilos del componente
export const styles = StyleSheet.create({
    input: {
        marginHorizontal: 24, // Margen horizontal de 24
        marginVertical: 6, // Margen vertical de 6
        backgroundColor: COLORS.bg, // El fondo es el color de fondo definido en COLORS
        paddingHorizontal: 15, // Padding horizontal de 15
        borderRadius: 14, // Borde redondeado con radio de 14
        fontSize: 14, // Tamaño de fuente de 14
      },
});