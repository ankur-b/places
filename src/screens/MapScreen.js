import React, {useState,useEffect,useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = props => {
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const mapRegion = {
    latitude: 21.8141642,
    longitude: 75.6191335,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  };
  const selectLocationHandler = event => {
    setSelectedLocation({
      latitude:event.nativeEvent.coordinate.latitude,
      longitude:event.nativeEvent.coordinate.longitude
    })
  };
  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }
  const savePickedLocationHandler=useCallback(()=>{
    if(!selectedLocation){
      return;
    }
    props.navigation.navigate('NewPlace',{pickedLocation:selectedLocation})
  },[selectedLocation])
  useEffect(()=>{
    props.navigation.setParams({saveLocation:savePickedLocationHandler})
  },[savePickedLocationHandler])
  return (
    <MapView
      initialRegion={mapRegion}
      style={{flex: 1}}
      onPress={selectLocationHandler}>
      {markerCoordinates && (
        <MapView.Marker
          title="Picked Location"
          coordinate={markerCoordinates}></MapView.Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({});

export default MapScreen;
