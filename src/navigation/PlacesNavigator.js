import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
const Stack = createStackNavigator();
const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        }}>
        <Stack.Screen
          name="Places"
          component={PlacesListScreen}
          options={({navigation}) => ({
            title: 'All Places',
            headerRight: props => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Add Places"
                  iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                  onPress={() => {
                    navigation.navigate("NewPlace")
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
        <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={({route}) => ({title: route.params.placeTitle})}/>
        <Stack.Screen name="NewPlace" component={NewPlaceScreen} options={()=>({
          title:"Add Place"
        })}/>
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigator;
