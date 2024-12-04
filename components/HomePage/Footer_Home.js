import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { findCustomerByPhone } from "../../services/CustomerService.js";

const Footer_Home = ({ customer }) => {
  const navigation = useNavigation();
  const [customerApi, setCustomer] = useState(null);

  useEffect(() => {
    if (customer && customer.phone_number) {
      const fetchCustomer = async () => {
        try {
          const foundCustomer = await findCustomerByPhone(customer.phone_number);
          setCustomer(foundCustomer); 
        } catch (error) {
          setCustomer(null); 
          console.error("Customer not found or error occurred", error);
        }
      };
  
      fetchCustomer();
    }
  }, [customer?.phone_number]);

  const handleHomePress = () => {
    navigation.navigate('HomePage', { customer: customerApi });
  };

  const handleAccountPress = () => {
    navigation.navigate('Account', { customer: customerApi });
  };
  const handleFavoritePress = () => {
    navigation.navigate('MyFavorite', { customer: customerApi });
  };
  const handleMyOrderPress = () => {
    navigation.navigate('MyOrder', { customer: customerApi });
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handleHomePress}>
        <Image source={require("../../assets/typcn_home-outline.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFavoritePress}>
        <Image source={require("../../assets/mdi_heart-outline.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMyOrderPress}>
        <Image source={require("../../assets/mingcute_notification-line.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAccountPress}>
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