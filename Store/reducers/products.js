import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT , CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS} from '../actions/products'
import Product from '../../models/products';

const initialState={
    availableProducts: PRODUCTS,// all products
    // userProducts are the product by ownerId do we need it for UserProductsScreen
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')


};
// Redux 
export default (state = initialState, action ) =>{
    switch (action.type){
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id ,
                'u1',
                action.productData.title, 
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
                );
// we need to add to our store
                return {
                    ...state,
                    availableProducts: state.availableProducts.concat(newProduct),
                    userProducts: state.userProducts.concat(newProduct)
                }

        case UPDATE_PRODUCT:
        // findIndex takes a function than need to return true
                const productIndex= state.userProducts.findIndex(prod => prod.id === action.pid );
                // update product is a new object that we need need to prepopuate with some data
                // owner id wont change
                const updatedProduct = new Product(
                    action.pid,
                    state.userProducts[productIndex].ownerId,
                    action.productData.title,
                    action.productData.imageUrl,
                    action.productData.description,
                    state.userProducts[productIndex].price
                  );
                  const updatedUserProducts = [...state.userProducts];
                  updatedUserProducts[productIndex] = updatedProduct;
                  const availableProductIndex = state.availableProducts.findIndex(
                    prod => prod.id === action.pid
                  );
                  const updatedAvailableProducts = [...state.availableProducts];
                  updatedAvailableProducts[availableProductIndex] = updatedProduct;
                  return {
                    ...state,
                    availableProducts: updatedAvailableProducts,
                    userProducts: updatedUserProducts
                  };

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