import React from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import Products from "./../Products/Products";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/cartContext";

export default function Navbar() {
  let { UserLogin , setUserLogin  } = useContext(UserContext);
 let {cartNum} = useContext(CartContext)
  let navigate = useNavigate()

  function Signout(){
    localStorage.removeItem("userToken")
    setUserLogin(null)
    navigate("/E-Commerce/login")
  }
  return (
    <>
      <nav className=" bg-emerald-600 text-white z-50 fixed top-0 left-0 right-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center gap-3 justify-center lg:justify-between mx-auto p-4">
          <div className=" flex items-center gap-5">
            <Link
              to="/E-Commerce/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <i className="fa-solid fa-cart-shopping text-3xl"></i>
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Dawsha Store
              </span>
            </Link>
            {UserLogin != null ? (
              <>
                <ul className=" flex gap-3">
                  <li>
                    <Link className=" text-white" to="">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className=" text-white relative" to="cart">
                      Cart 
                      {cartNum == 0 ? null : <div className="absolute top-[-15px] right-[-15px] bg-red-600 px-2 rounded-full"> {cartNum}</div>
                    }
                    </Link>
                  </li>
                  <li>
                    <Link className=" text-white" to="products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className=" text-white" to="categroies">
                      Categroies
                    </Link>
                  </li>
                  <li>
                    <Link className=" text-white" to="brands">
                      Brands
                    </Link>
                  </li>
                </ul>
              </>
            ) : null}
          </div>

          <div className=" flex items-center space-x-6 rtl:space-x-reverse">
            <ul className=" flex gap-3">
              <li>
                <i className=" fab fa-facebook"></i>
              </li>
              <li>
                <i className=" fab fa-youtube"></i>
              </li>
              <li>
                <i className=" fab fa-instagram"></i>
              </li>
              <li>
                <i className=" fab fa-linkedin"></i>
              </li>
              <li>
                <i className=" fab fa-twitter"></i>
              </li>
            </ul>
            <ul className=" flex gap-3">
              {UserLogin != null ? (
                <>
                  
                  <span onClick={Signout} className=" cursor-pointer">Signout </span>
                </>
              ) : (
                <>
                  
                  <li>
                    <Link to="/E-Commerce/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/E-Commerce/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
