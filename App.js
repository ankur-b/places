import React from 'react';
import PlacesNaviator from './src/navigation/PlacesNavigator';
import {Provider as PlacesProvider} from './src/context/PlacesContext';
import {init} from './src/helpers/db';
init()
  .then(() => {
    console.log("Initalized database")
  })
  .catch(err => {
    console.log('Initalizing db failed');
  });
const App = () => {
  return (
    <PlacesProvider>
      <PlacesNaviator />
    </PlacesProvider>
  );
};

export default App;
