import {API} from '../../backend'
import {clearCart} from '../../core/helper/cartHelper'

export const signup = (user) => {
    return fetch(`${API}user/`, {
        'method' : 'POST',
        'headers' : {
            Accept : 'application/json',
            'Content-Type' : 'application/json'
        },
        'body' : JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const signin = (user) => {
    const formData = new FormData()
    for(let name in user){
        formData.append(name, user[name])
    }
    return fetch(`${API}user/login/`, {
        'method' : 'POST',
        'body' : formData
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const authenticate = (data, next) => {
    if(typeof window != undefined) {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window == undefined) {
        return false
    }
    else if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    }
    return false
}

export const signout = (next) => {
    debugger
    const userId = isAuthenticated() && isAuthenticated().user.id
    if(typeof window != undefined){
        localStorage.removeItem('jwt')
        clearCart(() => {})
        return fetch(`${API}user/logout/${userId}`, {'method' : 'GET'})
        .then(response => {
            console.log(response)
             console.log('Logout Successfully')
             next()
        })
        .catch(error => console.log(error))
        
    }
}