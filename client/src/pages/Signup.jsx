import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isValidPassword } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import { createAccout } from "../redux/slices/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullName: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupDetails({
      ...signupDetails,
      [name]: value,
    });
  }

  function handleImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;
    setSignupDetails({
      ...signupDetails,
      avatar: uploadedImage,
    });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  }

  const [previewImage, setPreviewImage] = useState("");

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !signupDetails.fullName ||
      !signupDetails.email ||
      !signupDetails.password
    ) {
      toast.error("Please fill all the details");
      return;
    }

    if (signupDetails.fullName.length < 4) {
      toast.error("Name should be atleast 4 characters");
      return;
    }

    if (!isEmail(signupDetails.email)) {
      toast.error("Invalid email provided!");
      return;
    }

    if (!isValidPassword(signupDetails.password)) {
      toast.error(
        "please ensure password length between 8-15 must contain atleast one lowercase, one uppercase, one digit and one special character!",
        {
          duration: 5000,
        }
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupDetails.fullName);
    formData.append("email", signupDetails.email);
    formData.append("password", signupDetails.password);
    formData.append("avatar", signupDetails.avatar);

    const responce = await dispatch(createAccout(formData));

    console.log(responce);

    if (responce?.payload?.data) {
      navigate("/");
    }

    setSignupDetails({
      email: "",
      fullName: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }
  // console.log(signupDetails);
  return (
    <HomeLayout>
      <div className=" flex overflow-x-auto items-center justify-center h-[100vh] ">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className=" flex flex-col justify-center gap-3 rounded-lg p-4 text-white border w-80 "
        >
          <h1 className=" text-2xl text-center font-bold ">
            Registration page
          </h1>
          <label htmlFor="image_uploads" className=" cursor-pointer ">
            {previewImage ? (
              <img
                src={previewImage}
                className=" w-24 h-24 rounded-full m-auto"
                alt="avatar"
              />
            ) : (
              <BsPersonCircle className=" w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={handleImage}
            type="file"
            className=" hidden "
            name=" image_uploads"
            id="image_uploads"
            accept=".jpg, .png ,.jpeg, .svg "
          />
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="fullName" className=" font-semibold">
              Name
            </label>
            <input
              required
              onChange={handleUserInput}
              value={signupDetails.fullName}
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your username..."
              className=" bg-transparent px-2 py-1 border outline-none rounded-md"
            />
          </div>
          <div className=" flex flex-col gap-1 ">
            <label htmlFor="fullName" className=" font-semibold">
              Email
            </label>
            <input
              required
              onChange={handleUserInput}
              value={signupDetails.email}
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
              value={signupDetails.password}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              className=" bg-transparent px-2 py-1 border outline-none rounded-md"
            />
          </div>
          <button className=" mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md font-semibold py-1">
            Create account
          </button>
          <p className=" text-center">
            Alread have an accout?
            <Link to="/login" className=" cursor-pointer text-accent">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Signup;
