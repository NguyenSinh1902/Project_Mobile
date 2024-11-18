import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const Body_Home = ({ formatTime, timeLeft }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("https://6738b0d54eb22e24fca8ae7a.mockapi.io/hotel1")
      .then(response => response.json())
      .then(data => setHotels(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesText}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesGrid}
        >
          <TouchableOpacity style={styles.categoryBox}>
            <Image
              source={require("../../assets/Mountain.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Mountain</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox}>
            <Image
              source={require("../../assets/Beach.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Beach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox}>
            <Image
              source={require("../../assets/Camping.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Camping</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox}>
            <Image
              source={require("../../assets/Island.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Island</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={[styles.categoriesContainer, { marginTop: 20 }]}>
        <Text style={styles.categoriesText}>Popular Places</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.specialOffersGrid}
        >
          {hotels.map(hotel => (
            <View key={hotel.id} style={styles.hotelContainer}>
              <Image source={{ uri: hotel.image_avatar }} style={styles.hotelImage} />
              <Text style={styles.hotelName}>{hotel.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.categoriesContainer, { marginTop: 20 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.categoriesText}>Special Offers</Text>
          <Text style={styles.countdownText}>{formatTime(timeLeft)}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.specialOffersGrid}
        >
          <Text>aa</Text>
          {/* Add special offers content here */}
        </ScrollView>
      </View>

      <View style={[styles.categoriesContainer, { marginTop: 20 }]}>
        <Text style={styles.categoriesText}>Locations Near</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.specialOffersGrid}
        >
          <Text>aa</Text>
          {/* Add special offers content here */}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 270,
    paddingHorizontal: 20,
  },
  categoriesText: {
    color: "#000",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "600",
  },
  seeAllText: {
    color: "#000",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
  },
  categoriesGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  categoryBox: {
    width: 80,
    height: 80,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 40,
    marginTop: 20,
  },
  categoryImage: {
    width: 62,
    height: 65,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    position: "absolute",
    top: -20,
  },
  categoryText: {
    color: "#000",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "500",
    marginTop: 40,
  },
  specialOffersGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  countdownText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "400",
    marginLeft: 10,
    marginTop: 10,
  },
  hotelContainer: {
    marginRight: 20,
    alignItems: "center",
  },
  hotelImage: {
    width: 244,
    height: 303,
    borderRadius: 30,
  },
  hotelName: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Body_Home;