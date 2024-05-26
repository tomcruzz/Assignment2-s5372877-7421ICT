import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/authSlice';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(signIn({ email, token: data.token }));
        navigation.navigate('ProfileScreen');
      } else {
        Alert.alert('Error', data.message || 'An error occurred during sign up.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up a new user</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Clear" onPress={handleClear} />
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.switchText}>Switch to: sign in</Text>
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

export default SignUpScreen;
