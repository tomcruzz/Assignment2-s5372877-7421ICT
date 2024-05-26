import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cartSlice';
import axios from 'axios';

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cachedProduct, setCachedProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      if (cachedProduct[productId]) {
        setProduct(cachedProduct[productId]);
        setLoading(false);
      } else {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
          const data = response.data;
          setProduct(data);
          setCachedProduct(prevState => ({ ...prevState, [productId]: data }));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [productId, cachedProduct]);

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    alert('Product added to cart!');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <View style={styles.productMeta}>
          <Text style={styles.productRating}>Rating: {product.rating.rate}</Text>
          <Text style={styles.productSold}>Sold: {product.rating.count}</Text>
          <Text style={styles.productPrice}>Price: ${product.price}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Icon name="add-shopping-cart" size={24} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionBox}>
          <ScrollView>
            <Text style={styles.productDescription}>{product.description}</Text>
          </ScrollView>
        </View>
        <View style={styles.bottomSpace} />
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productImage: {
    width: windowWidth,
    height: windowHeight * 0.5,
    resizeMode: 'cover',
  },
  productInfo: {
    paddingVertical: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productRating: {
    fontSize: 16,
  },
  productSold: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  descriptionBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
  },
  bottomSpace: {
    marginBottom: 50,
  },
});

export default ProductDetailScreen;
