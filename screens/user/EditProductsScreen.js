import React , { useState, useEffect, useCallback , useReducer} from 'react'
import { View, Text, ScrollView, StyleSheet, Platform, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../Store/actions/products'
import Input from '../../components/UI/Input'

// create a reducer it is outside of the component we can do it inside but we dont depend on props we can do it outside
// also this wont rebild everytime the components render and we dont need to use callback that cost some performace

// 
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) =>{
    if(action.type === 'FORM_INPUT_UPDATE') {
        const updateValues={
            ...state.inputValues,
            [action.input]: action.value
        };

        const updatedValidities = {
            ...state.inputValidities,
            [action.input] :action.isValid
        }
        let updatedformIsValid = true;
        for( const key in updatedValidities) {
            updatedformIsValid = updatedformIsValid && updatedValidities[key]
        }
        return {
            formIsValid: updatedformIsValid,
            inputValidities: updatedValidities,
            inputValues: updateValues
        }
    }
    return state;
}

const EditProductsScreen = props =>{
    // to prepopulet the fiels we use getParam and we can retrive productId
    const prodId = props.navigation.getParam('productId')
    const editedProduct= useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId))

    const dispatch = useDispatch()
// use reduce take a reducer function and the second argument with the initial state
// useReducer returns something like useState, they return an array with exactly two elements, we can distructured
// fromState snapshot whever you change it EditProduct will be render anhd will have a new state snapshot
// and the dispatchFormState function that allow dispatch actions agains this reducer
 const [formState, dispatchFormState] = useReducer(formReducer, {
         inputValues :{
             title: editedProduct ? editedProduct.title : '',
             imageUrl:editedProduct ? editedProduct.imageUrl : '',
             price:'',
             description:editedProduct ? editedProduct.description : ''
            },
            inputValidities:{
                title: editedProduct ? true:false,
                imageUrl:editedProduct ? true:false,
                price:editedProduct ? true:false,
                description:editedProduct ? true:false
            },
            formIsValid:editedProduct ? true : false
        })

// -------------------------------------------------------------------------------------------------
// BEFORE USEREDUCER THIS WAS THE INITIAL STATE
// -------------------------------------------------------------------------------------------------
    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    // const [titleIsValid, setTitleIsValid] = useState(false)
    // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    // const [price , setPrice] = useState(''); // price is not edited
    // const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
// ----------------------------------------------------------------------------------------------------


    // add a product when updated
    // the parenatesis ensure that the function is recreat everytime the componen reder and then we avoid 
    // and infinty loop, the [] dependecis avoid the infinit loop
    const submitHandler = useCallback(() =>{
       
        if(!formState.formIsValid){
            Alert.alert('Wrong Input','Please check the errors in the form' , [
                { text:'Okay'}
            ])
            return;
        }
         if(editedProduct) {
             dispatch(
                 productsActions.updateProduct(
                     prodId,
                     formState.inputValues.title,
                     formState.inputValues.description,
                     formState.inputValues.imageUrl
                     ))
         } else {  //we adding we conver the price to a number
             dispatch(productsActions.createProduct(
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl, 
                +formState.inputValues.price
                ))
            }
         props.navigation.goBack();
    },[dispatch, prodId, formState]) //we need the dependencis to recreate for the updates values otherwise  when we submit the form we will never get the inf the user enter
  
    // to execute the function everytime the component rerender
    useEffect(() =>{
        // submit is a parameter we can retrive in our header
        props.navigation.setParams({submit: submitHandler})
    },
    // submetHandler only execute ones
        [submitHandler]
    )


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) =>{
      
// we pass an object that describe my acctions
     dispatchFormState({
         type: FORM_INPUT_UPDATE, 
         value:inputValue, 
         isValid:inputValidity,
         input: inputIdentifier //we need to send the input how trigger this
        
        })
    },[dispatchFormState]) 
    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    label='Title'
                    errorText='Please enter a valid title'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    returnKeyType='next'  // control just the wait the botton looks like
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={!!editedProduct}
                    required
                />
                <Input
                    label='ImageUrl'
                    errorText='Please enter a valid image Url'
                    keyboardType='default'
                    autoCorrect
                    returnKeyType='next'  // control just the wait the botton looks like
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initiallyValid={!!editedProduct}
                    required
                />
              
                {editedProduct ? null :(
                    <Input
                    label='Price'
                    errorText='Please enter a valid price'
                    keyboardType='decimal-pad'
                    returnKeyType='next'  // control just the wait the botton looks like
                    onInputChange={inputChangeHandler}
                    required
                    min={0.1}
                    />
                    )}   
                    <Input
                        label='Description'
                        errorText='Please enter a valid Description'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines ={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                
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
})

export default EditProductsScreen 