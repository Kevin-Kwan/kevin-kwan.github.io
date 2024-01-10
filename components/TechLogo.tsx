import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TechLogoProps {
  href: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

function TechLogo({
  href,
  src,
  alt,
  width = 1000,
  height = 1000,
}: TechLogoProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={href} passHref rel="noopener noreferrer" target="_blank">
        <Image src={src} alt={alt} width={width} height={height} />
      </Link>
    </div>
  );
}

export default TechLogo;
