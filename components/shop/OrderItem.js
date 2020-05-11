import React, { useState } from 'react';
import { View, Text,Button,StyleSheet } from 'react-native';

import CartItem from './CartItem'
import Colors from '../../constants/Colors';



const OrderItem = props =>{
    // we going to control show details with the state
    // the initial value is false but when we press the botton be going to change the state
    const [showDetails, setShowDetails] = useState(false)


    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>

            </View>
            <Button 
                color={Colors.primary} 
                title ={showDetails ? "Hide Details" : "Show Details"}
                onPress={()=>{
                // we will invert the value
                // prevState is the initial value false
                // it is was false I will return true
                setShowDetails(prevState => !prevState)
            }}/>
            {/* create some conditions if setShowDetails is true show details */}
            {showDetails && <View sytle={styles.detailItems}>
                {props.items.map(cartItem => (
                <CartItem 
                  key={cartItem.productId}
                  quantity ={cartItem.quantity}
                  amount ={cartItem.sum}
                  title={cartItem.productTitle}
                />))}
            </View>}
        </View>
    )
};  

const styles= StyleSheet.create({
    orderItem:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset:{width: 0 , height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin:20,
        padding: 10,
        alignItems:'center'
    },
    summary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width:'100%',
        marginBottom: 15
    },
    totalAmount:{
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date:{
        fontFamily:'open-sans',
        fontSize: 16,
        color: '#888'

    },
    detailItems:{
        width: '100%'
    }
});


export default OrderItem;