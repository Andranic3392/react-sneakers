import styles from './Card.module.scss';
import React from 'react';

const Card = ({title, price, imageUrl, onFavorite, onPlus}) => {
  const [isAdded, setIsAdded] = React.useState(false)

  const onClickPlus = () => {
    onPlus({title, imageUrl, price});
    setIsAdded(!isAdded)
  }

    return ( 
        <div className={styles.card}>
          <div className={styles.favorite} onClick={onFavorite} >
          <img src="/img/heartun.svg" alt="unlicked" />
          </div>
          <img width={133} height={112} src={imageUrl} alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center" >
            <div className="d-flex flex-column " >
              <span>Цена: </span>
              <b>{price} руб. </b>
            </div>
            <div  >
              <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-add.svg"} alt="addbutton" />
            </div>
          </div>
        </div>
     );
}
 
export default Card;