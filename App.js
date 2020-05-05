import React ,{ useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import productsReducer from './Store/reducers/products'
import ShopNavigation from './navigation/ShopNavigation'
import { AppLoading  } from 'expo'
import * as Font from 'expo-font'
//import { composeWithDevTools } from 'redux-devtools-extension' // only when you use the dev-tools
import cartReducer from './Store/reducers/cart'


// we need to combine the reducers we pass an object where we map my reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
})
// takes our combine reducer as an argument
const store = createStore(rootReducer)//, composeWithDevTools())   --> we use only to use the devtools

// to load the font
const fetchFonts=  () =>{
  return Font.loadAsync(
    {
      'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
    }
  )
}

// fetchFont needs to be load by aaploading component

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded){
    // the appLoading component prologn our start screen
    return <AppLoading 
        startAsync={fetchFonts}
        onFinish={() =>{
          setFontLoaded(true)
        }}
        />
  }
  return (
    // we create our Provider component
    <Provider store={store}>
      <ShopNavigation />
    </Provider>
  );
}


