import React, { useRef, useState, memo } from 'react';
import { View, Text, Image, TextInput, StyleSheet, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

// Importing Images
import Banner1 from '../assets/banner.png';
import Banner2 from '../assets/banner1.png';
import LeggingImage from '../assets/leggings.png';
import Shoe1Image from '../assets/sports.png';
import Shoe2Image from '../assets/sports1.png';
import BagImage from '../assets/pict.png';

// Define the banner and product types
interface Banner {
  id: string;
  image: any;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: any;
}

// Banners and Products Data
const banners: Banner[] = [
  { id: '1', image: Banner1 },
  { id: '2', image: Banner2 },
];

const products: Product[] = [
  { id: '1', name: 'AIR LEGGING SPORT', category: 'Apparel', price: 'Rp200.000', image: LeggingImage },
  { id: '2', name: 'AERO SPORT INFINITY MAX', category: 'Footwear', price: 'Rp450.000', image: Shoe1Image },
  { id: '3', name: 'SPORT+ RUNNER BLUE EDITION', category: 'Footwear', price: 'Rp250.000', image: Shoe2Image },
  { id: '4', name: 'SPORT+ BAG', category: 'Bag', price: 'Rp350.000', image: BagImage },
];

// Render function for the carousel banners
const renderBanner = ({ item }: { item: Banner }) => {
  return (
    <View style={styles.bannerWrapper}>
      <Image source={item.image} style={styles.bannerImage} />
    </View>
  );
};

// Header component
const Header = memo(() => (
  <View style={styles.header}>
    <Text style={styles.logo}>Sport Shoes</Text>
    <View style={styles.headerIcons}>
      <Ionicons name="heart-outline" size={24} color="black" />
      <Ionicons name="cart-outline" size={24} color="black" style={{ marginLeft: 15 }} />
    </View>
  </View>
));

// Main HomeScreen component
const HomeScreen = () => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search items" />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Wallet Info */}
      <View style={styles.walletInfoContainer}>
        <View style={styles.walletInfo}>
          <Ionicons name="wallet-outline" size={24} color="black" />
          <Text style={styles.walletText}>Rp1.000.000</Text>
        </View>
        <TouchableOpacity style={styles.topUpButton}>
          <Text style={styles.topUpText}>Top up</Text>
          <Ionicons name="add-circle-outline" size={20} color="#FF6600" />
        </TouchableOpacity>
      </View>

      {/* Promotional Banners Slider */}
      <View style={styles.bannerContainer}>
        <Carousel
          ref={carouselRef}
          data={banners}
          renderItem={renderBanner}
          sliderWidth={width}
          itemWidth={width * 0.85}
          onSnapToItem={setActiveSlide}
          loop={true}
          autoplay={true}
          autoplayInterval={3000}
        />
      </View>

      {/* Shop by Category */}
      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>SHOP BY CATEGORY</Text>
        <View style={styles.categoryItems}>
          {['FOOTWEAR', 'BAGS', 'APPAREL'].map((category, index) => (
            <View style={styles.categoryItem} key={index}>
              {/* Valid icon names used here */}
              <Ionicons
                size={24}
                color="#FF6600"
              />
              <Text>{category}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* For You Section */}
      <View style={styles.productContainer}>
        <Text style={styles.sectionTitle}>FOR YOU</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

// Define styles with TypeScript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6600',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    padding: 10,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: '#FF6600',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  walletInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  topUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topUpText: {
    color: '#FF6600',
    marginRight: 5,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  bannerWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    width: width / 4,
  },
  productContainer: {
    marginBottom: 20,
  },
  productCard: {
    width: '47%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f3f3f3',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productCategory: {
    color: 'gray',
    marginBottom: 5,
  },
  productPrice: {
    color: '#FF6600',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
