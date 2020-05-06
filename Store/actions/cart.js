
// identifiers  
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'


// action create fuction 
export const addToCart = product => {
    return {type : ADD_TO_CART , product: product}
}

//action create function for remove item from the cart
export const removeFromCart = productId => {
    return {type: REMOVE_FROM_CART , pid:productId  }
}