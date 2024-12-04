import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { updatePassword } from '../services/AccountService';

import Footer_Home from "./HomePage/Footer_Home.js";

const Account = ({ route, navigation }) => {
    const { customer } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match!');
        return;
        }

        try {
        await updatePassword(customer.customer_id, newPassword);
        Alert.alert('Success', 'Password updated successfully!');
        } catch (error) {
        Alert.alert('Error', 'Failed to update password.');
        }
    };

    const handleLogout = () => {
        try {
        navigation.navigate('GetStarted');
        } catch (error) {
        Alert.alert('Error', 'Failed to log out.');
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.header}>Account Information</Text>
                <Text style={styles.label}>Name: {customer.name}</Text>
                <Text style={styles.label}>Phone: {customer.phone_number}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <Footer_Home customer={customer}/>
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Account;
