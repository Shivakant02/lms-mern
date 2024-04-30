import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { getUserData, updateProfile } from "../../redux/slices/authSlice";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    fullName: "",
    previewImage: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?.user?._id),
  });

  function handleImageUpload(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }

    if (data.fullName.length < 4) {
      toast.error("Name should be atleas 4 characters");
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile([data.userId, formData]));
    await dispatch(getUserData());

    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[90vh]">
        <form
          onSubmit={onFormSubmit}
          className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] border"
        >
          <h1 className=" text-center text-2xl font-semibold ">Edit profile</h1>
          <label htmlFor="image_upload" className=" cursor-pointer">
            {data.previewImage ? (
              <img
                src={data.previewImage}
                className=" w-28 h-28 rounded-full m-auto "
              />
            ) : (
              <BsPersonCircle className=" w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={handleImageUpload}
            type="file"
            name="image_upload"
            id="image_upload"
            accept=".jpg,.png,.jpeg,.svg"
            className=" hidden"
          />
          <div className=" flex flex-col gap-1">
            <label htmlFor="fullName" className=" text-lg font-semibold  ">
              Fullname
            </label>
            <input
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your name..."
              className=" bg-transparent px-2 py-1 border outline-none rounded-md"
              type="text"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>
          <button
            className=" w-full btn btn-sm btn-outline   btn-secondary"
            type=" submit"
          >
            Update profile
          </button>
          <Link
            className=" link text-accent cursor-pointer flex items-center justify-center "
            to="/user/profile"
          >
            {" "}
            <p>Go back to profile</p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
