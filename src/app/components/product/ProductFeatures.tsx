import React from 'react';

type IncludesItem = {
  quantity: number;
  item: string;
};

type ProductFeaturesProps = {
  features: string;
  includes: IncludesItem[];
};

const ProductFeatures = ({ features, includes }: ProductFeaturesProps) => {
  return (
    <section className="container mx-auto px-6 my-16 md:my-24 lg:my-40">
      <div className="flex flex-col lg:flex-row gap-24 lg:gap-32">
        {/* Features Column */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-8">Features</h2>
          {/* We use whitespace-pre-line to respect the line breaks from the JSON */}
          <p className="text-black text-opacity-50 leading-relaxed whitespace-pre-line">
            {features}
          </p>
        </div>

        {/* "In the Box" Column */}
        <div className="lg:w-1/3 flex flex-col md:flex-row lg:flex-col gap-8 md:gap-32 lg:gap-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase md:flex-1 lg:flex-none">In the box</h2>
          <ul className="space-y-2 md:flex-1 lg:flex-none">
            {includes.map((item) => (
              <li key={item.item} className="flex">
                <span className="text-orange-500 font-bold w-8">{item.quantity}x</span>
                <span className="text-black text-opacity-50 ml-4">{item.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;

