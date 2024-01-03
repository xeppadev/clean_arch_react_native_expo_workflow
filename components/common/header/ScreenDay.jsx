import { View, Text, StyleSheet } from 'react-native';

const DateHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hoy</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(120, 157, 233, 0.1)', // Fondo celeste
        paddingVertical: 10,         // Padding de 10
        paddingHorizontal: 25,      // Padding de 20
        borderRadius: 10, // Borde redondeado
       
    },
    text: {
        color: '#789DE9', // Color de letra azul
        fontWeight: "500", // Letra negrita
        fontSize: 16, // Tamaño de letra 16
    },
});

export default DateHeader;