import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PaymentSuccessful = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/Khung3.png")} style={styles.image} />
        <Image
          source={require("../assets/tick11.png")}
          style={styles.overlayImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Payment Successful</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Payment ID</Text>
            <Text style={styles.value}>15975360</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>08:35 AM</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>11/08/2024</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>MOMO</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>$64.5</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 40,
            }}
          >
            <TouchableOpacity style={styles.button}>
              <Image source={require("../assets/home-button.png")} />
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Image source={require("../assets/mi_share.png")} />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFAFAF",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 10,
    shadowRadius: 50,
    elevation: 30,
    borderRadius: 20,
    position: "relative",
  },
  image: {
    width: 380,
    height: 433,
    borderRadius: 20,
  },
  overlayImage: {
    position: "absolute",
    top: -50,
    left: "35%",
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  textContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 35,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000",
    marginLeft: 20,
  },
  value: {
    fontSize: 20,
    fontWeight: "400",
    color: "#666",
    marginRight: 20,
  },
  button: {
    flexDirection:"row",
    width: 165,
    height: 43,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#EE8395",
    backgroundColor: "#F2E9EA",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EE8395",
  },
});

export default PaymentSuccessful;
