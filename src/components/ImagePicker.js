import React, {useState} from 'react';
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import Colors from '../constants/Colors';

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  var granted = null;
  const takeImageHandler = async () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 540,
      maxHeight: 960,
      storageOptions: {
        skipBackup: true,
      },
    };
    try {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location',
          message: 'Fine Location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (e) {
      console.log(e);
    }
    // if (granted.status !== 'granted') {const result =  await 
    //   Alert.alert(
    //     'Insufficient permissions!',
    //     'You need to grant camera permissions to use this app.',
    //     [{text: 'Okay'}],
    //   );
    //   return false;
    // }
    // console.log(granted);
    launchCamera(options, response => {
      console.log({response});
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.assets[0].uri};
        console.log(source)
        setPickedImage(response.assets[0].uri);
        props.onImageTaken(response.assets[0].uri)
      }
    });
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{uri: pickedImage}} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  imagePicker: {
    justifyContent:'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default ImgPicker;
