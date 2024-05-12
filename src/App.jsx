import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import axios from 'axios';
import Home from './pages/Home'
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import { Route, Routes } from "react-router-dom"
import AppContext from './context';

function App() {

  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try{
      const cartResponse = await axios.get('http://localhost:3001/cart/');
      const favoritesResponse = await axios.get('http://localhost:3001/favorites/');
      const itemsResponse = await axios.get('http://localhost:3001/items/');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
      } catch (error) {
        alert("Произошла ошибка при загрузке данных");
      }
  }
  fetchData();
  }, []);

  const onAddToFavorite = async (obj) => {
    try{
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        const {data} = await axios.post('http://localhost:3001/favorites/', obj);
        setFavorites(prev =>[...prev, data]);
      };
    } catch (error){
      alert("Произошла ошибка при добавлении/удалении из закладок");
    }
  }

  const onAddToCart = (obj) =>{
    try{
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
      } else {
        axios.post('http://localhost:3001/cart/', obj);
        setCartItems((prev) => [...prev, obj])
      }
    } catch (error) {
      alert("Произошла ошибка при добавлении/удалении из корзины");
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart}}>
      <div className="wrapper clear">
      <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />

      <Header onClickCart={() => setCartOpened(true)}/>
      
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue} 
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
          exact
        />
      </Routes>

      <Routes>
        <Route
          path="/Favorites"
          element={
            <Favorites
            // items={favorites}
            
            />
          }
          exact
        />
      </Routes>

      <Routes>
        <Route
          path="/Orders"
          element={
            <Orders />
          }
          exact
        />
      </Routes>
      
    </div>
    </AppContext.Provider>
  );
}

export default App;
