import React from "react";
import Image from "next/image";

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}
interface StaticRequire {
  default: StaticImageData;
}
declare type StaticImport = StaticRequire | StaticImageData;
export default function Avatar({
  src,
  size,
  className,
}: {
  src: StaticImport | string;
  size: number;
  className?: string;
}) {
  return (
    <Image
      width={size}
      height={size}
      className={`inline-block h-[5rem] w-[5rem] rounded-full ring-2 ring-white ${className}`}
      src={src}
      // src="/img/logos/k_favicon.ico"
      alt=""
    />
  );
}
