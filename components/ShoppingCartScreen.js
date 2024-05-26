import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Alert, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addItemToCart, removeItemFromCart, decreaseItemQuantity } from '../store/cartSlice';
import axios from 'axios';

const { width } = Dimensions.get('window');

const ShoppingCartScreen = ({ navigation }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    calculateCartTotals();
  }, [cart]);

  const calculateCartTotals = () => {
    const items = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cost = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotalItems(items);
    setTotalCost(cost.toFixed(2));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addItemToCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseItemQuantity(item));
    } else {
      handleRemoveItem(item);
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart(item));
    Alert.alert('Removed', 'Product removed from cart');
  };

  const handleCheckout = async () => {
    try {
      await axios.post('https://fakestoreapi.com/carts', { userId: 1, date: new Date(), products: cart });
      dispatch(clearCart());
      Alert.alert('Order Created', 'Your order has been created successfully!');
    } catch (error) {
      console.error('Error during checkout:', error);
      Alert.alert('Error', 'There was an error processing your order.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your Cart is Empty</Text>
      ) : (
        <>
          <View style={styles.cartSummary}>
            <Text>Total Items: {totalItems}</Text>
            <Text>Total Cost: ${totalCost}</Text>
          </View>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.cartItemDetails}>
                  <Text style={styles.cartItemText}>{item.title}</Text>
                  <Text style={styles.cartItemPrice}>${item.price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => handleDecreaseQuantity(item)}>
                      <Icon name="remove" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
                      <Icon name="add" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item)}>
                  <Icon name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Check Out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  cartSummary: {
    marginBottom: 20,
    alignItems: 'center',
  },
  cartItem: {
    width: width - 40,
    padding: 20,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    padding: 10,
  },
  checkoutButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShoppingCartScreen;
