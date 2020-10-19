import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity, 
  Animated, 
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { SafeAreaView } from 'react-native-safe-area-context';
import DATA from '../data';
import { CONSTANCE } from '../constants';
import DepartureDetails from './DepartureDetails';
import BottomBar from './BottomBar';
import { StatusBar } from 'expo-status-bar';

const { IMAGE_HEIGHT, IMAGE_WIDTH, TOTAL_WIDTH, SPACING, MARGIN } = CONSTANCE;

const Home = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
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



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />   

      <Text style={styles.trip}>TRIPS</Text>
      <Animated.FlatList
        data={DATA}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ paddingRight: TOTAL_WIDTH }}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handlerOnScroll}
        snapToInterval={TOTAL_WIDTH}
        decelerationRate={0.825}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * TOTAL_WIDTH,
            index * TOTAL_WIDTH,
            (index + 1) * TOTAL_WIDTH,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [TOTAL_WIDTH, 0, -TOTAL_WIDTH],
          });

          const translateXX = scrollX.interpolate({
            inputRange: [
              (index - 1) * TOTAL_WIDTH,
              index * TOTAL_WIDTH - 200,
              index * TOTAL_WIDTH,
              index * TOTAL_WIDTH + 200,
              (index + 1) * TOTAL_WIDTH,
            ],
            outputRange: [TOTAL_WIDTH, TOTAL_WIDTH, 0, -TOTAL_WIDTH, -TOTAL_WIDTH],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.1, 1],
          });

          return (
            <TouchableOpacity
              onPress={() => navigation.push('Detail', { item })}
              style={styles.imageButton}
            >
              <SharedElement style={styles.image} id={`item.${item.id}.path`}>
                <Animated.Image
                  source={item.path}
                  style={[styles.image, { transform: [{ scale }] }]}
                />
              </SharedElement>

              <View>
                <SharedElement id={`item.${item.id}.location`}>
                  <Animated.Text
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    style={[
                      styles.location,
                      { transform: [{ translateX }], opacity },
                    ]}
                  >
                    {item.location}
                  </Animated.Text>
                </SharedElement>
                <SharedElement id={`item.${item.id}.date`}>
                  <Animated.Text
                    style={[
                      styles.date,
                      { transform: [{ translateX: translateXX }], opacity },
                    ]}
                  >
                    {item.date}
                  </Animated.Text>
                </SharedElement>
              </View>

              <Animated.View
                style={{
                  flexDirection: 'row',
                  transform: [{ translateX }],
                }}
              >
                <Animated.View style={[styles.days, { opacity }]}>
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
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
      <DepartureDetails scrollX={scrollX} />
      <BottomBar />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  trip: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 25,
    marginTop: 50,
    color: '#000',
  },

  imageButton: {
    height: IMAGE_HEIGHT, //320
    width: IMAGE_WIDTH, //250
    margin: MARGIN,
    marginRight: SPACING,
    padding: 10,
    justifyContent: 'space-between',
  },
  image: {
    height: IMAGE_HEIGHT, //320
    width: IMAGE_WIDTH, //250
    borderRadius: 30,
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
    //zIndex: -1,
  },

  location: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textDecorationStyle: 'double',
    position: 'absolute',
  },

  date: {
    fontSize: 14,
    marginTop: 30,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textDecorationStyle: 'double',
    position: 'absolute',
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
