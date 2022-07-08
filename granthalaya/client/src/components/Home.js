import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import axios from "axios";
import home from "../assets/hs1.jpg";

const Home = ({ data, addToCart }) => {
  return (
    <>
     <img src={home} className="homeImage" />
      <hr />
      <h2 style={{ textAlign: "center" }}> Available Books</h2>
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
                  {item.description.length > 120
                    ? item.description.substr(0, 119) + " ..."
                    : item.description}
                </p>
                <h6 style={{ color: "green" }}>20% OFF</h6>
                <h5 style={{ fontWeight: "bold" }}>{item.price} Rs.</h5>
                {localStorage.getItem("user") && (
                  <button type="submit" onClick={() => addToCart(item._id)}>
                    ADD TO CART
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

export default Home;
