import React from 'react'  // we need react because we are using JSX sintax on the Ionicons component
import { Platform, Text } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
// import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import Colors from '../constants/Colors'


//-------------------------------
// Default options 
//------------------------------

const defaultNavOptions={
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily:'open-sans-bold'
    }, 
    headerBackTitleStyle:{
        fontFamily:'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white'  : 'black'
};

//-------------------------------------------------
//  Navigation between screens 
//------------------------------------------------
// the result is a react component, ProductsNavigatior is a react component
// we map string identifier that will be loaing as a screens


const ProductsNavigatior = createStackNavigator({
    ProductsOverview : ProductsOverviewScreen, // this is our start screen because is the firt on the list
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
},{// this second argunt let me configure the entire navigator
    // add icons on the drawer menu
      navigationOptions:{
        drawerIcon: drawerConfig => (
        <Ionicons  
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            // drawer choose witch color to use depend if it is select or not
            color={drawerConfig.tintColor}
         />)
        
    },
    defaultNavigationOptions: defaultNavOptions
})

//---------------------------------------------------
// Orders is going to be on the drawer navigator
//---------------------------------------------------
const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    // add icons on the drawer menu
    navigationOptions:{
        drawerIcon: drawerConfig => (
        <Ionicons  
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            // drawer choose witch color to use depend if it is select or not
            color={drawerConfig.tintColor}
         />)
        
    },
    defaultNavigationOptions: defaultNavOptions
})


//---------------------------------------------------
//    USER PRODUCTOS NAVIGATION
//---------------------------------------------------

const AdminNavigator = createStackNavigator(
    {
        UserProducts : UserProductsScreen
}, {
    // add icons on the drawer menu
    navigationOptions:{
        drawerIcon: drawerConfig => (
        <Ionicons  
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            // drawer choose witch color to use depend if it is select or not
            color={drawerConfig.tintColor}
         />)
        
    },
    defaultNavigationOptions: defaultNavOptions
})


const ShopNavigator = createDrawerNavigator({
    // we going to merge the tew navigators
    Products: ProductsNavigatior,
    Orders:OrdersNavigator,
    Admin: AdminNavigator
},{
    contentOptions:{
        activeTintColor:Colors.primary
    }
})

  // we dont export the navigatior we wrap it on container  
  export default createAppContainer(ShopNavigator)
