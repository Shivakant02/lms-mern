import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      <div>Edit profile</div>
    </HomeLayout>
  );
}

export default EditProfile;
