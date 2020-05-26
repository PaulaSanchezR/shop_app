// export an acction that help us to delete products
import Product from "../../models/products"
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCT'

export const fetchProducts = () =>{
  return async dispatch => {
    // before we can execute any async code we want!!
    // fetch return a promese
 // in case the url is wrong it will catch the errorr
    try {

        const response = await fetch(
            'https://shop-app-7b156.firebaseio.com/products.json'
            )// fetch is use to send get request 
             // FOR GET we dont need to send a GET request or header

             if(!response.ok){ // ok is a property ot the fetch
                // you can dive into the response body to find out what is wrong there
                // if I get a 400 or 500 status code  
                throw new Error("Something went wrong")
             }
        const resData =   await response.json()  ;

        // resData return an object an on my app I manage the data on an array
        const loadedProduct = []

          for (const key in resData){
              loadedProduct.push(new Product(
                  key,
                  'u1',
                  resData[key].title ,
                  resData[key].imageUrl,
                  resData[key].description,
                  resData[key].price
                 )
               )
           }
//                                I want to forward my products
dispatch({type: SET_PRODUCTS, products: loadedProduct})
    } catch(error){
        //send to custome analytis server
        throw error;

    }
  };  
};
export const deleteProduct = productId =>{
    return async dispatch =>{
        await fetch(
            `https://shop-app-7b156.firebaseio.com/products/${productId}.json`, // fetch is use to send post request or put request any kind or HTTP request
        //  product.json is just a firebase thing you can create any json file like this
                {
                  method: 'DELETE', 
                }
             )
        dispatch({type:DELETE_PRODUCT, pid: productId })
    }
}

export const createProduct = (title, description, imageUrl, price) =>{
    // thanks to reduxthunk
    return async dispatch => {
// before we can execute any async code we want!!
// fetch return a promese
        const response = await fetch('https://shop-app-7b156.firebaseio.com/products.json', // fetch is use to send post request or put request any kind or HTTP request
        //                                          product.json is just a firebase thing you can create any json file like this
                {
                  method: 'POST',
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({
                      title,
                      description,
                      imageUrl,
                      price
                  })
                })

        const resData =   await response.json()  ;
      

        dispatch ({ 
            type: CREATE_PRODUCT, 
            productData:{
            id: resData.name,
            title:title,
            description:description,
            imageUrl, // modern javascritp
            price
        }

    })
  }
}


export const updateProduct = (id, title, description, imageUrl) =>{
 
    // we can reach out the server and update our data there
    return async dispatch =>{
        // we wait for this to complete
              await fetch(
            `https://shop-app-7b156.firebaseio.com/products/${id}.json`, // fetch is use to send post request or put request any kind or HTTP request
        //  product.json is just a firebase thing you can create any json file like this
                {
                  method: 'PATCH', // will update in the place 
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({
                      title,
                      description,
                      imageUrl
                 })
                }
                )
        dispatch({ type: UPDATE_PRODUCT, 
            pid: id,
            productData:{
            title:title,
            description:description,
            imageUrl // modern javascritp
        }
    })
  }
}
