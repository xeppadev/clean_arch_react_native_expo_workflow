import { View, Text } from "react-native";
import { COLORS } from "@/constants/Colors";
interface ScreenHeaderProps {
  role: string;
  profileName: string;
  style: any;
}

const ScreenHeader = ({ role, profileName, style }: ScreenHeaderProps) => {
  // Obtener las iniciales del profileName
  const initials = profileName
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <View style={style}>
         <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profileName}</Text>
        <Text style={styles.profileRole}>{role}</Text>
      </View>
      
      <View style={styles.circle}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
     
    </View>
  );
};

export default ScreenHeader;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    
    marginRight: 13,
    

  },

  circle: {
    width: 44, // Cambia estos valores según tus necesidades
    height: 44, // Cambia estos valores según tus necesidades
    borderRadius: 25, // La mitad del width y height para hacerlo circular
    backgroundColor: COLORS.blue3, // El color de fondo del círculo
    justifyContent: "center", // Centra el texto verticalmente
    alignItems: "center", // Centra el texto horizontalmente
  },
  initials: {
    color: "white", // El color del texto
    fontSize: 18, // Cambia este valor según tus necesidades
    fontWeight: "bold", // Puedes cambiar la forma del texto
    fontFamily: "Inter_500Medium",
  },
  profileInfo: {
    flexDirection: "column",
     marginRight: 5,
     
    // Añade un espacio a la derecha del texto
  },
  profileName: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  profileRole: {
    fontSize: 13,
    marginLeft: "auto",
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
});
