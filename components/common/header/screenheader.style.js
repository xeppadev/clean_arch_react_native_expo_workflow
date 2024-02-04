import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    containerTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 0,
      },
      day: {
        fontSize: 36,
        fontWeight: 'bold',
        marginRight: 10,
      },
      dateInfo: {
        flexDirection: '500',
      },
      weekday: {
        fontSize: 14,
        fontWeight: '500',
        
      },
      monthYear: {
        fontSize: 14,
        fontWeight: '500',
      },

    profileInfo: {
        flexDirection: 'column',
        marginRight: 5,
        marginBottom: 5,
         // Añade un espacio a la derecha del texto
      },
      profileName: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '500',
      },
      profileRole: {
        fontSize: 13,
        color: 'gray',
        marginLeft:"auto"
      },
      
    
      circle: {
      
      width: 42, // Cambia estos valores según tus necesidades
      height: 42, // Cambia estos valores según tus necesidades
      borderRadius: 25, // La mitad del width y height para hacerlo circular
      backgroundColor: "#0C2049", // El color de fondo del círculo
      justifyContent: 'center', // Centra el texto verticalmente
      alignItems: 'center', // Centra el texto horizontalmente
           
    },
    initials: {
      color: 'white', // El color del texto
      fontSize: 18, // Cambia este valor según tus necesidades
    },
  });
  
  export default styles;
  