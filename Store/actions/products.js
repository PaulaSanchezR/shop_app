// export an acction that help us to delete products
export const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const deleteProduct = productId =>{
    return {type:DELETE_PRODUCT,pid: productId }
}


