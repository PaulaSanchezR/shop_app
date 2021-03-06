import { ADD_ORDER , SET_ORDERS} from '../actions/orders'
import Order from '../../models/order'


const initialState = {
    orders:[]
}

export default (state = initialState, action) =>{
    switch(action.type){
        case SET_ORDERS:
        // I need to return a new state object where orders is equal to action.orders
           return {
                orders: action.orders
           }
        // we going to create a new object order form my model
        case ADD_ORDER: 
        //    this orderData.items is a proprertie and key value of the addOrder on the order.js action folder
            const newOrder= new Order(
                    action.orderData.id, 
                    action.orderData.items, 
                    action.orderData.amount,
                    action.orderData.date
                );

                // our order need to be add to our order array we return 
                // a new state snapshot
                return {
                    ...state,
                    // concat combines two or more arrays
                    orders: state.orders.concat(newOrder)
                }

    }
    

    return state
}