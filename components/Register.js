import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { registerCustomer } from "../services/CustomerService";

const Register = () => {
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigation = useNavigation();

  const validateInputs = () => {
    if (!name || !phone_number || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return false;
    }

    // Validate name (length > 6)
    if (name.length <= 6) {
      Alert.alert("Error", "Name must be more than 6 characters.");
      return false;
    }

    // Validate phone_number (exactly 10 digits)
    if (!/^\d{10}$/.test(phone_number)) {
      Alert.alert("Error", "Phone number must be exactly 10 digits.");
      return false;
    }

    // Validate password (at least 1 uppercase, 1 special character, and > 12 characters)
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{12,})/.test(password)) {
      Alert.alert(
        "Error",
        "Password must be at least 12 characters long, include 1 uppercase letter, and 1 special character.",
      );
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      const data = { name, phone_number, password }; 
      const response = await registerCustomer(data);
      Alert.alert("Success", "Registration successful!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Registration failed.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Icon name="user" size={15} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name" 
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName} 
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={15} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number" 
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phone_number} 
          onChangeText={setPhoneNumber} 
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? "eye" : "eye-slash"}
            size={20}
            color="#888"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <Icon
            name={confirmPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color="#888"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#EDF6FF",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 10,
    color: "#EBA300",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 334,
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "rgba(241, 193, 82, 0.80)",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    width: 211,
    height: 48,
    backgroundColor: "#EBA300",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#2c3e50",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Register;
