import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../actions/products'

const initialState={
    availableProducts: PRODUCTS,// all products
    // userProducts are the product by ownerId do we need it for UserProductsScreen
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')


};
// Redux 
export default (state = initialState, action ) =>{
    switch (action.type){
        case DELETE_PRODUCT:
        // if delete product is the case we need to delete products form the array
        return {
            ...state,
            // filter method return a new array, this array is created by runnin a funcion that if return a true 
            // we keep the item if return false we drop the item
            // keep all product that the Id do not match on the new array
            // action.pid is the product we want to delete
            userProducts: state.userProducts.filter(
                product => product.id !== action.pid),

            availableProducts: state.availableProducts.filter(
                product => product.id !== action.pid),

        }


    }
    return state
}