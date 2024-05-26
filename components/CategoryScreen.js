import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { width } = Dimensions.get('window');

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      Alert.alert('Access Denied', 'You need to be logged in to view this screen');
      navigation.navigate('SignIn');
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories([...response.data, 'Your Name']);
      } catch (error) {
        setError('Error fetching categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isLoggedIn, navigation]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('ProductList', { category: item })}
    >
      <Text style={styles.categoryText}>{item.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  if (!isLoggedIn) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Categories</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryItem: {
    width: width - 40,
    padding: 20,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  categoryText: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryScreen;