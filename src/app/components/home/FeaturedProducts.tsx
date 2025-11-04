import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedProducts = () => {
  return (
    <section className="container mx-auto px-6 flex flex-col gap-6 md:gap-8 lg:gap-12">
      {/* ZX9 Speaker */}
      <div className="relative bg-orange-500 rounded-lg p-8 md:p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        {/* Background Circle Pattern */}
        <Image
          src="/assets/home/desktop/pattern-circles.svg"
          alt=""
          fill // FIXED: Added fill prop for SVG
          className="absolute -top-24 left-0 md:-top-48 lg:-top-16 lg:-left-40 w-[600px] h-[600px] md:w-[944px] md:h-[944px] opacity-25"
        />

        {/* Product Image */}
        <div className="relative w-40 h-48 md:w-48 md:h-56 lg:w-[410px] lg:h-[493px] lg:flex-1 lg:-mb-24">
          <Image src="/assets/home/mobile/image-speaker-zx9.png" alt="ZX9 Speaker" fill className="md:hidden object-contain" />
          <Image src="/assets/home/tablet/image-speaker-zx9.png" alt="ZX9 Speaker" fill className="hidden md:block lg:hidden object-contain" />
          <Image src="/assets/home/desktop/image-speaker-zx9.png" alt="ZX9 Speaker" fill className="hidden lg:block object-contain" />
        </div>

        {/* Text Content */}
        <div className="relative text-center lg:text-left text-white mt-8 lg:mt-0 lg:flex-1 lg:pl-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase max-w-xs">
            ZX9
            <br />
            Speaker
          </h2>
          <p className="my-6 max-w-sm">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <Link
            href="/product/zx9-speaker"
            className="bg-black text-white uppercase font-bold text-sm tracking-wider px-8 py-4 hover:bg-gray-700 transition-colors"
          >
            See Product
          </Link>
        </div>
      </div>

      {/* ZX7 Speaker */}
      <div className="relative rounded-lg overflow-hidden">
        {/* Background Images */}
        <Image src="/assets/home/mobile/image-speaker-zx7.jpg" alt="" fill className="md:hidden -z-10 object-cover" />
        <Image src="/assets/home/tablet/image-speaker-zx7.jpg" alt="" fill className="hidden md:block lg:hidden -z-10 object-cover" />
        <Image src="/assets/home/desktop/image-speaker-zx7.jpg" alt="" fill className="hidden lg:block -z-10 object-cover" />
        
        {/* Text Content */}
        <div className="relative p-8 md:p-16 lg:p-24">
          <h2 className="text-3xl font-bold uppercase mb-8">ZX7 Speaker</h2>
          <Link
            href="/product/zx7-speaker"
            className="bg-transparent border border-black text-black uppercase font-bold text-sm tracking-wider px-8 py-4 hover:bg-black hover:text-white transition-colors"
          >
            See Product
          </Link>
        </div>
      </div>

      {/* YX1 Earphones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative w-full h-52 md:h-80 lg:h-full rounded-lg overflow-hidden">
          <Image src="/assets/home/mobile/image-earphones-yx1.jpg" alt="YX1 Earphones" fill className="md:hidden object-cover" />
          <Image src="/assets/home/tablet/image-earphones-yx1.jpg" alt="YX1 Earphones" fill className="hidden md:block lg:hidden object-cover" />
          <Image src="/assets/home/desktop/image-earphones-yx1.jpg" alt="YX1 Earphones" fill className="hidden lg:block object-cover" />
        </div>

        {/* Text Content */}
        <div className="bg-gray-100 rounded-lg p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <h2 className="text-3xl font-bold uppercase mb-8">YX1 Earphones</h2>
          <Link
            href="/product/yx1-earphones"
            className="bg-transparent border border-black text-black uppercase font-bold text-sm tracking-wider px-8 py-4 hover:bg-black hover:text-white transition-colors"
          >
            See Product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

