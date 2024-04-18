import { useNavigate } from "react-router-dom";

function Denied() {
  const navigate = useNavigate();
  return (
    <main className=" h-screen w-full flex flex-col justify-center items-center">
      <h1 className=" text-9xl font-semibold text-white tracking-wider">403</h1>
      <div className=" bg-black text-white px-2 rounded absolute rotate-12 ">
        Access denied
      </div>
      <button
        onClick={() => navigate(-1)}
        className=" mt-5 underline text-orange-400 hover:text-orange-600 transition-all ease-in-out duration-300"
      >
        Go back
      </button>
    </main>
  );
}

export default Denied;
