import React, { useEffect , useState} from 'react';
import { View, FlatList,Text , ActivityIndicator, StyleSheet} from 'react-native'
// the data we use here comes form redux
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from '../../Store/actions/orders'
import Colors from '../../constants/Colors';

const OrdersScreen = props =>{

    const [isLoading, setIsLoading] = useState(false);
//            this states.orders comes from app.js combineReducer identifier
//                                           ^ 
//                                           |     this is coming from orders/reducer initial state
    const orders=useSelector(state => state.orders.orders)
    // we are mapping the orders array

    const dispatch = useDispatch();

    useEffect(()=>{
        setIsLoading(true)
        dispatch(ordersActions.fetchOrders()).then(()=>{
            setIsLoading(false)
        })
    },[dispatch]);

    // if (isLoading){
    //     return (<View style={styles.centered}><ActivityIndicator size='large' color={Colors.primary}/></View>) 
    // }
    
    return <FlatList 
                data={orders}
                keyExtractor={item=> item.id}
         //    the key value totalAmount is coming from model/order.js 
            //                                            ^ 
            //                                            |
                    renderItem={itemData=> <OrderItem //  |
                            amount={itemData.item.totalAmount}
                            date={itemData.item.readableDate}
                            items={itemData.item.items}
                />}
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
        
const styles= StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    }
})
export default OrdersScreen ;