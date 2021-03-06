// add item on the car

import React, { useState } from 'react';
import { View ,Text, FlatList, StyleSheet, Button, ActivityIndicator} from 'react-native';
import { useSelector , useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../Store/actions/cart'
import * as ordersActions from '../../Store/actions/orders'
import Card from '../../components/UI/Card'

const CartScreen = props =>{
    // for the loading 
    const [isLoading, setIsLoading] = useState(false)
    
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    // our cart is store in Redux on app js and we use useSelector to bring the items cart/reducers.js
    //const cartItems= useSelector(state => state.cart.items)  // ===> this will retrive an object not an array
    const cartItems= useSelector(state => {  // we need an array
        const transformedCartItems =[];
        for (const key in state.cart.items){
            transformedCartItems.push({  // it will push a js object
                productId: key,
                productTitle: state.cart.items[key].productTitle,  // this name is on my cart-item.js
                productPrice: state.cart.items[key].productPrice,  // this name is on my cart-item.js
                quantity: state.cart.items[key].quantity,  // this name is on my cart-item.js
                sum: state.cart.items[key].sum,  // this name is on my cart-item.js
           
            })
        }
       // our array need to be listed the same way all the times
    //    sort will compare and return a number
        return  transformedCartItems.sort((a,b)=>{a.productId > b.productId ? 1: -1 });
        })
   const dispatch= useDispatch()

   const sendOrderHandler = async ()=>{
       setIsLoading(true)
    // the dispatch and addOrder will return a promese and here we can control our loading state 
    // and we wait until this process is finish
       await dispatch(ordersActions.addOrder(cartItems,cartTotalAmount))
       setIsLoading(false)
    }

    if(!setIsLoading){
        return <View></View>
    }
    return(
        <View style={styles.screen}>
            <Card style={styles.summary}> 
                    <Text style={styles.summaryText}>
                    {/* this math round is to avoid the -0.00 on the cart
                        we do this because Javascript internaly manage the float number
                     */}
                     Total:  <Text style={styles.amount}> $ {Math.round(cartTotalAmount.toFixed(2) * 100 )/100}</Text>
                </Text>
                {isLoading ? (
                        <View><ActivityIndicator size="large" color={Colors.primary} /></View>
                         ) : 
                    (
                    <Button 
                        color={Colors.accent} 
                        title="Order Now" 
                        disabled={cartItems.length === 0}
                        onPress={sendOrderHandler} />
                    )
                }
            </Card>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => <CartItem 
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    deletable
                    onRemove={()=>{
                         dispatch(cartActions.removeFromCart(itemData.item.productId))   
                    }}></CartItem>}            
                />

        </View>
    )
};


CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen:{
        margin:20
    },
    summary:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,
       },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize: 18
    },
    amount:{
        color: Colors.accent
    }
})

export default CartScreen