import PRODUCTS from '../../data/dummy-data'

const initialState={
    availableProducts: PRODUCTS,// all products
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')


};
// Redux 
export default (state = initialState, action ) =>{
    return state
}