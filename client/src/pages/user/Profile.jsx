import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data?.user);

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
              {userData?.subscription?.status === "active"
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
          {userData?.subscription?.status === "active" && (
            <button className=" w-full btn btn-primary">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
