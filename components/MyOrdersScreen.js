import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchOrders, selectOrders, payOrder, receiveOrder } from '../store/orderSlice';
import axios from 'axios';

const MyOrdersScreen = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handlePayOrder = async (orderId) => {
    try {
      await axios.patch(`https://fakestoreapi.com/orders/${orderId}`, { status: 'paid' });
      dispatch(payOrder(orderId));
      Alert.alert('Paid', 'Your order is paid');
    } catch (error) {
      console.error('Error during payment:', error);
      Alert.alert('Error', 'There was an error processing your payment.');
    }
  };

  const handleReceiveOrder = async (orderId) => {
    try {
      await axios.patch(`https://fakestoreapi.com/orders/${orderId}`, { status: 'delivered' });
      dispatch(receiveOrder(orderId));
      Alert.alert('Received', 'Your order is received');
    } catch (error) {
      console.error('Error during receiving:', error);
      Alert.alert('Error', 'There was an error processing your order receipt.');
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <TouchableOpacity onPress={() => toggleOrderExpansion(item.id)}>
        <View style={styles.orderHeader}>
          <Text>Order ID: {item.id}</Text>
          <Icon name={expandedOrders[item.id] ? 'expand-less' : 'expand-more'} size={24} color="black" />
        </View>
      </TouchableOpacity>
      {expandedOrders[item.id] && (
        <View style={styles.orderDetails}>
          {item.products.map((product) => (
            <View key={product.id} style={styles.productItem}>
              <Text>{product.title}</Text>
              <Text>Quantity: {product.quantity}</Text>
              <Text>Price: ${product.price}</Text>
            </View>
          ))}
          {item.status === 'new' && (
            <TouchableOpacity style={styles.payButton} onPress={() => handlePayOrder(item.id)}>
              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
          )}
          {item.status === 'paid' && (
            <TouchableOpacity style={styles.receiveButton} onPress={() => handleReceiveOrder(item.id)}>
              <Text style={styles.buttonText}>Receive</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetails: {
    marginTop: 10,
  },
  productItem: {
    marginVertical: 5,
  },
  payButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  receiveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyOrdersScreen;
