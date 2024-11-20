import React, { useContext, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { authContext } from "../../Contexts/AuthContext";
import { cartContext } from "../../Contexts/CartContext";

export default function Navbar() {

  const {setUserIsLoggedIn,userIsLoggedIn} = useContext(authContext);
  const {cart} = useContext(cartContext);
  console.log(cart)

  const [pathName, setPathName] = useState(window.location.pathname);
  const navigate = useNavigate()

  function logOut(){
    setUserIsLoggedIn(false)
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary w-100  ">
        <div className="container">
          <Link  onClick={() => {
                    setPathName("/home");
                  }} to={'/home'} className="navbar-brand">
            <img src={logo} alt="fresh-cart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
           {userIsLoggedIn && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  onClick={() => {
                    setPathName("/");
                  }}
                  className={pathName == "/" ? "nav-link active" : "nav-link"}
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => {
                    setPathName("/cart");
                  }}
                  className={
                    pathName == "/cart" ? "nav-link active" : "nav-link"
                  }
                  to={"/cart"}
                >
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => {
                    setPathName("/products");
                  }}
                  className={
                    pathName == "/products" ? "nav-link active" : "nav-link"
                  }
                  to={"/products"}
                >
                  Products
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  onClick={() => {
                    setPathName("/categories");
                  }}
                  className={
                    pathName == "/categories" ? "nav-link active" : "nav-link"
                  }
                  to={"/categories"}
                >
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => {
                    setPathName("/brands");
                  }}
                  className={
                    pathName == "/brands" ? "nav-link active" : "nav-link"
                  }
                  to={"/brands"}
                >
                  Brands
                </Link>
              </li> */}
              <li className="nav-item">
                <Link
                  onClick={() => {
                    setPathName("/allorders");
                  }}
                  className={
                    pathName == "/allorders" ? "nav-link active" : "nav-link"
                  }
                  to={"/allorders"}
                >
                  Orders
                </Link>
              </li>
            </ul>}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
              <i class="fa-solid fa-cart-shopping me-5 fs-2 position-relative" >
                <span className="position-absolute top-0 start-100 translate-middle fs-6 p-1 text-white rounded-circle bg-success">{cart?.numOfCartItems || 0}</span>
              </i>
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-youtube"></i>
                <i className="fab mx-2 fa-tiktok"></i>
              </li>
              
             
              {userIsLoggedIn? <li className="nav-item">
                <Link onClick={logOut} 
                    className="nav-link"
                   >Logout</Link>
              </li>
              :

<>
                <li className="nav-item">
                  <Link
                    onClick={() => {
                      setPathName("/login");
                    }}
                    className="nav-link"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    onClick={() => {
                      setPathName("/register");
                    }}
                    className="nav-link"
                    to={"/register"}
                  >
                    Register
                  </Link>
                </li>
              </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
