export const ADD_ORDER = 'ADD_ORDER';


export const addOrder = (cartItems, totalAmount)=>{
    //we return an acction order
    return { 
        type:ADD_ORDER, 
        orderData :{ items: cartItems, amount: totalAmount } 
    };
};
