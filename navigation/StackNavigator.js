import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../components/SplashScreen';
import SignInScreen from '../components/SignInScreen';
import SignUpScreen from '../components/SignUpScreen';
import CategoryScreen from '../components/CategoryScreen';
import ProductListScreen from '../components/ProductListScreen';
import ProductDetailScreen from '../components/ProductDetailScreen';
import ShoppingCartScreen from '../components/ShoppingCartScreen';
import ProfileScreen from '../components/ProfileScreen';
import MyOrdersScreen from '../components/MyOrdersScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Categories' }} />
        <Stack.Screen name="ProductList" component={ProductListScreen} options={({ route }) => ({ title: route.params.category })} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} options={{ title: 'Shopping Cart' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="MyOrders" component={MyOrdersScreen} options={{ title: 'My Orders' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
