import React from 'react';

type CategoryHeaderProps = {
  categoryName: string;
};

const CategoryHeader = ({ categoryName }: CategoryHeaderProps) => {
  return (
    <div className="bg-black">
      <div className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-wider">
          {categoryName}
        </h1>
      </div>
    </div>
  );
};

export default CategoryHeader;
