import React from 'react';
import PlacesNaviator from './src/navigation/PlacesNavigator'
import {Provider as PlacesProvider} from './src/context/PlacesContext';
const App= () => {
  return(
    <PlacesProvider>
      <PlacesNaviator/>
    </PlacesProvider>
  )
};


export default App;
