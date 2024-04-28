import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const handleAddToCart = () => {
    alert('Product added to cart!');
  };

  const { rate, count } = product.rating;
  const { sale } = product;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <View style={styles.productMeta}>
          <View style={styles.infoBox}>
            <Text style={styles.productRating}>Rating: {rate}</Text>
            <Text style={styles.productRating}>Sold: {count} </Text>
            <Text style={styles.productPrice}>Price: ${product.price}</Text>
          </View>
        </View>
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
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>
      <View style={styles.bottomSpace} />
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
  infoBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productRating: {
    marginRight: 10,
  },
  productPrice: {
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
