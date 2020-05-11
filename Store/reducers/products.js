import PRODUCTS from '../../data/dummy-data'

const initialState={
    availableProducts: PRODUCTS,// all products
    // userProducts are the product by ownerId do we need it for UserProductsScreen
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')


};
// Redux 
export default (state = initialState, action ) =>{
    return state
}