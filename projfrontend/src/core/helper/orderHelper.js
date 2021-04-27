import {API} from '../../backend'

export const addOrder = (userId, token, order) => {
    const formData = new FormData()

    for(let name in order){
        formData.append(name, order[name])
    }

    fetch(`${API}order/addOrder/${userId}/${token}/`, {
        'method' : 'POST',
        'body' : formData
    })
    .then(response => response.json())
    .error(error => console.log(error))
}