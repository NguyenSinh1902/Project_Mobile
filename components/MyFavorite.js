import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Footer_Home from "./HomePage/Footer_Home.js";

import { getFavorites, removeFavorite } from '../services/FavoriteService'; // Assume these services are implemented

const MyFavorite = ({ route, navigation }) => {

    const { customer } = route.params;
    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {
        const fetchFavorites = async () => {
        try {
            if (customer) {
            const data = await getFavorites(customer.customer_id);
            setFavorites(data);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
        };
        fetchFavorites();
    }, [customer]);

    const handleRemoveFavorite = async (accommodationId) => {
        try {
        await removeFavorite(customer.customer_id, accommodationId);
        setFavorites(favorites.filter(fav => fav.accommodation.accommodation_id !== accommodationId));
        } catch (error) {
        console.error('Error removing favorite:', error);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.header}>My Favorite Accommodations</Text>
                <ScrollView contentContainerStyle={styles.favoriteList}>
                    {favorites.map((fav) => (
                        <View key={fav.accommodation.accommodation_id}>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('AccommodationDetail', {
                                    accommodationId: fav.accommodation.accommodation_id,
                                    customer: customer,
                                })}
                                style={styles.favoriteItem}
                            >
                            <Image source={{ uri: fav.accommodation.image_url }} style={styles.image} />
                            <View style={styles.details}>
                                <Text style={styles.name}>{fav.accommodation.name}</Text>
                                <Text style={styles.address}>{fav.accommodation.address}</Text>
                            </View>
                            
                            <TouchableOpacity onPress={() => handleRemoveFavorite(fav.accommodation.accommodation_id)}>
                                <Ionicons name="heart-dislike" size={24} color="red" />
                            </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <Footer_Home customer={customer}/>
        </>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    favoriteList: {
        flexGrow: 1,
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 14,
        color: '#777',
    },
});

export default MyFavorite;
