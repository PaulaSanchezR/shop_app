import React from "react"
import { Platform, Button, FlatList} from 'react-native'
import  { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'

import * as productsActions from '../../Store/actions/products'
import Colors from '../../constants/Colors'
import ProductItem from '../../components/shop/ProductItem'
const UserProductsScreen = props =>{
    //                          this products are coming from app.j from our store identifer and access the 
    //                          and access the userProducts of the reducer  form shop/reducers/products
    //                                                 ^ 
    //                                                 |
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch();
    const editProductHandler= (id) =>{
        props.navigation.navigate('EditProduct', {productId: id})  // EditProduct is the identifier that we registr on shopnavigatior.js

    }

    return (
        <FlatList 
            data={userProducts}
            //userProduct use the product model in the end
            keyExtractor={item =>item.id}
            renderItem={itemData => <ProductItem 
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect ={() =>{
                     editProductHandler(itemData.item.id)
                }}
             > 
             <Button 
                color={Colors.accent} 
                title="Edit" 
                onPress={() =>{
                    editProductHandler(itemData.item.id)
                }}/>
            <Button  
                color={Colors.accent}
                title="Delete" 
                onPress={() =>{
                    dispatch(productsActions.deleteProduct(itemData.item.id))
                }}/>
                </ProductItem>
        }/>
    )
}


UserProductsScreen.navigationOptions = navData => {
   return {
       headerTitle: 'Your Products',
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
           </HeaderButtons>
           ),
           headerRight: ( 
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
               <Item 
                   title='Add' 
                   iconName={Platform.OS ==='android' ? 'ios-create' : 'ios-create'}
                   onPress={()=>{
                       navData.navigation.navigate('EditProduct')
                   }}
                   />
               </HeaderButtons>
               ),
   } 


}



export default UserProductsScreen;