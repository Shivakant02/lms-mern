// import React from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  console.log(isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function chageWidth() {
    const drawerSize = document.getElementsByClassName("drawer-side");
    drawerSize[0].style.width = "auto";
  }

  function onLogout(e) {
    e.preventDefault();

    navigate("/");
  }

  return (
    <div className=" min-h-[90vh] ">
      <div className="drawer absolute left-0 z-50 w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className=" drawer-content">
          <label htmlFor="my-drawer">
            <FiMenu
              onClick={chageWidth}
              size={"32px"}
              className=" font-bold text-white cursor-pointer m-4"
            />
          </label>
        </div>

        <div className=" drawer-side w-0 ">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          >
            {" "}
          </label>
          <ul className=" menu p-4 w-4 sm:w-80 bg-base-200 text-base-content relative ">
            <li className=" w-fit absolute right-2 z-50">
              <button>
                <AiFillCloseCircle
                  onClick={() => {
                    const element =
                      document.getElementsByClassName("drawer-toggle");
                    element[0].checked = false;
                    const drawerSize =
                      document.getElementsByClassName("drawer-side");
                    drawerSize[0].style.width = "0";
                  }}
                />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
              {isLoggedIn && role === "ADMIN" && (
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
              )}
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/courses">All courses</Link>
            </li>

            {!isLoggedIn ? (
              <li>
                <div className="w-full flex items-center justify-center">
                  <button className="btn-outline btn-primary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to="/user/profile">Login</Link>
                  </button>
                  <button className="btn-outline btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                    <Link onClick={onLogout}>Signup</Link>
                  </button>
                </div>
              </li>
            ) : (
              <li>
                <div className="w-full flex items-center justify-center">
                  <button className="btn-outline btn-primary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className="btn-outline btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                    <Link onClick={onLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;
