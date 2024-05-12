import Card from '../components/Card'
import AppContext from '../context';
import React from 'react';

const Favorites = () => {

  const {favorites, onAddToFavorite} = React.useContext(AppContext);

    return ( 
        <div className="content p-40">
        {/* <div className="d-flex align-center justify-between mb-40" ></div> */}
        <h1>Мои закладки</h1>
        <div className="d-flex flex-wrap mt-30" >
        {
          favorites.map((item, price) => (
            <Card
            key={price}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}
            />
          ))
        }
        </div>
      </div>
     );
}
 
export default Favorites;