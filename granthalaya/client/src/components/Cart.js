import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";

const Cart = ({
  cart,
  addToCart,
  removeBook,
  incrementCount,
  decrementCount,
  setCart,
  setOriginalData,
}) => {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [sellers, setSellers] = useState([]);

  const history = useHistory();

  const Order = (_id) => {
    let Obj = JSON.parse(localStorage.getItem("user"));
    const idofUser = Obj._id;

    let information = [];
    axios
      .post("/getaddress", {
        _id: idofUser,
      })
      .then((response) => {
        // console.log(response.data);

        data.map((book) => {
          let temp = book;
          temp.email = response.data.email;
          temp.firstName = response.data.firstName;
          temp.lastName = response.data.lastName;
          temp.address = response.data.address;

          information.push(temp);
        });
        console.log(information);

        axios
          .put("/saveorder", {
            _id: _id,
            order: information,
          })
          .then(function (response) {
            console.log(response.data.order);
            // setData(response.data.order);
            setSellers([]);
            M.toast({
              html: "Place Order successfully",
              classes: "#43a047 green darken-1",
            });
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // console.log(data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadSellers = () => {
    axios
      .get("/allsellers")
      .then(function (response) {
        console.log(response.data.sellers);
        setSellers(response.data.sellers);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // console.log(data);
      });
  };

  useEffect(() => {
    setData(cart);
  }, []);

  useEffect(() => {
    setData(cart);
  }, [cart]);

  useEffect(() => {
    let answer = 0;
    data.map((item) => [
      (answer += parseInt(item.price) * parseInt(item.count)),
    ]);
    setAmount(answer);
  }, [data]);

  return (
    <div style={{ width: "70%", margin: "10px auto" }}>
      {!localStorage.getItem("user") || localStorage.getItem("seller") ? (
        <div>
          <h1>You need to be login as a User to access</h1>
          <Link exact to="/signin">
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
              Sign In User
            </button>
          </Link>
          <Link exact to="/signinseller">
            <button className="btn waves-effect waves-light #64b5f6 green darken-1">
              Sign In Seller
            </button>
          </Link>
          <Link exact to={localStorage.getItem("seller") ? "/order" : "/"}>
            <button className="btn waves-effect waves-light #64b5f6 black darken-1">
              Home Page
            </button>
          </Link>
          <br />
          <hr />
          <h3>Create an account by below Link if you don't have an account</h3>
          <Link exact to="/signup">
            <button className="btn waves-effect waves-light ">
              Sign up User
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h5>
            Amount is -{" "}
            <span style={{ color: "maroon", fontWeight: "bold" }}>
              {amount} Rs.
            </span>
          </h5>
          <button
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
            style={{ marginBottom: "10px" }}
            onClick={() => {
              // setCart([]);
              // console.log(cart);
              // setData([]);
              // console.log(data);
              setOriginalData();
            }}
          >
            Clear Cart
          </button>
          {data.map((item) => {
            return (
              <div className="parent" key={item._id}>
                <div className="left">
                  <img src={item.image} />
                </div>
                <div className="middle">
                  <h5 style={{ fontWeight: "bold" }}>{item.title}</h5>
                  <p>{item.category}</p>
                  <i
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: "mediumvioletred",
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                    className="material-icons"
                    onClick={() => incrementCount(item._id)}
                  >
                    add
                  </i>
                  <p className="count">{item.count}</p>
                  <i
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: "mediumvioletred",
                      marginLeft: "8px",
                      cursor: "pointer",
                    }}
                    className="material-icons"
                    onClick={() => decrementCount(item._id)}
                  >
                    remove
                  </i>
                </div>
                <div className="right">
                  <h5 style={{ fontWeight: "bold" }}>{item.price} Rs.</h5>
                  <p>50% off</p>
                  <a
                    className="waves-effect waves-light btn"
                    style={{ marginRight: "5px", cursor: "pointer" }}
                    onClick={() => removeBook(item._id)}
                  >
                    Remove
                  </a>
                </div>
              </div>
            );
          })}
          <div className="row">
            {sellers.map((seller) => {
              return (
                <div
                  key={seller._id}
                  onClick={() => Order(seller._id)}
                  className="Hover col s12"
                  style={{
                    backgroundColor: "lightgrey",
                    borderBottom: "2px solid black",
                    margin: "4px",
                    cursor: "pointer",
                  }}
                >
                  {seller.firstName}
                </div>
              );
            })}
          </div>
          <a
            className="waves-effect waves-light btn"
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => loadSellers()}
          >
            Place Order
          </a>
        </div>
      )}
    </div>
  );
};

export default Cart;
