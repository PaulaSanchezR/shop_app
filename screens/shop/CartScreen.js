// add item on the car

import React from 'react';
import { View ,Text, FlatList, StyleSheet, Button} from 'react-native';
import { useSelector , useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../Store/actions/cart'

const CartScreen = props =>{
    // our cart is store in Redux on app js and we use useSelector to bring the totalamoung cart/reducers.js
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
    return(
        <View style={styles.screen}>
            <View style={styles.summary}> 
                    <Text style={styles.summaryText}>
                     Total:  <Text style={styles.amount}> $ {cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button 
                    color={Colors.accent} 
                    title="Order Now" 
                    disabled={cartItems.length === 0 } />
            </View>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => <CartItem 
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    onRemove={()=>{
                         dispatch(cartActions.removeFromCart(itemData.item.productId))   
                    }}></CartItem>}            
                />

        </View>
    )
};

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
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset:{width: 0 , height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
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