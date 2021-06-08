import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import API_KEY from '../../API_KEY';
const MapPreview = props => {
  let imagePreviewURL;
  if (props.location) {
    imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.long}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.long}&key=${API_KEY}`;
  }
  return (
    <View>
      {props.location ? (
        <MapView
          initialRoute={{
            latitude: props.location.lat,
            longitude: props.location.long,
          }}
          style={{height: 200}}></MapView>
      ) : (
        props.children
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mapPreview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});

export default MapPreview;
