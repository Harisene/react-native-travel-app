//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
// create a component
const Title = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="search" size={20} color="#fff" />
      </View>
      <Image
        source={require('../../assets/images/face1.jpg')}
        style={styles.faceImage}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    width,
    justifyContent: 'flex-end',
    padding: 20,
    ...StyleSheet.absoluteFill,
    zIndex:1000
  },

  iconContainer: {
    backgroundColor: '#0ec2a1',
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  faceImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

//make this component available to the app
export default Title;
