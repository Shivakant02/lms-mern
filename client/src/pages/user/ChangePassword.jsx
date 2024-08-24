import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import axiosInstance from "../../config/axiosInstance";
import HomeLayout from "../../layouts/HomeLayout";
function ChangePassword() {
  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.oldPassword || !userInput.newPassword) {
      toast.error("All fields are required ");
      return;
    }

    try {
      const response = axiosInstance.post("/user/change-password", userInput);
      toast.promise(response, {
        loading: "changing password",
        success: "password changed successfully",
        error: "failed to change password",
      });

      const responseData = await response;
      //   console.log(responseData);

      if (responseData?.payload?.data) {
        setUserInput({
          oldPassword: "",
          newPassword: "",
        });
      }
    } catch (error) {
      toast.error("Operation failed....");
    }
  }
  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[90vh]">
        <form
          onSubmit={onFormSubmit}
          className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] border"
        >
          <h1 className=" text-center text-2xl font-semibold ">
            Change Password
          </h1>
          <div className=" flex flex-col gap-1">
            <label htmlFor="oldPassword" className=" text-lg font-semibold  ">
              Old Password
            </label>
            <input
              required
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter your Old Password..."
              className=" bg-transparent px-2 py-1 border outline-none rounded-md"
              type="password"
              value={userInput.oldPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="newPassword" className=" text-lg font-semibold  ">
              New Password
            </label>
            <input
              required
              name="newPassword"
              id="newPassword"
              placeholder="Enter your new Password..."
              className=" bg-transparent px-2 py-1 border outline-none rounded-md"
              type="password"
              value={userInput.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <button
            className=" w-full btn btn-sm btn-outline   btn-secondary"
            type=" submit"
          >
            Change Password
          </button>
          <Link to="/user/profile">
            {" "}
            <p className=" link text-accent cursor-pointer flex items-center justify-center ">
              Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
