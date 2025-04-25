"use client";

import { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import PrevArrow from "@/assets/icons/prevArrow.png";
import NextArrow from "@/assets/icons/nextArrow.png";

interface CarouselItem {
  id: number;
  imgUrl: string | StaticImageData;
  text?: string;
}

interface CarouselProps {
  carouselData: CarouselItem[];
  height?: string;
  imageClassName?: string;
  containerClassName?: string;
}

const Carousel = ({
  carouselData,
  height = "h-48 xs:h-64",
  imageClassName,
  containerClassName,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const touchDifference = touchStartX.current - touchEndX.current;

    if (touchDifference > 50) {
      // 왼쪽 스와이프
      handleNext();
    } else if (touchDifference < -50) {
      // 오른쪽 스와이프
      handlePrev();
    }
    // 리셋
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className={`relative w-full ${height} max-w-3xl mx-auto overflow-hidden`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Container */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselData.map((item) => (
          <div
            key={item.id}
            className={`min-w-full ${height} flex items-center justify-center relative ${containerClassName}`}
          >
            <Image
              src={item.imgUrl}
              alt="Carousel Image"
              fill
              className={`${imageClassName || "object-fill"} max-h-full max-w-full`}
            />
            <div className="absolute inset-0 flex top-[20%] left-[14%] xs:left-[10%] text-black text-2xl xs:text-3xl font-medium whitespace-pre-line">
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      {carouselData.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-0.5 rounded-full hover:bg-white hover:bg-opacity-50 transition duration-200"
        >
          <Image src={PrevArrow} alt="prev icon" className="w-10 h-10" />
        </button>
      )}

      {/* Right Arrow */}
      {carouselData.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-0.5 rounded-full hover:bg-white hover:bg-opacity-50 transition duration-200"
        >
          <Image src={NextArrow} alt="next icon" className="w-10 h-10" />
        </button>
      )}

      {/* Indicators */}
      {carouselData.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselData.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;