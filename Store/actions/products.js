// export an acction that help us to delete products
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId =>{
    return {type:DELETE_PRODUCT, pid: productId }
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
        console.log(resData)

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
    return { type: UPDATE_PRODUCT, 
        pid: id,
        productData:{
        title:title,
        description:description,
        imageUrl, // modern javascritp
        
    }
  }
}
