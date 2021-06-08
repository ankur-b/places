import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = props => {
  const mapRegion ={
    latitude:21.8141642,
    longitude:75.6191335,
    longitudeDelta:0.01,
    latitudeDelta:0.01
  }
  return (
    <MapView initialRegion={mapRegion} style={{flex:1}}>

    </MapView>
  );
};

const styles = StyleSheet.create({});

export default MapScreen;
