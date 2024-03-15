import { StyleSheet, Text, View, Platform } from "react-native";
import { COLORS } from "@/constants/Colors";

import { Iconify } from "react-native-iconify";
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

type TextInputProps = {
  value: string | undefined | null;
};
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const StateInput = ({ value }: TextInputProps) => {
  let textColor, backgroundColor, icon;

  switch (value) {
    case "completado":
    case "aprobado":
      textColor = COLORS.green;
      backgroundColor = COLORS.green2;
      icon = (
        <Iconify
          icon="el:ok-sign"
          size={17}
          color={COLORS.green}
          style={styles.icon}
        />
      );
      break;
    case "pendiente":
      textColor = COLORS.wellow;
      backgroundColor = COLORS.wellowlg;
      icon = (
        <Iconify
          icon="solar:clock-circle-bold"
          size={17}
          color={COLORS.wellow}
          style={styles.icon}
        />
      );
      break;
    case "revision":
      textColor = COLORS.wellow;
      backgroundColor = COLORS.wellowlg;
      icon = (
        <Iconify
          icon="solar:danger-circle-bold"
          size={17}
          color={COLORS.wellow}
          style={styles.icon}
        />
      );
      break;
    
    default:
      textColor = COLORS.red2;
      backgroundColor = COLORS.red;
      icon = (
        <Iconify
          icon="solar:close-circle-bold"
          size={17}
          color={COLORS.red2}
          style={styles.icon}
        />
      );
  }

  return (
    <View
      style={[
        styles.textContainer,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.input,
          {
            paddingVertical: Platform.OS === "ios" ? 14 : 12,
            color: textColor,
          },
        ]}
      >
        {value && capitalizeFirstLetter(value)}
      </Text>
      {icon}
    </View>
  );
};

export default StateInput;

// Estilos del componente
export const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
    marginHorizontal: 24,
    paddingHorizontal: 15,
    borderRadius: 14,
  },
  input: {
    fontSize: 15,
    fontWeight: "500",
  },
  icon: {},
});
