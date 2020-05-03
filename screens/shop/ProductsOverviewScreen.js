// this sreen show the product when the app load list of all the products


import React from 'react';
import { FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux'


const ProductsOverviewScreen = props => {
    // get the products with useSelector that take a function that automatically
    // recibe the state as an input and return any data that you want from there
    // this the redux state is on APP.js     same name on the redux state om app.js
    //                                              |
    //                                              |           
    const products = useSelector(state => state.products.availableProducts)
    
    // products is an array
    return <FlatList 
            data={products}
            keyExtractor={item => item.id}
            //renderItem ponts on a function that render our diffents items
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
            />
}

ProductsOverviewScreen.navigationOptions ={
    headerTitle: 'All Products'
}

export default ProductsOverviewScreen            
    //                                  