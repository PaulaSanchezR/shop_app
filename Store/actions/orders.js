import Order from "../../models/order";


export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const fetchOrders = () =>{
    return async dispatch =>{
        try {

            const response = await fetch(
                'https://shop-app-7b156.firebaseio.com/orders/u1.json'
                )// fetch is use to send get request 
                 // FOR GET we dont need to send a GET request or header
    
                 if(!response.ok){ // ok is a property ot the fetch
                    // you can dive into the response body to find out what is wrong there
                    // if I get a 400 or 500 status code  
                    throw new Error("Something went wrong accessing the orders")
                 }
            const resData =   await response.json()  ;
           
            // resData return an object an on my app I manage the data on an array
            const loadedOrders = []
    
              for (const key in resData){
                  loadedOrders.push(
                      new Order(
                      key,
                      resData[key].cartItems, 
                      resData[key].totalAmount, 
                      new Data(resData[key].date) // we need tocreate a new data object because resData key.data is just that date string ... and we need a date object
                      )
                   );
               }
            //  console.log(loadedOrders)
        dispatch({ type: SET_ORDERS , orders: loadedOrders})
    } catch(err){
        throw new Error('Something wrong listing the orders')
    }
  }
}

export const addOrder = (cartItems, totalAmount)=>{
    //redux thwon
    return async dispatch =>{
        // I will create my snapshot, date with new date
        const date = new Date()
        // we going to send  the request to store in the server
        const response = await fetch('https://shop-app-7b156.firebaseio.com/orders/u1.json', // fetch is use to send post request or put request any kind or HTTP request
        //                                          product.json is just a firebase thing you can create any json file like this
                {
                  method: 'POST', // we are adding apending a new order
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({
                     cartItems,
                     totalAmount,
                     date: date.toISOString()
                  })
                })
         if(!response.ok) {
             throw new Error('We can not add the Order')
         }       

        const resData =   await response.json()  ;

        dispatch({
            type:ADD_ORDER, 
            orderData :{ 
                id: resData.name, 
                items: cartItems, 
                amount: totalAmount,
                date: date 
            } 
        })
    }

    // //we return an acction order when I store it locally
    // return { 
    //     type:ADD_ORDER, 
    //     orderData :{ items: cartItems, amount: totalAmount } 
    // };
};
