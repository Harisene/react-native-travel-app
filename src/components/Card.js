//import liraries
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const Card = ({ item }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const markerScale = useRef(new Animated.Value(0)).current;
  const imageHeight = useRef(new Animated.Value(120)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 600,
        delay: 300 * (item.id + 1),
        useNativeDriver: false,
      }),

      Animated.timing(markerScale, {
        toValue: 1,
        duration: 400,
        delay: 900 + 300 * (item.id + 1),
        easing: Easing.bezier(0.47, 1.44, 0.99, 1.3),
        useNativeDriver: true,
      }),
      Animated.timing(imageHeight, {
        toValue: 80,
        duration: 800,
        delay: 500 * (item.id + 1),
        useNativeDriver: false,
      }),
    ]).start();
  });

  const rotateX = scale.interpolate({
    inputRange: [0, 1],
    outputRange: ['-100deg', '0deg'],
  });

  const skewY = scale.interpolate({
    inputRange: [0, 1],
    outputRange: ['-50deg', '0deg'],
  });

  return (
    <Animated.View
      style={{
        height: 260,
        width: 200,
        backgroundColor: '#fff',
        padding: 20,
        marginRight: 20,
        borderRadius: 15,
        transform: [{ scale }, { rotateX }, { skewY }],
      }}
    >
      <View>
        <Animatable.Text
          animation={'fadeIn'}
          duration={1000}
          delay={400 * (item.id + 1)}
          style={{ fontSize: 18, fontWeight: 'bold' }}
        >
          DAY {item.id + 1}
        </Animatable.Text>
        <Animatable.Text
          animation={'fadeIn'}
          duration={1000}
          delay={500 * (item.id + 1)}
          style={{ fontSize: 25, fontWeight: 'bold' }}
        >
          {item.date}
        </Animatable.Text>
        <Animatable.Text
          animation={'fadeIn'}
          duration={800}
          delay={600 * (item.id + 1)}
          style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15 }}
        >
          {item.category}
        </Animatable.Text>
        <View style={{ position: 'absolute', top: 100, zIndex: -1 }}>
          <Animatable.Image
            animation="slideInDown"
            delay={300 * (item.id + 1)}
            duration={1000}
            source={item.map}
            style={{
              height: imageHeight,
              borderRadius: 12,
              width: 170,
              marginVertical: 5,
              resizeMode: 'cover',
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              top: 30,
              left: 70,
              transform: [{ scale: markerScale }],
            }}
          >
            <FontAwesome name="map-marker" size={25} color="black" />
          </Animated.View>
        </View>

        <Animatable.View
          animation={'fadeIn'}
          duration={800}
          delay={600 * (item.id + 1)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            top: 90,
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.time}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {item.distance}
          </Text>
        </Animatable.View>
      </View>
    </Animated.View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default Card;
