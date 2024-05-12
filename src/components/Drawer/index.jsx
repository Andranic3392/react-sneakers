import '../../index.scss'
import Info from '../Info'
import React from 'react'
import AppContext from '../../context'
import axios from 'axios'
import styles from './Drawer.module.scss';

const Drawer = ({items = [], onClose, onRemove, opened}) => {

  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('http://localhost:3001/orders/', {items: cartItems});
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      cartItems.forEach(item => {
        axios.delete('http://localhost:3001/cart/' + item.id);
      })
    } catch (error) {
      alert("Произошла ошибка при оформлении заказа");
    }
    setIsLoading(false);
  }

    return ( 
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
        <div className={styles.drawer}>

        <h2 className=" d-flex justify-between mb-30" >Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="close" /></h2>
        {
          items.length > 0 ? ( 
          <>
          <div className={styles.items}>
          {
            items.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-20" >
            <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
            <div className="mr-20 flex" >
              <p className="mb-5">{obj.title}</p>
              <b>{obj.price} руб.</b>
            </div>
            <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
          </div>
            ))
          }
          </div> 
          
          <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice + totalPrice / 100 * 5} руб</b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{totalPrice / 100 * 5} руб.</b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton" >Оформить заказ</button>
                </div>
          </>

          ) : (
          <Info title={isOrderComplete ? "Заказ оформлен!" : "Корзина пуста"}
          description={isOrderComplete ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` 
          : "Добавте хотя бы одну пару кроссовок, чтобы сделать заказ."}
          image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"} 
          />
        )}
        </div>
      </div>
     );
}
 
export default Drawer;