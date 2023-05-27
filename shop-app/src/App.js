import { createContext, useCallback, useState } from "react";
import {Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Shop from "./Components/Shop/Shop";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import McDonalds from "./Components/McDonalds/McDonalds";
import KFC from "./Components/KFC/KFC";
import BurgerKing from "./Components/BurgerKing/BurgerKing";

export const MainContext = createContext();


function App() {

  const[listShops, setListShop] = useState([])
  const[listItemsMcDonalds, setListItemsMcDonalds] = useState([])
  const[listItemsKFC, setListItemsKFC] = useState([])
  const[listItemsBurgerKing, setListItemsBurgerKing] = useState([])
  const[cart, setCart] = useState([])

  return (
    <div className="App">
      <MainContext.Provider value={{
        listShops,
        setListShopsState: setListShop,
        listItemsMcDonalds,
        setListItemsMcDonaldsState: setListItemsMcDonalds,
        listItemsKFC,
        setListItemsKFCState: setListItemsKFC,
        listItemsBurgerKing,
        setListItemsBurgerKingState: setListItemsBurgerKing,
        cart,
        setCartState: setCart
      }}>
        <header>
          <nav>
            <ul className="menu">
              <li>
                <Link className="menu-link" to="/">Shop</Link>
              </li>
              <li>
                <Link className="menu-link" to="/cart">Shopping Cart</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Navigate to={'/mc-donalds'} replace/>} />
          <Route path='/' element={<Shop />}>
              <Route path='mc-donalds' element={<McDonalds />}/>
              <Route path='kfc' element={<KFC />}/>
              <Route path='burger-king' element={<BurgerKing />}/>
          </Route>
          <Route path='/cart' element={<ShoppingCart />}></Route>
        </Routes>
      </MainContext.Provider>

    </div>
  );
}

export default App;
