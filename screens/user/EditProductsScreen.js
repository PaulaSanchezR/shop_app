import React , { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView,TextInput, StyleSheet, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../Store/actions/products'



const EditProductsScreen = props =>{
    // to prepopulet the fiels we use getParam and we can retrive productId
    const prodId = props.navigation.getParam('productId')
    const editedProduct= useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const dispatch = useDispatch()
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price , setPrice] = useState(''); // price is not edited
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

 
    // add a product when updated
    // the parenatesis ensure that the function is recreat everytime the componen reder and then we avoid 
    // and infinty loop, the [] dependecis avoid the infinit loop
    const submitHandler = useCallback(() =>{
         if(editedProduct) {
             dispatch(productsActions.updateProduct(prodId,title,description,imageUrl))
         } else {  //we adding we conver the price to a number
             dispatch(productsActions.createProduct(title, description, imageUrl, +price))
            }
         props.navigation.goBack();
    },[dispatch, prodId, title,description,imageUrl, price]) //we need the dependencis to recreate for the updates values otherwise  when we submit the form we will never get the inf the user enter
  
    // to execute the function everytime the component rerender
    useEffect(() =>{
        // submit is a parameter we can retrive in our header
        props.navigation.setParams({submit: submitHandler})
    },
    // submetHandler only execute ones
        [submitHandler]
    )


    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl} >
                    <Text style={styles.label} >Title</Text>
                    {/* onChangeText will update the state with text */}
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)}/>
                </View>
                <View style={styles.formControl} >
                    <Text style={styles.label} >ImageUrl</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)}/>
                </View>
                {editedProduct ? null :(
                    <View style={styles.formControl} >
                        <Text style={styles.label} >Price</Text>
                        <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)}/>
                    </View>)}   
                <View style={styles.formControl} >
                    <Text style={styles.label} >Description</Text>
                    <TextInput style={styles.input}  value={description} onChangeText={text => setDescription(text)}/>
                </View>
            </View>    
        </ScrollView>
   )
};

EditProductsScreen.navigationOptions= navData =>{
    const submitFn = navData.navigation.getParam('submit')
    return {
        // userProductsScreen.js we pass the  productId
        headerTitle:navData.navigation.getParam('productId') 
            ? 'Edit Product' 
            : 'Add Product',
        headerRight: ( 
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
               <Item 
                   title='Save' 
                   iconName={Platform.OS ==='android' ? 'ios-checkmark' : 'ios-checkmark'}
                   onPress={submitFn}// submit my form
                   />
               </HeaderButtons>
               ),
    }
}

const styles= StyleSheet.create({
    form:{
        margin:20
    },
    formControl:{
        width:'100%'
    },
    label:{
        fontFamily:'open-sans-bold',
        marginVertical: 8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical : 5,
        borderBottomColor: '#ccc',
        borderWidth: 1
    }

})

export default EditProductsScreen 