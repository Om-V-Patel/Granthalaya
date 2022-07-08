import React from "react";
import { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
import Logo from "../assets/logo3.jpg";
import om from "../assets/logo1.jpg"
const Navbar = ({ data, addToCart, user, setUser, seller, setseller }) => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [bookDetails, setBookDetails] = useState([]);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const renderList = () => {
    if (user || seller) {
      return [
        <li key="6">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: "black", cursor: "pointer" }}
          >
            search
          </i>
        </li>,
        <li key="7">
          <Link exact to="/cart">
            <i className="material-icons">shopping_cart</i>
          </Link>
        </li>,
        <li key="8">
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.removeItem("jwt");
              localStorage.removeItem("user");
              localStorage.removeItem("seller");
              history.push("/");
              setUser("");
              setseller("");
              M.toast({
                html: "You are Logged Out",
                classes: "#c62828 red darken-3",
              });
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
      
        <li key="1">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: "black" }}
          >
            search
          </i>
        </li>,
        <li key="2">
          <Link to="/signin">Signin as User</Link>
        </li>,
        <li key="3">
          <Link to="/signup">SignUp as User</Link>
        </li>,
        <li key="4">
          <Link to="/signinseller">Signin as seller</Link>
        </li>,
        <li key="5">
          <Link to="/signupseller">SignUp as seller</Link>
        </li>,
      ];
    }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-books", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setBookDetails(results.book);
      });
  };

  return (
    <nav>
      <div className="nav-wrapper white">
      
        <Link to="/" className="brand-logo left">
          <ul>
          <li>
          
          <img className="style" src={Logo} width="100" alt="E-Book-Sale" />

          </li>
          <li>
          <p style={{ height:"fit-content",margin:"0px", color:"SpringGreen"}}> welcome to ગ્રંથાલય</p>
          </li>
          <li>
          <img className="style" src={om} width="100"  alt="E-Book-Sale" />
          </li>
          </ul>
        </Link>
  
        <ul id="nav-mobile" className="right">
      
          {renderList()}
        </ul>
        
      </div>
    
      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <input
            type="text"
            placeholder="Search Books"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {bookDetails.map((item) => {
              return (
                <div
                  // to={"/book/" + item._id}
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                  }}
                >
                  <div className="collection-item">
                    <p>{item.title}</p>
                    {localStorage.getItem("user") && (
                      <button onClick={() => addToCart(item._id)}>
                        ADD TO CART
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch("")}
          >
            close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
