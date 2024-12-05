import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
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
      <View style={styles.header}>
        <Image
          source={require("../assets/Ellipse 1 (1).png")}
          style={styles.ellipse1}
        />
        <Image
          source={require("../assets/Ellipse 2.png")}
          style={styles.ellipse2}
        />
      </View>
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
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Do you have account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signUpLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image
            source={require("../assets/logos_google-icon.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/logos_facebook.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/skill-icons_twitter.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={require("../assets/Subtract.png")}
        style={styles.bottomRightImage}
      />
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
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
  ellipse1: {
    // width: 400,
    // height: 250,
  },
  ellipse2: {
    width: 120,
    height: 120,
    position: "absolute",
    bottom: -60,
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 300,
    color: "#EBA300",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
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
  halfWidth: {
    width: "48%",
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
    shadowColor: "#000",
    shadowOffset: { width: 15, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
  },
  buttonText: {
    color: "#2c3e50",
    fontSize: 20,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  signUpText: {
    color: "#000",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "250",
  },
  signUpLink: {
    color: "#EBA300",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "900",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  line: {
    width: 140,
    height: 2,
    backgroundColor: "#E3AF3F",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "55%",
    marginTop: 20,
  },
  socialIcon: {
    width: 48,
    height: 48,
  },
  bottomRightImage: {
    width: 120,
    height: 150,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default Register;
