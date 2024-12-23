"use client";

import { useState } from "react";
import Image from "next/image";
import Carousel1 from "@/assets/images/carousel/carousel1.png";
import Carousel2 from "@/assets/images/carousel/carousel2.png";

const carouselData = [
  { id: 1, imgUrl: Carousel1, text: "Slide 1" },
  { id: 2, imgUrl: Carousel2, text: "Slide 2" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
      {/* Slide Container */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselData.map((item) => (
          <div
            key={item.id}
            className="min-w-full h-64 flex items-center justify-center bg-gray-200 relative"
          >
            <Image
              src={item.imgUrl}
              alt={item.text}
              fill
              className="object-cover"
            />
            <p className="absolute bottom-4 text-white text-2xl font-bold bg-black/50 p-2 rounded">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
      >
        &#8592;
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
      >
        &#8594;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

