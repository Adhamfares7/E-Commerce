import React from "react";
import style from "./Layout.module.css";
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar/>

      <div className=" container my-5 lg:py-10 py-20">
        <Outlet/>
      </div>


      <Footer/>
    </>
  );
}
