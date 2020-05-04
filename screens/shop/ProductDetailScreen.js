import React from 'react'
import { View , Text, StyleSheet, Image, ScrollView , Button} from 'react-native'
import { useSelector } from 'react-redux'




const ProductDetailScreen = props =>{
// getparam  productId from productsOverviewScreen 
// will extrat our product 
    const productId= props.navigation.getParam('productId');
// our pruducts are store in Redux and we can use useSeletor to select a single product
//                                                      this products name is form app.js   
    //                                                    ^         this is the inicial state key value for products.js
    //                                                    |             ^
    const selectedProduct= useSelector (state => state.products.availableProducts.find(prod => prod.id === productId))
    console.log(selectedProduct)
    return(
        
        <View>
            <Text>{selectedProduct.title}</Text>
        </View>
    )
}

const styles= StyleSheet.create({

})

export default ProductDetailScreen