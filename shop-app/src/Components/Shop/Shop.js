import {Route, Routes, Link, Outlet, Navigate } from 'react-router-dom';
import McDonalds from '../McDonalds/McDonalds';
import { useContext, useEffect, useState } from 'react';
import APIServices from '../../Services/APIServices';
import { MainContext } from '../../App';

const Shop = () => {

    const mainContext = useContext(MainContext)


    useEffect(() => {

        APIServices.getShopList()
            .then(list => mainContext.setListShopsState(list.shops))
    }, [mainContext.listShops])


    const listShopsRender = mainContext.listShops.map((item, index) => 
        <ul key={index}>
            <li className='menu-item_li'>
                <Link className="menu-item" to={item.url}>{item.title}</Link>
            </li>
        </ul>
    )

    return(
        <section className='shop'>
            <nav className='shop-nav'>
                <ul>
                   {listShopsRender}
                </ul>
            </nav>

            <Outlet></Outlet>

            
        </section>
       
    )
}

export default Shop