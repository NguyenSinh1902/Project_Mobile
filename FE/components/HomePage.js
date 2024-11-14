import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, Darius!</Text>
        <Text style={styles.subGreeting}>Explore VIETNAM</Text>
        <View style={styles.locationContainer}>
          <Image
            source={require('../assets/heroicons_map-pin-16-solid.png')}
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>Dalat</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require('../assets/material-symbols_search.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Search for your journey</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Image
              source={require('../assets/mage_filter.png')}
              style={styles.filterButtonIcon}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/Rectangle 9.png')}
          style={styles.headerImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: 440,
    height: 258,
    flexShrink: 0,
    borderRadius: 50,
    zIndex: -1,
  },
  greeting: {
    position: 'absolute',
    top: 50,
    left: 20,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    zIndex: 1,
  },
  subGreeting: {
    position: 'absolute',
    top: 80,
    left: 20,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '400',
    zIndex: 1,
  },
  locationContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  locationText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 170,
    left: 20,
    zIndex: 1,
  },
  button: {
    width: 300,
    height: 50,
    flexShrink: 0,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    width: 24.662,
    height: 25.055,
    marginRight: 10,
    marginLeft: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  filterButton: {
    width: 60,
    height: 50.11,
    flexShrink: 0,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  filterButtonIcon: {
    // width: 24,
    // height: 24,
  },
});

export default HomePage;