import React, {useEffect,useContext} from 'react';
import { StyleSheet ,FlatList} from 'react-native';
import {Context as PlacesContext} from '../context/PlacesContext';
import PlaceItem from '../components/PlaceItem'
const PlacesListScreen = props => {
  const {state,loadPlaces} = useContext(PlacesContext)
  useEffect(()=>{
    loadPlaces()
  },[])
  return (
    <FlatList data={state.places} keyExtractor={item=>item.id} renderItem={itemData=>(
      <PlaceItem image={itemData.item.imageUri} title={itemData.item.title} address={null} onSelect={()=>{
        props.navigation.navigate("PlaceDetail",{placeTitle:itemData.item.title,placeId:itemData.item.id})
      }}/>
    )}/>
  );
};

PlacesListScreen.navigationOptions = {
    headerTitle: 'All Places'
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
