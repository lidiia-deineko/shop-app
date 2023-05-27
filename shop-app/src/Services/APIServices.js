class APIService{
    host = 'http://localhost:8585'


    getShopList(){
        return fetch(`${this.host}/shops`)
        .then(resp => resp.json())
    }

    getItemsMcDonalds(){
        return fetch(`${this.host}/list-items/mc-donalds`)
        .then(resp => resp.json())
    }

    getItemsKFC(){
        return fetch(`${this.host}/list-items/kfc`)
        .then(resp => resp.json())
    }

    getItemsBurgerKing(){
        return fetch(`${this.host}/list-items/burger-king`)
        .then(resp => resp.json())
    }

    getCartList(){
        return fetch(`${this.host}/cart`)
        .then(resp => resp.json())
    }

    addToCart(payload){
        return fetch(`${this.host}/cart/add-item`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    deleteItemFromCart(payload){
        return fetch(`${this.host}/cart/delete-item`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    submitOrder(payload){
        return fetch(`${this.host}/order`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    updateCount(payload){
        return fetch(`${this.host}/cart/count`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }

    
}



export default new APIService();