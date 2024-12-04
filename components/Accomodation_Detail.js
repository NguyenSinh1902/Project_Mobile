import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { getAccommodationById } from '../services/AccommodationService'; 

import Footer_Home from "./HomePage/Footer_Home.js";

const AccommodationDetail = ({ route }) => {

    const { accommodationId, customer } = route.params; 
    const [accommodation, setAccommodation] = useState(null);

    useEffect(() => {
        const fetchAccommodationDetails = async () => {
        try {
            const data = await getAccommodationById(accommodationId); 
            setAccommodation(data);
        } catch (error) {
            console.error('Error fetching accommodation details:', error);
        }
        };

        fetchAccommodationDetails();
    }, [accommodationId]);

    if (!accommodation) {
        return (
        <View style={styles.center}>
            <Text>Loading...</Text>
        </View>
        );
    }
    console.log(accommodation);
    const formatPrice = (price) => {
        return Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VND');
      };

    return (
        <>
            <View style={styles.container}>
                {/* Hình ảnh */}
                <Image source={{ uri: accommodation.image_url }} style={styles.image} />
                <Text style={styles.title}>{accommodation.name}</Text>
                <Text style={styles.address}>{accommodation.address}</Text>
                <Text style={styles.type}>Type: {accommodation.type}</Text>
                <Text style={styles.rating}>Rating: {accommodation.rating}⭐</Text>
                <Text style={styles.price}>Price per Night: {formatPrice(accommodation.price_per_night)}</Text>
                <Text style={styles.maxGuests}>Max Guests: {accommodation.max_guests}</Text>

                {/* Mô tả */}
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{accommodation.description}</Text>

                {/* Tiện nghi */}
                <Text style={styles.sectionTitle}>Amenities</Text>
                {accommodation.amenities.map((amenity) => (
                    <Text key={amenity.amenity_id} style={styles.amenity}>- {amenity.name}</Text>
                ))}

                {/* Khuyến mãi */}
                {accommodation.promotions && accommodation.promotions.length > 0 && (
                    <>
                    <Text style={styles.sectionTitle}>Promotions</Text>
                    {accommodation.promotions.map((promo) => (
                        <View key={promo.promotion_id} style={styles.promotion}>
                        <Text style={styles.promoName}>{promo.name}</Text>
                        <Text>Discount: {promo.discount_percentage}%</Text>
                        <Text>
                            Valid from {promo.start_date} to {promo.end_date}
                        </Text>
                        </View>
                    ))}
                    </>
                )}
            </View>
            <Footer_Home customer={customer}/>
        </>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: '100%', height: 200, borderRadius: 10 },
    title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
    address: { fontSize: 16, color: 'gray' },
    type: { fontSize: 16, marginTop: 5 },
    rating: { fontSize: 16, marginTop: 5 },
    price: { fontSize: 18, color: 'green', fontWeight: 'bold', marginVertical: 10 },
    maxGuests: { fontSize: 16, marginTop: 5 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15 },
    description: { fontSize: 16, lineHeight: 24, marginTop: 10 },
    amenity: { fontSize: 16, marginTop: 5 },
    promotion: {
        backgroundColor: '#f0f8ff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    promoName: { fontSize: 16, fontWeight: 'bold' },
});

export default AccommodationDetail;
