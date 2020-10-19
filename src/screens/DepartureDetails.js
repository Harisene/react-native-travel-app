//import liraries
import React, { Component, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DATA from '../data';
import { CONSTANCE } from '../constants';

const { width } = Dimensions.get('window');

const { TOTAL_WIDTH } = CONSTANCE;

// create a component
const DepartureDetails = ({ scrollX }) => {
  const flatListRef = useRef();

  useEffect(() => {
    scrollX.addListener((v) => {      
      flatListRef.current.scrollToOffset({
        offset: v.value * 1.68,
        animated: false,
      });
      
    });
  });

  return (
    <Animated.FlatList
      ref={flatListRef}
      data={DATA}
      keyExtractor={(item) => String(item.id)}
      scrollEnabled={false}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        const opacity = scrollX.interpolate({
          inputRange: [
            (index - 1) * TOTAL_WIDTH,
            index * TOTAL_WIDTH,
            (index + 1) * TOTAL_WIDTH,
          ],
          outputRange: [0, 1, 0],
        });

        return (
          <Animated.View style={[styles.container, { opacity }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: '#ffb3ce',
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesome name={'plane'} size={23} color="#ff5493" />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    color: '#ff5493',
                    fontWeight: 'bold',
                    letterSpacing: 1.2,
                    fontSize: 12,
                  }}
                >
                  DEPARTURE
                </Text>
                <Text
                  style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}
                >
                  {item.departure.airport}
                </Text>
                <Text style={{ color: '#b8b8b8' }}>{item.departure.time}</Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'lightgray',
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesome name="bus" size={23} color="lightgray" />
            </View>
          </Animated.View>
        );
      }}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: width,
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
  },
});

//make this component available to the app
export default DepartureDetails;
