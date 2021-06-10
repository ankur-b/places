import React, {useContext} from 'react';
import {ScrollView, Image, View, Text, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import Colors from '../constants/Colors';
import {Context as PlacesContext} from '../context/PlacesContext';
const PlaceDetailScreen = props => {
  const {state} = useContext(PlacesContext);
  const placeId = props.route.params.placeId;
  const selectedPlace = state.places.find(place => place.id === placeId);
  console.log(state)
  console.log(selectedPlace)
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <Image style={styles.image} source={{uri: selectedPlace.imageUri}} />
      <View style={styles.locationCotainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapView
          style={styles.mapPreview}
          initialRegion={{
            latitude: selectedPlace.latitude,
            longitude: selectedPlace.longitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}></MapView.Marker>
        </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
});

export default PlaceDetailScreen;
