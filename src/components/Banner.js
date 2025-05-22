import React from "react";
import Slider from "react-slick";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Winter Jacket Collection",
      image: "/banner1.jpg",
    },
    {
      id: 2,
      title: "Streetwear Trends",
      image: "/banner2.jpg",
    },
    {
      id: 3,
      title: "New Arrivals",
      image: "/banner3.jpg",
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
          <div key={slide.id}>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[500px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
