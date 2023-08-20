import { useState } from 'react'
import NavBar from "./NavBar.jsx"
import Products from "./Products.jsx"
import Cart from "./Cart.jsx"
import Orders from "./Orders.jsx"
const initiadata = [
  {
    "id": 1,
    "name": "珍珠奶茶",
    "description": "香濃奶茶搭配QQ珍珠",
    "price": 50,
    "imageUrl": "https://images.unsplash.com/photo-1592318730259-6f18a6ba1c29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=707&q=80",
  },
  {
    "id": 2,
    "name": "冬瓜檸檬",
    "description": "清新冬瓜配上新鮮檸檬",
    "price": 45,
    "imageUrl": "https://images.unsplash.com/photo-1599390719602-2874f553a716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",

  },
  {
    "id": 3,
    "name": "翡翠檸檬",
    "description": "綠茶與檸檬的完美結合",
    "price": 55,
    "imageUrl": "https://images.unsplash.com/photo-1555949366-819808d99159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    "id": 4,
    "name": "四季春茶",
    "description": "香醇四季春茶，回甘無比",
    "price": 45,
    "imageUrl": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    "id": 5,
    "name": "阿薩姆奶茶",
    "description": "阿薩姆紅茶搭配香醇鮮奶",
    "price": 50,
    "imageUrl": "https://images.unsplash.com/photo-1588345924941-02939d2753f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80",
  },
  {
    "id": 6,
    "name": "檸檬冰茶",
    "description": "檸檬與冰茶的清新組合",
    "price": 45,
    "imageUrl": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
  {
    "id": 7,
    "name": "芒果綠茶",
    "description": "芒果與綠茶的獨特風味",
    "price": 55,
    "imageUrl": "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    "id": 8,
    "name": "抹茶拿鐵",
    "description": "抹茶與鮮奶的絕配",
    "price": 60,
    "imageUrl": "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
  }
]
function App() {
  const [data, setData] = useState(initiadata);
  const [carts, setCarts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const sunTotal = (data) => data.map((item) => item.qty * item.price).reduce((arr, cur) => arr + cur,0); //計算總金額
  const addCarts = (value) => { // 新增購物車
    const currentCart = carts.find((item) => item.id === value.id);
    if(currentCart) {
      const checkList = carts.map((item) => item.id === value.id && item.qty <=9 ? {...item,qty:(item.qty += value.qty)} : item);
      setCarts(checkList);
      setTotal(sunTotal(checkList));
      setTimeout(() => {
      },1000);
    } else {
      setCarts([...carts, value]);
      setTotal(sunTotal([...carts, value]));
    }
  }
  const upCartsQty = (value) => { // 更新數量
    const newList = carts.map((item) => item.id === value.id ? {...item, qty:value.qty} : item);
    setCarts(newList);
    setTotal(sunTotal(newList));
  }

  const deleteCart = (value) => { //刪除購物車項目
    const newData = carts.filter((item) => {
      return item.id !== value.id
    });
    setCarts(newData);
    setTotal(sunTotal(newData));
  }
  const createOrders = (value) => { // 新增訂單
    setOrders([...orders, ...value]);
    setTotal(0);
    setCarts([]);
  }
  return (
    <>
    <div className="container mt-5">
      <NavBar>
        <Cart data={carts} menuTotal={total} upCartsQty={upCartsQty} deleteCart={deleteCart} createOrders={createOrders}/>
      </NavBar>
      < Products data={data} addCarts={addCarts}/>
      <Orders data={orders}/>
    </div>
    </>
  )
}

export default App
