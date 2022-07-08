import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import NavBar from "./components/Navbar";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import M from "materialize-css";
import SignUpSeller from "./components/SignUpSeller";
import SignInSeller from "./components/SignInSeller";
import Order from "./components/Order";

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState("");
  const [seller, setseller] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const currentCart = JSON.parse(localStorage.getItem("cart"));
      setCart(currentCart);
    }
    if (localStorage.getItem("user")) {
      const currUser = JSON.parse(localStorage.getItem("user"));
      setUser(currUser);
    }
    if (localStorage.getItem("seller")) {
      const currseller = JSON.parse(localStorage.getItem("seller"));
      setUser(currseller);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    axios
      .get("/allbooks")
      .then(function (response) {
        // console.log(response.data.books);
        setData(response.data.books);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // console.log(data);
      });
  }, []);

  const addToCart = (id) => {
    let Obj = data.filter((item) => {
      return item._id == id;
    });
    // console.log(Obj[0]);
    if (cart.indexOf(Obj[0]) != -1) {
      incrementCount(id);
    } else {
      const cartItems = data.filter((item) => {
        return item._id == id;
      });

      cartItems.map((item) => {
        setCart([...cart, item]);
      });
    }
    M.toast({
      html: "Successfully Added in Cart",
      classes: "#43a047 green darken-1",
    });
  };

  const removeBook = (id) => {
    const newState = cart.filter((item) => {
      return item._id != id;
    });

    // should turn the count of the remove item to 0
    let newObj = data.filter((item) => {
      return item._id == id;
    });

    let index = data.indexOf(newObj[0]);

    let newData = data.filter((item) => {
      return item._id != id;
    });
    newObj[0].count = 1;

    newData.splice(index, 0, newObj[0]);

    setData(newData);

    setCart(newState);
  };

  const incrementCount = (id) => {
    let newObj = cart.filter((item) => {
      return item._id == id;
    });

    let index = cart.indexOf(newObj[0]);

    let newState = cart.filter((item) => {
      return item._id != id;
    });
    newObj[0].count += 1;

    newState.splice(index, 0, newObj[0]);

    setCart(newState);
  };

  const decrementCount = (id) => {
    let newObj = cart.filter((item) => {
      return item._id == id;
    });

    let index = cart.indexOf(newObj[0]);

    let newState = cart.filter((item) => {
      return item._id != id;
    });
    newObj[0].count -= 1;

    if (newObj[0].count == 0) {
      removeBook(id);
      return;
    }

    newState.splice(index, 0, newObj[0]);

    setCart(newState);
  };

  const setOriginalData = () => {
    data.map((item) => {
      removeBook(item._id);
    });
    // console.log(data);
    setCart([]);
  };

  return (
    <BrowserRouter>
      <NavBar
        data={data}
        addToCart={addToCart}
        user={user}
        setUser={setUser}
        seller={seller}
        setseller={setseller}
      />
      <Switch>
        <Route exact path="/">
          <Home data={data} addToCart={addToCart} />
        </Route>
        <Route  path="/cart">
          <Cart
            cart={cart}
            removeBook={removeBook}
            incrementCount={incrementCount}
            decrementCount={decrementCount}
            setCart={setCart}
            setOriginalData={setOriginalData}
          />
        </Route>
        <Route  path="/signin">
          <SignIn user={user} setUser={setUser} />
        </Route>
        <Route  path="/signup">
          <SignUp />
        </Route>
        <Route  path="/signinseller">
          <SignInSeller seller={seller} setseller={setseller} />
        </Route>
        <Route  path="/signupseller">
          <SignUpSeller />
        </Route>
        <Route  path="/order">
          <Order />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
