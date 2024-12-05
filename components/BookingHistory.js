// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// const BookingHistory = ({ navigation }) => {

//   const { customer } = route.params;

//   const bookingData = [
//     {
//       id: '1',
//       image: require("../assets/coverphoto.png"),
//       name: 'Product 1',
//       location: 'Location 1',
//       totalAmount: '$100',
//       bookingTime: '2023-10-01 10:00 AM',
//       paymentMethod: 'Credit Card',
//     },
//     {
//       id: '2',
//       image: require("../assets/coverphoto.png"),
//       name: 'Product 2',
//       location: 'Location 2',
//       totalAmount: '$200',
//       bookingTime: '2023-10-02 11:00 AM',
//       paymentMethod: 'PayPal',
//     },
//     // Add more booking data here
//   ];

//   const renderItem = ({ item }) => (
//     <View style={styles.bookingItem}>
//       <Image source={item.image} style={styles.productImage} />
//       <View style={styles.productDetails}>
//         <Text style={styles.productName}>{item.name}</Text>
//         <Text style={styles.productLocation}>{item.location}</Text>
//         <Text style={styles.totalAmount}>Price: {item.totalAmount}</Text>
//         <Text style={styles.bookingTime}>Booking Time: {item.bookingTime}</Text>
//         <Text style={styles.paymentMethod}>Payment Method: {item.paymentMethod}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             source={require('../assets/back-filled.png')}
//             style={styles.backIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>My Favorites List</Text>
//       </View>

//       <View style={styles.divider} />

//       <FlatList
//         data={bookingData}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   backIcon: {
//     marginLeft: 10,
//   },
//   headerText: {
//     color: '#000',
//     textAlign: 'center',
//     marginLeft: 100,
//     fontSize: 24,
//     fontWeight: '500',
//   },
//   divider: {
//     width: '100%',
//     height: 2,
//     backgroundColor: '#E0E0E0',
//     marginTop: 5,
//     marginBottom: 20,
//   },
//   bookingItem: {
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     marginRight: 10,
//   },
//   productDetails: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   productLocation: {
//     fontSize: 14,
//     color: '#888',
//   },
//   totalAmount: {
//     fontSize: 16,
//     color: '#000',
//   },
//   bookingTime: {
//     fontSize: 14,
//     color: '#888',
//   },
//   paymentMethod: {
//     fontSize: 14,
//     color: '#888',
//   },
// });

// export default BookingHistory;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { findBookingByCustomerId } from "../services/BookingService";

const BookingHistory = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { customer } = route.params;

  const [bookings, setBookings] = useState([]);
  console.log("bookings: ", bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await findBookingByCustomerId(customer.customer_id);
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [customer]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={ () => navigation.navigate('HomePage', {customer: customer})}>
           <Image
            source={require('../assets/back-filled.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Booking</Text>
      </View>

      <View style={styles.divider} />
      <ScrollView style={styles.scrollView}>
        {bookings.map((booking) => (
          <View key={booking.booking_id} style={styles.bookingItem}>
            <Image
              source={{ uri: booking.accommodation.image_url }}
              style={styles.accommodationImage}
            />
            <View style={styles.bookingDetails}>
              <Text style={styles.accommodationName}>{booking.accommodation.name}</Text>
              <Text style={styles.bookingDate}>Booked on: {new Date(booking.booking_date).toLocaleDateString()}</Text>
              <Text style={styles.accommodationAddress}>{booking.accommodation.address}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('AccommodationDetail', { accommodationId: booking.accommodation.accommodation_id })}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  backIcon: {
    marginLeft: 10,
  },
  headerText: {
    color: '#000',
    textAlign: 'center',
    marginLeft: 100,
    fontSize: 24,
    fontWeight: '500',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#E0E0E0',
    marginTop: 5,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  bookingItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  accommodationImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  bookingDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  accommodationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  accommodationAddress: {
    fontSize: 14,
    color: '#666',
  },
  detailsButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BookingHistory;