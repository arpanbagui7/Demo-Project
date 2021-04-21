export const addItemToCart = (item, next) => {
    let cart = []
    if(typeof window != undefined){
        if(localStorage.getItem('cart'))
            cart = JSON.parse(localStorage.getItem('cart'))
    }
    console.log(cart)
    cart.push({
        ...item
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(localStorage.getItem('cart'))
    next()
}
 
export const loadCart = () => {
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
}
export const removeItemFromCart = (productId) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart = cart.filter(data => data.id !== productId)
        localStorage.setItem('cart', JSON.stringify(cart))
        console.log(localStorage.getItem('cart'))
    }
}

export const clearCart = (next) => {
    if(typeof window != undefined){
        if(localStorage.getItem('cart')){
            localStorage.setItem('cart' , JSON.stringify([]))
        }
    }
    next()
}


