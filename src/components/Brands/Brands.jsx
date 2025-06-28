import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";

export default function Brands() {
  const [Brands, setBrands] = useState([]);
  async function getBrands() {
    let x = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setBrands(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    getBrands();
  }, []);

    console.log(Brands);

  return (
    <>
      {Brands?.length > 0 ? (<div className="container ">
        <div className=" flex flex-wrap gap-4 justify-center py-5     ">
          {Brands?.map((brand) => 
               (<div key={brand._id} className=" sm:w-1/5 border border-gray-300 rounded-xl cursor-pointer hover:shadow-black shadow-md duration-500 transition-all ">
              <img src={brand.image} className="rounded-xl w-full  object-cover " alt="" />
              <h5 className=" text-emerald-600 font-extrabold text-2xl m-5">{brand.name}  </h5>
            </div>)
          )}
        </div>
      </div>):(<div className="sk-chase">
<div className="sk-chase-dot"></div>
<div className="sk-chase-dot"></div>
<div className="sk-chase-dot"></div>
<div className="sk-chase-dot"></div>
<div className="sk-chase-dot"></div>
<div className="sk-chase-dot"></div>
</div>)}
    </>
  );
}