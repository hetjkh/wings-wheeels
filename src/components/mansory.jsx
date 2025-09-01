"use client";

import React from "react";

const Masonry = ({ children, className = "" }) => {
  return (
    <div
      className={`
        columns-2 
        sm:columns-2 
        md:columns-3 
        lg:columns-4 
        xl:columns-4
        gap-4 
        space-y-4 
        ${className}
      `}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="break-inside-avoid gap-0 mb-4">
          {child}
        </div>
      ))}
    </div>
  );
};

export { Masonry };