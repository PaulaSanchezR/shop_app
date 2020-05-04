// import React from 'react'
import { Platform, Text } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
// import { createDrawerNavigator } from 'react-navigation-drawer'
// import Colors from '../constants/Colors'
// import { Ionicons } from '@expo/vector-icons
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import Colors from '../constants/Colors'


// the result is a react component, ProductsNavigatior is a react component
// we map string identifier that will be loaing as a screens

const ProductsNavigatior = createStackNavigator({
    ProductsOverview : ProductsOverviewScreen, // this is our start screen because is the firt on the list
    ProductDetail: ProductDetailScreen
},{// this second argunt let me configure the entire navigator
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white'  : 'black'

        }
    })

  // we dont export the navigatior we wrap it on container  
  export default createAppContainer(ProductsNavigatior)
