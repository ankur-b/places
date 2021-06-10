import createDataContext from './createDataContext';
import Place from '../model/place';
import {insertPlace, fetchPlaces} from '../helpers/db';
import Geocoder from 'react-native-geocoding';
import API_KEY from '../../API_KEY';
Geocoder.init(API_KEY);
const PlaceReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PLACE':
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.image,
        action.payload.address,
        action.payload.coords.latitude,
        action.payload.coords.longitude,
      );
      return {
        places: state.places.concat(newPlace),
      };
    case 'SET_PLACES':
      return {
        places: action.payload.map(
          pl =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.latitude,
              pl.longitude,
            ),
        ),
      };
    default:
      return state;
  }
};
const addPlace = dispatch => async (title, image, location) => {
  // const address = await Geocoder.from({
  //   latitude:location.latitude,
  //   longitude:location.longitude
  // })
  // console.log(address)
  const address = 'dummy address!!';
  console.log(location.latitude)
  try {
    const dbResult = await insertPlace(
      title,
      image,
      address,
      location.latitude,
      location.longitude,
    );
    console.log(dbResult);
    dispatch({
      type: 'ADD_PLACE',
      payload: {
        id: dbResult.insertId,
        title: title,
        image: image,
        address: address,
        coords: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const loadPlaces = dispatch => async () => {
  try {
    const dbResult = await fetchPlaces();
    dispatch({type: 'SET_PLACES', payload: dbResult.rows._array});
  } catch (err) {
    throw err;
  }
};
export const {Provider, Context} = createDataContext(
  PlaceReducer,
  {addPlace, loadPlaces},
  {places: []},
);
