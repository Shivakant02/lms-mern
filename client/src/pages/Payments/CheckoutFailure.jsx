import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";

function CheckoutFailure() {
  return (
    <HomeLayout>
      <div className=" min-h-[90vh] flex items-center justify-center text-white">
        <div className=" w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className=" bg-red-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg ">
            Payment failed
          </h1>
          <div className=" px-4 flex flex-col items-center justify-center">
            <h2 className=" text-lg font-semibold">OOPS! Payment failed</h2>
            <p className=" text-left">Please try again later</p>
          </div>
          <RxCrossCircled className=" text-5xl text-red-500 mt-2" />
          <Link
            to="/"
            className=" bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute w-full text-center py-2 bottom-0 rounded-bl-lg rounded-br-lg"
          >
            <button>Go to dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutFailure;
