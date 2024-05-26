import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const ProductListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cachedProducts, setCachedProducts] = useState({});
  const nav = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      if (cachedProducts[category]) {
        setProducts(cachedProducts[category]);
        setLoading(false);
      } else {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
          const data = response.data;
          setProducts(data);
          setCachedProducts(prevState => ({ ...prevState, [category]: data }));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching products:', error);
          setLoading(false);
        }
      }
    };
    fetchProducts();
  }, [category, cachedProducts]);

  const handleProductPress = (product) => {
    nav.navigate('ProductDetail', { product });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.toUpperCase()}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.productList}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </>
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
  productList: {
    flexGrow: 1,
    width: '100%',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: width - 40,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'green',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProductListScreen;
