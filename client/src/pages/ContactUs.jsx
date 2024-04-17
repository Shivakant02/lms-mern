import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";
import { isEmail } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";

function ContactUs() {
  const [userInput, setUserInput] = useState({
    fullName: "",
    email: "",
    message: "",
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

    if (!userInput.email || !userInput.fullName || !userInput.message) {
      toast.error("All fields are required ");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid email provided");
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your query",
        success: "Form submitted successfully",
        error: "Failed to submit your form",
      });

      const responseData = await response;
      console.log(responseData);

      if (responseData?.payload?.data) {
        setUserInput({
          email: "",
          fullName: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Operation failed....");
    }
  }

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[100vh] ">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className=" flex flex-col items-center justify-center  gap-2 p-5 w-[25rem] border rounded-md "
        >
          <h1 className=" text-3xl font-semibold">Contact Us</h1>

          <div className=" flex flex-col text-white h-full gap-1">
            <label htmlFor="fullName" className=" font-semibold">
              Name
            </label>
            <input
              id="fullName"
              className=" bg-transparent outline-none border rounded-md px-2 py-1 w-80 "
              placeholder="Enter your name..."
              type="text"
              name="fullName"
              value={userInput.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className=" flex flex-col text-white h-full gap-1">
            <label htmlFor="email" className=" font-semibold">
              Email
            </label>
            <input
              id="email"
              className=" bg-transparent outline-none border rounded-md px-2 py-1 w-80 "
              placeholder="Enter your email..."
              type="email"
              name="email"
              value={userInput.email}
              onChange={handleInputChange}
            />
          </div>

          <div className=" flex flex-col text-white h-full gap-1">
            <label htmlFor="message" className=" font-semibold">
              Message
            </label>
            <textarea
              id="message"
              className=" bg-transparent outline-none border rounded-md px-2 py-1 w-80 h-40 resize-none"
              placeholder="Enter your message..."
              type="text"
              name="message"
              value={userInput.message}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className=" w-80 bg-yellow-600 hover:bg-yellow-500 rounded-md text-white transition-all ease-in-out duration-300 cursor-pointer py-1 text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ContactUs;
