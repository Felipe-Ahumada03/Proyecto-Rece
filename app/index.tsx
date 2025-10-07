import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

// --- IMPORTANTE ---
// Reemplaza esta IP por la de tu backend (ej. 10.0.2.2 para emulador Android)
const API_URL = 'http://192.168.1.149:3000';

export default function LoginScreen() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const router = useRouter(); // Hook para la navegación  

  const handleLogin = async () => {
    if (!nombreUsuario || !contraseña) {
      Alert.alert('Error', 'Por favor, ingresa usuario y contraseña.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        Nombre_usuario: nombreUsuario,
        Contraseña: contraseña,
      });
      
      Alert.alert('Éxito', response.data.message);
      
      // Navegamos a una pantalla principal después del login.
      // Esta ruta '/home' la crearías después (ej. app/home.tsx)
      //router.replace('/home'); // 'replace' evita que el usuario pueda volver al login
      
    } catch (error) {
      const errorMessage = 'Usuario o contraseña incorrectos.';
      Alert.alert('Error de inicio de sesión', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
      />
      
      <Button title="Iniciar Sesión" onPress={handleLogin} />

      <Link href="/register" style={styles.link}>
        ¿No tienes una cuenta? Regístrate
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  link: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
    fontSize: 16,
  },
});