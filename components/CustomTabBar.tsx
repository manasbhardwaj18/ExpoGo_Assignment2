import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window'); // Get screen width for image sizing

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBarContainer}>
      {/* Use the image as the background of the tab bar and fit it to the screen width */}
      <Image source={require('../assets/Bottom Tab Bar.png')} style={styles.tabBarBackground} />

      <View style={styles.iconContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Set the icon names according to Ionicons
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Categories') iconName = 'grid-outline';
          else if (route.name === 'Cart') iconName = 'cart-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.iconWrapper}
            >
              {/* Render icons and labels */}
              <Ionicons name={iconName} size={26} color={isFocused ? '#FF6600' : 'gray'} />
              <Text style={[styles.label, isFocused ? styles.labelFocused : null]}>{route.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarBackground: {
    position: 'absolute',
    width: width, // Make the image stretch to fit the full width of the screen
    height: '100%',
    resizeMode: 'cover', // Ensures the image scales correctly
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: 'gray',
  },
  labelFocused: {
    color: '#FF6600',
  },
});

export default CustomTabBar;
