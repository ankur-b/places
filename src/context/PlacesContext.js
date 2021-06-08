import createDataContext from './createDataContext';
import Place from '../model/place';
import {insertPlace, fetchPlaces} from '../helpers/db';
const PlaceReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PLACE':
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.image,
      );
      return {
        places: state.places.concat(newPlace),
      };
    case 'SET_PLACES':
      return {
        places:action.payload.map(pl=>new Place(pl.id.toString(),pl.title,pl.imageUri))
      };
    default:
      return state;
  }
};
const addPlace = dispatch => async (title, image) => {
  try {
    const dbResult = await insertPlace(
      title,
      image,
      'Dummy address',
      15.6,
      23.3,
    );
    console.log(dbResult);
    dispatch({
      type: 'ADD_PLACE',
      payload: {id: dbResult.insertId, title: title, image: image},
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
  {addPlace,loadPlaces},
  {places: []},
);
