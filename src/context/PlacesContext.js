import createDataContext from './createDataContext';
import Place from "../model/place";
const PlaceReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PLACE":
      const newPlace = new Place(new Date().toString(),action.payload.title)
      return {
        places : state.places.concat(newPlace)
      }
    default:
      return state;
  }
};
const addPlace = dispatch => title=>{
  dispatch({type:"ADD_PLACE",payload:{title:title}})
}
export const {Provider, Context} = createDataContext(
  PlaceReducer,
  {addPlace},
  {places:[]},
);