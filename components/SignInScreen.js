import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/authSlice';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(signIn({ email, token: data.token }));
        navigation.navigate('ProfileScreen');
      } else {
        Alert.alert('Error', 'Wrong email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in with your email and password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Clear" onPress={handleClear} />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.switchText}>Switch to: sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  switchText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default SignInScreen;
