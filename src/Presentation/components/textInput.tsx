import { StyleSheet, TextInput, Platform, TextInputProps } from "react-native"
import { COLORS } from "@/constants/Colors"

// Componente de entrada de texto

const TextInputs: React.FC<TextInputProps   > = ({
  style,
  placeholder,
  onChangeText,
  placeholderTextColor,
  onBlur,
  value,
  onPressOut,
  editable,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  return (
    <TextInput
      placeholderTextColor={placeholderTextColor ? placeholderTextColor : COLORS.gray} // El color del marcador de posición es gris
      style={[styles.input, style]} // Los estilos
      placeholder={placeholder} // El marcador de posición
      onPressOut={onPressOut} // Función que se ejecuta al dejar de presionar
      onChangeText={onChangeText} // Función que se ejecuta al cambiar el texto
      onBlur={onBlur} // Función que se ejecuta al dejar de enfocar
      value={value} // El valor actual
      editable={editable} // Si es editable
      secureTextEntry={secureTextEntry} // Si es una contraseña
      keyboardType={keyboardType}
    />
  )
}

export default TextInputs

// Estilos del componente
export const styles = StyleSheet.create({
  input: {
    marginHorizontal: 24, // Margen horizontal de 24
    marginVertical: 6, // Margen vertical de 6
    backgroundColor: COLORS.bg, // El fondo es el color de fondo definido en COLORS
    paddingHorizontal: 15, // Padding horizontal de 15
    borderRadius: 12, // Borde redondeado con radio de 14
    fontSize: 14, // Tamaño de fuente de 14
    paddingVertical: Platform.OS === "ios" ? 16 : 10,
  },
})
