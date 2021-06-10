import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import Colors from '../constants/Colors';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(undefined);
  let mapPickedLocation;
  if(props.routes.params){
    mapPickedLocation = props.routes.params.pickedLocation
    props.onLocationPicked(mapPickedLocation)
  }
  const getLocationHandler = async () => {
    try {
      setIsFetching(true);
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
      setPickedLocation(location);
      props.onLocationPicked({
        latitude:location.latitude,
        longitude:location.longitude
      })
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };
 
  const pickonMapHandler = () => {
    props.navigation.navigate('Maps');
  };
  useEffect(()=>{
    if(props.routes.params){
        setPickedLocation(mapPickedLocation)
    }
  },[mapPickedLocation])
  return (
    <View style={styles.locationPicker}>
      {isFetching ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        [
          pickedLocation === undefined ? (
            <View style={styles.mapPreview}>
              <Text>No location chosen yet!</Text>
            </View>
          ) : (
            <MapView
              initialRegion={{
                latitude: pickedLocation.latitude,
                longitude: pickedLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              style={{height: 200}}>
              <MapView.Marker
                coordinate={{
                  latitude: pickedLocation.latitude,
                  longitude: pickedLocation.longitude,
                }}
                title={'title'}
                description={'description'}
              />
            </MapView>
          ),
        ]
      )}
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickonMapHandler}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  locationPicker: {
    marginTop: 10,
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent:"center",
    alignItems:'center'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default LocationPicker;
// var granted = null;
// try {
//   granted = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     {
//       title: 'Location',
//       message: 'Fine Location',
//       buttonNeutral: 'Ask Me Later',
//       buttonNegative: 'Cancel',
//       buttonPositive: 'OK',
//     },
//   );
// } catch (e) {
//   console.log(e);
// }
// if (granted.status !== 'granted') {
//   await Alert.alert(
//     'Insufficient permissions!',
//     'You need to grant camera permissions to use this app.',
//     [{text: 'Okay'}],
//   );
//   return false;
// }
// console.log(granted);
