import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updating, setUpdating] = useState(false);

  const handleUpdate = () => {
    if (!name || !password) {
      Alert.alert('Error', 'Name and password are required.');
      return;
    }
    Alert.alert('Success', 'Name and password updated successfully.');
    setName('');
    setPassword('');
    setUpdating(false);
  };

  const handleCancel = () => {
    setName('');
    setPassword('');
    setUpdating(false);
  };

  const handleSignOut = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      {updating ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="New Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.buttonRow}>
            <Button title="Confirm" onPress={handleUpdate} />
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        </View>
      ) : (
        <View>
          <Text>Name: John Doe</Text>
          <Text>Email: johndoe@example.com</Text>
          <View style={styles.buttonRow}>
            <Button title="Update" onPress={() => setUpdating(true)} />
            <Button title="Sign Out" onPress={handleSignOut} />
          </View>
        </View>
      )}
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
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default ProfileScreen;

