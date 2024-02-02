import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
const OptionsPage = () => {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSave = () => {
    // Aquí puedes poner tu lógica para guardar los cambios
    console.log('Guardar cambios');
  };

  const handleLogout = async () => {
    try {
      // Borrar el token de autenticación
      await SecureStore.deleteItemAsync('token');
      router.replace('/login');
      console.log('Cerrar sesión');
    } catch (error) {
      // Error al borrar el token de autenticación
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Correo:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Guardar" onPress={handleSave} />
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default OptionsPage;