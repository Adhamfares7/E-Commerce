import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Categroies from "../Categroies/Categroies";
import index from './../../../node_modules/resize-observer-polyfill/dist/ResizeObserver.es';


export default function CategoriesSlider() {
  const [Categories, setCategories] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,

  };

  function getCaregoris() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getCaregoris();
  }, []);

  return (
    <>
      <Slider {...settings}>
        {Categories.map((prodect) => (
          <div key={index}>
            <img src={prodect.image} className=" w-full h-[200px] object-cover" alt="" />
            <h3> {prodect.name} </h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
