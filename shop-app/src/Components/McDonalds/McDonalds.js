import { useCallback, useContext, useEffect, useState } from "react"
import APIServices from "../../Services/APIServices"
import { MainContext } from "../../App"
import { checkItemById } from "../../Utils/utils"


const McDonalds = () => {

    const mainContext = useContext(MainContext)

    useEffect(() => {
        APIServices.getItemsMcDonalds()
            .then(list => mainContext.setListItemsMcDonaldsState(list.items))
    }, [mainContext.listItemsMcDonalds])

    const addToCart = useCallback((event) => {
        const idItem = event.target.dataset.id 

        const checkIdCart = checkItemById(mainContext.cart, idItem)

        if(checkIdCart !== undefined){  
            checkIdCart.count = +checkIdCart.count + 1

            const updArrCart = [...mainContext.cart]

            mainContext.setCartState(updArrCart)

            APIServices.addToCart(updArrCart)

            return
        }

        const checkId = checkItemById(mainContext.listItemsMcDonalds, idItem)

        const newCart = [...mainContext.cart, checkId]

        mainContext.setCartState(newCart)

        APIServices.addToCart(newCart)

    } ,[mainContext.listItemsMcDonalds])


    const listItemsRender = mainContext.listItemsMcDonalds.map((item) => 
        <ul className="shop-section_list" key={item.id}>
            <li>
                <img className="shop-section_item-img"  src={item.img}></img>
                <div className="shop-section">{item.title}</div>
                <div className="shop-section">{item.price}</div>
                <button className="shop-section_item-btn" data-id={item.id} onClick={addToCart}>Add to cart</button>
            </li>
        </ul>
    )

    return(
        <section className="shop-section">
            {listItemsRender}
        </section>
    )
}

export default McDonalds