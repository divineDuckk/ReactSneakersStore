import Header from "./components/Header";
import Cart from "./components/Cart";
import React from "react";
import axios from "axios";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Orders from "./pages/Orders";
import { Route, Routes } from "react-router-dom";

function App() {
  const [sneakersList, setSneakersList] = React.useState([]);
  const [favoriteList, setFavList] = React.useState([]);
  const [cartList, setCartList] = React.useState([]);
  const [isCartOpen, setCartOpen] = React.useState(false);
  const [isFavOpen, setFavOpen] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [orderList, setOrderList] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartItem = await axios.get(
        "https://64f1e1720e1e60602d2465f0.mockapi.io/cartItems"
      );
      const sneakers = await axios.get(
        "https://64f1e1720e1e60602d2465f0.mockapi.io/sneakerItems"
      );

      setIsLoading(false);
      setCartList(cartItem.data);
      setSneakersList(sneakers.data);
    }
    fetchData();
  }, []);
  const clearCart = () => {
    setCartList([]);
  };
  const delayRequest = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  const addToOrderList = (compCartList) => {
    console.log(compCartList);
    compCartList.forEach((item) => {
      console.log(item.index);
      delayRequest(1000).then(
        axios.delete(
          `https://64f1e1720e1e60602d2465f0.mockapi.io/cartItems/${item.index}`
        )
      );
    });
    setOrderList((prev) => [...prev, ...compCartList]);
  };
  const checkObjDuplicates = (arr, obj) => {
    return arr.some((item) => {
      return item.id == obj.id;
    });
  };

  const addToCart = async (obj) => {
    obj.index = cartList.length + 1;
    //console.log(obj.index);

    try {
      if (!checkObjDuplicates(cartList, obj)) {
        await axios.post(
          "https://64f1e1720e1e60602d2465f0.mockapi.io/cartItems",
          obj
        );

        setCartList((prev) => [...prev, obj]);

        return;
      }

      obj.index -= 1;
      await axios.delete(
        `https://64f1e1720e1e60602d2465f0.mockapi.io/cartItems/${obj.index}`
      );
      setCartList((prev) => prev.filter((item) => item.id != obj.id));
    } catch (err) {
      console.log(err);
    }
  };
  const addToFav = (obj) => {
    if (checkObjDuplicates(favoriteList, obj)) {
      setFavList((prev) => prev.filter((item) => item.id != obj.id));
    } else {
      setFavList((prev) => [...prev, obj]);
    }
  };
  const deleteFromCart = (index, id) => {
    try {
      axios.delete(
        `https://64f1e1720e1e60602d2465f0.mockapi.io/cartItems/${index}`
      );
      setCartList((prev) => prev.filter((item) => item.id != id));
    } catch (err) {
      console.log(err);
    }
  };
  const onSearchValChange = (e) => {
    setSearchVal(e.target.value);
  };
  const onClickFav = () => {
    setFavOpen(true);
  };

  const handleCartOpen = (isCartOpen) => () => {
    isCartOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
    setCartOpen(isCartOpen);
  };
  const calcPrice = () => {
    if (cartList.length > 0)
      return cartList.reduce((sum, item) => sum + item.coast, 0);
    return 0;
  };
  return (
    <div className="wrapper">
      <Cart
        onClose={handleCartOpen(false)}
        cartItems={cartList}
        onDelete={deleteFromCart}
        price={calcPrice()}
        clearCart={clearCart}
        addToOrderList={addToOrderList}
        isCartOpen={isCartOpen}
      />

      <Header
        onClickFav={onClickFav}
        onCartClick={handleCartOpen(true)}
        price={calcPrice()}
      />

      <Routes>
        <Route
          path="/favorites"
          element={
            <Favorite
              favoriteList={favoriteList}
              addToCart={addToCart}
              addToFav={addToFav}
              isFavOpen={true}
            />
          }
        />
        <Route
          path="/ReactSneakersStore"
          element={
            <Home
              searchVal={searchVal}
              onSearchValChange={onSearchValChange}
              sneakersList={sneakersList}
              addToCart={addToCart}
              addToFav={addToFav}
              isFavOpen={false}
              cartList={cartList}
              isLoading={isLoading}
              favoriteList={favoriteList}
            />
          }
        />
        <Route
          path="/orders"
          element={
            <Orders
              orderList={orderList}
              addToCart={addToCart}
              addToFav={addToFav}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
