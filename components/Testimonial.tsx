import React from "react";
import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";
import { CgGirl } from "react-icons/cg";

const Testimonial = () => {
  return (
    <div>
      <div className="pt-16 pb-16 grid-cols-2 px-[43px]">
        <h2 className="font-medium text-2xl pb-4">Testimonials</h2>
        <div className="grid lg:grid-cols-[300px_1fr] gap-4 lg:h-[400px] md:h-[300px] sm:h-[200px]">
          <div className="border border-gray-300 rounded-2xl grid place-items-center p-6 lg:p-0  ">
            <div className="text-center flex flex-col items-center gap-1">
              <div className="rounded-full inline-block ">
                <CgGirl className="w-[80px] h-[80px] text-white bg-[#ff8f9c] rounded-full" />
              </div>

              <h2 className="text-gray-500 font-black text-[20px]">Elsa Doe</h2>
              <p>CEO & founder Invision</p>
              <div className="inline-block py-2">
                {" "}
                <RiDoubleQuotesL className="w-[30px] h-[30px] text-[#ff8f9c]" />
              </div>
              <p className="max-w-[200px] text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. O dit
                dolor dolor{" "}
              </p>
            </div>
          </div>
          <div className="bg-red-600 bg-[url('https://img.magnific.com/premium-photo/pastel-pink-beige-background-with-elegant-floral-pattern-ai-generation_567294-8306.jpg')] bg-cover h-[500px] rounded-2xl grid place-items-center px-[150px]">
            <div className=" bg-[#ffffffab] min-w-[270px] sm:min-w-[300px] md:min-w-[500px] rounded-xl py-8 sm:px-8 px-2 grid place-items-center gap-3">
              <button className="bg-black text-white p-2 rounded-md">25% DISCOUNT</button>
              <h2 className="font-extrabold text-2xl text-[#272727]">Summer Collection</h2>
              <p className="text-gray-500 text-[20px]">Starting @ $20 <b>Shop Now</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
