import React from 'react'
import { View , Text, StyleSheet, Image, ScrollView , Button} from 'react-native'
import { useSelector , useDispatch} from 'react-redux'
import Color from '../../constants/Colors'
import Colors from '../../constants/Colors';
import * as cartAction from '../../Store/actions/cart'




const ProductDetailScreen = props =>{
// getparam  productId from productsOverviewScreen 
// will extrat our product 
    const productId = props.navigation.getParam('productId');
// our pruducts are store in Redux and we can use useSeletor to select a single product
//                                                      this products name is form app.js   
    //                                                    ^         this is the inicial state key value for products.js
    //                                                    |             ^
    const selectedProduct= useSelector (state => state.products.availableProducts.find(prod => prod.id === productId))
   
    const dispatch= useDispatch()
    return(
      <ScrollView>
          <Image style={styles.image}source ={{uri: selectedProduct.imageUrl}} />
         <View style={styles.actions}>
          <Button color={Colors.primary} title="Add to Cart" onPress={() =>{
              dispatch(cartAction.addToCart(selectedProduct))
          }}/>
         </View>
          <Text style={styles.price}>${selectedProduct.price.toFixed()}</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
      </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        // this param came from ProductOverviewScreen
       headerTitle: navData.navigation.getParam('productTitle')    
    }
}
const styles= StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    price:{
        fontFamily:'open-sans-bold',
        fontSize: 20,
        color:'#888',
        textAlign:'center',
        marginVertical:20
    },
    description:{
        fontFamily:'open-sans',
        fontSize: 14,
        textAlign:'center',
        marginHorizontal: 20
    },
    actions:{
        marginVertical: 10,
        alignItems:'center',
        
    }
})

export default ProductDetailScreen