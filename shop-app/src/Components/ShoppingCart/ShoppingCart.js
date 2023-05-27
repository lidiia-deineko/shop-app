import { useCallback, useContext, useEffect, useState } from "react"
import { MainContext } from "../../App"
import deleteBtn from '../../../src/delete-item.svg'
import APIServices from "../../Services/APIServices"

const ShoppingCart = () => {

    const mainContext = useContext(MainContext)

    const[name, updName] = useState('')
    const[email, updEmail] = useState('')
    const[phone, updPhone] = useState('')
    const[address, updAddress] = useState('')
    const[totalPrice, updTotalPrice] = useState(0)
    const[count, updCount] = useState(1)

    const handleChangeName = useCallback((event) => {
        updName(event.target.value)
    })

    const handleChangeEmail = useCallback((event) => {
        updEmail(event.target.value)
    })

    const handleChangePhone = useCallback((event) => {
        updPhone(event.target.value)
    })

    const handleChangeAddress = useCallback((event) => {
        updAddress(event.target.value)
    })

    const handleChangeTotalPrice = useCallback((event) => {
        updTotalPrice(event.target.value)
    })

    const handleChangeCount = useCallback((event) => {
        const idItem = event.target.dataset.id 
        const countOfItem = event.target.value

        updCount(countOfItem)
        APIServices.updateCount({idItem, countOfItem})
            .then(resp => {
                if(resp){
                    APIServices.getCartList()
                        .then(cartList => mainContext.setCartState(cartList))    
                    console.log('The item was deleted')
                }else(console.log('Server are not responding'))
            })

    }, [count, totalPrice])

    const deleteItem = useCallback((event) => {
        const idItem = event.target.dataset.id 

        APIServices.deleteItemFromCart({idItem})
            .then(resp => {
                if(resp){
                    APIServices.getCartList()
                        .then(cartList => mainContext.setCartState(cartList))    
                    console.log('The item was deleted')
                }else(console.log('Server are not responding'))
            })
                
    }, [mainContext.cart])

    useEffect(() => {

        let arrOfSumm = []

        mainContext.cart.map((item) => {
            arrOfSumm.push((+item.price)*(+item.count))
        })

        let countTotalPrice = arrOfSumm.reduce(function(sum, elem) {
            return sum + elem;
        }, 0);

       updTotalPrice(countTotalPrice)
    }, [totalPrice, count])

    const submitOrder = useCallback(() => {

        const cartList = mainContext.cart

        const order = {
            name,
            email,
            phone,
            address,
            cartList,
            totalPrice
        }

        APIServices.submitOrder(order)

    }, [name, phone, address, email, mainContext.cart, totalPrice])

    const cartListRender = mainContext.cart.map((item) => 
        <ul className="shop-section_list" key={item.id}>
            <li className="cart-item">
                <img className="shop-section_item-img"  src={item.img}></img>
                <div className="shop-section"><span>Title:</span> <span>{item.title}</span></div>
                <div className="shop-section"><span>Price:</span> <span>{item.price}</span></div>
                <div className="shop-section"><span>Count:</span> <input data-id={item.id} type="number" value={item.count} onChange={handleChangeCount} min={1}></input></div>
                <img data-id={item.id} className="cart-item_del-btn" src={deleteBtn} onClick={deleteItem}></img>
            </li>
        </ul>
        
    )

    return(
        <div className="cart">
            <div className="cart-wrapper">
                <div className="cart-wrapper_item cart-wrapper_item-input">
                    <div className="input-style"><div>Name</div> <input type="text" value={name} onChange={handleChangeName}></input></div>
                    <div className="input-style"><div>Email</div> <input type="text" value={email} onChange={handleChangeEmail}></input></div>
                    <div className="input-style"><div>Phone</div> <input type="text" value={phone} onChange={handleChangePhone}></input></div>
                    <div className="input-style"><div>Address</div> <input type="text" value={address} onChange={handleChangeAddress}></input></div>
                </div>
                <div className="cart-wrapper_item cart-wrapper_item-list">
                    {cartListRender}
                </div>

            </div>
            <div className="input-style"><span>Total price:</span> <input className="total-price" value={totalPrice} onChange={handleChangeTotalPrice}></input></div>
            <button className="shop-section_item-btn" onClick={submitOrder}>Submit</button>
        </div>
    )
}

export default ShoppingCart