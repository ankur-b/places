import React, {useState,useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'
import {Context as PlacesContext} from '../context/PlacesContext'
const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState();
  const [selectedImage,setSelectedImage] = useState()
  const [selectedLocation,setSelectedLocation] = useState()
  const {state,addPlace} = useContext(PlacesContext)
  const titleChangeHandler = text => {
    setTitleValue(text);
  };
  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath)
  }
  const locationPickedHandler=(location)=>{
    setSelectedLocation(location)
  }
  const savePlaceHandler = () => {
    addPlace(titleValue,selectedImage,selectedLocation)
    props.navigation.goBack()
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler}/>
        <LocationPicker onLocationPicked={locationPickedHandler} routes={props.route} navigation={props.navigation}/>
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
