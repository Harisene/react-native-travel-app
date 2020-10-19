//import liraries
import React, { Component, useEffect, useRef } from 'react';
import {
  SafeAreaView,  
  Text,
  StyleSheet,
  Dimensions,
  Animated,  
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { StatusBar } from 'expo-status-bar';
import Card from '../components/Card';
import * as Animatable from 'react-native-animatable';
const { width, height } = Dimensions.get('window');

const Detail = ({ navigation, route }) => {
  const { item } = route.params;

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      delay: 400,
      useNativeDriver: true,
    }).start();
  });

  const desTranslateY = opacity.interpolate({
    inputRange: [0, 0, 0.5, 1],
    outputRange: [40, 30, 10, 0],
  });

  return (
    <SafeAreaView>
      <StatusBar style="light" />      
      <SharedElement style={styles.image} id={`item.${item.id}.path`}>
        <Animated.Image source={item.path} style={[styles.image]} />
      </SharedElement>

      <SharedElement id={`item.${item.id}.location`}>
        <Animated.Text style={styles.location}>{item.location}</Animated.Text>
      </SharedElement>
      <SharedElement id={`item.${item.id}.date`}>
        <Animated.Text style={styles.date}>{item.date}</Animated.Text>
      </SharedElement>

      <Animatable.View
        animation="fadeInLeft"
        duration={800}
        delay={600}
        style={{
          position: 'absolute',
          transform: [{ translateY: desTranslateY }],          
          left: 30,
          width: '80%',
          top: 120,
        }}
      >
        <Text
          style={{
            textAlign: 'justify',
            fontSize: 17,
            letterSpacing: 1.2,
            color:'#fff',
            opacity:0.8
          }}
        >
          {item.description}
        </Text>
      </Animatable.View>
      <Animatable.Text
        animation="fadeInUp"
        duration={800}
        delay={600}
        style={{
          top: 312,
          letterSpacing: 1.2,
          left: 30,
          fontWeight: 'bold',
          fontSize: 25,
          color: '#fff',
        }}
      >
        ACTIVITIES
      </Animatable.Text>

      <Animated.FlatList
        data={item.moreDetails}
        style={{ top: 320, left: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          return <Card item={item} />;
        }}
      />
    </SafeAreaView>
  );
};

Detail.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [   
    { id: `item.${item.id}.path` },
    { id: `item.${item.id}.location` },
    { id: `item.${item.id}.date` },
  ];
};

// define your styles
const styles = StyleSheet.create({
  image: {
    height,
    width,
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,    
  },

  location: {
    marginTop: 40,
    marginLeft: 30,
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textDecorationStyle: 'double',
    position: 'absolute',
  },

  date: {
    marginTop: 80,
    marginLeft: 30,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textDecorationStyle: 'double',
    position: 'absolute',
  },
});

//make this component available to the app
export default Detail;
