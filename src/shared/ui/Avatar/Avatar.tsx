'use client'

import Image from 'next/image'
import { useState } from 'react'

interface AvatarProps {
  className?: string;
  src: string;
  alt: string;
}

const Avatar = ({ className, src, alt }: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      className={`${className || ''}`.trim()}
      src={imgSrc}
      alt={alt}
      width={285}
      height={285}
      unoptimized
      loading="lazy"
      onError={() => setImgSrc('/icons/unknown-raccoon.svg')}
    />
  )
}

export { Avatar }
