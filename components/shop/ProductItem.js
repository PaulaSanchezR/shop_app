import React from 'react';
import { Text, View , StyleSheet , Image, Button, TouchableOpacity, TouchableNativeFeedback,Platform} from 'react-native'
import Colors from '../../constants/Colors';

const ProductItem = props =>{
    // the touchableOpacity looks ugly on Android  reple affect
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >=21 ){
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
                                                  
        <View style={styles.products}>
         <View  style={styles.touchable}>
            <TouchableCmp onPress={props.onSelect} UseForeground>
              <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: props.image}} />
                    </View>
                    <View style={styles.detail}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                    {/* special props that whatever we pass  */}
                       {props.children}
                    </View> 
                </View>    
            </TouchableCmp>
        </View>
        </View>
    )
}

const styles= StyleSheet.create({
    products:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset:{width: 0 , height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin:20
    },
    imageContainer:{
        width:'100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius:10,
        overflow: 'hidden' // any child can overflow the container
    },
    image:{
        width:'100%',
        height: '100%'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price:{
        fontFamily:'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '23%',
        color:'#5D6D7E'

    },
    detail:{
        alignItems:'center',
        height:'17%',
        padding: 5
    },
    touchable:{
        borderRadius: 10,
        overflow: 'hidden'
    }
})

export default ProductItem;
