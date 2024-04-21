// import React from 'react'

import { Link } from "react-router-dom"

import homepageMainImage from '../assets/images/homePageMainImage.png'
import HomeLayout from "../layouts/HomeLayout"


function Home() {
    return (
      <HomeLayout>
            <div className=" pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">

                <div className=" w-1/2 space-y-6">
                    <h1 className=" text-4xl font-semibold" >Find out best <span className=" text-yellow-500 font-bold">Online courses</span></h1>
                    <p className=" text-xl text-gray-100"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat facilis a aut porro in, natus quam? .</p>

                    <div className=" space-x-6">
                        <Link to="/courses">
                            <button className=" bg-yellow-500 py-3 px-5 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">Explore Courses</button>
                        </Link>
                        <Link to="/contact">
                            <button className=" border border-yellow-500 py-3 px-5 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">Contact us</button>
                        </Link>

                    </div>
                </div>
                <div className=" w-1/2 flex items-center justify-center">
                    <img src={homepageMainImage} alt="home" />
                </div>
             </div>
      </HomeLayout>
   
  )
}

export default Home