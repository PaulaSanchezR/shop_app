// this sreen show the product when the app load list of all the products


import React from 'react';
import { FlatList, Button, Platform} from 'react-native'
import { useSelector , useDispatch} from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import Product from '../../models/products';
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as cartActions  from '../../Store/actions/cart'
import Colors from '../../constants/Colors'




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
    const selectItemHandler = (id, title) =>{
         // we going to forward our product data 
         props.navigation.navigate('ProductDetail', {
         //                              ^                   
         //                              |
         //                         identifier from the ShopNavigation page 

         productId: id , 
         productTitle: title}) 

    }
    return <FlatList 
            data={products}
            keyExtractor={item => item.id}
            //renderItem ponts on a function that render our diffents items
            renderItem={itemData => 
            <ProductItem 
                image ={itemData.item.imageUrl} 
                title ={itemData.item.title} 
                price={itemData.item.price}
                onSelect={() =>{
                   selectItemHandler(itemData.item.id, itemData.item.title)
                }}
               
            >
                <Button 
                    color={Colors.accent} 
                    title="View Detail" 
                    onPress={() =>{
                        selectItemHandler(itemData.item.id, itemData.item.title)
                     }}/>
                <Button  
                    color={Colors.accent}
                    title="To Cart" 
                    onPress={() =>{
                        dispatch(cartActions.addToCart(itemData.item))
                        }}/>
            </ProductItem>
        }
            />
}

// we need to add the cart page on ShopNavigator,
// we need the function and return an object
ProductsOverviewScreen.navigationOptions = navData => {
    return {
         headerTitle: 'All Products',
         // this is the drawer and onPress we toggleDrawer()
         headerLeft: ( 
         <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item 
                title='Menu' 
                iconName={Platform.OS ==='android' ? 'ios-menu' : 'ios-menu'}
                onPress={()=>{
                    navData.navigation.toggleDrawer()
                }}
                />
            </HeaderButtons>),

        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item 
                title='Cart' 
                iconName={Platform.OS ==='android' ? 'md-cart' : 'ios-cart'}
                onPress={()=>{
                    navData.navigation.navigate('Cart')
                }}
                />
            </HeaderButtons>
    ) 
  }
}

export default ProductsOverviewScreen            
    //                                  