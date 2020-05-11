import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from '../actions/orders'
import CartItem from "../../models/cart-item"
import { DELETE_PRODUCT } from "../actions/products";


// we set up the inicial state

const initialState = {
    items:{ },
    totalAmount:0
}

//make sure that when I click again on the to cart button  add the
// item again onthe cart

export default (state = initialState, action) =>{
    switch(action.type){
        case ADD_TO_CART: 
            const addeProduct = action.product;
            const prodPrice = addeProduct.price;
            const prodTitle= addeProduct.title;
            let updateOrNewCartItem;

            // if item is alredy on the item state
            if(state.items[addeProduct.id]){
                // this mean that we alredy have the item on the cart
                updateOrNewCartItem = new CartItem(
                    // pre populate with existen data
                    state.items[addeProduct.id].quantity+1,
                    prodPrice,
                    prodTitle,
                    state.items[addeProduct.id].sum + prodPrice
                )
                console.log(updateOrNewCartItem)
                return {
                    ...state,
                    items:{ ...state.items, [addeProduct.id]:updateOrNewCartItem},
                    totalAmount: state.totalAmount+ prodPrice
                }
            }else {
                //add a new item (quantity, productPrice, productTitle, sum
                updateOrNewCartItem = new CartItem(1, prodPrice,prodTitle,prodPrice);
                //console.log(updateOrNewCartItem)
                return {
                    ...state, //copy of our state
                //a new item where I copy my existing items
                //                ^           this is how I can access to a dinamic property 
                //                |               ^
                //                |               |  
                    items:{...state.items,[addeProduct.id]: updateOrNewCartItem},
                    //              old total amount
                    //                      ^
                    totalAmount:  state.totalAmount + prodPrice
                }
            };


            case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
             // we have two cases when we have one item in the cart we remove it enterily from the item object
            // pid is part of our action 
            //                    state.item is an object itme is part of myn initial state
            const currentQty = selectedCartItem.quantity; // action pid dinamically access to the value id key here in our items
            let updatedCartItems;
            if (currentQty > 1) {
              // need to reduce it, not erase it
              const updatedCartItem = new CartItem(
                selectedCartItem.quantity - 1,
                selectedCartItem.productPrice,
                selectedCartItem.productTitle,
                selectedCartItem.sum - selectedCartItem.productPrice
              );
              updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
            } else { // we have two cases when we have one item in the cart we remove it enterily from the item object
              updatedCartItems = { ...state.items };
              //[action.pid] is my identifier
              delete updatedCartItems[action.pid];
            }
            return {
              ...state,
              items: updatedCartItems,
              totalAmount: state.totalAmount - selectedCartItem.productPrice
            };
            
            //-----------------------------------------------
            //                  CLEAR CART
            // we going to haldle to clear the cart there with the order.js action
            // ----------------------------------------------
            
            case ADD_ORDER:
                // our initial state is empty
                 return initialState;
        
            case DELETE_PRODUCT:
            console.log(state.items)
                // we need to remove the product from the cart if we remove it from the admin 
               // we ask if the product is on the cart
               if (!state.items[action.pid]) {
                   // just return the state because the product is not in the cart
                    return state
               }
                const updateItems= { ...state.items}
                const itemTotal = state.items[action.pid].sum;
                delete updateItems[action.pid]
                return {
                    ...state,
                    items: updateItems,
                    totalAmount: state.totalAmount - itemTotal
                }
            }

            return state;
      };







