import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import { TabBarIcon } from "@/app/tecnico/(tabs)/_layout";
import FontAwesome from "@expo/vector-icons/FontAwesome";
/**
 * TitleIcon es un componente que muestra un título con un ícono.
 *
 * @component
 * @param {string} title - El título que se mostrará.
 * @param {string} icon - El nombre del ícono que se mostrará.
 * @returns {JSX.Element} El componente TitleIcon renderizado.
 */
interface TitleIconProps {
  title: string;
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const TitleIcon = ({ title, icon, color = "black", style }: TitleIconProps) => {
  return (
    <View style={[styles.viewtitle2, style]}>
      <Text style={[styles.title2, { color }]}>{title}</Text>
      {icon && <TabBarIcon name={icon} color={color} size={18} />}
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
    marginHorizontal: 24, // Margen horizontal de 25
    flexDirection: "row", // Los hijos se disponen en fila
    alignItems: "center", // Los hijos se alinean en el centro verticalmente
    marginTop: 10, // Margen superior de 10
    marginBottom: 10, // Margen inferior de 10
  },
  icon: {
    marginRight: 5, // Margen derecho de 5
  },
});
