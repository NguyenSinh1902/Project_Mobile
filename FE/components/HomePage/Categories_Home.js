import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Header_Home from "./Header_Home";
import Footer_Home from "./Footer_Home";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

const Categories_Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetch("https://6738b0d54eb22e24fca8ae7a.mockapi.io/hotel1")
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCategoryPress = (category) => {
    const filtered = hotels.filter((hotel) => hotel.category === category);
    setFilteredHotels(filtered);
    setSelectedCategory(category);
  };

  const getCategoryBoxStyle = (category) => {
    return {
      ...styles.categoryBox,
      backgroundColor: selectedCategory === category ? "#A9CEE1" : "#FFF",
    };
  };

  return (
    <View style={styles.container}>
      <Header_Home />
      <View style={styles.body}>
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
                style={getCategoryBoxStyle("Mountain")}
                onPress={() => handleCategoryPress("Mountain")}
              >
                <Image
                  source={require("../../assets/Mountain.png")}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>Mountain</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={getCategoryBoxStyle("Beach")}
                onPress={() => handleCategoryPress("Beach")}
              >
                <Image
                  source={require("../../assets/Beach.png")}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>Beach</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={getCategoryBoxStyle("Camping")}
                onPress={() => handleCategoryPress("Camping")}
              >
                <Image
                  source={require("../../assets/Camping.png")}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>Camping</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={getCategoryBoxStyle("Island")}
                onPress={() => handleCategoryPress("Island")}
              >
                <Image
                  source={require("../../assets/Island.png")}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>Island</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {selectedCategory ? (
            <Text style={styles.selectedCategoryText}>{selectedCategory}</Text>
          ) : null}

          <View>
            <ScrollView
              vertical
              showsHorizontalScrollIndicator={false}
              style={styles.specialOffersGrid}
            >
              {filteredHotels.map((hotel) => (
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
                    <BlurView
                      style={styles.blurView}
                      tint="dark"
                      intensity={100}
                    >
                      <Text style={styles.hotelName}>{hotel.name}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={require("../../assets/bx_map.png")}
                          style={{marginTop: 3}}
                        />
                        <Text style={styles.hotelLocation}>
                          {hotel.location}
                        </Text>
                      </View>

                      <View style={styles.hotelInfoRow}>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              color: "#FFF",
                              marginTop: 3,
                              marginLeft: 3,
                              fontSize: 16,
                            }}
                          >
                            Price:
                          </Text>
                          <Text style={styles.hotelPrice}>
                            ${hotel.price}
                          </Text>
                        </View>
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
      <Footer_Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "space-between",
  },
  body: {
    flex: 1,
    marginBottom: 70,
  },
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
  selectedCategoryText: {
    color: "#1A1A1D",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "900",
    paddingHorizontal: 20,
    marginTop: 10,
    textAlign: "center",
    alignSelf: "center",
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
    //marginTop: 10,
  },
  hotelContainer: {
    //marginRight: 10,
    marginLeft: 20,
    alignItems: "center",
  },
  hotelImage: {
    width: 375,
    height: 303,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonWrapper: {
    position: "absolute",
    top: 35,
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
    padding: 10,
  },
  hotelName: {
    color: "#4E95FE",
    fontSize: 19,
    fontWeight: "bold",
    marginLeft: 3,
    marginBottom: 7,
  },
  hotelInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  hotelLocation: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 3,
    //marginBottom: 2,
  },
  hotelPrice: {
    color: "#FFF",
    fontSize: 19,
    fontWeight: "bold",
    marginLeft: 3,
  },
  hotelRating: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 3,
  },
});

export default Categories_Home;