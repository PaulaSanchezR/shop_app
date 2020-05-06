import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
const CartItem =props =>{
    return(
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                {/* touchableopacity should delete when you press it */}
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons 
                    name={Platform.OS === 'android' ?  'md-trash' : 'ios-trash'}
                    size={23}
                    color="red" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    deleteButton:{
        marginLeft:20
    },
    cartItem:{
        padding:10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginHorizontal: 20
    },
    itemData:{
        flexDirection: 'row',
        alignItems:'center',

    },
    quantity:{
        fontFamily: 'open-sans',
        color:'#888',
        fontSize:16
    },
    mainText:{
        fontFamily: 'open-sans-bold',
        fontSize:16
    }
    
})

export default CartItem;