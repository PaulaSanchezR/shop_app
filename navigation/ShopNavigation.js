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
import Colors from '../constants/Colors'


// the result is a react component, ProductsNavigatior is a react component
// we map string identifier that will be loaing as a screens

const ProductsNavigatior = createStackNavigator({
    ProductsOverview : ProductsOverviewScreen,
},{// this second argunt let me configure the entire navigator
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor:'white'

        }
    }


})
