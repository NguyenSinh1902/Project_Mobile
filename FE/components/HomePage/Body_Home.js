import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { useNavigation } from '@react-navigation/native';
const Body_Home = ({ formatTime, timeLeft }) => {
  const [hotels, setHotels] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("https://6738b0d54eb22e24fca8ae7a.mockapi.io/hotel1")
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCategoryPress = () => {
    navigation.navigate('Categories_Home');
  };

  return (
    <View style={{ marginBottom: 70 }}>
      <ScrollView vertical showsHorizontalScrollIndicator={false}>
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
            <TouchableOpacity
              style={styles.categoryBox}
              onPress={handleCategoryPress}
            >
              <Image
                source={require("../../assets/Mountain.png")}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>Mountain</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryBox}
              onPress={handleCategoryPress}
            >
              <Image
                source={require("../../assets/Beach.png")}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>Beach</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryBox}
              onPress={handleCategoryPress}
            >
              <Image
                source={require("../../assets/Camping.png")}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>Camping</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryBox}
              onPress={handleCategoryPress}
            >
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
            {hotels.map((hotel) => (
              <View key={hotel.id} style={styles.hotelContainer}>
                <Image
                  source={{ uri: hotel.image_avatar }}
                  style={styles.hotelImage}
                />
                <View style={styles.buttonWrapper}>
                  <BlurView
                    tint="dark"
                    intensity={50}
                    style={styles.blurButton}
                  >
                    <TouchableOpacity style={styles.circularButton}>
                      <Image
                        source={require("../../assets/iconoir_heart.png")}
                        style={styles.buttonIcon}
                      />
                    </TouchableOpacity>
                  </BlurView>
                </View>
                <View style={styles.blurWrapper}>
                  <BlurView style={styles.blurView} tint="dark" intensity={100}>
                    <Text style={styles.hotelName}>{hotel.name}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../../assets/bx_map.png")}
                        style={styles.locationIcon}
                      />
                      <Text style={styles.hotelLocation}>{hotel.location}</Text>
                    </View>

                    <View style={styles.hotelInfoRow}>
                      <Text style={styles.hotelPrice}>
                        ${hotel.price}/Night
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={require("../../assets/eva_star-fill.png")}
                          style={{ width: 20, height: 20 }}
                        />
                        <Text style={styles.hotelRating}>{hotel.rating}</Text>
                      </View>
                    </View>
                  </BlurView>
                </View>
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
            {hotels.map((hotel) => (
              <View key={hotel.id} style={styles.hotelContainer}>
                <Image
                  source={{ uri: hotel.image_avatar }}
                  style={styles.hotelImage}
                />
                <View style={styles.buttonWrapper}>
                  <BlurView
                    tint="dark"
                    intensity={50}
                    style={styles.blurButton}
                  >
                    <TouchableOpacity style={styles.circularButton}>
                      <Image
                        source={require("../../assets/iconoir_heart.png")}
                        style={styles.buttonIcon}
                      />
                    </TouchableOpacity>
                  </BlurView>
                </View>
                <View style={styles.blurWrapper}>
                  <BlurView style={styles.blurView} tint="dark" intensity={100}>
                    <Text style={styles.hotelName}>{hotel.name}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../../assets/bx_map.png")}
                        style={styles.locationIcon}
                      />
                      <Text style={styles.hotelLocation}>{hotel.location}</Text>
                    </View>

                    <View style={styles.hotelInfoRow}>
                      <View style={styles.priceContainer}>
                        <View style={styles.originalPriceContainer}>
                          <Text style={styles.originalPrice}>
                            ${hotel.price}
                          </Text>
                        </View>
                        <View style={styles.discountedPriceContainer}>
                          <Text style={styles.discountedPrice}>
                            ${hotel.price * 0.8}
                          </Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Image
                          source={require("../../assets/eva_star-fill.png")}
                          style={{ width: 20, height: 20 }}
                        />
                        <Text style={styles.hotelRating}>{hotel.rating}</Text>
                      </View>
                    </View>
                  </BlurView>
                </View>
              </View>
            ))}
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
            {hotels.map((hotel, index) => (
              <View key={hotel.id} style={styles.hotelContainer}>
                <Image
                  source={{ uri: hotel.image_avatar }}
                  style={styles.hotelImage}
                />
                <View style={styles.buttonWrapper}>
                  <BlurView
                    tint="dark"
                    intensity={50}
                    style={styles.blurButton}
                  >
                    <TouchableOpacity style={styles.circularButton}>
                      <Image
                        source={require("../../assets/iconoir_heart.png")}
                        style={styles.buttonIcon}
                      />
                    </TouchableOpacity>
                  </BlurView>
                </View>
                <View style={[styles.blurWrapper, { height: 110 }]}>
                  <BlurView style={styles.blurView} tint="dark" intensity={100}>
                    <Text style={styles.hotelName}>{hotel.name}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../../assets/bx_map.png")}
                        style={styles.locationIcon}
                      />
                      <Text style={styles.hotelLocation}>{hotel.location}</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginLeft: 3 }}>
                      <Image
                        source={require("../../assets/solar_map-linear.png")}
                        style={styles.locationIcon}
                      />
                      <Text style={styles.hotelLocation}>Away from you: </Text>
                      <Text style={styles.hotelLocation}>
                        {(index * 0.2).toFixed(1)} km
                      </Text>
                    </View>

                    <View style={styles.hotelInfoRow}>
                      <Text style={styles.hotelPrice}>
                        ${hotel.price}/Night
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={require("../../assets/eva_star-fill.png")}
                          style={{ width: 20, height: 20 }}
                        />
                        <Text style={styles.hotelRating}>{hotel.rating}</Text>
                      </View>
                    </View>
                  </BlurView>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 240,
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

  blurWrapper: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    borderRadius: 20,
    overflow: "hidden",
  },
  blurView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  hotelName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 3,
    marginBottom: 3,
  },
  hotelInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  hotelLocation: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 3,
  },
  hotelPrice: {
    color: "#4E95FE",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 3,
  },
  hotelRating: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 3,
  },
  buttonWrapper: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  blurButton: {
    borderRadius: 30,
    overflow: "hidden",
  },
  circularButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },

  priceContainer: {
    width: 127,
    height: 31,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 3,
  },
  originalPriceContainer: {
    width: "50%",
    backgroundColor: "#8FA4CB80",
    justifyContent: "center",
    alignItems: "center",
  },
  discountedPriceContainer: {
    width: "50%",
    backgroundColor: "#DECDCD",
    justifyContent: "center",
    alignItems: "center",
  },
  originalPrice: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
  discountedPrice: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Body_Home;
