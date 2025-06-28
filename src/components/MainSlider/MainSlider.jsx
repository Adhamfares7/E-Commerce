import React from 'react'
import Slider from "react-slick";
import slid1 from "../../assets/grocery-banner-2.jpeg"
import slid2 from "../../assets/grocery-banner.png"
import slid3 from "../../assets/slider-image-1.jpeg"
import slid4 from "../../assets/slider-image-2.jpeg"
import slid5 from "../../assets/slider-image-3.jpeg"


export default function MainSlider() {


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1500,
        arrows:false,
    
      };
  return (
    <div className=' row'>
      <div className=' w-3/4'>
      <Slider {...settings}>
      <img src={slid5} className=' w-full h-[400px] object-cover' alt="" />
      <img src={slid1} className=' w-full h-[400px] object-cover' alt="" />
      <img src={slid2} className=' w-full h-[400px] object-cover' alt="" />
      </Slider>
      </div>
      <div className=' w-1/4'>
      <img src={slid3} className=' w-full h-[200px] object-cover' alt="" />
      <img src={slid4} className=' w-full h-[200px] object-cover' alt="" />
      </div>
    </div>
  )
}
