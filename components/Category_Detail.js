import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';

import { getAllLocationTypes } from "../services/LocationTypeService.js";
import { getAccommodationsByLocationType } from "../services/AccommodationService.js";
import { addFavorite, removeFavorite, getFavorites } from "../services/FavoriteService.js";

import Icon from 'react-native-vector-icons/FontAwesome';;
import Header_Home from "./HomePage/Header_Home";
import Footer_Home from "./HomePage/Footer_Home.js";

const Category_Detail = () => {

  const route = useRoute();
  const navigation = useNavigation();

  const { customer } = route.params;

  const [locationTypes, setLocationTypes] = useState([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState([]);
  const [selectedLocationType, setSelectedLocationType] = useState(route.params?.locationType || null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchLocationTypes = async () => {
      try {
        const data = await getAllLocationTypes();
        setLocationTypes(data);
      } catch (error) {
        console.error("Error fetching location types:", error);
      }
    };

    fetchLocationTypes();
  }, []);

  useEffect(() => {
    if (selectedLocationType) {
      const fetchAccommodations = async () => {
        try {
          const accommodations = await getAccommodationsByLocationType(selectedLocationType);
          setSelectedAccommodations(accommodations);
        } catch (error) {
          console.error("Error fetching accommodations:", error);
        }
      };
      fetchAccommodations();
    }
  }, [selectedLocationType]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (customer) {
          const favoriteData = await getFavorites(customer.customer_id); // Fetch favorites for the customer
          setFavorites(favoriteData);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [customer]);

  const handleFavoriteToggle = async (accommodationId) => {
    try {
      if (!customer) {
        console.error("Customer not provided");
        return;
      }

      if (favorites.some(favorite => favorite.accommodation && favorite.accommodation.accommodation_id === accommodationId)) {
        // Remove from favorites
        await removeFavorite(customer.customer_id, accommodationId);
        setFavorites(prevFavorites => prevFavorites.filter(favorite => 
          favorite.accommodation.accommodation_id !== accommodationId
        ));
      } else {
        // Add to favorites
        await addFavorite(customer.customer_id, accommodationId);
        setFavorites(prevFavorites => [...prevFavorites, { accommodation: { accommodation_id: accommodationId } }]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const isFavorite = (accommodationId) => {
    return favorites.some(favorite => favorite.accommodation.accommodation_id === accommodationId);
  };

  const handleLocationTypePress = async (locationType) => {
    try {
      setSelectedLocationType(locationType);
      const accommodations = await getAccommodationsByLocationType(locationType);
      setSelectedAccommodations(accommodations);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  const formatPrice = (price) => {
    const numericPrice = Number(price);
    return numericPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace("₫", "VND");
  };

  return (
    <>
      <Header_Home customer={customer}/>
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesText}>Categories</Text>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesGrid}
        >
          {locationTypes.map((type) => (
            <TouchableOpacity key={type.location_type_id} 
              style={styles.categoryBox}
              onPress={() => handleLocationTypePress(type.type)}
            >
              <Image
                source={{ uri: type.image_url }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{type.type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {selectedAccommodations.length > 0 && (
        <View style={{ marginTop: 20, flex: 1, marginBottom: 60 }}>
          <View style={styles.accommodationsHeader}>
            <Text style={styles.accommodationsHeaderText}>
              {selectedLocationType} Locations
            </Text>
          </View>
          <ScrollView style={styles.accommodationsList} showsVerticalScrollIndicator={false}>
            {selectedAccommodations.map((acc) => (
              <TouchableOpacity key={acc.accommodation_id} 
                style={styles.accommodationItem}
                onPress={() =>
                  navigation.navigate('AccommodationDetail', { accommodationId: acc.accommodation_id, customer })
                }
              >
                <Image
                  source={{ uri: acc.image_url }}
                  style={styles.accommodationImage}
                />
                <TouchableOpacity
                  style={styles.favoriteIcon}
                  onPress={() => handleFavoriteToggle(acc.accommodation_id)}
                >
                  <Icon
                    name={isFavorite(acc.accommodation_id) ? "heart" : "heart-o"}
                    size={24}
                    color={isFavorite(acc.accommodation_id) ? "red" : "gray"}
                  />
                </TouchableOpacity>
                <Text style={styles.accommodationName}>{acc.name}</Text>
                <Text style={styles.accommodationPrice}>
                  {formatPrice(acc.price_per_night)}<Text>/night</Text>
                </Text>
                <Text style={styles.accommodationAddress}>
                  {acc.address}
                </Text>
                
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      <Footer_Home customer={customer}/>
    </>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 250,
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
    marginRight: 30,
    marginTop: 10,
  },
  categoryImage: {
    width: 62,
    height: 65,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
  },
  categoryText: {
    color: "#000",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "500",
  },
  specialOffersGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  accommodationsList: {
    marginTop: 15,
  },
  accommodationsHeader: {
    alignItems: 'center'
  },
  accommodationsHeaderText: {
    fontStyle: 'italic',
    fontSize: 24,
    lineHeight: 29,
  },
  accommodationItem: {
    position: 'relative',
    marginBottom: 10,
    alignItems: 'center',
  },
  accommodationImage: {
    width: '80%', 
    height: 200, 
    borderRadius: 10,
  },
  accommodationName: {
    position: 'absolute',
    top: 10,
    left: 50,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  accommodationPrice: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  accommodationAddress: {
    position: 'absolute',
    bottom: 10,
    left: 50,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 60,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    padding: 5,
  },
});

export default Category_Detail;
