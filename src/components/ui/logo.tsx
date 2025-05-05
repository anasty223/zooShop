import Image from 'next/image';
import React from 'react';



const Logo = () => {
  return (
    <div className="flex items-center  w-[161px]">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={69}
        height={50}
        className="h-auto " // Произвольная высота, ширина автоматическая
      />
      <Image
        src="/images/logo_text.png"
        alt="logo"
        width={69}
        height={50}
        className="h-auto " // Та же высота для согласованности
      />
    </div>
  );
};

export default Logo;