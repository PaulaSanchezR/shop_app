export const ADD_ORDER = 'ADD_ORDER';


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
             throw new Error('We can not create the Order')
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
