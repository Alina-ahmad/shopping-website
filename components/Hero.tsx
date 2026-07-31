// "use client";

// import React from "react";
// import Slide from "./Slide";
// import Slider from "react-slick";
// const Hero = () => {
//   var settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     pauseOnHover: false,
//   };

//   const slideData = [
//     {
//       id: 0,
//       img: "/womenClothing.png",
//       title: "Trending Item",
//       mainTitle: "WOMEN'S LATEST FASHION SALE",
//       price: "$20",
//     },
//     {
//       id: 1,
//       img: "/womenGlasses.png",
//       title: "Trending Accessories",
//       mainTitle: "MODERN SUNGLASSES",
//       price: "$15",
//     },
//     {
//       id: 2,
//       img: "/Perfume.png",
//       title: "Fragrances",
//       mainTitle: "ETHERAL FRAGNANCES",
//       price: "$25",
//     },
//     {
//       id: 3,
//       img: "/Bag.png",
//       title: "Trending Bags",
//       mainTitle: "Bags",
//       price: "$35",
//     },
//   ];

//   return (
//     <div>
//       <div className="container pt-6 lg:pt-0">
//         <Slider {...settings}>
//           {slideData.map((item) => (
//             <Slide
//               key={item.id}
//               img={item.img}
//               title={item.title}
//               mainTitle={item.mainTitle}
//               price={item.price}
//             />
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default Hero;

"use client";

import React from "react";
import Slide from "./Slide";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const slideData = [
    { id: 0, img: "/womenClothing.png", title: "Trending Item", mainTitle: "WOMEN'S LATEST FASHION SALE", price: "$20" },
    { id: 1, img: "/womenGlasses.png", title: "Trending Accessories", mainTitle: "MODERN SUNGLASSES", price: "$15" },
    { id: 2, img: "/Perfume.png", title: "Fragrances", mainTitle: "ETHERAL FRAGNANCES", price: "$25" },
    { id: 3, img: "/Bag.png", title: "Trending Bags", mainTitle: "Bags", price: "$35" },
  ];

  return (
    <div>
      <div className="z-0 w-full pt-6 lg:pt-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={1}
        >
          {slideData.map((item) => (
            <SwiperSlide key={item.id}>
              <Slide
                img={item.img}
                title={item.title}
                mainTitle={item.mainTitle}
                price={item.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
