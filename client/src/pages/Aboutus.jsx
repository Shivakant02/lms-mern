import aboutmainpage from "../assets/images/aboutMainImage.png";
import apj from "../assets/images/apj.png";
import bill from "../assets/images/billGates.png";
import nelson from "../assets/images/nelsonMandela.png";
import steve from "../assets/images/steveJobs.png";
import HomeLayout from "../layouts/HomeLayout";

function Aboutus() {
  return (
    <HomeLayout>
      <div className=" flex flex-col text-white pl-5 pt-20">
        <div className=" flex items-center gap-5 mx-10  ">
          <section className=" w-1/2 space-y-10">
            <h1 className=" text-5xl text-yellow-500 font-semibold ">
              Affordable and quality industrial education
            </h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              amet eos praesentium harum. Animi perspiciatis a amet tenetur
              autem eum ipsam pariatur dolor, rem ut ipsum numquam ducimus fghg
              fr
            </p>
          </section>

          <div className=" w-1/2">
            <img
              className=" drop-shadow-2xl"
              src={aboutmainpage}
              alt="about main page"
            />
          </div>
        </div>
        <div className="carousel w-1/2 my-10 mx-auto rounded-md">
          <div id="slide1" className="carousel-item relative w-full">
            <div className=" flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={apj}
                className="  w-40 rounded-full border-2 border-gray-400"
              />
              <p className=" text-xl text-gray-200">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta,
                joki fuga
              </p>
              <h3 className=" text-2xl font-semibold">APJ Abdul Kalam</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className=" flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={bill}
                className="  w-40 rounded-full border-2 border-gray-400"
              />
              <p className=" text-xl text-gray-200">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta,
                joki fuga?
              </p>
              <h3 className=" text-2xl font-semibold">Bill Gates</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <div className=" flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={steve}
                className="  w-40 rounded-full border-2 border-gray-400"
              />
              <p className=" text-xl text-gray-200">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta,
                joki fuga?
              </p>
              <h3 className=" text-2xl font-semibold">Steve Jobs</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <div className=" flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={nelson}
                className="  w-40 rounded-full border-2 border-gray-400"
              />
              <p className=" text-xl text-gray-200">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta,
                joki fuga?
              </p>
              <h3 className=" text-2xl font-semibold">Nelson Mandella</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Aboutus;
