import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      {/* This section is black. The header is absolute and transparent on top of it.
        We use a negative top margin to pull this section *up* behind the header.
        The `pt-32` (padding-top) pushes the *content* down to be visible.
        This achieves the Figma design of the header floating over the hero.
      */}
      <div 
        className="bg-black text-white -mt-[120px]" // 97px is approx height of header
      >
        {/* Hero content wrapper. 
          The Figma design has the hero bg image span the full width,
          but the text content is centered in the container.
          
          We'll use a placeholder dark background.
          In a real build, you'd add a background image here.
          e.g., style={{ backgroundImage: "url('/images/image-hero.jpg')" }}
        */}
        <div className="bg-gray-900 bg-opacity-50 bg-blend-multiply">
          <div className="container mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-[#FFFFFF] uppercase tracking-[0.5em] text-sm mb-4 animate__animated animate__fadeInDown">
              New Product
            </p>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider max-w-md animate__animated animate__fadeInDown animate__delay-1s">
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

      {/* Rest of the homepage content (product showcases, etc.) 
        will go here in the next steps.
      */}
      <div className="container mx-auto p-6 py-20">
        <h2 className="text-2xl font-bold text-center">
          Product Showcase Coming Soon...
        </h2>
      </div>
    </>
  );
}

