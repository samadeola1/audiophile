import React from "react";
import Link from "next/link";
import Image from "next/image";

// Import our new components using relative paths
import CategoryLinks from "./components/shared/CategoryLinks";
import FeaturedProducts from "./components/home/FeaturedProducts";
import BestGear from "./components/shared/BestGear";

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-[#191919]  overflow-hidden" // Pulls section up behind transparent header
      >
        {/* Responsive Background Images */}
        {/* Mobile */}
        <Image
          src="/assets/home/mobile/image-header.jpg"
          alt=""
          priority
          fill
          className="block md:hidden z-10 object-cover object-center" // FIXED
        />
        {/* Tablet */}
        <Image
          src="/assets/home/tablet/image-header.jpg"
          alt=""
          priority
          fill
          className="hidden md:block lg:hidden z-10 object-cover object-center" // FIXED
        />
        {/* Desktop */}
        <Image
          src="/assets/home/desktop/image-hero.jpg"
          alt=""
          priority
          fill
          className="hidden lg:block z-10 object-cover object-center" // FIXED
        />

        {/* Dark overlay for Mobile/Tablet readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 lg:hidden"></div>

        {/* Hero Content Wrapper */}
        <div className="container mx-auto px-6">
          {/* This div holds the text content.
            - On mobile/tablet, it's centered.
            - On desktop, it's NOT centered and takes up the left side.
          */}
          <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40">
            <p className="text-white opacity-50 uppercase tracking-[0.5em] text-sm mb-4 animate__animated animate__fadeInDown">
              New Product
            </p>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider max-w-md text-white animate__animated animate__fadeInDown animate__delay-1s">
              XX99 Mark II
              <br />
              Headphones
            </h1>
            <p className="text-gray-300 max-w-sm my-6 font-medium leading-relaxed animate__animated animate__fadeInUp animate__delay-2s">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Link
              href="/product/xx99-mark-two-headphones"
              className="bg-orange-500 text-white uppercase font-bold text-sm tracking-wider px-8 py-4 hover:bg-orange-600 transition-colors animate__animated animate__fadeInUp animate__delay-3s"
            >
              See Product
            </Link>
          </div>
        </div>
      </div>

      {/* Main Page Content */}
      <main className="pt-24 md:pt-32 lg:pt-48 pb-20 md:pb-24 lg:pb-40 flex flex-col gap-20 md:gap-24 lg:gap-40">
        <CategoryLinks />
        <FeaturedProducts />
        <BestGear />
      </main>
    </>
  );
}

