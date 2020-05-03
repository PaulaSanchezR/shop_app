import React from 'react';
import { Text, View , StyleSheet , Image, Button} from 'react-native'

const ProductItem = props =>{
    return (
        <View style={styles.products}>
            <Image />
            <Text>TITLE</Text>
            <Text>$PRICE</Text>
            <View>
                <Button title="View Detail" />
                <Button title="To Cart" />
                
            </View> 
        </View>
    )
}

const styles= StyleSheet.create({
    products:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset:{width: 0 , height: 2},
        shadowRadius: 8
    }
})

export default ProductItem;
