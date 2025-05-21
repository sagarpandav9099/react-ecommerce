import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import banner1 from "../images/banner1.jpg";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Winter Jacket Collection",
      subtitle: "Stay warm & stylish this season",
      image: banner1,
    },
    {
      id: 2,
      title: "Streetwear Trends",
      subtitle: "Cool styles for everyday wear",
      image: banner1,
      button: "Explore Now",
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "Fresh fashion just for you",
      image: banner1,
      button: "See What’s New",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-[500px] bg-cover bg-center flex items-center justify-start px-8"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bg-lime-200 bg-opacity-50 p-6 rounded-lg ">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
                {slide.title}
              </h2>
              <p className="text-white text-lg mb-4">{slide.subtitle}</p>
              <Link
                to="/shop"
                className="inline-block bg-white text-black font-semibold px-5 py-2 rounded hover:bg-gray-100"
              >
                {slide.button}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
