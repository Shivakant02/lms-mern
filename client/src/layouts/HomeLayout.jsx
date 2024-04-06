// import React from 'react'
import  {  AiFillCloseCircle } from 'react-icons/ai'
import {FiMenu} from 'react-icons/fi'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'


function HomeLayout({ children }) {
    
    function chageWidth() {
        const drawerSize = document.getElementsByClassName('drawer-side');
        drawerSize[0].style.width = 'auto';
    }


   
  return (
      <div className=' min-h-[90vh] '>
          <div className="drawer absolute left-0 z-50 w-full">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className=' drawer-content'>
                  <label htmlFor="my-drawer">
                      <FiMenu onClick={chageWidth}  size={"32px"} className=' font-bold text-white cursor-pointer m-4'/>
                  </label>
              </div>
              
              <div className=' drawer-side w-0 '>
                  <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">   </label>
                  <ul className=' menu p-4 w-4 sm:w-80 bg-base-200 text-base-content relative '>
                      <li className=' w-fit absolute right-2 z-50'>
                          <button>
                              <AiFillCloseCircle onClick={() => {
                                  const element = document.getElementsByClassName("drawer-toggle");
                                  element[0].checked = false;
                                  const drawerSize = document.getElementsByClassName('drawer-side');
        drawerSize[0].style.width = '0';
                              }}/>
                          </button>
                      </li>
                      <li>
                          <Link to='/'>Home</Link>
                      </li>
                      <li>
                          <Link to='/about'>About us</Link>
                      </li>
                      <li>
                          <Link to='/contact'>Contact us</Link>
                      </li>
                      <li>
                          <Link to='/courses'>All courses</Link>
                      </li>
                          
                      </ul>

              </div>
             
              
          </div>
          { children }
    
    <Footer/>
        </div>
      
      
  )
}

export default HomeLayout