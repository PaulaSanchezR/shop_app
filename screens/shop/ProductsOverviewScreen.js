// this sreen show the product when the app load list of all the products


import React from 'react';
import { FlatList, Text } from 'react-native'
import { useSelector , useDispatch} from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import Product from '../../models/products';
import * as cartActions  from '../../Store/actions/cart'





const ProductsOverviewScreen = props => {
    // get the products with useSelector that take a function that automatically
    // recibe the state as an input and return any data that you want from there
    // this the redux state is on APP.js     same name on the redux state om app.js
    //                                              |
    //                                              |           
    const products = useSelector(state => state.products.availableProducts)
     // products is an array

    //useDispatch is  
    const dispatch = useDispatch()
    return <FlatList 
            data={products}
            keyExtractor={item => item.id}
            //renderItem ponts on a function that render our diffents items
            renderItem={itemData => 
            <ProductItem 
                image ={itemData.item.imageUrl} 
                title ={itemData.item.title} 
                price={itemData.item.price}
                onViewDetail={() =>{
                    // we going to forward our product data 
                    props.navigation.navigate('ProductDetail', {productId: itemData.item.id , productTitle: itemData.item.title}) // < -- forward the id
                    //                              ^                   
                    //                              |
                    //                         identifier from the ShopNavigation page 

                }}
                onAddToCart={() =>{
                    // addToCart is my function action
                    dispatch(cartActions.addToCart(itemData.item))
                }}
            />}
            />
}

ProductsOverviewScreen.navigationOptions ={
    headerTitle: 'All Products'
}

export default ProductsOverviewScreen            
    //                                  