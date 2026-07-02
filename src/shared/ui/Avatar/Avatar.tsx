'use client'

import Image from 'next/image'

interface AvatarProps {
  className?: string;
  src: string;
  alt: string;
}

const Avatar = ({ className, src, alt }: AvatarProps) => {
  const avatarSrc = src || '/icons/unknown-raccoon.svg'
  return (
    <Image
      className={`${className || ''}`.trim()}
      src={avatarSrc}
      alt={alt}
      width={285}
      height={285}
      loading="lazy"
      unoptimized={process.env.NODE_ENV === 'development'}
      onError={(e) => {
        e.currentTarget.src = '/icons/unknown-raccoon.svg';
      }}
    />
  )
}

export { Avatar }
