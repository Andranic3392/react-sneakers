import axios from 'axios';
import Card from '../components/Card'
import React from 'react';

const Orders = () => {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async() => {
            try {
                const { data } = await axios.get('http://localhost:3001/orders/');
                // setOrders(data.map((obj) => obj.items).flat())
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false);
            } catch (error){
                alert("Произошла ошибка при загрузке заказов");
            }
        })()
    }, []);

    return ( 
        <div className="content p-40">
        {/* <div className="d-flex align-center justify-between mb-40" ></div> */}
        <h1>Мои заказы</h1>
        <div className="d-flex flex-wrap mt-30" >
          {(isLoading ? [...Array(12)] : orders).map((item, price) => (
            <Card
            key={price} 
            loading={isLoading}
            {...item}
            />
          ))}
        </div>
      </div>
     );
}
 
export default Orders;