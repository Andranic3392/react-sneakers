import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';



function App() {

  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setsearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    fetch('https://6632d3e6f7d50bbd9b4775c1.mockapi.io/items').then((res) => {
    return res.json()
  }).then(json => {
    setItems(json)
  });
  }, []);

  const onAddToCart = (obj) =>{
    setCartItems(prev =>[...prev, obj])
  }

  return (
    <div className="wrapper clear">
      
      { cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}

      <Header onClickCart={() => setCartOpened(true)}/>
      
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40" >
        <h1>Все кроссовки</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="search" />
          <input placeholder="Поиск..." />
        </div>
        </div>
        
        <div className="d-flex flex-wrap" >
        {
          items.map((item, price) => (
            <Card
            key={price} 
            title={item.title} 
            price={item.price} 
            imageUrl={item.imageUrl} 
            onFavorite={() => console.log('Добавили в закладки')} 
            onPlus={(obj) => onAddToCart(obj)} />
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default App;
