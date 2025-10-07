import React from 'react';

const CategoryTitle = ({ name }: { name: string }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
    </div>
  );
};

export default CategoryTitle;
