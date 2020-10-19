//import liraries
import React, { Component, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Title from '../components/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import DATA from '../data';
import { CONSTANCE } from '../constants';
import DepartureDetails from './DepartureDetails';
import BottomBar from './BottomBar';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { ITEM_HEIGHT, ITEM_WIDTH, FULL_SIZE, SPACING, MARGIN } = CONSTANCE;

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const tapState = useRef(new Animated.Value(0)).current;

  const handlerOnScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { x: scrollX },
        },
      },
    ],
    { useNativeDriver: true }
  );

  const stateChangeHandler = Animated.event(
    [
      {
        nativeEvent: {
          state: tapState,
        },
      },
    ],
    { useNativeDriver: true }
  );

  if(tapState === State.END){
    console.log('Ended')
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Title />
      <Text style={styles.trip}>TRIPS</Text>
      <Animated.FlatList
        data={DATA}
        style={{ flexGrow: 0 }}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handlerOnScroll}
        snapToInterval={FULL_SIZE}
        decelerationRate={0.825}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * FULL_SIZE,
            index * FULL_SIZE,
            (index + 1) * FULL_SIZE,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [FULL_SIZE, 0, -FULL_SIZE],
          });

          const translateXX = scrollX.interpolate({
            inputRange: [
              (index - 1) * FULL_SIZE,
              index * FULL_SIZE - 200,
              index * FULL_SIZE,
              index * FULL_SIZE + 200,
              (index + 1) * FULL_SIZE,
            ],
            outputRange: [
              FULL_SIZE,
              FULL_SIZE - 10,
              0,
              -FULL_SIZE + 10,
              -FULL_SIZE,
            ], 
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.1, 1],
          });
          if (item.id === 4) return <View style={styles.imageButton} />;
          else
            return (
              <TouchableOpacity style={styles.imageButton}>
                <PanGestureHandler onHandlerStateChange={stateChangeHandler}>
                  <Animated.Image
                    source={item.path}
                    style={[styles.image, { transform: [{ scale }] }]}
                  />
                </PanGestureHandler>
                <Animated.View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'black',
                    opacity: 0.4,
                    borderRadius: 30,
                    transform: [{ scale }],
                  }}
                />
                <View>
                  <Animated.Text
                    style={[
                      styles.location,
                      { transform: [{ translateX }], opacity },
                    ]}
                  >
                    {item.location}
                  </Animated.Text>
                  <Animated.Text
                    style={[
                      styles.date,
                      { transform: [{ translateX: translateXX }], opacity },
                    ]}
                  >
                    {item.date}
                  </Animated.Text>
                  {/* <Animated.View
                    style={{marginTop:20, transform: [{ translateX }], opacity }}
                  >
                    <Text
                      style={{
                        textAlign: 'justify',
                        color: '#fff',                       
                      }}
                    >
                      {item.description}
                    </Text>
                  </Animated.View> */}
                </View>
                <Animated.View
                  style={{
                    flexDirection: 'row',
                    transform: [{ translateX }],
                  }}
                >
                  <View style={styles.days}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                    >
                      {item.days}
                    </Text>
                    <Text style={{ color: '#fff', fontSize: 10 }}>Days</Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
        }}
      />
      <DepartureDetails scrollX={scrollX}/>
      <BottomBar />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  trip: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 25,
    marginTop: 50,
  },

  imageButton: {
    height: ITEM_HEIGHT, //320
    width: ITEM_WIDTH, //250
    margin: MARGIN,
    marginRight: SPACING,
    padding: 10,
    justifyContent: 'space-between',
  },
  image: {
    height: ITEM_HEIGHT, //320
    width: ITEM_WIDTH, //250
    borderRadius: 30,
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
  },

  location: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textDecorationStyle: 'double',
  },

  date: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textDecorationStyle: 'double',
  },

  days: {
    backgroundColor: '#ff4fca',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

//make this component available to the app
export default Home;
