import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import productsReducer from './Store/reducers/products'
import ShopNavigation from './navigation/ShopNavigation'

// we need to combine the reducers we pass an object where we map my reducers
const rootReducer = combineReducers({
  products: productsReducer
})
// takes our combine reducer as an argument
const store = createStore(rootReducer)

export default function App() {
  return (
    // we create our Provider component
    <Provider store={store}>
      <ShopNavigation />
    </Provider>
  );
}


