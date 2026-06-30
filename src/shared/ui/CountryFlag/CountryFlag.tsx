'use client'

import Image from 'next/image'

interface CountryFlagProps {
  className?: string;
  code: string
  name: string
}

const CountryFlag = ({ className, code, name }: CountryFlagProps) => {
  const flagSrc = `https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/${code.toLowerCase()}.svg`

  return (
    <Image
      className={`${className || ''}`.trim()}
      src={flagSrc}
      alt={name}
      width={35}
      height={24}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = 'none'
      }}
    />
  )
}

export { CountryFlag }
