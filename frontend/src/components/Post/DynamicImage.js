import React, { useEffect, useState } from 'react';

const DynamicImage = ({ src }) => {
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setIsHorizontal(image.width > image.height);
    };
  }, [src]);

  return (
    <img
      src={src}
      className={isHorizontal ? 'h-[350px] w-[600px]' : 'h-[400px] w-[300px]'}
      alt="Dynamic Image"
    />
  );
};

export default DynamicImage;
