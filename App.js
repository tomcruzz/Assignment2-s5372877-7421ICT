import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store/store';
import SplashScreen from './components/SplashScreen';
import CategoryScreen from './components/CategoryScreen';
import ProductListScreen from './components/ProductListScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import ShoppingCartScreen from './components/ShoppingCartScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProductsStack = () => (
  <Stack.Navigator initialRouteName="Categories">
    <Stack.Screen name="Categories" component={CategoryScreen} />
    <Stack.Screen name="ProductList" component={ProductListScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Products" component={ProductsStack} />
        <Tab.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
