import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://s3-alpha-sig.figma.com/img/109b/b5dd/1b4819d800977b4fa5472eb7f471d48d?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hCIpSEPq9ApLKbdZnX14z7AiYoLyfP2K~cvw9M70kqQDpN5feFpP17akXocFXMBPjpDFyQii4f24Fo-TrKHTcEIQI~OWPrCKTQ-lRSNa07RWDpZCi2EqOEJ5ZhaZGvdgKlgWKAV6R5Iuc86zgltX03g72vb6Kp8wUPWFF-v0tXDEIZ87nvs0LrUsNQFQvMQUViKdiu-DBtyNddCCXmSSlgnYwZQhSIFgf9FymVE6tuxoUDKuDDldy8cCjT2y2tQoPdbUKI1u4F~3PvRE~OWom1Zg7TgTjbqHjfiStn75G9e-3rqIobd~7I1-yXrS~SrbkusKOe4sLhDAaARNJyiBnA__' }}
        style={styles.image}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { router.push("/home")}}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#050E20',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
    marginHorizontal: 55,

  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(237, 237, 237, 0.1)', // Opacidad solo en el fondo
    padding: 12,
    borderRadius: 14,
    
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default LoginScreen;