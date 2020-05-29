// this sreen show the product when the app load list of all the products

// I use useEffect where this comoponent loads
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Platform, ActivityIndicator} from 'react-native'
import { useSelector , useDispatch} from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import Product from '../../models/products';
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as cartActions  from '../../Store/actions/cart'
import Colors from '../../constants/Colors'
import * as productsActions from '../../Store/actions/products'



const ProductsOverviewScreen = props => {
    // adding the spiner
    const [isLoading, setIsLoading] =useState(false);
    // for refresing
    const [isRefresing, setIsRefresing] = useState(false)
    // get the products with useSelector that take a function that automatically
    // recibe the state as an input and return any data that you want from there
    // this the redux state is on APP.js     same name on the redux state om app.js
    //                                              |
    //                                              |           
    const products = useSelector(state => state.products.availableProducts)
     // products is an array
// catching the error message 
    const [error, setError]= useState()
    //useDispatch is  
    const dispatch = useDispatch()

    const loadProducts = useCallback (async () =>{
        // this loadProdcut is going to load whenever we visit this page
        //when the customer press try again error need to set null again
        setError(null)
        setIsRefresing(true)
        //setIsLoading(true);
        try {
            await dispatch(productsActions.fetchProducts())
        } catch(err) { 
            setError(err.message)
        }
        setIsRefresing(false)
        //setIsLoading(false)
    },[dispatch,setIsLoading,setError])

// refetch the data 
    useEffect(()=>{
         const willFocusSub= props.navigation.addListener('willFocus', loadProducts)
// we can return something we will return a clean function which runs whenever this effect is about 
//retrun or when this component is efect and we can clean it
        return ()=>{
            willFocusSub.remove()
        }

        },[loadProducts])
    


    useEffect(()=>{
        // we set this here where we trigger load products when the component
        // loads 
        setIsLoading(true);
        // we can do this because loadProducts  return a promese because is having  this async keyword
        // and we get the loading spinner when this initially loads but not when it reloads 
        // means that when we visit this page, we dont see the spinner
        loadProducts().then(()=>{
            setIsLoading(false)
        })
    },[dispatch, loadProducts]);


    const selectItemHandler = (id, title) =>{
         // we going to forward our product data 
         props.navigation.navigate('ProductDetail', {
         //                              ^                   
         //                              |
         //                         identifier from the ShopNavigation page 

         productId: id , 
         productTitle: title}) 

    }
    if (isLoading) {
        return(
         <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
        )
    }
// if we have error message

    if(error){
        return(
            <View style={styles.centered}>
               <Text>An error occurred!</Text>
               <Button 
                  title="Try again" 
                  onPress={loadProducts}
                  color={Colors.primary} 
            />
           </View>
           )
    } 

    // if we have not products

    if(!isLoading && products.length === 0 ){
        return(
            <View style={styles.centered}>
               <Text>No products found. Please add some</Text>
           </View>
           )
    }
    return (
         <FlatList 
            onRefresh={loadProducts}
            // this refressiing will point at stateful variable and we have isLoading 
            refreshing={isRefresing}
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
            />)
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

const styles= StyleSheet.create({
    centered:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    }
})

export default ProductsOverviewScreen            
    //                                  