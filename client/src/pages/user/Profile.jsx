import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { getUserData } from "../../redux/slices/authSlice";
import { cancelCourseBundle } from "../../redux/slices/razorPaySlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data?.user);

  // async function handleCancelation() {
  //   toast("Initiating cancellation");
  //   await dispatch(cancelCourseBundle());
  //   await dispatch(getUserData());
  //   toast.success("Cancellation complete");
  //   navigate("/");
  // }

  return (
    <HomeLayout>
      <div className=" min-h-[90vh] flex items-center justify-center ">
        <div className=" my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
          <img
            src={userData?.avatar?.secure_url}
            className=" w-40 m-auto rounded-full border border-black"
          />
          <h3 className=" text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className=" grid grid-cols-2">
            <p>Email: </p>
            <p>{userData?.email}</p>
            <p>Role: </p>
            <p>{userData?.role}</p>
            <p>Subscription:</p>
            <p>
              {userData?.subscription?.status === "active" ||
              userData?.role === "ADMIN"
                ? "active"
                : "Inactive"}
            </p>
          </div>

          <div className=" flex items-center justify-between gap-2 ">
            <Link
              to="/change-password"
              className=" btn btn-outline btn-primary  w-1/2 font-semibold "
            >
              Change password
            </Link>

            <Link
              to="/user/edit-profile"
              className=" btn btn-outline btn-primary  w-1/2 font-semibold "
            >
              Edit Profile
            </Link>
          </div>
          {/* todo : I have to debug the subscription route as well as cancel button */}
          {userData?.subscription?.status === "active" && (
            <button
              // onClick={handleCancelation()}
              className=" w-full btn btn-primary"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
