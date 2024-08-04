import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      <div className=" min-h-[90vh] pt-12 px-20 flex-col items-center justify-center text-white">
        <div className=" grid grid-cols-2 gap-10 py-10 relative">
          <div className=" space-y-5">
            <img
              className=" w-full h-64"
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
            />

            <div className=" space-y-4">
              <div className=" flex flex-col items-center justify-between text-xl ">
                <p className=" font-semibold">
                  <span className=" font-bold text-yellow-500">
                    Total lectures:{" "}
                  </span>{" "}
                  {state?.numberOfLectures}
                </p>

                <p className=" font-semibold">
                  <span className=" font-bold text-yellow-500">
                    Instructor:{" "}
                  </span>{" "}
                  {state?.createdBy}
                </p>
              </div>

              {role === "ADMIN" ||
              data?.user?.subscription?.status === "active" ? (
                <button
                  onClick={() =>
                    navigate("/course/displaylectures", { state: { ...state } })
                  }
                  className=" w-full btn btn-outline btn-primary"
                >
                  Watch lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className=" w-full btn btn-outline btn-secondary"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>

          <div className=" space-y-2 text-xl ">
            <h1 className=" text-3xl font-bold text-yellow-500 mb-5 text-center">
              {state?.title}
            </h1>
            <p className=" text-yellow-500">Course Description: </p>

            <p>{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
