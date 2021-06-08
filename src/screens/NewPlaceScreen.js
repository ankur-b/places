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
import {Context as PlacesContext} from '../context/PlacesContext'
const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState();
  const {state,addPlace} = useContext(PlacesContext)
  const titleChangeHandler = text => {
    setTitleValue(text);
  };
  const savePlaceHandler = () => {
    addPlace(titleValue)
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
        <ImagePicker/>
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
