import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { createCourse } from "../../redux/slices/courseSlice";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          thumbnail: uploadedImage,
          previewImage: this.result,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.createdBy ||
      !userInput.category ||
      !userInput.thumbnail
    ) {
      toast.error("All fields are mandetory");
      return;
    }

    const response = await dispatch(createCourse(userInput));
    console.log(response);

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }
  return (
    <HomeLayout>
      <div className=" h-[100vh] flex items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] h-[500px] min-h-[400px] my-10 shadow-[0_0_10px_black] relative  "
        >
          <Link
            onClick={() => navigate(-1)}
            className=" absolute top-8 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>
          <h1 className=" text-center text-2xl font-bold">Create new course</h1>
          <main className=" grid grid-cols-2 gap-x-10 ">
            <div className=" gap-y-6 ">
              <div>
                <label className=" cursor-pointer" htmlFor="image_upload">
                  {userInput?.previewImage ? (
                    <img
                      src={userInput?.previewImage}
                      className=" w-full h-44 m-auto border"
                    />
                  ) : (
                    <div className=" w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className=" font-bold text-lg">
                        Upload course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="image_upload"
                  accept=".jpg, .png, .jpeg, .svg"
                  name="image_upload"
                  onChange={handleImageUpload}
                />
              </div>
              <div className=" flex flex-col gap-1">
                <label className=" text-lg font-semibold " htmlFor="title">
                  Course title
                </label>
                <input
                  required
                  name="title"
                  id="title"
                  placeholder="Enter the title"
                  onChange={handleUserInput}
                  value={userInput.title}
                  className=" outline-none border rounded-md bg-transparent px-2 py-1"
                  type="text"
                />
              </div>
            </div>
            <div className=" flex flex-col gap-1">
              <div className=" flex flex-col gap-1">
                <label className=" text-lg font-semibold " htmlFor="createdBy">
                  Instructor
                </label>
                <input
                  required
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructor of the course"
                  onChange={handleUserInput}
                  value={userInput.createdBy}
                  className=" outline-none border rounded-md bg-transparent px-2 py-1"
                  type="text"
                />
              </div>

              <div className=" flex flex-col gap-1">
                <label className=" text-lg font-semibold " htmlFor="category">
                  Category
                </label>
                <input
                  required
                  name="category"
                  id="category"
                  placeholder="Enter the category of the course"
                  onChange={handleUserInput}
                  value={userInput.category}
                  className=" outline-none border rounded-md bg-transparent px-2 py-1"
                  type="text"
                />
              </div>

              <div className=" flex flex-col gap-1">
                <label
                  className=" text-lg font-semibold "
                  htmlFor="description"
                >
                  Category
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  placeholder="Enter the description of the course"
                  onChange={handleUserInput}
                  value={userInput.description}
                  className=" outline-none border rounded-md bg-transparent px-2 py-1 h-24 resize-none overflow-auto"
                  type="text"
                />
              </div>
            </div>
          </main>
          <button
            type="submit"
            className=" w-full py-2 rounded-md font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300"
          >
            Create course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
