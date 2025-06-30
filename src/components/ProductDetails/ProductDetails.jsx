import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { addProductToCard, cartNum, setcartNum } = useContext(CartContext);
  const [loding, setloding] = useState(false);
  const [currentId, setcurrentId] = useState(0);

  const [Product, setProduct] = useState(null);
  const [relatedProduct, setrelatedProduct] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
  };

  async function addToCart(id) {
    setcurrentId(id);
    setloding(true);
    let response = await addProductToCard(id);
    console.log(response.data);
    if (response.data.status == "success") {
      setcartNum(cartNum + 1);
      toast.success(response.data.message);
      setloding(false);
    } else {
      toast.error(response.data.message);
      setloding(false);
    }
  }

  let { id, category } = useParams();

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setrelatedProduct(related);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);

  return (
    <>
      <div className="row text-start items-center my-5">
        <div className=" w-1/4">
          {" "}
          <Slider {...settings}>
            {Product?.images.map((src) => (
              <img src={src} key={id} className=" w-full" />
            ))}
          </Slider>
          {/* <img src={Product?.imageCover} className=" p-3 w-full" alt="" /> */}
        </div>
        <div className=" p-2 mt-16 w-3/4">
          <h3 className=" font-bold"> {Product?.title}</h3>
          <h3 className=" mt-5 text-sm text-slate-500">
            {Product?.description}
          </h3>
          <h3 className=" mt-5"> {Product?.category.name}</h3>
          <div className=" flex justify-between mt-5">
            <span>{Product?.price} EGP</span>
            <span>
              <i className=" fas fa-star text-yellow-400"></i>{" "}
              {Product?.ratingsAverage}
            </span>
          </div>
          <button className=" btn px-5" onClick={() => addToCart(Product.id)}>
            {loding && currentId == Product.id ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
      {relatedProduct.length > 0 ? (
        <div className="row">
          {relatedProduct.map((product) => (
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
                  className="btn px-5"
                  onClick={() => addToCart(product.id)}
                >
                  {loding && currentId == product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      )}
    </>
  );
}
