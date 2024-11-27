import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Footer_Home = ({ customer }) => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('HomePage', { customer: customer });
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handleHomePress}>
        <Image source={require("../../assets/typcn_home-outline.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require("../../assets/mdi_heart-outline.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require("../../assets/mingcute_notification-line.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require("../../assets/codicon_account.png")} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 60,
    backgroundColor: "#F0F9FF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default Footer_Home;