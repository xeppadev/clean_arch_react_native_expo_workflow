import { TouchableOpacity, View, Text } from "react-native";
import styles from "./screenheader.style";

/**
 * ScreenHeader es un componente de React que renderiza un encabezado de pantalla.
 * 
 * @param {Object} props Las propiedades del componente.
 * @param {Function} props.handlePress La función a ejecutar cuando se presiona el círculo con las iniciales.
 * @param {string} props.role El rol del usuario a mostrar.
 * @param {string} props.profileName El nombre completo del usuario a mostrar.
 * @returns {JSX.Element} El componente ScreenHeader renderizado.
 */
const ScreenHeader = ({ handlePress, role, profileName }) => {
  // Obtener las iniciales del profileName
  const initials = profileName.split(' ').map(name => name[0]).join('');

  return (
    <>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profileName}</Text>
        <Text style={styles.profileRole}>{role}</Text>
      </View>
      <TouchableOpacity onPress={handlePress} >
        <View style={styles.circle}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ScreenHeader;