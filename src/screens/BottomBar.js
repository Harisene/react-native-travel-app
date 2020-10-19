//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
// create a component
const BottomBar = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Feather name="map" size={25} color="#ff5493" />
        <Text style={{ fontSize: 12, color: '#ff5493' }}>Trips</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}
      >          
        <Feather name="bookmark" size={25} color="black" />
        <Text style={{ fontSize: 12, color: "black" }}>bookmark</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Feather name="bell" size={25} color="black" />
        <Text style={{ fontSize: 12, color: "black" }}>notification</Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingBottom: 20,
    //opacity:0.3,
    //backgroundColor:'#fff'
  },
});

//make this component available to the app
export default BottomBar;
