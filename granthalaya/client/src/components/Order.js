import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let Obj = JSON.parse(localStorage.getItem("seller"));
    const id = Obj._id;
    console.log(id);
    axios
      .post("/order", {
        id: id,
      })
      .then(function (response) {
        console.log(response.data.order);
        setData(response.data.order);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        console.log(data);
      });
  }, []);

  const acceptOrder = (id) => {
    let order = data.filter((bookOrder) => {
      return bookOrder._id == id;
    });
    let currseller = JSON.parse(localStorage.getItem("seller"));
    let _id = currseller._id;
    axios
      .put("/selectorder", {
        _id: _id,
        order: order,
      })
      .then(function (response) {
        console.log(response.data.order);
        setData(response.data.order);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        console.log(data);
      });
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Pending Orders</h2>
      <div className="main-container">
        {data.map((item) => {
          return (
            <div className="container" key={item._id}>
              <div className="header">
                <img src={item.image} alt="default img" />
              </div>
              <div className="content">
                <h4 style={{ fontWeight: "bold" }}>{item.title}</h4>
                <h6 style={{ fontWeight: "bold" }}>{item.category}</h6>
                <p>
                  Name : {item.firstName} {item.lastName}
                </p>
                <p>Email : {item.email}</p>
                <p>Address : {item.address}</p>
                <h6 style={{ color: "green" }}>20% OFF</h6>
                <h5 style={{ fontWeight: "bold" }}>{item.price} Rs.</h5>
                {localStorage.getItem("seller") && (
                  <button type="submit" onClick={() => acceptOrder(item._id)}>
                    Accept Order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Order;
