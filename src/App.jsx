import "bootstrap/scss/bootstrap.scss";
import { useEffect } from "react";
import { useState } from "react";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Orders from "./components/Order";
const data = [
  {
    id: 1,
    name: "珍珠奶茶",
    description: "香濃奶茶搭配QQ珍珠",
    price: 50,
  },
  {
    id: 2,
    name: "冬瓜檸檬",
    description: "清新冬瓜配上新鮮檸檬",
    price: 45,
  },
  {
    id: 3,
    name: "翡翠檸檬",
    description: "綠茶與檸檬的完美結合",
    price: 55,
  },
  {
    id: 4,
    name: "四季春茶",
    description: "香醇四季春茶，回甘無比",
    price: 45,
  },
  {
    id: 5,
    name: "阿薩姆奶茶",
    description: "阿薩姆紅茶搭配香醇鮮奶",
    price: 50,
  },
  {
    id: 6,
    name: "檸檬冰茶",
    description: "檸檬與冰茶的清新組合",
    price: 45,
  },
  {
    id: 7,
    name: "芒果綠茶",
    description: "芒果與綠茶的獨特風味",
    price: 55,
  },
  {
    id: 8,
    name: "抹茶拿鐵",
    description: "抹茶與鮮奶的絕配",
    price: 60,
  },
];

function HomeWork() {
  const [drinks] = useState(data); // 原始data
  const [cart, setCart] = useState([]); // 購物車資料
  const [sum, setSum] = useState(0); // 總計
  const [description, setDescription] = useState(""); // 備註
  const [order, setOrder] = useState({}); // 訂單

  // const addToCart = (drink) => {
  //   setCart([
  //     ...cart,
  //     {
  //       ...drink,
  //       id: new Date().getTime(),
  //       quantity: 1,
  //       subtotal: drink.price,
  //     },
  //   ]);
  // };

  const addToCart = (item) => {
    const conformIndex = cart.findIndex((cartItem) => item.id === cartItem.id);

    if (conformIndex === -1) {
      // 商品不存在於購物車中
      const tempCart = [
        ...cart,
        {
          ...item,
          quantity: 1, // 數量預設為 1
          subtotal: item.price,
        },
      ];
      setCart(tempCart);
    } else {
      // 商品已經存在於購物車中
      const tempCart = cart.map((cartItem) => {
        return item.id === cartItem.id
          ? {
              ...cartItem,
              quantity:
                cartItem.quantity < 10
                  ? cartItem.quantity + 1
                  : cartItem.quantity,
              subtotal: cartItem.price * (cartItem.quantity + 1), // 根據數量計算 subtotal
            }
          : { ...cartItem };
      });
      setCart(tempCart);
    }
  };

  const updateCart = (item, value) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: parseInt(value),
          subtotal: cartItem.price * parseInt(value),
        };
      }
      return cartItem;
    });
    setCart(newCart);
  };

  const createOrder = () => {
    setOrder({
      id: new Date().getTime(),
      cart,
      description,
      sum,
    });
    setCart([]);
    setDescription("");
  };

  useEffect(() => {
    const total = cart.reduce((pre, next) => {
      return pre + next.subtotal;
    }, 0);
    setSum(total);
  }, [cart]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <Products drinks={drinks} addToCart={addToCart} />
        </div>
        <Cart
          cart={cart}
          setCart={setCart}
          updateCart={updateCart}
          createOrder={createOrder}
          sum={sum}
          setDescription={setDescription}
        />
      </div>
      <hr />
      <div className="row justify-content-center">
        <div className="col-8">
          <Orders order={order} setOrder={setOrder} />
        </div>
      </div>
    </div>
  );
}

export default HomeWork;
