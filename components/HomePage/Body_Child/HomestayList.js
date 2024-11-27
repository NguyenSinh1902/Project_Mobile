import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getAccommodationsByHomestay } from '../../../services/AccommodationService';

const HomestayList = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await getAccommodationsByHomestay();
        setAccommodations(data);
      } catch (error) {
        console.error("Error fetching accommodations: ", error);
      }
    };
    fetchAccommodations();
  }, []);

  const formatPrice = (price) => {
    const numericPrice = Number(price);
    return numericPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace("₫", "VND");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Homestays</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {accommodations.map((accommodation) => (
          <TouchableOpacity key={accommodation.accommodation_id} style={styles.card}>
            <Image source={{ uri: accommodation.image_url }} style={styles.image} />
            <Text style={styles.name}>{accommodation.name}</Text>
            <Text style={{fontSize: 12}}>{accommodation.address}</Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={{fontSize: 12, marginTop: 5}}>1 night</Text>
              <Text style={{fontSize: 12, marginTop: 5, fontWeight: 'bold'}}>{formatPrice(accommodation.price_per_night)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 15, paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  card: { width: 180, marginRight: 15, marginTop: 10, borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff' },
  image: { width: '100%', height: 120, borderRadius: 10 },
  name: { fontWeight: 'bold', marginTop: 5 },
});

export default HomestayList;
