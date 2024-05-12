import { Link } from "react-router-dom"
import React from 'react'
import AppContext from '../context'

const Header = (props) => {

  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

    return ( 
        <header className="d-flex justify-between align-center p-40" >
        
        <Link to="/">
        <div className="d-flex align-center" >
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase" >React Sneakers</h3>
            <p className="opacity-5" >Магазин лучших кроссовок</p>
          </div>
        </div>
          </Link>

          <ul className="d-flex" >
            <li onClick={props.onClickCart} className="mr-30 cu-p">
              <img width={18} height={18} src="/img/cart.svg" alt="cart" /> 
            <span>{totalPrice} руб</span> </li>

            <Link to="/favorites">
            <li className="mr-30 cu-p">
              <img width={18} height={18} src="/img/favorite.svg" alt="favorite" /> 
            <span>Закладки</span> </li>
            </Link>
            
            <Link to="/orders">
            <li> 
              <img width={18} height={18} src="/img/user.svg" alt="user" />
              <span>Профиль</span> </li>
            </Link>
          </ul>
      </header>
     );
}
 
export default Header;