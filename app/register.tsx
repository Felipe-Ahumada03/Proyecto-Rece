import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Link ya estaba importado, ¡perfecto!
import axios from 'axios';

// --- IMPORTANTE ---
// Usa la misma IP que configuraste en la pantalla de Login.
const API_URL = 'http://192.168.1.149:3000';

export default function RegisterScreen() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('');
  const router = useRouter(); // Hook para la navegación

  const handleRegister = async () => {
    if (!nombreUsuario || !contraseña || !rol) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/usuarios`, {
        Nombre_usuario: nombreUsuario,
        Contraseña: contraseña,
        Rol: rol,
      });

      Alert.alert('Éxito', response.data);
      router.back(); // Regresa a la pantalla anterior (Login)
      
    } catch (error) { // Es buena práctica capturar el error para verlo en consola
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el usuario.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear una Cuenta</Text>
      
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

      <TextInput
        style={styles.input}
        placeholder="Rol (ej. Paciente, Doctor)"
        value={rol}
        onChangeText={setRol}
      />
      
      <Button title="Registrarme" onPress={handleRegister} />

      {/* AQUÍ ESTÁ EL ENLACE AÑADIDO */}
      <Link href="/" style={styles.link}>
        ¿Ya tienes una cuenta? Inicia sesión
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  // ESTILO AÑADIDO PARA EL ENLACE
  link: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
    fontSize: 16,
  },
});