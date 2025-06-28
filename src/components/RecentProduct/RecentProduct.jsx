import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import { CartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";


export default function RecentProduct() {
  
  let { data, isError, error, isLoading } = useProducts();
  let { addProductToCard ,cartNum ,setcartNum } = useContext(CartContext);
  const [loding, setloding] = useState(false);
  const [currentId, setcurrentId] = useState(0);


  async function addToCart(id){
    setcurrentId(id)
    setloding(true)
    let response = await addProductToCard(id)
    console.log(response.data);
    if (response.data.status == "success"){
      setcartNum(cartNum + 1)
    toast.success(response.data.message);
    setloding(false)

    }
    else{
      toast.error(response.data.message);
      setloding(false)


    }
      
    }
      if (isError) {
        return <h3>{error}</h3>;
      }

  if (isLoading) {
    return (
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    );
  }

  // const [Products, setProducts] = useState([]);

  // function getProducts() {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then((res) => {
  //       setProducts(res.data.data);
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <>
      {
        <div className="row">
          {data?.data?.data.map((product) => (
            <div
              key={product.id}
              className=" 2xl:w-1/6 xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 "
            >
              <div className=" product p-2 mx-3">
                <Link
                  to={`/E-Commerce/productdetails/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} className=" w-full" alt="" />
                  <h3 className=" text-emerald-600 text-sm text-start">
                    {product.category.name}
                  </h3>
                  <h3 className=" text-start text-sm ">
                    {product.title.split(" ").slice(0, 2).join(" ")}{" "}
                  </h3>
                  <div className=" flex justify-between">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className=" fas fa-star text-yellow-400"></i>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  className=" btn px-5"
                  onClick={()=>addToCart(product.id)}
                >
                    {loding && currentId == product.id ? <i className="fas fa-spinner fa-spin"></i>: "Add to Cart"}
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
}
