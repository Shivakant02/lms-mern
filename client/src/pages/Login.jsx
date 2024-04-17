import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import { login } from "../redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSigninDetails({
      ...signinDetails,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!signinDetails.email || !signinDetails.password) {
      toast.error("Please fill all the details");
      return;
    }

    if (!isEmail(signinDetails.email)) {
      toast.error("Invalid email or user does not exists provided!");
      return;
    }

    const responce = await dispatch(login(signinDetails));

    console.log(responce);

    if (responce?.payload?.data) {
      navigate("/");
    }

    setSigninDetails({
      email: "",
      password: "",
    });
  }
  // console.log(signinDetails);
  return (
    <HomeLayout>
      <div className=" flex overflow-x-auto items-center justify-center h-[100vh] ">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className=" flex flex-col justify-center gap-3 rounded-lg p-4 text-white border w-80 "
        >
          <h1 className=" text-2xl text-center font-bold ">Login page</h1>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="email" className=" font-semibold">
              Email
            </label>
            <input
              required
              onChange={handleUserInput}
              value={signinDetails.email}
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email..."
              className=" bg-transparent px-2 py-1 border outline-none rounded-md"
            />
          </div>

          <div className=" flex flex-col gap-1 ">
            <label htmlFor="password" className=" font-semibold">
              Password
            </label>
            <input
              required
              onChange={handleUserInput}
              value={signinDetails.password}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              className=" bg-transparent px-2 py-1 border outline-none rounded-md"
            />
          </div>
          <button className=" mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md font-semibold py-1">
            Login
          </button>
          <p className=" text-center">
            Do not have an accout?
            <Link to="/signup" className=" cursor-pointer text-accent">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Login;
