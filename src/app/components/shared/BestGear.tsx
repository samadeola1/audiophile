import React from 'react';
import Image from 'next/image';

const BestGear = () => {
  return (
    <section className="container mx-auto px-6">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-32">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold uppercase max-w-md mx-auto lg:mx-0">
            Bringing you the <span className="text-orange-500">best</span> audio gear
          </h2>
          <p className="text-black text-opacity-50 my-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
            earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
            rooms available for you to browse and experience a wide range of our products. Stop by our store 
            to meet some of the fantastic people who make Audiophile the best place to buy your portable 
            audio equipment.
          </p>
        </div>

        {/* Image Content */}
        <div className="relative flex-1 w-full h-72 md:h-[300px] lg:h-[580px] rounded-lg overflow-hidden">
          <Image
            src="/assets/shared/mobile/image-best-gear.jpg" // FIXED PATH
            alt="Man enjoying music with headphones"
            fill
            className="block md:hidden object-cover"
          />
          <Image
            src="/assets/shared/tablet/image-best-gear.jpg" // FIXED PATH
            alt="Man enjoying music with headphones"
            fill
            className="hidden md:block lg:hidden object-cover"
          />
          <Image
            src="/assets/shared/desktop/image-best-gear.jpg" // FIXED PATH
            alt="Man enjoying music with headphones"
            fill
            className="hidden lg:block object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BestGear;
