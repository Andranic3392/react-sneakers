import styles from './Card.module.scss';
import React from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

const Card = ({id, title, loading = false, price, imageUrl, onFavorite, onPlus, favorited = false}) => {
  const [isFavorite, setIsFavorite] = React.useState(favorited)
  const {isItemAdded} = React.useContext(AppContext);

  const onClickPlus = () => {
    onPlus({id, title, imageUrl, price});
  }

  const onClickFavorite = () => {
    onFavorite({id, title, imageUrl, price});
    setIsFavorite(!isFavorite)
  }

    return ( 
        <div className={styles.card}>
          {
            loading ? (
              <ContentLoader 
              speed={4}
              width={160}
              height={190}
              viewBox="0 0 160 190"
              backgroundColor="#dbdbdb"
              foregroundColor="#ffffff"
                // {...props}
                >
                <rect x="2" y="111" rx="3" ry="3" width="150" height="15" /> 
                <rect x="3" y="130" rx="3" ry="3" width="93" height="15" /> 
                <rect x="3" y="167" rx="8" ry="8" width="80" height="24" /> 
                <rect x="115" y="159" rx="8" ry="8" width="32" height="32" /> 
                <rect x="2" y="4" rx="10" ry="10" width="150" height="91" />
              </ContentLoader>
            ) : (
              <>
              {onFavorite && (<div className={styles.favorite} onClick={onClickFavorite} >
          <img src={isFavorite ? "/img/heartli2.svg" : "/img/heartun.svg"} alt="unlicked" />
          </div>)}
          <img width={133} height={112} src={imageUrl} alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center" >
            <div className="d-flex flex-column " >
              <span>Цена: </span>
              <b>{price} руб. </b>
            </div>
            <div  >
              {onPlus && (<img 
              className={styles.plus} 
              onClick={onClickPlus} 
              src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-add.svg"} 
              alt="addbutton" />)}
            </div>
          </div>
              </>
            )
          }
          
        </div>
     );
}
 
export default Card;