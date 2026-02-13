import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

// Si vas a usar navegación, deja el ({ navigation }), si no, déjalo vacío ()
const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleIngresar = () => {
    // Si tienes configurada la navegación en App.tsx, esto funcionará:
    if (navigation) {
      navigation.navigate('Carnet');
    } else {
      console.log("Navegación no configurada");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>Ingresa a tu cuenta de CENICARD</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo o Ficha"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleIngresar}
        >
          <Text style={styles.buttonText}>INGRESAR</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  input: {
    height: 60,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    elevation: 4, 
  },
  button: {
    backgroundColor: '#00C853',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    textDecorationLine: 'underline',
  }
});

export default Login;