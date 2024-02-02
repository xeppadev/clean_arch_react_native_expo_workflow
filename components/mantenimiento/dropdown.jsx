import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

/**
 * DropdownComponent es un componente de React que renderiza un menú desplegable.
 *
 * @param {Object} props Las propiedades del componente.
 * @param {Array} props.data Los datos para el menú desplegable.
 * @param {Function} props.onChange La función a ejecutar cuando se selecciona una opción.
 * @param {Function} props.onBlur La función a ejecutar cuando el menú desplegable pierde el foco.
 * @param {string} props.value El valor seleccionado en el menú desplegable.
 * @param {string} props.placeholder El texto a mostrar cuando no se ha seleccionado ninguna opción.
 * @returns {JSX.Element} El componente DropdownComponent renderizado.
 */
const DropdownComponent = ({
  data,
  onChange,
  onBlur,
  value,
  placeholder,
  refreshing,
  onRefresh,
}) => {
  return (
    <Dropdown
      placeholderStyle={styles.placeholderStyle}
      style={styles.dropdown}
      refreshing={refreshing}
      onRefresh={onRefresh}
      placeholder={placeholder}
      labelField="label"
      valueField="value"
      onBlur={onBlur}
      searchPlaceholder="Search..."
      data={data}
      value={value}
      onChange={onChange}
    />
  );
};

export default DropdownComponent;

export const styles = StyleSheet.create({
  dropdown: {
    marginHorizontal: 24,
    marginVertical: 6,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 14,
    borderRadius: 14,
    paddingVertical: 5,
  },
  placeholderStyle: {
    color: COLORS.gray,
    fontWeight: "400",
    fontSize: 14,
  },
});
