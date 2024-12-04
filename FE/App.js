import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GetStarted from './components/GetStarted';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage/HomePage'; // Import HomePage component
import Categories_Home from './components/HomePage/Categories_Home'; // Import Categories_Home component
import Detail_Hotel from './components/Detail_Hotel'; // Import Detail_Hotel component
import Book_Hotel from './components/Book_Hotel'; // Import Book_Hotel component
import PaymentSuccessful from './components/PaymentSuccessful'; // Import PaymentSuccessful component
import Filter from './components/Filter/Filter';
import AddLocation from './components/Filter/AddLocation';
import AddTime from './components/Filter/AddTime'; // Import Filter component
import AddGuests from './components/Filter/AddGuests';
import AddRating from './components/Filter/AddRating';
import PriceRange from './components/Filter/PriceRange';
import Amenities from './components/Filter/Amenities';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen 
          name="GetStarted" 
          component={GetStarted} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Categories_Home" 
          component={Categories_Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Detail_Hotel" 
          component={Detail_Hotel} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Book_Hotel" 
          component={Book_Hotel} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PaymentSuccessful" 
          component={PaymentSuccessful} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Filter" 
          component={Filter} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddLocation" 
          component={AddLocation} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddTime" 
          component={AddTime} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddGuests" 
          component={AddGuests} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddRating" 
          component={AddRating} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PriceRange" 
          component={PriceRange} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Amenities" 
          component={Amenities} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;