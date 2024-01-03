import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Iconify } from "react-native-iconify";

/**
 * Renderiza un componente de Notificacion que muestra un icono de notificación y una insignia con el número de notificaciones.
 * @param {Object} props Las propiedades pasadas a este componente.
 * @param {Function} props.handlePress La función a ejecutar cuando se presiona el componente.
 * @param {number} props.badgeCount El número de notificaciones a mostrar en la insignia.
 * @returns {JSX.Element} El componente Notificacion renderizado.
 */
const Notificacion = ({handlePress, badgeCount}) => {
  return (
    <TouchableOpacity style={styles.notificacion} onPress={handlePress}>
      <Iconify icon="solar:bell-bold-duotone" size={30} color="#0F1217" />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Exporta el componente Notificacion para que pueda ser utilizado en otros archivos.
export default Notificacion;

// Define los estilos utilizados en este componente.
const styles = StyleSheet.create({
  notificacion: {
    marginRight: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});