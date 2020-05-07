import React from 'react';
import { FlatList,Text } from 'react-native'
// the data we use here comes form redux
import { useSelector} from 'react-redux'
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'



const OrdersScreen = props =>{
//            this states.orders comes from app.js combineReducer identifier
//                                           ^ 
//                                           |     this is coming from orders/reducer initial state
    const order=useSelector(state => state.order.orders)
    
    return <FlatList 
                data={order}
                keyExtractor={item=> item.id}
                //    the key value totalAmount is coming from model/order.js 
                //                                            ^ 
                //                                            |
                renderItem={itemData=> <Text>{itemData.item.totalAmount}</Text>}
               /> 
            }

    // this is a function and we return a conf object        
    OrdersScreen.navigationOptions = navData => {
        return {
        headerTitle: 'Your Orders',
        headerLeft: ( 
            // to add icons to the drawer navigator we need to go to the shopNavigator.js
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
               <Item 
                   title='Menu' 
                   iconName='ios-menu'
                   onPress={()=>{
                       navData.navigation.toggleDrawer()
                   }}
                   />
               </HeaderButtons>),
    }
        }
        

export default OrdersScreen ;