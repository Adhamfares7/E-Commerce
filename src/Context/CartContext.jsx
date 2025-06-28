import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };
  const [cartId, setcartId] = useState(0);
  const [cartNum, setcartNum] = useState(0);
  function addProductToCard(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function deletProductitem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setcartId(res.data.data._id);
        setcartNum(res.data.numOfCartItems);
        
        return res})
      .catch((err) => err);
  }
  function checkout(cartID, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${url}`,
        {shippingAddress : formData},{headers}
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function updateCartProduct(productid, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
useEffect(()=>{
    getLoggedUserCart()
},[])
  return (
    <CartContext.Provider
      value={{
        updateCartProduct,
        deletProductitem,
        addProductToCard,
        getLoggedUserCart,
        checkout,
        cartId,
        setcartNum,
        cartNum,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
