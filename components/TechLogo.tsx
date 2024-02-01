import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';

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
  width = 100,
  height = 100,
}: TechLogoProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={href} passHref rel="noopener noreferrer" target="_blank">
        <Fade triggerOnce>
          <Image src={src} alt={alt} width={width} height={height} />
        </Fade>
      </Link>
    </div>
  );
}

export default TechLogo;
