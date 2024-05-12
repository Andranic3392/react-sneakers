import Card from '../components/Card'
import React from 'react';

const Home = ({items, searchValue, setSearchValue, onAddToCart, onAddToFavorite, onChangeSearchInput, isLoading}) => {

  const renderItems = () => {
    const filtredItems = items.filter((item) => 
      item.title.toLowerCase().includes(searchValue.toLowerCase()),);
    return ( isLoading ? [...Array(12)] : filtredItems).map((item, title) => (
        <Card
        key={title} 
        onFavorite={(obj) => onAddToFavorite(obj)} 
        onPlus={(obj) => onAddToCart(obj)}
        // added={isItemAdded(item && item.id)} 
        // есть вопросы   {cartItems.find(cartItem => cartItem.id === item.id)}
        loading={isLoading}
        {...item}
        />
      ))
  
    
  }

    return ( 
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40" >
        <h1>{searchValue ? `Поиск по запросу: " ${searchValue}"` : "Все кроссовки" }</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="search" />
          <input onChange={onChangeSearchInput} placeholder="Поиск..." />
        </div>
        </div>
        
        <div className="d-flex flex-wrap" >
        {
          renderItems()
        }
        </div>
      </div>
     );
}
 
export default Home;